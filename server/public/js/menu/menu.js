

import {
    disable_callback,
    disable_keyevent,
    enable_keyevent,
    setReturnCallback,
    setSelectCallback
} from "../view/key.js"

import { spawnBlock, getSelectedIndex } from "../view/block.js"

const titleField = document.getElementById("title")


/*  blockData:
{
    data: "name",
    voices: [
        { id: "123", text: "1244" }
    ]
}
*/


export class Menu {
    constructor() {
        this.title = "Title"
        this.datas = []
        this.blockDatas = []
        this.blacklistFields = ["_id", "voiceline", "date"]
        this.prev_data = null
        this.init = async () => {}  // build datas and blockDatas
        this.on_select = async (index) => { }
        this.on_return = async () => { }
    }

    async build(prev_data) {
        this.reset()
        this.prev_data = prev_data
        disable_callback()
        disable_keyevent()
        await this.init()
        spawnBlock(this.blockDatas)
        setSelectCallback(async () => await this.on_select(getSelectedIndex()))
        setReturnCallback(this.on_return)
        titleField.innerHTML = this.title
        enable_keyevent()
    }

    async back() {
        disable_callback()
        disable_keyevent()
        spawnBlock(this.blockDatas)
        setSelectCallback(async () => await this.on_select(getSelectedIndex()))
        setReturnCallback(this.on_return)
        titleField.innerHTML = this.title
        enable_keyevent()
    }

    // Private

    reset() {
        this.title = ""
        this.datas = []
        this.blockDatas = []
        this.blacklistFields = ["_id", "voiceline", "date"]
        this.prev_data = null
    }

    dataToString() {
        let _str_datas = []
        for (const _data of this.datas) {
            var str = ""
            var value = _.omit(_data, this.blacklistFields)
            for (const key in value) {
                str += `${key}: ${value[key]}<br>`
            }
            _str_datas.push(str)
        }
        return _str_datas
    }
}

