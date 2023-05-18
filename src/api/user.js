import request from '@/utils/request'
import md5 from "js-md5";

export function Login(username, password, verifyCode, check_code) {
    return request({
        method: 'get',
        url: '/user/login',
        params: {
            username: username,
            password: md5(password),
            input_captcha: md5(verifyCode),
            check_code: check_code
        },
    })
}
export function deleteUser(id) {
    return request({
        method: 'get',
        url: '/user/delete',
        params: {
            id,
        },
    })
}
export function editPwd(id, password) {
    return request({
        method: 'post',
        url: '/user/edit_pwd',
        params: {
            id,
            edit_pwd: md5(password),
        },
    })
}
export function addUser(form){
    return request({
        method:'post',
        url:'/user/add_user',
        params:{
            username:form.username,
            factname:form.factname,
            phone_number:form.phone_number,
            password:md5(form.password),
            user_type:form.user_type,
            descripe:form.descripe,
        }
    })
}

