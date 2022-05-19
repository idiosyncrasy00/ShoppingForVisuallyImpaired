
document.onkeydown = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            window.location.href = "shopping.html"
        })
}
