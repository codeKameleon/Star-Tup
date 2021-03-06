const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const conversationRoutes = require('./routes/conversationRoutes')
const messageRoutes = require('./routes/messageRoutes')

const path = require("path")

const ORIGIN_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://becode-star-tup.herokuapp.com"

// Set up environment variables
dotenv.config()

const app = express()
const port = process.env.PORT

// Connection to DB
connectDB()

// Middlewares
app.use(cors({ origin: ORIGIN_URL, credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.set("trust proxy", 1)

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
            route: "/api/users/:id",
            method: "GET",
            description: "get one user",
            query_params: [
                'user id'
            ]
        },
        {
            route: "/api/conversations",
            method: "GET",
            description: "list all conversations of a user"
        },
        {
            route: "/api/conversations",
            method: "POST",
            description: "create a new conversation",
            required_fields: [
                'receiverId'
            ]
        },
        {
            route: "/api/messages/:conversationId",
            method: "GET",
            description: "get all messages from a conversation",
            query_params: [
                'conversation id'
            ]
        },
        {
            route: "/api/messages/:conversationId",
            method: "POST",
            description: "add a message to a conversation",
            required_fields: [
                'content'
            ],
            query_params: [
                'conversation id'
            ]
        },
        {
            route: "/api/messages/:id",
            method: "DELETE",
            description: "delete a message in a conversation",
            query_params: [
                'message id'
            ]
        }
    ]
}))

// Heroku Deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("/", (req, res) => {
        res.redirect("/app")
    })

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, "client/build/index.html"))
    })
}
else {
    app.get("/", (req, res) => {
        res.send("API is running sucessfully")
    })
}

// Handling non matching request from the client
app.all('*', (req, res) => {
    res.status(404).send({ message: "Page not found on the server" })
})

// Server
const server = app.listen(port, () => console.log(`Server started and running at http://localhost:${port}`))


// Socket.io
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    log: false,
    agent: false,
    transport: ['websocket'],
    cors: {
        origin: ORIGIN_URL
    }
})

let connectedUsers = []

const addUserConnected = userId => {
    if (!connectedUsers.includes(userId)) {
        connectedUsers.push(userId)
    }
}

io.on("connection", (socket) => {
    console.log("connected to socket.io");

    socket.on('setup', (userData) => {
        socket.join(userData)
        addUserConnected(userData)
        socket["userId"] = userData;
        socket.emit("connected", connectedUsers)
    })

    socket.on('join chat', (conversation) => {
        socket.join(conversation)
    })

    socket.on('disconnect', () => {
        let index = connectedUsers.indexOf(socket.userId)
        connectedUsers.splice(index, 1)
        socket.emit('connected', connectedUsers)
    })

    socket.on('new message', (message) => {
        socket.to(message.receiverId).emit("message received", message.message.content);
    })
})

