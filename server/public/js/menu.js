
import { Menu } from "./menu/menu.js";
import { request } from "./util/axios.js"


const categoryMenu = new Menu()
const productsMenu = new Menu()
const confirmMenu = new Menu()
const receiptMenu = new Menu()


categoryMenu.init = async () => {
    categoryMenu.title = "Category"
    categoryMenu.datas = await request("get", "/api/category/get")
    let str_datas = categoryMenu.dataToString()
    for (var i = 0; i < categoryMenu.datas.length; i++) {
        categoryMenu.blockDatas.push({
            data: str_datas[i],
            voices: [{
                id: `category${i + 1}`,
                text: `category ${i + 1}`
            }, {
                id: `category_${categoryMenu.datas[i]._id}`,
                text: categoryMenu.datas[i].category
            }]
        })
    }
}
categoryMenu.on_select = async (index) => {
    let category = categoryMenu.datas[index].category
    productsMenu.build(category)
}


productsMenu.init = async () => {
    let category = productsMenu.prev_data
    productsMenu.title = `Products in ${category}`
    productsMenu.datas = await request("post", "/api/category/list", { category })
    let str_datas = productsMenu.dataToString()
    for (var i = 0; i < productsMenu.datas.length; i++) {
        productsMenu.blockDatas.push({
            data: str_datas[i],
            voices: [{
                id: `product${i + 1}`,
                text: `product ${i + 1}`
            }, {
                id: `product_${productsMenu.datas[i]._id}`,
                text: productsMenu.datas[i].voiceline
            }]
        })
    }
}
productsMenu.on_select = async (index) => {
    let product = productsMenu.datas[index]
    confirmMenu.build(product)
}
productsMenu.on_return = async () => {
    categoryMenu.back()
}


confirmMenu.init = async () => {
    let product = confirmMenu.prev_data
    confirmMenu.title = `Confirm buying ${product.name} ?`
    confirmMenu.blockDatas = [
        { data: "Buy", voices: [] },
        { data: "Cancel", voices: [] }
    ]
}
confirmMenu.on_select = async (index) => {
    let product = confirmMenu.prev_data
    if (index == 0) {
        receiptMenu.build(product)
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
    receiptMenu.blockDatas = [
        { data: "Return", voices: [] }
    ]
}
receiptMenu.on_select = async (index) => {
    categoryMenu.back()
}
receiptMenu.on_return = async () => {
    categoryMenu.back()
}



export function mainmenu() {
    categoryMenu.build()
}
