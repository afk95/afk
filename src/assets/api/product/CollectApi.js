import axios from '@/assets/js/ajax.js'

const api = {
	search: params => axios('postJson', '/shop/collect/collectPage', params), // 查询
	add: params => axios('postJson', '/shop/collect/addCollect', params), // 添加
	cancel: params => axios('post', '/shop/collect/deleteCollect', params), // 删除
}
export default api
