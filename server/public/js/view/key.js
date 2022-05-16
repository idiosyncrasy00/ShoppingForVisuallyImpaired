
import { up, down, getSelectedIndex } from "./block.js";
import { playError } from "../sound/sound.js";


var selectCallback = (index) => {}
var returnCallback = () => {}
var listenCallback = () => {}
var voiceCallback = () => {}


var key_delay = 500
var key_ready = true


export function enable_keyevent() {
    document.onkeydown = e => {
        if (key_ready) {
            key_ready = false
            setTimeout(() => key_ready = true, key_delay)
            // Case
            if (e.key == "ArrowUp") {
                e.preventDefault()
                up()
            } else if (e.key == "ArrowDown") {
                e.preventDefault()
                down()
            } else if (e.key == "f") {
                selectCallback(getSelectedIndex())
            } else if (e.key == "g") {
                returnCallback()
            } else if (e.key == "h") {
                listenCallback()
            } else if (e.key == "j") {
                voiceCallback()
            } else {
                playError()
            }
        }
    }
}


export function disable_keyevent() {
    document.onkeydown = e => {}
}


export function disable_callback() {
    selectCallback = (index) => {}
    returnCallback = () => {}
    listenCallback = () => {}
    voiceCallback = () => {}
}


export function setSelectCallback(callback) { selectCallback = callback }
export function setReturnCallback(callback) { returnCallback = callback }
export function setListenCallback(callback) { listenCallback = callback }
export function setVoiceCallback(callback) { voiceCallback = callback }
