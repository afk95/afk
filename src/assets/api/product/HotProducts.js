import axios from '@/assets/js/ajax.js'

// 获取相关分类数据
export function getFindByParent(params) {
    return axios('get', '/apis/hotMenu/category/findByParent', params)
}

// 获取产品品牌名称数据
export function getAllProdAndCount(params) {
    return axios('get','/apis/hotMenu/prod/getAllProdAndCount',params)
}
// 获取技术类型数据
export function getAllAttrAndCount(params) {
    return axios('get','/apis/hotMenu/prod/getAllAttrAndCount',params)
}
// 获取型号兼容数据
export function getAllModelAndCount(params) {
    return axios('get','/apis/hotMenu/prod/getAllModelAndCount',params)
}

// 获取体积容量数据
export function getAllCapacityAndCount(params) {
    return axios('get','/apis/hotMenu/prod/getAllCapacityAndCount',params)
}

// 获取商品数据
export function getSearch(params) {
    return axios('postjson','/apis/shop/shopPro/search',params)
}

// 获取添加数据
export function getDetails(params) {
    return axios('post','/shop/shopSku/details',params)
}


