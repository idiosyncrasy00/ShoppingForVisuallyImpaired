
import { show_data, setDataSelected } from "./view/control.js"
import { enable_keyevent } from "./view/key.js"
import { request } from "./axios.js"


window.onload = async () => {
    var datas = await request("get", "/api/products/get")
    show_data(datas)
    setDataSelected((index, data) => {
        console.log(`Index: ${index}`)
        console.log(data)
    })
    enable_keyevent()
}
