require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routers')
const connectDB = require('./db/connect')

// Middleware
app.use(express.json())

// Routes
app.use('/api/v1/data', router)

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server is listening on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

startServer()
