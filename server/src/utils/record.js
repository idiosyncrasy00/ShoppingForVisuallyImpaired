const path = require("path")

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env.dev")     // For development
})

const { AudioConfig, SpeechConfig, SpeechRecognizer, ResultReason } = require("microsoft-cognitiveservices-speech-sdk")
const fs = require("fs")
const python = require("./python");
const buff = require("buffer")
const speechConfig = SpeechConfig.fromSubscription(process.env.TTS_TOKEN, process.env.TTS_REGION)
speechConfig.speechRecognitionLanguage = "vi-VN"


async function speechToText(filepath) {
    let audioConfig = AudioConfig.fromWavFileInput(fs.readFileSync(filepath))
    let speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig)
    return new Promise(res => {
        speechRecognizer.recognizeOnceAsync(async (result) => {
            if (result.reason == ResultReason.RecognizedSpeech) {
                console.log(`RECOGNIZED: ${result.text}`)
                res(await handletext(result.text))
            } else {
                res(null)
            }
        })
    })
}


async function text_to_num(text) {
    try {
        let res = await python.run_python("src/python/ttn.py", [text])
        return res.join("")
    } catch (err) {
        return ""
    }
}


async function handletext(text) {
    // Manipulate string
    text = text.replace(".", " ")
    text = text.toLowerCase()
    text = text.trim()
    // Handle number
    let result = ""
    let nums = text.match(/\d/g)
    if (nums != null) {
        result = nums.join("")
    } else {
        result = await text_to_num(text)
    }
    return {
        text: text,
        num: result
    }
}


async function read(blob) {
    const buffer = Buffer.from(blob)
    await new Promise(res => fs.writeFile("media/record.wav", buffer, () => res()))
    const result = await speechToText("media/record.wav")
    return result
}


module.exports = { read }
