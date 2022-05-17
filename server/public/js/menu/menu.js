

import {
    disable_callback,
    disable_keyevent,
    enable_keyevent,
    setReturnCallback,
    setSelectCallback,
    setListenCallback
} from "../view/key.js"

import { spawnBlock, getSelectedIndex, setFocusCallback } from "../view/block.js"

import { playVoices, stopVoices, playInteract } from "../sound/sound.js"

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
        this.block_data = []
        this.voice_data = []
        this.voice_init = null
        this.blacklistFields = ["_id", "voiceline", "date"]
        this.prev_data = null
        this.init = async () => {}  // update block_data and voice_data
        this.on_select = async (index) => { }
        this.on_return = async () => { }
    }

    async start(prev_data) {
        this.reset()
        this.prev_data = prev_data
        this.before_build()
        await this.init()
        this.build()
    }

    async back() {
        this.before_build()
        this.build()
    }

    // Private

    before_build() {
        disable_callback()
        disable_keyevent()
    }

    build() {
        setFocusCallback((index, first) => {
            let voices = []
            if (first && this.voice_init) {
                voices.push(this.voice_init)
            }
            let voice = this.voice_data[index]
            if (voice != null) {
                for (const v of voice) {
                    voices.push(v)
                }
            }
            if (voices.length > 0) {
                playVoices(voices)
            }
        })
        stopVoices()
        spawnBlock(this.block_data)
        setSelectCallback(async () => {
            playInteract()
            await this.on_select(getSelectedIndex())
        })
        setReturnCallback(async () => {
            playInteract()
            await this.on_return()
        })
        setListenCallback(() => {
            playVoices(this.voice_data[getSelectedIndex()])
        })
        titleField.innerHTML = this.title
        enable_keyevent()
    }

    reset() {
        this.title = ""
        this.datas = []
        this.block_data = []
        this.voice_data = []
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

