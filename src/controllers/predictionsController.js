const { format } = require('util')
const { Storage } = require('@google-cloud/storage')
const Predictions = require('../models/Predictions')

// Initialize storage with credentials
const storage = new Storage({ keyFilename: 'google-cloud-key.json' })
const bucket = storage.bucket('segar-test-bucket')


const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'Please upload a file!' })
    }

    const fileExtension = req.file.mimetype.split('/')[1]
    const arrayOfAllowedExtensions = ['jpg', 'jpeg', 'png', 'bmf', 'gif']

    if (!arrayOfAllowedExtensions.includes(fileExtension)) {
      return res.status(400).send({ message: 'Valid extension: ' + arrayOfAllowedExtensions.join(', ') })
    }

    const fileName = req.file.originalname.replaceAll(' ', '_')
    const blob = bucket.file(fileName)
    const blobStream = blob.createWriteStream({
      resumable: false,
    })

    blobStream.on('error', (err) => {
      res.status(500).send({ message: err.message })
    })

    blobStream.on('finish', async () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )

      const prediction = await Predictions.create({
        name: req.body.name,
        imageUrl: publicUrl,
      })

      res.status(201).json({
        error: false,
        message: "Image Uploaded",
        data: prediction,
      })
    })

    blobStream.end(req.file.buffer)
  } catch (error) {
    // if (error.code == 'LIMIT_FILE_SIZE') {
    //   return res.status(500).send({
    //     message: 'File size cannot be larger than 2MB!',
    //   })
    // }
    res.status(500).send({
      message: `Could not upload the image: ${req.file.originalname}. ${error}`
    })
  }
}

module.exports = {
  uploadImage,
}