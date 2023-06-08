const { format } = require('util')
const { Storage } = require('@google-cloud/storage')
const Predictions = require('../models/Predictions')
const userInfo = require('../utils/userInformation')
const predict = require('../utils/predict')
const sharp = require('sharp')

// Initialize storage with credentials
const storage = new Storage({ keyFilename: 'google-cloud-key.json' })
const bucket = storage.bucket('segar-test-bucket')

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file!' })
    }

    const fileExtension = req.file.mimetype.split('/')[1]
    const arrayOfAllowedExtensions = ['jpg', 'jpeg', 'png', 'bmf', 'gif']

    if (!arrayOfAllowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ message: 'Valid extension: ' + arrayOfAllowedExtensions.join(', ') })
    }

    const fileName = req.file.originalname.replace(/\s+/g, '-')
    const blob = bucket.file(fileName)
    const blobStream = blob.createWriteStream({
      resumable: false,
    })

    blobStream.on('error', (err) => {
      res.status(500).json({ message: err.message })
    })

    blobStream.on('finish', async () => {
      const creator = userInfo(req.headers.authorization)

      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )

      const resizedImage = await sharp(req.file.buffer)
        .resize(256, 256)
        .removeAlpha()
        .toBuffer()

      const supportedVegetables = ['Brokoli', 'Wortel', 'Kembang Kol', 'Tomat']
      const predictVegetableName = await predict(resizedImage, process.env.VEGETABLE_NAME_MODEL)
      const vegetableName = predictVegetableName.argMax(1).dataSync()[0]
      const score = predictVegetableName.softmax().max().dataSync()[0] * 100

      const prediction = await Predictions.create({
        name: supportedVegetables[vegetableName],
        score: Number(score.toFixed(2)),
        image: publicUrl,
        creator: creator.id,
      })

      res.status(201).json({
        error: false,
        message: "Image uploaded & prediction made",
        data: prediction,
      })
    })

    blobStream.end(req.file.buffer)
  } catch (error) {
    // res.status(500).json({ message: `Could not upload the image: ${req.file.originalname}` })
    res.status(500).send(error.message)
  }
}

const predictionResult = async (req, res) => {
  try {
    const { id: predictionID } = req.params
    const result = await Predictions.findOne({ _id: predictionID })

    if (!result) {
      return res.status(404).json({
        error: true,
        message: `No Prediction with id: ${predictionID}`,
      })
    }

    res.status(200).json({
      error: false,
      message: "Prediction result fetched successfully",
      data: result
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Unable to fetch predictions!!!",
    });
  }
}

const predictionsHistory = async (req, res) => {
  try {
    const creator = userInfo(req.headers.authorization)
    const history = await Predictions.find({ creator: creator.id })

    res.status(200).json({
      error: false,
      message: "Predictions history fetched successfully",
      data: history,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: true,
      message: "Unable to fetch predictions history!!!",
    });
  }
}

module.exports = {
  uploadImage,
  predictionResult,
  predictionsHistory,
}