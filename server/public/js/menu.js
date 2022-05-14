
import { show_data, setDataSelected } from "./view/control.js"
import {
    enable_keyevent, 
    disable_keyevent, 
    disable_callback,
    setReturnCallback
} from "./view/key.js"
import { show_result } from "./view/block.js"
import { request } from "./axios.js"


var products_list = []

export async function show_products_list(retrieveCallback) {
    disable_callback()
    disable_keyevent()
    var datas = products_list
    if (retrieveCallback != null) {
        datas = await retrieveCallback()
        products_list = datas
    }
    // catch error
    show_data(datas)
    setDataSelected(async (index, value) => {
        await show_selected_product(value)
    })
    setReturnCallback(async () => {
        await show_category()
    })
    enable_keyevent()
}


// ------------


export async function show_category() {
    disable_callback()
    disable_keyevent()
    var datas = await request("get", "/api/category/get")
    // catch error
    show_data(datas)
    setDataSelected(async (index, value) => {
        await show_products_in_category(value.category)
    })
    enable_keyevent()
}


export async function show_products_in_category(category) {
    await show_products_list(async () => {
        return await request("post", "/api/category/list", { category })
    })
}


export async function show_selected_product(product) {
    disable_callback()
    disable_keyevent()
    show_data(["Buy", "Return"], false)
    setDataSelected(async (index, value) => {
        if (index == 0) {
            await request("post", "/api/products/buy", product)
            // catch error
            await show_success_menu(product)
        } else {
            await show_products_list()
        }
    })
    setReturnCallback(async () => {
        await show_products_list()
    })
    enable_keyevent()
}


export async function show_success_menu(product) {
    disable_callback()
    disable_keyevent()
    show_data(["Return"], false)
    show_result(`Buy "${product.name}" successfully`)
    setDataSelected(async (index, value) => {
        products_list = []
        await show_category()
    })
    setReturnCallback(async () => {
        products_list = []
        await show_category()
    })
    enable_keyevent()
}


