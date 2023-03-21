const express = require("express")
const registerSocketEvents = require("./utils/websocket")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

io.on("connection", socket => {
    socket.emit("chat-message", "Hello World")
})

const port = process.env.PORT || 8080

registerSocketEvents(io)

app.use(express.static(__dirname + "/pages"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})