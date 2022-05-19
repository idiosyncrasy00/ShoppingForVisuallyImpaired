
const socket = io()


export async function generate_audio(id, text) {
    return await new Promise(res => {
        socket.emit("speak", id, text, (_filename) => {
            res(_filename)
        })
    })
}


export async function speech_to_text(blob) {
    return await new Promise(res => {
        socket.emit("stt", blob, (result) => {
            console.log(result)
            res(result)
        })
    })
}

