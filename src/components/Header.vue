<template>
    <div class="headerWarp">
        <div class="advertisement" v-if="router.currentRoute.value.path.includes('/home')">
            <el-carousel height=".4rem" indicator-position="none" arrow="never" :interval="5000">
                <el-carousel-item v-for="(item,index) in vilidDataList" :key="index">
                    <p>
                        <a :href="item.url" target="_black">{{ item.content }}</a>
                    </p>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="seachBox">
            <div class="logo">

            </div>
            <div class="btnBox">
                <div class="txtLink">
                    <div class="leftTxt">
                        <router-link to="/product/hotProducts" class="txt">{{ $t('header_popularProducts') }}</router-link>
                        <el-popover placement="bottom-start"
                                    trigger="hover">
                            <template #reference>
                                <span class="txt">{{ $t('home_product_category') }}</span>
                            </template>
                                <p style="margin: .1rem; cursor: pointer;" v-for="item in menuList" @click="jump(`/product/category?cateGoryId=${item.id}`,item)">
                                    {{ item.name }}
                                </p>
                        </el-popover>
                        <router-link to="/productInfo" class="txt">{{ $t('header_Product_download') }}</router-link>
                    </div>
                    <div class="rightTxt">
                        <router-link v-if="!token" to="/register" class="hover" style="font-size: .16rem">
                            {{ $t('header_register') }}
                        </router-link>
                        <span v-if="!token"> | </span>
                        <router-link v-if="!token" to="/login" class="txt">{{ $t('header_login') }}
                        </router-link>
                        <router-link to="/memberCenter/latelyOrder" class="txt">
                            {{ $t('header_memberCenter') }}
                        </router-link>
                        <router-link to="/memberCenter/myOrder" class="txt">{{ $t('header_myOrder') }}</router-link>
                        <router-link to="/collectList" class="txt">{{ $t('header_collectList') }}</router-link>
                        <router-link to="/memberCenter/editPassword" class="txt">
                            {{ $t('header_security_center') }}
                        </router-link>
                        <router-link to="/helpCenter" class="txt">{{ $t('header_helpCenter') }}</router-link>
                        <span class="txt hover phone">
                            手机端
                            <div class="phoneImage">

                            </div>
                        </span>
                        <span class="txt hover" @click="i18nChange">{{ $t('header_Language') }}</span>
                    </div>
                </div>
                <div class="bottomBox">
                    <el-select class="select" v-model="value" :placeholder="$t('header_scategories')" size="large" clearable>
                        <el-option v-for="item in menuList" :key="item.id" :label="item.name" :value="item.id"/>
                    </el-select>

                    <el-input class="input" v-model="input" :placeholder="$t('header_search_content')" size="large"/>
                    <el-button class="searchBtn" color="#254F9E" size="large" @click="search">
                        <el-icon>
                            <Search/>
                        </el-icon>
                        {{ $t('header_search') }}
                    </el-button>
                    <router-link to="/cartList">
                        <el-button class="cart" size="large" plain>
                            <i class="iconfont icon-cart"/>{{ $t('header_cart') }}
                        </el-button>
                    </router-link>
                    <router-link to="/orderQuickly">
                        <el-button class="order" size="large" plain>
                            <i class="iconfont icon-order"/>{{ $t('header_quickOrder') }}
                        </el-button>
                    </router-link>

                </div>
            </div>
        </div>
    </div>
    <SiteNav></SiteNav>
</template>

<script>
import {onMounted, reactive, toRefs, watch} from 'vue'
import {useRouter} from 'vue-router'
import {Search, ShoppingCart, Document} from '@element-plus/icons-vue'
import {useI18n} from "vue-i18n";
import {validList} from '@/assets/api/homeApi.js'
import {getFindByParent,getSearch} from "@/assets/api/product/HotProducts";
import bus from '@/assets/js/bus.js'

export default {
    name: 'Header',
    components: {Search, ShoppingCart, Document},
    setup() {
        const router = useRouter()
        const state = reactive({
            vilidDataList: [], // 广告数据
            options: [
                {value: '1', label: '试剂'},
                {value: '2', label: '消耗品'},
            ],
            value: '',
            input: '',
            token: '',
            menuList: [],// 相关分类
        })

        onMounted(async () => {
            setTimeout(() => {
                state.input = router.currentRoute.value.query.name
            }, 200);
            await getMenu(); // 获取相关分类
            await getValidList();   // 获取广告数据
            state.token = sessionStorage.getItem('token')
        })

        // 获取相关分类
        const getMenu = async (pid) => {
            let res = await getFindByParent({pid: pid || ''});
            state.menuList = res.data.result;
        }

        // 中英文
        const i18n = useI18n()
        const i18nChange = () => {
            i18n.locale.value = i18n.locale.value === 'en' ? 'zh' : 'en'
            sessionStorage.setItem('i18n', i18n.locale.value)
            location.reload();
        }

        watch(() => router.currentRoute.value, () => {
            state.token = sessionStorage.getItem('token')
        })

        // 搜索
        const search = async() => {
            if (!state.input && !state.value) {
                router.push('/product/hotProducts')
            } else {
                let name = '';
                state.menuList.forEach(i => {
                    if (i.id === state.value) {
                        name = i.name
                    }
                })
                router.push({path:'/product/category',query:{cateGoryId:state.value,name:state.input}})
            }
        }

        // 获取广告数据
        const getValidList = async () => {
            let res = await validList();
            state.vilidDataList = res.data.result.shopNoticeMap.dbgg
        }

        // 跳转
        const jump = (link,item) => {
            if (item) {
                bus.emit('nav',{name:item.name,pid: item.id})
                router.push({path:'/product/category',query:{cateGoryId:item.id}})
            } else {
                router.push(link)
            }
        }

        return {
            ...toRefs(state),
            router,
            i18nChange,
            i18n,
            search,
            getValidList,
            jump,
        }
    },
}
</script>

<style lang="scss" scoped>
.headerWarp {

    .advertisement {
        width: 100%;
        background-color: #F2F2F2;
        height: .4rem;
        text-align: center;
        line-height: .4rem;
        margin-bottom: .1rem;

        a {
            color: #f40909;
            font-weight: bold;
            font-size: .16rem;
        }
    }

    .seachBox {
        margin: 0 auto;
        width: calc(100% - 4.4rem);
        display: flex;
        align-items: center;
        padding: .1rem 0;

        .logo {

            img {
                width: 1.5rem;
                transform: scale(1.4);
                cursor: pointer;
            }
        }

        .btnBox {
            width: 100%;
            margin-left: .3rem;

            .txtLink {
                width: 100%;
                display: flex;
                justify-content: space-between;

                .hover:hover {
                    color: #254f9e;
                }

                .leftTxt {
                    span {
                        cursor: pointer;
                    }

                    .txt {
                        margin-left: .2rem;
                        position: relative;
                        font-size: .16rem;
                        color: #666;

                        &:hover {
                            color: #254f9e;
                        }
                    }

                }

                .rightTxt {
                    span {
                        cursor: pointer;
                    }

                    .txt {
                        margin-right: .2rem;
                        position: relative;
                        font-size: .16rem;
                        color: #666;

                        &:hover {
                            color: #254f9e;
                        }
                    }

                    .phoneImage {
                        display: none;
                        position: absolute;
                        right: -.5rem;
                        top: .3rem;
                        z-index: 99;
                    }

                    .phone:hover .phoneImage {
                        display: block;
                    }
                }
            }

            .bottomBox {
                margin: .15rem 0;
                display: flex;

                .select {
                    width: 2rem;
                    :deep(.el-input__inner) {
                        border-right: none !important;
                        border-radius: 0 !important;
                        border: .02rem solid #254F9E;
                    }
                }

                .input {
                    width: 5.5rem;

                    :deep(.el-input__inner) {
                        border: .02rem solid #254F9E;
                        border-radius: 0 !important;
                    }
                }

                .searchBtn {
                    width: 1.2rem;
                    color: #fff;
                    border-radius: 0 !important;
                }

                .cart, .order {
                    .iconfont {
                        margin-right: .1rem;
                    }
                }

                .cart {
                    margin-left: .6rem;
                    border-color: #1F71B1;
                    color: #1F71B1;
                    width: 1.49rem;
                    border-radius: 0 !important;
                    font-size: .16rem;
                }

                .order {
                    margin-left: .2rem;
                    border-color: #1F71B1;
                    color: #1F71B1;
                    width: 2rem;
                    border-radius: 0 !important;
                    font-size: .16rem;
                }
            }
        }
    }
}
</style>
