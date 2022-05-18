
const startButton = document.getElementById("start")
const stopButton = document.getElementById("stop")
const audioButton = document.getElementById("audio")


import { startRecord, stopRecord } from "./record.js";
import { speech_to_text } from "../util/socket.js";


startButton.onclick = () => {
    console.log("Start recording ...")
    startRecord()
}


stopButton.onclick = async () => {
    let blob = await stopRecord()
    let result = await speech_to_text(blob)
    console.log("RECORDED")
    console.log(result)
}
