
import { up, down, select } from "./block.js";


var selectCallback = (index) => {}
var returnCallback = () => {}
var listenCallback = () => {}
var voiceCallback = () => {}


export function enable_keyevent() {
    document.onkeydown = e => {
        if (e.key == "ArrowUp") {
            up()
        } else if (e.key == "ArrowDown") {
            down()
        } else if (e.key == "f") {
            selectCallback(select())
        } else if (e.key == "g") {
            returnCallback()
        } else if (e.key == "h") {
            listenCallback()
        } else if (e.key == "j") {
            voiceCallback()
        }
    }
}


export function disable_keyevent() {
    document.onkeydown = e => {}
}


export function setSelectCallback(callback) { selectCallback = callback }
export function setReturnCallback(callback) { returnCallback = callback }
export function setListenCallback(callback) { listenCallback = callback }
export function setVoiceCallback(callback) { voiceCallback = callback }
