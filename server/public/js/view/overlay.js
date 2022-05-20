
const overlay = document.getElementById("overlay")
const textOverlay = document.getElementById("textOverlay")


export function overlay_start() {
    overlay.style.display = "block"
    textOverlay.style.display = "block"
    textOverlay.innerHTML = "..."
}


export function overlay_show_result(text) {
    textOverlay.innerHTML = text
    setTimeout(overlay_hide, 700)
}


export function overlay_hide() {
    overlay.style.display = "none"
    textOverlay.style.display = "none"
}
