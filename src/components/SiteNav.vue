<template>
    <div class="siteNavWarp" v-if="isShow">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">{{$t('home_home')}}</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in menu" :to="{path: item?.link}">
                <span @click="navSelect(item?.pid,index)">{{ item?.name }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
import {nextTick, onMounted, reactive, toRefs, watch} from 'vue'
import {useRouter} from "vue-router";
import {useStore} from "@/store/store";
import ProductApi from "@/assets/api/product/ProductApi";
import bus from '@/assets/js/bus.js'
import {useI18n} from 'vue-i18n'
export default {
    name: 'SiteNav',
    setup(props, ctx) {
        const store = useStore()
        const router = useRouter()
        const i18n = useI18n();
        const state = reactive({
            menuList: [],
            menu: [], // 面包屑菜单
            isShow: false, // 是否显示
            i18nValue: false
        })

        onMounted(() => {
            getMenuList();
            bus.on('nav',(e) => {
                state.menu.push(e)
                state.menu = [...new Set(state.menu)]
            })
        })

        const getMenuList = () => {
            state.i18nValue = sessionStorage.getItem('i18n') === 'en'
            console.log(state.i18nValue,'i18n')
            state.menuList = [
                {link: '/login', name: state.i18nValue ? 'login' : '登录'},
                {link: '/register', name: state.i18nValue ? 'register' : '注册'},
                {link: '/forgetPassword', name: state.i18nValue ? 'Forget password' : '忘记密码'},
                {link: '/productInfo', name: state.i18nValue ? 'Product download' : '产品资料下载'},
                {link: '/collectList', name: state.i18nValue ? 'CollectList' : '我的收藏'},
                {link: '/helpCenter', name: state.i18nValue ? 'HelpCenter' : '帮助中心'},
                {link: '/cartList', name: state.i18nValue ? 'Cart' : '购物车'},
                {link: '/placeOrder', name: state.i18nValue ? 'place order' : '提交订单'},
                {link: '/orderDetail', name: state.i18nValue ? 'Order details' : '订单详情'},
                {link: '/memberCenter', name: state.i18nValue ? 'member center' : '会员中心'},
                {link: '/memberCenter/latelyOrder', name: state.i18nValue ? 'Recent orders' : '最近订单'},
                {link: '/memberCenter/myOrder', name: state.i18nValue ? 'All orders':'全部订单'},
                {link: '/memberCenter/underReview', name: state.i18nValue ? 'Under review':'审核中'},
                {link: '/memberCenter/consignment', name: state.i18nValue ? 'To be shipped' : '待发货'},
                {link: '/memberCenter/shipped', name: state.i18nValue ? 'Shipped' : '已发货'},
                {link: '/memberCenter/received', name: state.i18nValue ? 'Received goods/Invoicing' : '已收款/开票'},
                {link: '/memberCenter/refunding', name: state.i18nValue ? 'In return':'退货中'},
                {link: '/memberCenter/refund', name: state.i18nValue ? 'Returned' : '已退货'},
                {link: '/memberCenter/reject', name: state.i18nValue ? 'reject' : '驳回'},
                {link: '/memberCenter/infoData', name: state.i18nValue ? 'personal data' : '个人资料'},
                {link: '/memberCenter/addRess', name: state.i18nValue ? 'Receiving address':'收货地址'},
                {link: '/memberCenter/invoice', name: state.i18nValue ? 'Invoice information':'发票信息'},
                {link: '/memberCenter/editPassword',name: state.i18nValue ? 'Change password':'更改密码'},
                {link: '/orderQuickly', name: state.i18nValue ? 'quick order':'快速下单'},
                {link: '/orderOver', name: state.i18nValue ? 'Order completion':'订单完成'},
            ]
        }
        // 产品分类id 变化时
        watch(() => store.product_categoryId, async () => {
            if (store.product_categoryId !== '') {
                let res = await ProductApi.findCategory({
                    categoryId: store.product_categoryId
                })
                state.menu = [{link: '/product/hotProducts',name:'产品'}]
                await computedMenu(res.data.result)
            }
        })

        const computedMenu = (obj) => {
            state.menu.push({name:obj.name,link: `/product/category?cateGoryId=${obj.id}`})
            if (obj.childrenDto) {
                computedMenu(obj.childrenDto)
            } else {
            }
        }

        // 路由 变化时
        watch(() => router.currentRoute.value, () => {
            let arr = router.currentRoute.value.path.split('/')

            let arr2 = []
            let base = ''
            arr.forEach(i => {
                if (i) {
                    arr2.push(
                        `${base}/${i}`
                    )
                    base += `/${i}`
                }
            })

            state.menu = []
            arr2.forEach(i => {
                if (i) {
                    state.menu.push(state.menuList.find(j => j.link === i))
                }
            })
            // 热门产品
            if (router.currentRoute.value.path.includes('/product/hotProducts')) {
                setTimeout(() => {
                    state.menu = [{name:'产品'}]
                }, 0);
            }

            // 分类页单独规则
            if (router.currentRoute.value.path.includes('/product/category')) {
                state.menu = [
                    {name:'产品',link:'/product/hotProducts'},
                ]
            }

            state.isShow = !['/home'].includes(router.currentRoute.value.path)
        })
        const navSelect = (pid,index) => {
            if (pid) {
                state.menu.splice(index+1,state.menu.length)
                bus.emit('getpid',pid)
            }
        }
        return {
            ...toRefs(props),
            ...toRefs(state),
            getMenuList,
            router,
            navSelect
        }
    },
}
</script>

<style lang="scss" scoped>
.siteNavWarp {
    background-color: #F8F8F8;
    width: 100%;
    box-sizing: border-box;
    padding: 0 2.2rem;
    display: flex;
    align-items: center;
    margin: 0 auto;
    height: .4rem;
}
</style>