
import { Menu } from "./menu/menu.js";
import { request } from "./util/axios.js"


const categoryMenu = new Menu()
const productsMenu = new Menu()
const confirmMenu = new Menu()
const receiptMenu = new Menu()


categoryMenu.init = async () => {
    categoryMenu.title = "Category"
    categoryMenu.datas = await request("get", "/api/category/get")
    categoryMenu.block_data = categoryMenu.dataToString()
    for (var i = 0; i < categoryMenu.datas.length; i++) {
        categoryMenu.voice_data.push([{
            id: `category${i + 1}`,
            text: `category ${i + 1}`
        }, {
            id: `category_${categoryMenu.datas[i]._id}`,
            text: categoryMenu.datas[i].category
        }])
    }
    categoryMenu.voice_init = {
        id: "category_init",
        text: "here is the list of categories"
    }
}
categoryMenu.on_select = async (index) => {
    let category = categoryMenu.datas[index].category
    productsMenu.start(category)
}


productsMenu.init = async () => {
    let category = productsMenu.prev_data
    productsMenu.title = `Products in ${category}`
    productsMenu.datas = await request("post", "/api/category/list", { category })
    productsMenu.block_data = productsMenu.dataToString()
    for (var i = 0; i < productsMenu.datas.length; i++) {
        productsMenu.voice_data.push([{
            id: `product${i + 1}`,
            text: `product ${i + 1}`
        }, {
            id: `product_${productsMenu.datas[i]._id}`,
            text: productsMenu.datas[i].voiceline
        }])
    }
    productsMenu.voice_init = {
        id: `product_init_${category}`,
        text: `here is the list of products in ${category}`
    }
}
productsMenu.on_select = async (index) => {
    let product = productsMenu.datas[index]
    confirmMenu.start(product)
}
productsMenu.on_return = async () => {
    categoryMenu.back()
}


confirmMenu.init = async () => {
    let product = confirmMenu.prev_data
    confirmMenu.title = `Confirm buying ${product.name} ?`
    confirmMenu.block_data = [ "Buy", "Cancel" ]
    confirmMenu.voice_data = [
        [{
            id: "confirm_buy",
            text: "option 1 . buy"
        }], [{
            id: "confirm_cancel",
            text: "option 2 . cancel"
        }]
    ]
    confirmMenu.voice_init = {
        id: `confirm_${product._id}`,
        text: `do you want to buy ${product.name}`
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


receiptMenu.init = async () => {
    let product = receiptMenu.prev_data
    await request("post", "/api/products/buy", product)
    receiptMenu.title = `${product.name} bought !`
    receiptMenu.block_data = [ "Return" ]
    receiptMenu.voice_init = {
        id: `receipt_${product._id}`,
        text: `thank you for buying ${product.name}`
    }
}
receiptMenu.on_select = async (index) => {
    categoryMenu.back()
}
receiptMenu.on_return = async () => {
    categoryMenu.back()
}



export function mainmenu() {
    categoryMenu.start()
}
