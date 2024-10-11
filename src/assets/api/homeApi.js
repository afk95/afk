import axios from '../js/ajax.js'


// 首页产品推荐
export function prolist(params) {
    return axios('post', '/apis/shop/shopPro/prolist', params)
}

// 首页产品推荐
export function promoteList(params) {
    return axios('post', '/apis/shop/shopPro/promoteList', params)
}

// 首页公告、广告
export function validList(params) {
    return axios('post', '/apis/shop/shopNoticeAd/validList', params)
}

// 首页产品资料分页数据
export function manualSearch(params) {
    return axios('postjson', '/apis/shop/shopPro/manualSearch', params)
}

// 帮助中心
export function helpList(params) {
    return axios('postjson', '/help/apis/list', params)
}


