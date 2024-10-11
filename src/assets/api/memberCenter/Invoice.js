import axios from '../../js/ajax.js'

// 获取发票信息数据
export function getInvoice(params) {
    return axios('get', '/shop/invoice/findAll', params)
}
// 添加发票信息数据
export function addInvoice(params) {
    return axios('postjson', '/shop/invoice/save', params)
}
// 删除发票信息数据
export function delInvoice(params) {
    return axios('post', '/shop/invoice/cancel', params)
}
// 设置发票信息默认抬头
export function setInvoice(params) {
    return axios('post', '/shop/invoice/setDefault', params)
}