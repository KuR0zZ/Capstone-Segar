const { format } = require('util')
const { Storage } = require('@google-cloud/storage')
const Predictions = require('../models/Predictions')
const userInfo = require('../utils/userInformation')

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
      const name = 'Kol'
      const score = 85

      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )

      const prediction = await Predictions.create({
        name: name,
        score: score,
        image: publicUrl,
        creator: creator.id,
      })

      res.status(201).json({
        error: false,
        message: "Image Uploaded",
        data: prediction,
      })
    })

    blobStream.end(req.file.buffer)
  } catch (error) {
    res.status(500).json({ message: `Could not upload the image: ${req.file.originalname}` })
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
      message: "Prediction fetched successfully",
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