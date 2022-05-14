
var upAudio = new Audio("../sound/up.wav")
var downAudio = new Audio("../sound/down.wav")
var errorAudio = new Audio("../sound/error.mp3")


export function playUp() {
    upAudio.play()
}


export function playDown() {
    downAudio.play()
}


export function playError() {
    errorAudio.play()
}


document.getElementById("button").onclick = () => {
    console.log("Speak")
    let msg = new SpeechSynthesisUtterance("Hello there")
    window.speechSynthesis.speak(msg)
}
