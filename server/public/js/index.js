
import { show_category } from "./menu.js";
import { playTTS } from "./sound.js";


window.onload = async () => {
    await show_category()
}


document.getElementById("button").onclick = async () => {
    await playTTS("tellme", "this is surely the power of god")
}
