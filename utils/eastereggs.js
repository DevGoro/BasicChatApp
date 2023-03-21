// Die Funktion on_message wird bei jeder neuen Nachricht im Chat ausgeführt.
// Dabei enthalten die Parameter
//     author:     Den Namen der Person, die die Nachricht verschickt hat
//     message:    Die versendete Nachricht

// Bei erfüllen einer Aufgabe wird der Liste "collectedStars" ein "Stern" hinzugefügt.
// Durch das return am Ende der Funktion wird die Liste der gesammelten Sternen zurückgegeben
// und der Person (author) werden alle Sterne gutgeschrieben

function checkAuthor (author) {
    if (author.endsWith(":)")) {
        return true
    } else {
        return false
    }
}

function on_message(author, message, chat) {
    var collectedStars = []

    collectedStars.push("firstMessage")

    if (message.startsWith("Java")) {
        if (message.endsWith("script")) {
            collectedStars.push("stringFunctions")
        }
    }

    if (message.startsWith("!time")) {
        var now = new Date()
        chat.emit("message", { name: "Server", message: now.toUTCString()})
        collectedStars.push("time")
    }

    if (checkAuthor(author)) {
        var a = 0

        for (letter of message) {
            a++
        }

        if (a >= 20) {
            collectedStars.push("longMessage")
        }
        
        if (5 - message <= 0) {
            collectedStars.push("quickMath")
        }
    }

    return collectedStars
}

module.exports = on_message