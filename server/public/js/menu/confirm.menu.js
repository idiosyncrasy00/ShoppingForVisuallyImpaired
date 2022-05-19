
import { productsMenu, confirmMenu, receiptMenu } from "./list.js";
import { request } from "../util/axios.js"
import { playInteract } from "../sound/sound.js";


confirmMenu.init = async () => {
    let product = confirmMenu.prev_data
    confirmMenu.title = `Xác nhận mua ${product.name} ?`
    confirmMenu.block_data = [ "Mua", "Hủy" ]
    confirmMenu.voice_data = [
        [{
            id: "confirm_buy",
            text: "lựa chọn 1 . mua"
        }], [{
            id: "confirm_cancel",
            text: "lựa chọn 2 . hủy"
        }]
    ]
    confirmMenu.voice_init = {
        id: `confirm_${product._id}`,
        text: `bạn có muốn mua ${product.name} không`
    }
}

confirmMenu.on_select = async (index) => {
    let product = confirmMenu.prev_data
    if (index == 0) {
        receiptMenu.start(product)
    } else {
        productsMenu.back()
    }
}

confirmMenu.on_return = async () => {
    productsMenu.back()
}

confirmMenu.on_voice = async (voice) => {
    let text = voice.text
    let num = voice.num
    let product = confirmMenu.prev_data
    if (text.includes("quay lại")) {
        // Return
        playInteract()
        productsMenu.back()
    } else if (text.includes("chọn")) {
        // Choose
        let index = parseInt(num, 10)
        if (index == 1) {
            playInteract()
            receiptMenu.start(product)
        } else if (index == 2) {
            playInteract()
            productsMenu.back()
        }
    } else if (text.includes("đồng ý") || text.includes("có") || text.includes("mua")) {
        // Buy
        playInteract()
        receiptMenu.start(product)
    } else if (text.includes("không") || text.includes("hủy")) {
        // Cancel
        playInteract()
        productsMenu.back()
    }
}


export { confirmMenu }
