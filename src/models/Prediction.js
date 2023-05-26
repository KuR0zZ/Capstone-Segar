const mongoose = require('mongoose')
const PredictSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prediction: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
}, { collection: 'Predictions' })

module.exports = mongoose.model('Predictions', PredictSchema)