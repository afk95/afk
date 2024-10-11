import axios from '../js/ajax.js'


const api = {
	checkLoginName: params => axios('get','/apis/member/checkLoginName', params),		// 注册校验
	register: params => axios('postjson','/apis/member/register', params),				// 注册
	findByPid: params => axios('get','/apis/area/findByPid', params),					// 获取省市
	shoplogin: params => axios('postjson','/shoplogin', params),						// 登录
	getCode: params => axios('get','/apis/member/email/code', params),					// 获取验证码
	resetPass: params => axios('post','/apis/member/resetPass', params)					// 提交
	
}
export default api
