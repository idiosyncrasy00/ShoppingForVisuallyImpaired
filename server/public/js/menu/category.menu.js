
import { categoryMenu, productsMenu } from "./list.js";
import { request } from "../util/axios.js"
import { playInteract, playVoices } from "../sound/sound.js"
import { getSelectedIndex } from "../view/block.js";


categoryMenu.init = async () => {
    categoryMenu.title = "Danh mục"
    categoryMenu.datas = await request("get", "/api/category/get")
    categoryMenu.block_data = categoryMenu.dataToString()
    for (var i = 0; i < categoryMenu.datas.length; i++) {
        categoryMenu.voice_data.push([{
            id: `category${i + 1}`,
            text: `danh mục ${i + 1}`
        }, {
            id: `category_${categoryMenu.datas[i]._id}`,
            text: categoryMenu.datas[i].category
        }])
    }
    categoryMenu.voice_init = {
        id: "category_init",
        text: "dưới đây là danh sách các danh mục sản phẩm"
    }
}

categoryMenu.on_select = async (index) => {
    let category = categoryMenu.datas[index]
    productsMenu.start(category)
}

categoryMenu.on_voice = async (voice) => {
    let text = voice.text
    let num = voice.num
    if (text.includes("chọn")) {
        // Choose category
        let index = parseInt(num, 10)
        if (text.includes("đầu") || text.includes("nhất")) {
            index = 1
        } else if (text.includes("cuối")) {
            index = categoryMenu.datas.length
        }
        if (index != NaN) {
            if (index > 0 && index <= categoryMenu.datas.length) {
                playInteract()
                let category = categoryMenu.datas[index - 1]
                productsMenu.start(category)
            }
        }
    }
}

categoryMenu.on_listen = async () => {
    let voices = [{
        id: "guide_category_1",
        text: "bạn đang ở màn hình danh mục. danh mục bạn đang lựa chọn là"
    }]
    for (const v of categoryMenu.voice_data[getSelectedIndex()]) {
        voices.push(v)
    }
    voices.push({
        id: "guide_category_2",
        text: "ấn phím lên hoặc xuống để di chuyển giữa các danh mục. ấn phím đầu tiên để chọn danh mục."
    })
    voices.push({
        id: "guide_34",
        text: "ấn phím thứ ba để nghe hướng dẫn. ấn phím thứ tư để dùng giọng nói"
    })
    playVoices(voices)
}


export { categoryMenu }
