
import { generate_audio } from "../util/socket.js"

var upAudio = new Audio("../../sound/up.wav")
var downAudio = new Audio("../../sound/down.wav")
var errorAudio = new Audio("../../sound/error.mp3")
var interactAudio = new Audio("../../sound/button_interact.mp3")
var ttsPath = "../../tts/"


const socket = io()
var ttsAudio = null
var voices = []
var playingAudio = null
var afterPlayingCallback = () => {}


export function playUp() {
    upAudio.play()
}


export function playDown() {
    downAudio.play()
}


export function playError() {
    errorAudio.play()
}


export function playInteract() {
    interactAudio.play()
}


export async function playTTS(voice, callback=()=>{}) {
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
        ttsAudio.addEventListener("ended", callback)
        await ttsAudio.play()
    }
}


export async function playVoices(_voices, callback=()=>{}) { // [ {id, text} ]
    if (_voices != null) {
        if (_voices.length > 0) {
            stopVoices()
            voices = _voices
            afterPlayingCallback = callback
            await play_next()
        }
    }
}


export async function stopVoices() {
    if (playingAudio != null) {
        playingAudio.pause()
        playingAudio = null
        afterPlayingCallback = () => {}
    }
}


async function play_next() {
    if (voices.length > 0) {
        let voice = voices.shift()
        let filename = await generate_audio(voice.id, voice.text)
        playingAudio = new Audio(ttsPath + filename)
        playingAudio.addEventListener("ended", async () => {
            await play_next()
        })
        playingAudio.play()
    } else {
        playingAudio = null
        afterPlayingCallback()
    }
}
