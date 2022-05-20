
import {
    disable_callback,
    disable_keyevent,
    enable_keyevent,
    setReturnCallback,
    setSelectCallback,
    setListenCallback,
    setVoiceCallback,
    start_record_mode
} from "../../view/key.js"
import { spawnBlock, getSelectedIndex, setFocusCallback } from "../../view/block.js"
import { playVoices, stopVoices, playInteract } from "../../sound/sound.js"
import { startRecord, stopRecord } from "../../sound/record.js";
import { speech_to_text } from "../../util/socket.js";
import { overlay_show_result, overlay_start } from "../../view/overlay.js";

const titleField = document.getElementById("title")


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
        this.on_select = async (index) => {}
        this.on_return = async () => {}
        this.on_voice = async (voice) => {}
        this.on_listen = async () => {}
        this.is_recording = false
        this.is_introduction = true
        this.voice_introduction = null
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
            if (first) {
                if (this.is_introduction) {
                    this.is_introduction = false
                    if (this.voice_introduction) {
                        voices.push(this.voice_introduction)
                    }
                }
                if (this.voice_init) {
                    voices.push(this.voice_init)
                }
                for (const voice of this.voice_data) {
                    for (const v of voice) {
                        voices.push(v)
                    }
                }
            } else {
                let voice = this.voice_data[index]
                if (voice != null) {
                    for (const v of voice) {
                        voices.push(v)
                    }
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
        setListenCallback(async () => {
            playInteract()
            await this.on_listen()
        })
        setVoiceCallback(async () => {
            if (!this.is_recording) {
                await this.startRecord()
            } else {
                await this.stopRecord()
            }
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

    async startRecord() {
        this.is_recording = true
        playInteract()
        start_record_mode()
        playVoices([{
            id: "voice_command",
            text: "hãy nói sau tiếng bíp"
        }], () => {
            playInteract()
            overlay_start()
            startRecord()
            setTimeout(async () => {
                if (this.is_recording) {
                    await this.stopRecord()
                }
            }, 5000)
        })
    }

    async stopRecord() {
        this.is_recording = false
        playInteract()
        enable_keyevent()
        playVoices([{
            id: "voice_execute",
            text: "đang xử lý tiếng nói"
        }])
        let blob = await stopRecord()
        let voice = await speech_to_text(blob)
        if (!voice) {
            voice = {
                text: "",
                num: ""
            }
        }
        console.log(voice)
        overlay_show_result(voice.text)
        // Pre Handle voice
        let text = voice.text
        if (text.includes("chương trình gì")) {
            playInteract()
            playVoices([this.getIntroduction()])
        } else if (text.includes("hướng dẫn")) {
            playInteract()
            await this.on_listen()
        } else {
            await this.on_voice(voice)
        }
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

    productToString() {
        let _str_datas = []
        for (var i = 0; i < this.datas.length; i++) {
            let _data = this.datas[i]
            let str = `<b>Sản phẩm ${i + 1}:</b><br>`
            str +=`Tên sản phẩm: ${_data.name}<br>`
            str += `Danh mục: ${_data.category}<br>`
            str += `Chi tiết: ${_data.description}<br>`
            str += `Giá: ${_data.price} vnd`
            _str_datas.push(str)
        }
        return _str_datas
    }

    categoryToString() {
        let _str_datas = []
        for (var i = 0; i < this.datas.length; i++) {
            _str_datas.push(`<b>Danh mục ${i + 1}:</b> ${this.datas[i].category}`)
        }
        return _str_datas
    }

    getIntroduction() {
        return {
            id: "voice_introduction",
            text: "chào mừng bạn đến với chương trình mua hàng cho người khiếm thị. bạn có thể sử dụng bàn phím hoặc giọng nói để mua hàng. dưới đây là hướng dẫn sử dụng các phím. sử dụng hai nút lên xuống để di chuyển giữa các ô. nút thứ nhất dùng để lựa chọn. nút thứ hai dùng để quay lại. nút thứ ba dùng để nghe hướng dẫn. nút thứ tư dùng để bắt đầu giọng nói."
        }
    }
}

