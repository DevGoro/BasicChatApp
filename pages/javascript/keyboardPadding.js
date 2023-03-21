const messageInput0 = document.getElementById('messageInput')
const keyboardPadding = document.getElementById("keyboardPadding")

messageInput0.addEventListener("focus", () => {
    if (document.body.clientWidth <= 500) {
        keyboardPadding.classList.add("keyboard")
        messageInput0.scrollIntoView()
    }
})

messageInput0.addEventListener("blur", () => {
    if (document.body.clientWidth <= 500) {
        keyboardPadding.classList.remove("keyboard")
    }
})