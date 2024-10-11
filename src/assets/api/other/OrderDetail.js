import axios from '../../js/ajax.js'


// 获取详情信息
export function getInfo(params) {
    return axios('get', '/shop/order/info', params)
}

// 添加支付凭证
export function savePay(params) {
    return axios('postjson', '/shop/order/savePay', params)
}
// 上传照片
export function openUpload(params) {
	return axios('upload', '/common/file/openupload', params)
}
// 确认收货
export function receiving(params) {
	return axios('get', '/shop/order/receiving', params)
}
// 申请退货
export function cancelSave(params) {
	return axios('postjson', '/shop/order/cancel/save', params)
}
