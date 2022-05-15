
var upAudio = new Audio("../sound/up.wav")
var downAudio = new Audio("../sound/down.wav")
var errorAudio = new Audio("../sound/error.mp3")


const socket = io()
var ttsAudio = null


export function playUp() {
    upAudio.play()
}


export function playDown() {
    downAudio.play()
}


export function playError() {
    errorAudio.play()
}


export async function playTTS(id, text) {
    if (ttsAudio != null) {
        ttsAudio.pause()
    }
    let filename = await new Promise(res => {
        socket.emit("speak", id, text, (_filename) => {
            res(_filename)
        })
    })
    ttsAudio = new Audio("../tts/" + filename)
    ttsAudio.play()
}
