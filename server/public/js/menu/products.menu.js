
import { categoryMenu, productsMenu, confirmMenu } from "./list.js";
import { request } from "../util/axios.js"
import { playInteract, playVoices, playError } from "../sound/sound.js"
import { getSelectedIndex } from "../view/block.js";


productsMenu.init = async () => {
    let category = productsMenu.prev_data
    productsMenu.title = `Sản phẩm trong ${category.category}`
    productsMenu.datas = await request("post", "/api/category/list", { category: category.category })
    productsMenu.block_data = productsMenu.dataToString()
    for (var i = 0; i < productsMenu.datas.length; i++) {
        productsMenu.voice_data.push([{
            id: `product${i + 1}`,
            text: `sản phẩm ${i + 1}`
        }, {
            id: `product_${productsMenu.datas[i]._id}`,
            text: productsMenu.datas[i].voiceline
        }])
    }
    productsMenu.voice_init = {
        id: `product_init_${category._id}`,
        text: `dưới đây là danh sách sản phẩm trong danh mục ${category.category}`
    }
}

productsMenu.on_select = async (index) => {
    let product = productsMenu.datas[index]
    confirmMenu.start(product)
}

productsMenu.on_return = async () => {
    categoryMenu.back()
}

productsMenu.on_voice = async (voice) => {
    let text = voice.text
    let num = voice.num
    let executed = false
    if (text.includes("quay lại")) {
        // Return
        playInteract()
        categoryMenu.back()
        executed = true
    } else if (text.includes("chọn")) {
        // Choose product
        let index = parseInt(num, 10)
        if (text.includes("đầu") || text.includes("thứ nhất")) {
            index = 1
        } else if (text.includes("cuối")) {
            index = productsMenu.datas.length
        }
        if (index != NaN && index > 0 && index <= productsMenu.datas.length) {
            playInteract()
            let product = productsMenu.datas[index - 1]
            confirmMenu.start(product)
            executed = true
        } else {
            // Select by name
            let query = text.replace("chọn", "").replace("sản phẩm", "").trim()
            for (var i = 0; i < productsMenu.datas.length; i++) {
                let product = productsMenu.datas[i]
                if (product.name.toLowerCase().includes(query)) {
                    executed = true
                    playInteract()
                    confirmMenu.start(product)
                    break
                }
            }
        }
    }
    if (!executed) {
        playError()
        playVoices([{
            id: "voice_error",
            text: "không nhận diện được giọng nói. xin vui lòng thử lại"
        }])
    }
}

productsMenu.on_listen = async () => {
    let category = productsMenu.prev_data
    let voices = [{
        id: `guide_product_${category._id}`,
        text: `bạn đang ở màn hình các sản phẩm trong danh mục ${category.category}. sản phẩm bạn đang lựa chọn là`
    }]
    for (const v of productsMenu.voice_data[getSelectedIndex()]) {
        voices.push(v)
    }
    voices.push({
        id: "guide_product_1",
        text: "ấn phím lên hoặc xuống để di chuyển giữa các sản phẩm. ấn phím đầu tiên để chọn sản phẩm. ấn phím thứ hai để quay lại màn hình các danh mục"
    })
    voices.push({
        id: "guide_34",
        text: "ấn phím thứ ba để nghe hướng dẫn. ấn phím thứ tư để dùng giọng nói"
    })
    playVoices(voices)
}


export { productsMenu }
