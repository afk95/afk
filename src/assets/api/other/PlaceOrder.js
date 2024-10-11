import axios from '../../js/ajax.js'


// 付款方式
export function getMemPay(params) {
    return axios('get', '/shop/member/getMemPay', params)
}

// 提交订单
export function saveOrder(params) {
    return axios('postjson', '/shop/order/save', params)
}


