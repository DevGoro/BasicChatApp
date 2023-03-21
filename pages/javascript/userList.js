document.addEventListener("DOMContentLoaded", function(event) {
    const userListBurger = document.getElementById("userListBurger")
    const userListContainer = document.querySelector('.userListContainer')

    userListContainer.style.right = `calc(-1 * (calc(${window.getComputedStyle(userListContainer).width} - 40px)))`

    userListContainer.addEventListener("click", () => {
        if (!userListContainer.style.right.startsWith(0)) {
            userListContainer.style.right = "0px"
        } else {
            userListContainer.style.right = `calc(-1 * (calc(${window.getComputedStyle(userListContainer).width} - 40px)))`
        }
    })
})