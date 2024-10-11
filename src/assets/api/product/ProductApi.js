import axios from '@/assets/js/ajax.js'

const api = {
    search: params => axios('postJson', '/apis/shop/shopPro/search', params), // 商品搜索分页
    getDetail: params => axios('post', '/shop/shopSku/details', params), // 商品详情
    searchSku: params => axios('postJson', '/shop/shopSku/searchSku', params), // 根据货号搜索商品
    findCategory: params => axios('post', '/apis/shop/shopPro/findCategoryByParentById', params), // 根据产品分类搜索父级分类
}
export default api
