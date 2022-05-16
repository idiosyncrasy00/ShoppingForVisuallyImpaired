
const controlBlock = document.getElementById("controlBlock")

import { playUp, playDown, playError } from "../sound/sound.js"

var blocks = []
var selected = -1
var focusCallback = null


function updateSelected(value, first=false) {
    if (selected != -1) {
        blocks[selected].className = "block"
    }
    blocks[value].className = "selected"
    blocks[value].scrollIntoView({
        block: "center",
        behavior: "smooth"
    })
    selected = value
    if (focusCallback != null) {
        focusCallback(value, first)
    }
}


export function spawnBlock(block_data) {    // [ "123", "456" ]
    controlBlock.innerHTML = ""
    blocks = []
    for (var i = 0; i < block_data.length; i++) {
        let block = document.createElement("div")
        block.className = "block"
        block.innerHTML = block_data[i]
        controlBlock.appendChild(block)
        blocks.push(block)
    }
    selected = -1
    updateSelected(0, true)
}


export function up() {
    if (selected > 0) {
        playUp()
        updateSelected(selected - 1)
    } else {
        playError()
    }
}


export function down() {
    if (selected < blocks.length - 1) {
        playDown()
        updateSelected(selected + 1)
    } else {
        playError()
    }
}


export function getSelectedIndex() {
    return selected
}


export function setFocusCallback(callback) {
    focusCallback = callback
}
