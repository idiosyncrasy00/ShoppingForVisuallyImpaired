
import { request } from "../util/axios.js";
import { categoryMenu, confirmMenu, searchMenu } from "./list.js";
import { generate_id } from "../util/id.js";
import { getSelectedIndex } from "../view/block.js";
import { playVoices, playInteract } from "../sound/sound.js";


searchMenu.init = async () => {
    let query = searchMenu.prev_data
    searchMenu.datas = await request("post", "/api/products/query", { query })
    // Found some products
    if (searchMenu.datas.length > 0) {
        searchMenu.found = true
        searchMenu.title = `Tìm kiếm sản phẩm "${query}"`
        searchMenu.block_data = searchMenu.productToString()
        for (var i = 0; i < searchMenu.datas.length; i++) {
            searchMenu.voice_data.push([{
                id: `product${i + 1}`,
                text: `sản phẩm ${i + 1}`
            }, {
                id: `product_${searchMenu.datas[i]._id}`,
                text: searchMenu.datas[i].voiceline
            }])
        }
        searchMenu.voice_init = {
            id: `search_${generate_id(10)}`,
            text: `đã tìm được ${searchMenu.datas.length} sản phẩm với tên ${query}`
        }
    } else {
        // No product found
        searchMenu.found = false
        searchMenu.title = `Không tìm thấy sản phẩm với tên "${query}"`
        searchMenu.block_data = ["Quay lại"]
        searchMenu.voice_data = [[{
            id: "voice_return",
            text: "quay lại"
        }]]
        searchMenu.voice_init = {
            id: `search_error_${generate_id(10)}`,
            text: `xin lỗi, không tìm thấy sản phẩm nào với tên ${query}. xin vui lòng ấn phím thứ nhất hoặc phím thứ hai để quay lại`
        }
    }
}

searchMenu.on_select = async (index) => {
    if (searchMenu.found) {
        let product = searchMenu.datas[index]
        confirmMenu.start({ product, menu: searchMenu })
    } else {
        categoryMenu.back()
    }
}

searchMenu.on_return = async () => {
    categoryMenu.back()
}

searchMenu.on_voice = async (voice) => {
    if (searchMenu.found) {
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
                index = searchMenu.datas.length
            }
            if (index != NaN && index > 0 && index <= searchMenu.datas.length) {
                playInteract()
                let product = searchMenu.datas[index - 1]
                confirmMenu.start({ product, menu: searchMenu })
                executed = true
            } else {
                // Select by name
                let query = text.replace("chọn", "").replace("sản phẩm", "").trim()
                for (var i = 0; i < searchMenu.datas.length; i++) {
                    let product = searchMenu.datas[i]
                    if (product.name.toLowerCase().includes(query)) {
                        executed = true
                        playInteract()
                        confirmMenu.start({ product, menu: searchMenu })
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
    } else {
        playInteract()
        categoryMenu.back()
    }
}

searchMenu.on_listen = async () => {
    if (searchMenu.found) {
        let query = searchMenu.prev_data
        let voices = [{
            id: `guide_search_${generate_id(10)}`,
            text: `bạn đang ở màn hình tìm kiếm các sản phẩm với tên ${query}. sản phẩm bạn đang lựa chọn là`
        }]
        for (const v of searchMenu.voice_data[getSelectedIndex()]) {
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
        voices.push({
            id: "guide_choose",
            text: "các lựa chọn bạn có thể chọn là"
        })
        for (const voice of searchMenu.voice_data) {
            for (const v of voice) {
                voices.push(v)
            }
        }
        playVoices(voices)
    } else {
        let query = searchMenu.prev_data
        let voices = [{
            id: `guide_search_${generate_id(10)}`,
            text: `không tìm được sản phẩm nào với tên ${query}. xin vui lòng ấn phím thứ nhất hoặc phím thứ hai để quay lại màn hình các danh mục`
        }]
        playVoices(voices)
    }
}


export { searchMenu }
