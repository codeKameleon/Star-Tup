const express = require('express')
const dotenv = require('dotenv')
const cors =  require('cors')
const cookieParser = require('cookie-parser')

const connectDB = require('./config/db')

const authRoutes  = require('./routes/authRoutes')
const userRoutes  = require('./routes/userRoutes')
const conversationRoutes  = require('./routes/conversationRoutes')
const messageRoutes  = require('./routes/messageRoutes')

// Set up environment variables
dotenv.config()

const app = express()
const port = process.env.PORT

// Connection to DB
connectDB()

// Middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
// app.set("trust proxy", 1);

// Routes

// Register / Login / Logout
app.use('/api/account', authRoutes)

// Users
app.use('/api/users', userRoutes)

// Conversations
app.use('/api/conversations', conversationRoutes)

// Messages
app.use('/api/messages', messageRoutes)

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
