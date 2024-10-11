import {defineStore} from "pinia"

// 创建一个新的 store 实例
export const useStore = defineStore('main', {
	state: () => {
		return {
			product_categoryId: '',
		}
	},
	getters: {},
	actions: {},
})