import axios from '../../js/ajax.js'

// 获取收货地址数据
export function getReceiving(params) {
    return axios('get', '/shop/address/findAll', params)
}
// 添加收货地址数据
export function addReceiving(params) {
    return axios('postjson', '/shop/address/save', params)
}
// 删除收货地址数据
export function delReceiving(params) {
    return axios('post', '/shop/address/cancel', params)
}