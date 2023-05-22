const Data = require('../models/Data')

const getAllData = async (req, res) => {
  try {
    const data = await Data.find({})
    res.status(200).json({ success: true, nbHits: data.length, data })
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Something went wrong, try again later' })
  }
}

const inputData = async (req, res) => {
  try {
    const data = await Data.create(req.body)
    res.status(201).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Something went wrong, try again later' })
  }
}

module.exports = {
  getAllData,
  inputData,
}