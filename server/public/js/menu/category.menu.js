
import { categoryMenu, productsMenu } from "./list.js";
import { request } from "../util/axios.js"
import { playInteract, playVoices } from "../sound/sound.js"


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
    let category = categoryMenu.datas[index].category
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
                let category = categoryMenu.datas[index - 1].category
                productsMenu.start(category)
            }
        }
    }
}


export { categoryMenu }
