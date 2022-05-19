
import { categoryMenu, receiptMenu } from "./list.js";
import { request } from "../util/axios.js"
import { playInteract } from "../sound/sound.js";


receiptMenu.init = async () => {
    let product = receiptMenu.prev_data
    await request("post", "/api/products/buy", product)
    receiptMenu.title = `Mua thành công ${product.name} !`
    receiptMenu.block_data = [ "Quay lại" ]
    receiptMenu.voice_init = {
        id: `receipt_${product._id}`,
        text: `mua thành công ${product.name}`
    }
}

receiptMenu.on_select = async (index) => {
    categoryMenu.back()
}

receiptMenu.on_return = async () => {
    categoryMenu.back()
}

receiptMenu.on_voice = async (voice) => {
    let text = voice.text
    if (text.includes("quay lại")) {
        // Return main menu
        playInteract()
        categoryMenu.back()
    }
}


export { receiptMenu }
