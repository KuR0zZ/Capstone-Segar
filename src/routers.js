const express = require('express')
const router = express.Router()
const Multer = require('multer')
const passport = require('passport');

const {
  uploadImage,
  predictionResult,
  predictionsHistory,
} = require('./controllers/predictionsController')

const {
  getDictionary,
  postDictionary,
  getDictionaryDetails,
} = require('./controllers/vegetablesController')
const {
  postRegister,
  postLogin,
  getUserData,
  postEditUser,
} = require('./controllers/authController')

const authenticate = require('./middleware/authenticate');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024
  }
})

router.route('/dictionaries').get(authenticate, getDictionary).post(postDictionary)

router.route('/dictionaries/:id').get(authenticate, getDictionaryDetails);

router.get('/predictions', authenticate, predictionsHistory)

router.post('/predictions', authenticate, multer.single('image'), uploadImage)

router.route('/predictions/:id').get(authenticate, predictionResult)

router.route('/auth/register').post(postRegister);

router.route('/auth/login').post(postLogin);

router.route('/auth/user').get(authenticate, getUserData);

router.route('/auth/user/edit').post(authenticate, postEditUser);

module.exports = router