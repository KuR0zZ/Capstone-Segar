const express = require('express')
const router = express.Router()

// const {
//   getAllData,
//   inputData,
// } = require('./controllers/testDB')

const {
  getDictionary,
  postDictionary,
  getDetailDictionary,
} = require('./controllers/VegetableController')

router.route('/').get(getDictionary).post(postDictionary)

router.route('/:id').get(getDetailDictionary);

module.exports = router