import qs from 'qs'
import axios from 'axios'
import {router} from '@/router/router.js'
import {ElMessage} from "element-plus"

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const instance = axios.create({
	baseURL: '/ptshop',
	timeout: 1500000,
	withCredentials: true
})

// req
instance.interceptors.request.use(function (config) {
	config.headers['x-requested-with'] = 'XMLHttpRequest'
	config.headers['auth-token'] = sessionStorage.getItem('token')
	if (config.method === 'get') {
		config.params = {
			_t: Date.parse(new Date()),
			...config.params
		}
	}
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// res
instance.interceptors.response.use(function (response) {
	if (response.data.code === 598) {
		ElMessage({
			message: response.data.message,
			type: 'error',
			duration: '1000'
		})
		sessionStorage.setItem('token', '')
		router.replace({path: '/login'})
		return Promise.reject()
	} else if (response?.data?.code !== 0) {
		if (response?.status === 201) {
			return response
		} else {
			ElMessage({
				message: response.data.message,
				type: 'error',
			})
		}
		return Promise.reject()
	} else {
		return response
	}
}, function (error) {
	ElMessage({
		message: error,
		type: 'error',
	})
	return Promise.reject(error);
});

//
export default function (method, url, data = null, config) {
	method = method.toLowerCase();
	// url = 'http://101.231.162.166:9090/trunk/' + url
	if (method === 'post') {
		return instance.post(url, qs.stringify(data, {indices: false, allowDots: true, arrayFormat: 'indices'}, config))
	} else if (method === 'postalldots') {
		return instance.post(url, qs.stringify(data, {allowDots: true}))
	} else if (method === 'postarray') {
		return instance.post(url, qs.stringify(data, {indices: false}))
	} else if (method === 'postjson') {
		return instance.post(url, data)
	} else if (method === 'get') {
		return instance.get(url, {params: data})
	} else if (method === 'delete') {
		return instance.delete(url, qs.stringify(data, {
			indices: false,
			allowDots: true,
			arrayFormat: 'indices'
		}, config))
	} else if (method === 'put') {
		return instance.put(url, data)
	} else if (method === 'link') {
		// return apiConfig.baseUrl + url;
	} else if (method === 'upload') {
		return instance.post(url, data)
	} else if (method === 'getdownload') {
		return instance.get(url, {responseType: 'blob'})
	} else {
		console.error('未知的method' + method)
		return false
	}
}