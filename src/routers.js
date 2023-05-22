const express = require('express')
const router = express.Router()

const {
  getAllData,
  inputData,
} = require('./controllers/testDB')

router.route('/').get(getAllData).post(inputData)

module.exports = router