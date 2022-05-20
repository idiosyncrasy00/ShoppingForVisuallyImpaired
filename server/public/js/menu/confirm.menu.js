
import { productsMenu, confirmMenu, receiptMenu, categoryMenu } from "./list.js";
import { request } from "../util/axios.js"
import { playInteract, playVoices, playError } from "../sound/sound.js";
import { getSelectedIndex } from "../view/block.js";


confirmMenu.init = async () => {
    let { product, menu } = confirmMenu.prev_data
    confirmMenu.lastmenu = menu
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
    let { product } = confirmMenu.prev_data
    if (index == 0) {
        receiptMenu.start(product)
    } else {
        if (confirmMenu.lastmenu) {
            confirmMenu.lastmenu.back()
        } else {
            categoryMenu.back()
        }
    }
}

confirmMenu.on_return = async () => {
    if (confirmMenu.lastmenu) {
        confirmMenu.lastmenu.back()
    } else {
        categoryMenu.back()
    }
}

confirmMenu.on_voice = async (voice) => {
    let executed = false
    let text = voice.text
    let num = voice.num
    let { product } = confirmMenu.prev_data
    if (text.includes("quay lại")) {
        // Return
        playInteract()
        if (confirmMenu.lastmenu) {
            confirmMenu.lastmenu.back()
        } else {
            categoryMenu.back()
        }
        executed = true
    } else if (text.includes("chọn")) {
        // Choose
        let index = parseInt(num, 10)
        if (index == 1) {
            playInteract()
            receiptMenu.start(product)
            executed = true
        } else if (index == 2) {
            playInteract()
            if (confirmMenu.lastmenu) {
                confirmMenu.lastmenu.back()
            } else {
                categoryMenu.back()
            }
            executed = true
        }
    } else if (text.includes("đồng ý") || text.includes("có") || text.includes("mua")) {
        // Buy
        playInteract()
        receiptMenu.start(product)
        executed = true
    } else if (text.includes("không") || text.includes("hủy")) {
        // Cancel
        playInteract()
        if (confirmMenu.lastmenu) {
            confirmMenu.lastmenu.back()
        } else {
            categoryMenu.back()
        }
        executed = true
    }
    if (!executed) {
        playError()
        playVoices([{
            id: "voice_error",
            text: "không nhận diện được giọng nói. xin vui lòng thử lại"
        }])
    }
}

confirmMenu.on_listen = async () => {
    let { product } = confirmMenu.prev_data
    let voices = [{
        id: `guide_confirm_${product._id}`,
        text: `bạn đang ở màn hình xác nhận mua sản phẩm ${product.name}. tùy chọn bạn đang lựa chọn là`
    }]
    for (const v of confirmMenu.voice_data[getSelectedIndex()]) {
        voices.push(v)
    }
    voices.push({
        id: "guide_confirm_1",
        text: "ấn phím lên hoặc xuống để di chuyển giữa các tùy chọn mua hoặc hủy. ấn phím đầu tiên để chọn tùy chọn. ấn phím thứ hai để quay lại màn hình các sản phẩm"
    })
    voices.push({
        id: "guide_34",
        text: "ấn phím thứ ba để nghe hướng dẫn. ấn phím thứ tư để dùng giọng nói"
    })
    playVoices(voices)
}


export { confirmMenu }
