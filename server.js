const express = require('express')
const dotenv = require('dotenv')

const app = express()
const port = process.env.PORT

// Set up environment variables
dotenv.config()

// Server
app.listen(port, () => console.log(`Server started and running at http://localhost:${port}`))
