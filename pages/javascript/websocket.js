const socket = io()

const profileName = document.getElementById("profileName")
const chatBox = document.getElementById("chatBox")
const sendForm = document.getElementById("sendForm")
const messageInput = document.getElementById("messageInput")
const userListUL = document.getElementById("userListUL")

if (localStorage.name === undefined) {
    const name = prompt("What is your name?")
    localStorage.setItem("name", name)
}
socket.emit("newUser", localStorage.name)
profileName.innerHTML = localStorage.name

socket.on("message", messageData => {
    appendMessage(messageData.name, messageData.message)
})

socket.on("presentationEnd", message => {
    console.log(message)
    alert(message)
})

socket.on("updateUserList", userList => {
    const orderedUserList = {}

    var highest
    while (Object.keys(orderedUserList).length < Object.keys(userList).length) {
        for (user in userList) {
            if (!orderedUserList[user]) {
                if (highest === undefined) highest = user
                if(user != highest) {
                    if(userList[user].achievements.length > userList[highest].achievements.length) {
                        highest = user
                    }
                }
            }
        }

        orderedUserList[highest] = userList[highest]
        highest = undefined
    }

    while (userListUL.firstChild) {
        userListUL.removeChild(userListUL.lastChild)
    }

    for (user in orderedUserList) {
        const userLi = document.createElement("li")
        userLi.innerText = `${orderedUserList[user].name} (${orderedUserList[user].achievements.length}/5⭐)`
        userListUL.append(userLi)
    }
})

socket.on("connect", () => {
    console.log(socket.id)
})

sendForm.addEventListener("submit", e => {
    e.preventDefault()
    appendMessage(localStorage.name, messageInput.value)
    socket.emit("message", messageInput.value)
    messageInput.value = ""
})

function appendMessage(name, message) {
    const messageDiv = document.createElement("div")
    messageDiv.innerText = `${name}: ${message}`
    chatBox.append(messageDiv)
    chatBox.scrollTop = chatBox.scrollHeight
}