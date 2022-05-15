
import { Menu } from "./menu/menu.js";
import { request } from "./util/axios.js"


const categoryMenu = new Menu()
const productsMenu = new Menu()
const confirmMenu = new Menu()
const receiptMenu = new Menu()


categoryMenu.init = async () => {
    categoryMenu.datas = await request("get", "/api/category/get")
    let str_datas = categoryMenu.dataToString()
    for (const str of str_datas) {
        categoryMenu.blockDatas.push({
            data: str,
            voices: []
        })
    }
}
categoryMenu.on_select = async (index) => {
    let category = categoryMenu.datas[index].category
    productsMenu.build(category)
}


productsMenu.init = async () => {
    let category = productsMenu.prev_data
    productsMenu.datas = await request("post", "/api/category/list", { category })
    let str_datas = productsMenu.dataToString()
    for (const str of str_datas) {
        productsMenu.blockDatas.push({
            data: str,
            voices: []
        })
    }
}
productsMenu.on_select = async (index) => {
    let product = productsMenu.datas[index]
    confirmMenu.build(product)
}
productsMenu.on_return = async () => {
    categoryMenu.build()
}


confirmMenu.init = async () => {
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
        productsMenu.build(null, false)
    }
}
confirmMenu.on_return = async () => {
    productsMenu.build(null, false)
}


receiptMenu.init = async () => {
    let product = receiptMenu.prev_data
    await request("post", "/api/products/buy", product)
    receiptMenu.blockDatas = [
        { data: "Return", voices: [] }
    ]
}
receiptMenu.on_select = async (index) => {
    categoryMenu.build()
}
receiptMenu.on_return = async () => {
    categoryMenu.build()
}



export function mainmenu() {
    categoryMenu.build()
}
