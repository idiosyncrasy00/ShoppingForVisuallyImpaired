
const tts = require("./tts")
const record = require("./record")


module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("speak", async (id, text, callback) => {
            let filename = await tts.speak(id, text)
            callback(filename)
        })

        socket.on("stt", async (blob, callback) => {
            let result = await record.read(blob)
            callback(result)
        })
    })
}
