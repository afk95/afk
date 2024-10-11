import axios from '../../js/ajax.js'

// 获取用户信息
export function getUserInfo(params) {
    return axios('get', '/shop/member/memInfo', params)
}

// 上传头像
export function editPic(params) {
    return axios('post','/shop/member/editPic',params)
}