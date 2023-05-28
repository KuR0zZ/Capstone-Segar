const Predictions = require('../models/Predictions')

const predictionResult = async (req, res) => {
  try {
    const { id: predictionID } = req.params
    const result = await Predictions.findOne({ _id: predictionID })

    res.status(200).json({
      error: false,
      message: "Prediction fetched successfully",
      data: result
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Unable to fetch predictions!!!",
    });
  }
}

module.exports = predictionResult