const mongoose = require('mongoose')
const DataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  scientific_name: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Data', DataSchema)