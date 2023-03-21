const editProfile = document.getElementById("editProfile")

editProfile.addEventListener("click", () => {
    const name = prompt("What is your name?", localStorage.name)
    localStorage.setItem("name", name)
    socket.emit("changeName", localStorage.name)
    profileName.innerHTML = localStorage.name
})