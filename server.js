const express = require('express')
const dotenv = require('dotenv')
const cors =  require('cors')

const connectDB = require('./config/db')

const authRoutes  = require('./routes/authRoutes')
const userRoutes  = require('./routes/userRoutes')

// Set up environment variables
dotenv.config()

const app = express()
const port = process.env.PORT

// Connection to DB
connectDB()

// Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/api/account', authRoutes)
app.use('/api/users', userRoutes)

// Server
app.listen(port, () => console.log(`Server started and running at http://localhost:${port}`))
