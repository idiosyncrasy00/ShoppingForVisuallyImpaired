
const controlBlock = document.getElementById("controlBlock")

import { playUp, playDown, playError, playVoices } from "../sound/sound.js"

var blocks = []     // [ { html: ..., data: ... } ]
var selected = -1


function updateSelected(value) {
    if (selected != -1) {
        blocks[selected].html.className = "block"
    }
    blocks[value].html.className = "selected"
    blocks[value].html.scrollIntoView({
        block: "center",
        behavior: "smooth"
    })
    selected = value
    playVoices(blocks[value].data.voices)
}

/*  blockData:
{
    data: "name",
    voices: [
        { id: "123", text: "1244" }
    ]
}
*/


export function spawnBlock(blockDatas) {
    controlBlock.innerHTML = ""
    blocks = []
    for (var i = 0; i < blockDatas.length; i++) {
        let block = {
            html: document.createElement("div"),
            data: blockDatas[i]
        }
        block.html.className = "block"
        block.html.innerHTML = blockDatas[i].data
        controlBlock.appendChild(block.html)
        blocks.push(block)
    }
    selected = -1
    updateSelected(0)
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
