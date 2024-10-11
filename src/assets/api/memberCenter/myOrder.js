import axios from '../../js/ajax.js'

// 获取订单列表
export function findpage(params) {
    return axios('postjson', '/shop/order/findPage', params)
}
