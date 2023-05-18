import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    let num = 1
    let time= new Date(new Date().getTime() + num * 60 * 60 * 1000)
    return Cookies.set(TokenKey, token,{
        expires: time
    })
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
