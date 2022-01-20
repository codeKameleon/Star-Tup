const express = require('express')
const dotenv = require('dotenv')

// Set up environment variables
dotenv.config()

const app = express()
const port = process.env.PORT

// Server
app.listen(port, () => console.log(`Server started and running at http://localhost:${port}`))
