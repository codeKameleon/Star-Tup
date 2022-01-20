const express = require('express')
const dotenv = require('dotenv')

const connectDB = require('./config/db')

// Set up environment variables
dotenv.config()

const app = express()
const port = process.env.PORT

// Connection to DB
connectDB()

// Server
app.listen(port, () => console.log(`Server started and running at http://localhost:${port}`))
