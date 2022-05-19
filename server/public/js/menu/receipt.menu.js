
import { categoryMenu, receiptMenu } from "./list.js";
import { request } from "../util/axios.js"
import { playInteract, playVoices } from "../sound/sound.js";


receiptMenu.init = async () => {
    let product = receiptMenu.prev_data
    await request("post", "/api/products/buy", product)
    receiptMenu.title = `Mua thành công ${product.name} !`
    receiptMenu.block_data = [ "Quay lại" ]
    receiptMenu.voice_init = {
        id: `receipt_${product._id}`,
        text: `bạn đã mua thành công ${product.name}. ấn phím thứ nhất hoặc thứ hai để quay về màn hình chính`
    }
}

receiptMenu.on_select = async (index) => {
    categoryMenu.back()
}

receiptMenu.on_return = async () => {
    categoryMenu.back()
}

receiptMenu.on_voice = async (voice) => {
    playInteract()
    categoryMenu.back()
}

receiptMenu.on_listen = async () => {
    let voices = [{
        id: "guide_receipt_1",
        text: "bạn đã mua thành công. ấn phím đầu tiên hoặc phím thứ hai để quay lại màn hình chính"
    }]
    voices.push({
        id: "guide_34",
        text: "ấn phím thứ ba để nghe hướng dẫn. ấn phím thứ tư để dùng giọng nói"
    })
    playVoices(voices)
}


export { receiptMenu }
