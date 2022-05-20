
const tts = require("../utils/tts")


const speak = async (req, res) => {
    if (req.body.text) {
        res.send()
        await tts.speak(req.body.text)
    } else {
        res.status(400).send()
    }
}


module.exports = { speak }
