
const socket = io()


export async function generate_audio(id, text) {
    return await new Promise(res => {
        socket.emit("speak", id, text, (_filename) => {
            res(_filename)
        })
    })
}

