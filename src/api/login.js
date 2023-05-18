import request from '@/utils/request'
import md5 from "js-md5";

export function GetCheck() {
    return request({
        method: 'get',
        url: '/user/getLogincode',
    })
}

export function Login(username, password, verifyCode, check_code) {
    return request({
        method: 'post',
        url: '/user/getLogincode',
        params: {
            username: username,
            password: md5(password),
            input_captcha: md5(verifyCode),
            check_code: check_code
        },
    })
}

export function Users() {
    return request({
        method: 'get',
        url: 'user/get_users'
    })
}

export function Token(token) {
    return request({
        method: 'get',
        url: 'user/token',
        params: {
            token
        }
    })
}
