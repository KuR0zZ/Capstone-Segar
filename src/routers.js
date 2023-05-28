const express = require('express')
const router = express.Router()

const predictionResult = require('./controllers/predictionsController')

router.route('/predictions/:id').get(predictionResult)
