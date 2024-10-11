import axios from '../../js/ajax.js'

// 获取收货地址数据
export function getAddress(params) {
    return axios('get', '/shop/address/findAll', params)
}
// 添加收货地址数据
export function addAddress(params) {
    return axios('postjson', '/shop/address/save', params)
}
// 删除收货地址数据
export function delAddress(params) {
    return axios('post', '/shop/address/cancel', params)
}
// 删除收货地址数据
export function setAddress(params) {
    return axios('post', '/shop/address/setDefault', params)
}