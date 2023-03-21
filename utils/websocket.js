const on_message = require("./eastereggs")
const cowsay = require("cowsay")

const userList = {}

module.exports = function registerSocketEvents(io) {
    function addStar(collectedStars, socketID) {
        if(collectedStars.length > 0) {
            for (star of collectedStars) {
                if (!userList[socketID].achievements.includes(star)) {
                    userList[socketID].achievements.push(star)
                    io.emit("updateUserList", userList)
                }
            }
        }
    }

    io.on("connection", socket => {
        socket.on("message", message => {
            if (message === "presentation end") {
                socket.broadcast.emit("presentationEnd", cowsay.say({
                    text: "Danke für's zuhören"
                }).toString())
            } else {
                socket.broadcast.emit("message", { name: userList[socket.id].name, message: message })
                const collectedStars = on_message(userList[`${socket.id}`].name, message, io, socket.id)
                addStar(collectedStars, socket.id)
            }
        })

        socket.on("newUser", name => {
            userList[socket.id] = { name: name, achievements: [] }
            io.emit("updateUserList", userList)
        })

        socket.on("changeName", name => {
            userList[socket.id].name = name
            io.emit("updateUserList", userList)
        })
    
        socket.on("disconnect", () => {
            delete userList[socket.id]
            io.emit("updateUserList", userList)
        })
    })
}