const mongoose = require('mongoose')
const DataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}, {collection: 'User'})
module.exports = mongoose.model('User', DataSchema)