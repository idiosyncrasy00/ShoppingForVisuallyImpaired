
import { up, down, getSelectedIndex } from "./block.js";
import { playError } from "../sound/sound.js";


var selectCallback = async (index) => {}
var returnCallback = async () => {}
var listenCallback = async () => {}
var voiceCallback = async () => {}


var key_delay = 500
var key_ready = true


export function enable_keyevent() {
    document.onkeydown = async (e) => {
        e.preventDefault()
        if (key_ready) {
            key_ready = false
            setTimeout(() => key_ready = true, key_delay)
            // Case
            if (e.key == "ArrowUp") {
                up()
            } else if (e.key == "ArrowDown") {
                down()
            } else if (e.key == "f") {
                await selectCallback(getSelectedIndex())
            } else if (e.key == "g") {
                await returnCallback()
            } else if (e.key == "h") {
                await listenCallback()
            } else if (e.key == "j") {
                await voiceCallback()
            } else {
                playError()
            }
        }
    }
}


export function disable_keyevent() {
    document.onkeydown = e => {
        e.preventDefault()
    }
}


export function start_record_mode() {
    document.onkeydown = async (e) => {
        e.preventDefault()
        if (key_ready) {
            key_ready = false
            setTimeout(() => key_ready = true, key_delay)
            if (e.key == "j") {
                await voiceCallback()
            }
        }
    }
}


export function disable_callback() {
    selectCallback = async (index) => {}
    returnCallback = async () => {}
    listenCallback = async () => {}
    voiceCallback = async () => {}
}


export function setSelectCallback(callback) { selectCallback = callback }
export function setReturnCallback(callback) { returnCallback = callback }
export function setListenCallback(callback) { listenCallback = callback }
export function setVoiceCallback(callback) { voiceCallback = callback }
