import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router/router.js'
import {createPinia} from 'pinia'
// 公用CSS
import '@/assets/css/init.min.css';
// ele
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn';  //国际化日历引用（zh-cn）
import Header from '@/components/Header.vue'	// 头部组件
import SiteNav from '@/components/SiteNav.vue'	// 面包屑组件
import Footer from '@/components/Footer.vue'	// 底部组件
import Pagination from '@/components/Pagination.vue'	// 分页组件

import {createI18n} from 'vue-i18n'
import zh from '@/assets/language/zh.js'
import zh_product from '@/assets/language/zh/product.js'
import en from '@/assets/language/en.js'
import en_product from '@/assets/language/en/product.js'

const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: 'zh', // zh en
	messages: {
		zh: {
			...zh,
			...zh_product,
		},
		en: {
			...en,
			...en_product,
		}
	}
})

// 实例化
const app = createApp(App)
	.use(router)
	.use(createPinia())
	.use(i18n)
	.use(ElementPlus, {locale: zhCn})
	.component('Header', Header)
	.component('SiteNav', SiteNav)
	.component('Footer', Footer)
	.component('Pagination', Pagination)

// 挂载实例
app.mount('#app')