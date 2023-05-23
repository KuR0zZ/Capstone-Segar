const express = require('express')
const router = express.Router()

// const {
//   getAllData,
//   inputData,
// } = require('./controllers/testDB')

const {
  getDictionary,
  postDictionary,
} = require('./controllers/VegetableController')

router.route('/').get(getDictionary).post(postDictionary)

module.exports = router