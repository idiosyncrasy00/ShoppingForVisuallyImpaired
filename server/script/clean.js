const fs = require("fs");


const ttsPath = "./public/tts/";


const files = fs.readdirSync(ttsPath)
var count = 0

files.forEach(file => {
    if (file.endsWith(".wav")) {
        console.log(`Deleting ${ttsPath + file}`)
        fs.unlinkSync(ttsPath + file)
        count += 1
    }
})

console.log("--------------")
console.log(`${count} files deleted`)
