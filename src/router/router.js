import { createRouter, createWebHistory } from "vue-router"
import memberCenter from "@/router/modules/memberCenter"

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/Login',
        },
        {
            path: '/login',
            name: 'Login', // 登录页
            component: () => import('../pages/login/Login.vue')
        },
        {
            path: '/register',
            name: 'Register', // 注册页
            component: () => import('../pages/login/Register.vue')
        },
        {
            path: '/forgetPassword',
            name: 'ForgetPassword', // 忘记密码
            component: () => import('../pages/login/forgetPassword.vue')
        },
        {
            path: '/center',
            name: 'center', // 首页
            component: () => import('../pages/Center.vue')
        },
        {
            path: '/testDom',
            name: 'testDom', // 测试
            component: () => import('../pages/testDom.vue')
        },
        ...memberCenter,
        {
            path: '/:catchAll(.*)',
            name: 'Error',
            redirect: '/',
        }
    ]
})

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//     next()
// })