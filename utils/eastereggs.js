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

    // 1. Stern: firstMessage ##############################################

    collectedStars.push("firstMessage")

    // 2. Stern: stringFunctions ###########################################

    if (message.startsWith("Java")) {
        if (message.endsWith("script")) {
            collectedStars.push("stringFunctions")
        }
    }

    // 3. Stern: time #####################################################

    if (message.startsWith("!time")) {
        var now = new Date()
        chat.emit("message", { name: "Server", message: now.toUTCString()})
        collectedStars.push("time")
    }

    // 4. Stern: longMessage ###############################################

    if (checkAuthor(author)) {
        var a = 0

        for (letter of message) {
            a++
        }

        if (a >= 20) {
            collectedStars.push("longMessage")
        }
        
        // 5. Stern: quickMath ############################################

        if (5 - message <= 0) {
            collectedStars.push("quickMath")
        }
    }

    return collectedStars
}

module.exports = on_message