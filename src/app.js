require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routers')
const connectDB = require('./db/connect')
const tf = require('@tensorflow/tfjs-node')
require('./middleware/passport');

// const loadModel = async () => {
//   const model = await tf.loadLayersModel('file://modeltfjs/model.json')
//   return model
// }

// let model

// loadModel().then(m => model = m)

// Middleware
app.use(express.json())

// Routes
app.use('/api/v1/vegetables', router)

const PORT = process.env.PORT || 8080
const HOST = '0.0.0.0'

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, HOST, console.log(`Server is listening on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

startServer()
