
var mediaRecorder = null


export function startRecord() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                let audiContext = new window.AudioContext()
                let input = audiContext.createMediaStreamSource(stream)
                mediaRecorder = new Recorder(input, { numChannels: 1 })
                mediaRecorder.record()
            })
            .catch(err => {
                console.log(err)
                mediaRecorder = null
            })
    } else {
        console.log("getMedia not supported")
    }
}


export async function stopRecord() {
    return await new Promise(res => {
        mediaRecorder.stop()
        mediaRecorder.exportWAV((blob) => res(blob))
    })
}
