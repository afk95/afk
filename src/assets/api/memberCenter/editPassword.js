import axios from '../../js/ajax.js'

// 修改密码
export function updatePasswd(params) {
    return axios('post', '/shop/member/updatePasswd', params)
}