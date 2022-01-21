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

// Register / Login / Logout
app.use('/api/account', authRoutes)

// Users
app.use('/api/users', userRoutes)


// API Documentation
app.get('/api', (req, res) => res.send({
    message: "Welcome on the Star Tup API",
    endpoints: [
        {
            route: "/api/account/register",
            method: "POST",
            description: "register a user",
            required_fields: [
                'firstname',
                'lastname',
                'birthdate',
                'email',
                'password'
            ]
        },
        {
            route: "/api/account/login",
            method: "POST",
            description: "log a user",
            required_fields: [
                'email',
                'password'
            ]
        },
        {
            route: "/api/account/logout",
            method: "GET",
            description: "log out a user"
        },
        {
            route: "/api/users",
            method: "GET",
            description: "list all users"
        },
        {
            route: "/api/conversations",
            method: "GET",
            description: "list all conversations of a user"
        },
        {
            route: "/api/conversations",
            method: "GET",
            description: "list all conversations of a user"
        },
        {
            route: "/api/conversations/:id",
            method: "POST",
            description: "send message to a conversation"
        },
        {
            route: "/api/conversations/:id",
            method: "GET",
            description: "retrieve message from a conversation"
        },
    ]
}))

app.get('/', (req, res) => res.redirect('/api'))

// Server
app.listen(port, () => console.log(`Server started and running at http://localhost:${port}`))
