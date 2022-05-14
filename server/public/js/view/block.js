
const controlBlock = document.getElementById("controlBlock")
const resultField = document.getElementById("result")

var blocks = []
var numBlock = 0
var selected = -1


function updateSelected(value) {
    if (selected != -1) {
        blocks[selected].className = "block"
    }
    blocks[value].className = "selected"
    blocks[value].scrollIntoView({
        block: "center",
        behavior: "smooth"
    })
    selected = value
}


export function spawnBlock(number, datas=[]) {
    numBlock = number
    var numData = datas.length
    controlBlock.innerHTML = ""
    resultField.style.display = "none"
    blocks = []
    selected = 0
    for (var i = 0; i < numBlock; i++) {
        var block = document.createElement("div")
        block.className = "block"
        if (i < numData) {
            block.innerHTML = `${datas[i]}`
        }
        controlBlock.appendChild(block)
        blocks.push(block)
    }
    updateSelected(0)
}


export function show_result(result) {
    resultField.style.display = "block"
    resultField.innerHTML = result
}


export function up() {
    if (selected > 0) {
        updateSelected(selected - 1)
    }
}


export function down() {
    if (selected < numBlock - 1) {
        updateSelected(selected + 1)
    }
}


export function select() {
    return selected
}
