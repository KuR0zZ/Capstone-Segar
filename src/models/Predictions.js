const mongoose = require('mongoose')
const PredictSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
}, { collection: 'Predictions' })

module.exports = mongoose.model('Predictions', PredictSchema)