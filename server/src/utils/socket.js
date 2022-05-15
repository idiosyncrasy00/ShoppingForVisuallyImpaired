
const tts = require("./tts")


module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("speak", async (id, text, callback) => {
            let filename = await tts.speak(id, text)
            callback(filename)
        })
    })
}
