import axios from '@/assets/js/ajax.js'

const api = {
    search: params => axios('postJson', '/shop/cart/cartList', params), // 查询
    add: params => axios('postJson', '/shop/cart/addCart', params), // 添加
    del: params => axios('post', '/shop/cart/deleteCollect', params), // 删除
    update: params => axios('postJson', '/shop/cart/updateCart', params), // 更新
    addAsideNum: params => axios('post', '/shop/shopSku/addAsideNum', params), // 商品单品添加预留单号
}
export default api
