const express = require('express')
const router = express.Router()
const Multer = require('multer')

const {
  uploadImage,
  predictionResult,
} = require('./controllers/predictionsController')

const {
  getDictionary,
  postDictionary,
  getDetailDictionary,
} = require('./controllers/vegetablesController')

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024
  }
})

router.route('/').get(getDictionary).post(postDictionary)

router.route('/:id').get(getDetailDictionary);

router.post('/predictions', multer.single('image'), uploadImage)

router.route('/predictions/:id').get(predictionResult)


module.exports = router