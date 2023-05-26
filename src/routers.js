const express = require('express')
const router = express.Router()

const getPredictionsHistory = require('./controllers/predictionHistory')

router.route('/predictions').get(getPredictionsHistory)

module.exports = router