import axios from 'axios'

export function baseFun(requestUrl, code) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_BASE_URL}/${requestUrl}/${code}`,
            responseType: 'stream'
        })
            .then((res) => {
                console.log(res);
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            });
    })

}
