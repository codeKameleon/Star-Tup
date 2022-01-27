const io = require ('socket.io')(8000, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = []

// Avoid adding a user each time there is a connection to the application, it should only be done once
const addUser = (token, socketId) => {
    !users.some((user) => user.token === token) &&
    users.push({token, socketId})
}

io.on("connection", (socket) => {
    console.log("a user connected")
    // Take token and socketId from user
    socket.on("addUser", token => {
        addUser(token, socket.id)
        // Send users to client
        io.emit("getUsers", users)
    })
})