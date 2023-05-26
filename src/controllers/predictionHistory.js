const Predictions = require('../models/Predictions')

const getPredictionsHistory = async (req, res) => {
  try {
    const history = await Predictions.find({})

    res.status(200).json({
      error: false,
      message: "Predictions history fetched successfully",
      data: history,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: true,
      message: "Unable to read list of files!",
    });
  }
}

module.exports = getPredictionsHistory