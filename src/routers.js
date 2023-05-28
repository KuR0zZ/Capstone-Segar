const express = require('express')
const router = express.Router()
const Multer = require('multer')

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024
  }
})

const { uploadImage } = require('./controllers/predictionsController')


router.post('/predictions', multer.single('image'), uploadImage)


module.exports = router