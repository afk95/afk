import axios from '../../js/ajax.js'


// 首页产品推荐
export function listAdd(params) {
    return axios('postjson', '/shop/cart/listAdd', params)
}

// 快速下单上传
export function excelAdd(params) {
    return axios('upload', '/shop/cart/excelAdd', params)
}

// 快速下单下载模板
export function downloadExcel(params) {
    return axios('getdownload', '/shop/cart/downloadExcel')
}


