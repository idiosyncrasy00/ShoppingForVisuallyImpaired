
import { generate_audio } from "../util/socket.js"

var upAudio = new Audio("../../sound/up.wav")
var downAudio = new Audio("../../sound/down.wav")
var errorAudio = new Audio("../../sound/error.mp3")
var ttsPath = "../../tts/"


const socket = io()
var ttsAudio = null
var audios = []


export function playUp() {
    upAudio.play()
}


export function playDown() {
    downAudio.play()
}


export function playError() {
    errorAudio.play()
}


export async function playTTS(voice) {
    if (voice.id && voice.text) {
        if (ttsAudio != null) {
            ttsAudio.pause()
        }
        let filename = await new Promise(res => {
            socket.emit("speak", voice.id, voice.text, (_filename) => {
                res(_filename)
            })
        })
        ttsAudio = new Audio(ttsPath + filename)
        await ttsAudio.play()
    }
}


export async function playVoices(voices) { // [ {id, text} ]
    if (voices != null) {
        if (voices.length > 0) {
            for (const audio of audios) {
                audio.pause()
            }
            audios = []
            for await (const voice of voices) {
                if (voice.id && voice.text) {
                    let filename = await generate_audio(voice.id, voice.text)
                    audios.push(new Audio(ttsPath + filename))
                }
            }
            for (var i = 0; i < audios.length - 1; i++) {
                audios[i].addEventListener("ended", () => {
                    audios.shift()
                    if (audios.length > 0) {
                        audios[0].play()
                    }
                })
            }
            audios[0].play()
        }
    }
}


export async function stopVoices() {
    for (const audio of audios) {
        audio.pause()
    }
}
