

export function request(method, url, data, headers) {
    return new Promise((res, rej) => {
        axios({
            method, url, data, headers
        })
            .then(rep => res(rep.data))
            .catch(err => rej(err))
    })
}
