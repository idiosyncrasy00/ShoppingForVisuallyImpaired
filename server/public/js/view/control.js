import { spawnBlock } from "./block.js";
import { setSelectCallback } from "./key.js";


var datas = []


export function show_data(_datas, json=true) {
    datas = _datas
    var str_datas = _datas
    // Handle json type
    if (json) {
        str_datas = []
        for (const data of datas) {
            var str = ""
            var value = _.omit(data, ["_id", "voiceline", "date"])
            for (const key in value) {
                str += `${key}: ${value[key]}<br>`
            }
            str_datas.push(str)
        }
    }
    spawnBlock(datas.length, str_datas)
}


export function setDataSelected(callback) {
    setSelectCallback(index => {
        callback(index, datas[index])
    })
}
