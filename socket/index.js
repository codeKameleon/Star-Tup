const io = require ('socket.io')(9000, {
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    console.log("a user connected")
    io.emit("weclcome", "hello, this is socket server")
})