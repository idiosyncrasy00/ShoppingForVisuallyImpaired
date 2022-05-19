
import { productsMenu, confirmMenu, receiptMenu } from "./list.js";
import { request } from "../util/axios.js"


confirmMenu.init = async () => {
    let product = confirmMenu.prev_data
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


export { confirmMenu }
