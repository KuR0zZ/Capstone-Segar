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
  famili: {
    type: String,
    required: true,
  },
  consumeable_part: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
}, {collection: 'Vegetables'})
module.exports = mongoose.model('Vegetables', DataSchema)