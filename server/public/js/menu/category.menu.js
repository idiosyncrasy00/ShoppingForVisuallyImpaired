
import { categoryMenu, productsMenu } from "./list.js";
import { request } from "../util/axios.js"


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


export { categoryMenu }
