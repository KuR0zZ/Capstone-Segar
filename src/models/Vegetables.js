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
  consumable_part: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  origin: {
    type: String,
    required: true,
  },
  brief_desc: {
    type: String,
    required: true,
  },
}, {collection: 'Vegetables'})
module.exports = mongoose.model('Vegetables', DataSchema)