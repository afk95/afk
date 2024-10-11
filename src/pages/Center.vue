<template>
    <div class="homeWarp">
        <div class="banner">
            <swiper class="swiperTop"
                    :modules="modules"
                    :slides-per-view="1" 
                    :loop="true"
                    :autoplay="{delay: 5000,disableOnInteraction:false}">
                <swiper-slide v-for="(item,index) in vilidDataList?.shopNoticeMap?.zbgg" :key="index">
                    <p class="advertisement" @click="linkUrl(item.url)">{{item.content}}</p>
                </swiper-slide>
            </swiper>
            <swiper class="swiper-container"
                    :modules="modules"
                    :slides-per-view="1"
                    :loop="true"
                    :autoplay="{delay: 5000,disableOnInteraction:false}"
                    @slideChange="SlideChange"
                    @swiper="onSwiper">
                <swiper-slide v-for="(item,index) in vilidDataList?.shopAdMap?.zbgg" :key="index">
                    <img style="height: 4.2rem; width: 100%"  :src="item.imgUrl" @click="linkUrl(item.adUrl)" alt="">
                </swiper-slide>
            </swiper>
            <swiper v-if="vilidDataList.shopAdMap" class="swiper-no-swiping instructions" :slides-per-view="vilidDataList.shopAdMap.zbgg.length" swiper-no-swiping>
                <swiper-slide @click="onClick(index)" v-for="(item,index) in vilidDataList.shopAdMap.zbgg" :key="index"><p class="title" :class="item.class">{{item.title}}</p></swiper-slide>
            </swiper>
        </div>
        <div class="classification">
            <div class="title">
                <i class="iconfont icon-cpfl" />
                <span>{{ $t('home_product_category') }}</span>
            </div>
            <div class="classificationContainer">
                <div class="content" >
                    <div>
                        <div class="headerList" :class="{onClick: firstId === item.id}" v-for="(item,index) in proDataList" :key="index" @click="onHeader(item.id)" :style="`height: calc(100%/${proDataList.length})`">
                            <p>{{item.name}}</p>
                        </div>
                    </div>
                    <div class="secondBox">
                        <div v-for="(item,index) in proDataList" :key="index" class="secondBoxList">
                            <div v-for="(itemChildren,index) in item.children" :key="index">
                                <p class="tit" v-if="firstId === itemChildren.parentId" @click="product(itemChildren.id,itemChildren.name)">{{itemChildren.name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="recommend">
            <div class="recommendContainer">
                <div class="title">
                    <i class="iconfont icon-cptj" />
                    <span>{{ $t('home_product_recommend') }}</span>
                </div>
                <div class="content">
                    <div class="line"></div>
                    <div v-for="item in promoteDataList" :key="item" class="list" @click="jump(item.id)">
                        <img class="image" :src="item.primaryPic" alt="">
                        <div class="contentRight">
                            <p class="name">{{item.name}}</p>
                            <div class="article">
                                <p class="itemNum" v-for="(data,index) in item.shopSkuList" :key="index">{{data.itemNum}}<span v-if="index!==item.shopSkuList.length-1">,</span></p>
                            </div>
                            <p class="text" :title="item.shopDetails.synopsis">{{item.shopDetails.synopsis}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="friendshipLink">
            <div class="title">
                <i class="iconfont icon-yqlj" />
                <span>{{ $t('home_links') }}</span>
            </div>
            <div class="friendshipLinkContainer">
                <div class="linkBox" v-for="item in vilidDataList?.shopAdMap?.dbyq" :key="item">
                    <img @click="linkUrl(item.adUrl)" class="linkImage" :src="item.imgUrl" alt="">
                </div>
            </div>
        </div>
        
        <div class="goBack">
            <a :href="pcOrMobileQQ('631685796')">
                <i class="iconfont icon-wenti qq"></i>
                {{ $t('home_online_service') }}
            </a>
            <a @click="goTop">
                <i class="iconfont icon-fanhui qq"></i>
                {{ $t('home_back_to_top') }}
            </a>
        </div>
    </div>
</template>

<script>
// 引入swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper';
import {useRouter} from 'vue-router'
// 引入swiper 样式
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import { reactive, toRefs, onMounted, ref } from 'vue'
import {prolist,promoteList,validList} from '@/assets/api/homeApi.js'
export default {
    name: 'Home',
    components: {Swiper,SwiperSlide},
    setup() {
        const router = useRouter();
        const state = reactive({
            proDataList: [],                // 产品分类List
            firstId: '',                    // 产品分类一级id
            promoteDataList: [],            // 产品推荐List
            vilidDataList: {},              // 广告数据
            controlledSwiper: null          // banner跟随
        })

        onMounted(async() => {
            await getProlist();             // 产品分类
            await getPromoteList();         // 产品推荐
            await getValidList();           // 获取公告、广告
        })

        // 产品分类
        const getProlist = async () => {
            let res = await prolist();
            state.proDataList = res.data.result;
            state.firstId = state.proDataList[0].id
        }

        // 产品推荐
        const getPromoteList = async () => {
            let res = await promoteList();
            state.promoteDataList = res.data.result;
        }

        // 获取广告
        const getValidList = async () => {
            let res = await validList();
            state.vilidDataList = res.data.result;
            state.vilidDataList.shopAdMap.zbgg[state.vilidDataList.shopAdMap.zbgg.length-1].class='active'
        }

        // 轮播跟随指示灯
        const onClick = (index) => {
            state.controlledSwiper.slideTo(index+1)
        }

        // 指示灯跟随轮播
        const SlideChange = (swiper) => {
            for (let i=0;i<state.vilidDataList.shopAdMap.zbgg.length;i++) {
                if (swiper.realIndex === i) {
                    state.vilidDataList.shopAdMap.zbgg[i].class='active'
                } else {
                    state.vilidDataList.shopAdMap.zbgg[i].class=null
                }
            }
        }

        // 点击一级产品分类
        const onHeader = (id) => {
            state.firstId = id;
        }

        // 获取轮播图片
        const onSwiper = (swiper) => {
            state.controlledSwiper = swiper
        }

        // 回到顶部
        const goTop = () => {
            document.documentElement.scrollTop = 0;
        }

        // 打开QQ
        const pcOrMobileQQ = (qq) => {
            return `tencent://message/?uin=${qq}&Menu=yes`
        }

        // 产品推荐详情
        const jump = (id) => {
            router.push(`/product/productDetail?id=${id}`)
        }

        const product = (id,name) => {
            router.push(`/product/category?cateGoryId=${id}`)
        }

        // 广告链接跳转
        const linkUrl = (url) => {
            let flag = url.indexOf('http')
            if (flag === -1 && url !== '') {
                window.open('https://'+url)
            } else if (url !== ''){
                window.open(url)
            }
        }

        return {
            ...toRefs(state),
            getProlist,
            getPromoteList,
            pcOrMobileQQ,
            SlideChange,
            onSwiper,
            onClick,
            onHeader,
            goTop,
            modules: [Autoplay],
            jump,
            product,
            linkUrl
        }
        
    },
}
</script>


<style lang="scss" scoped>
    .homeWarp {
        .banner {
            position: relative;
            cursor: pointer;

            .swiperTop {
                width: 100%;
                height: .4rem;
                line-height: .4rem;
                position: absolute;
                top: 0;
                z-index: 2;
            }

            .advertisement {
                text-align: center;
                color: #fff;
                background-color: rgba(0,0,0,.5);
            }

            .instructions {
                position: absolute;
                width: 100%;
                bottom: 4px;
                background-color: rgba(0,0,0,.5);
                :deep(.swiper-slide) {
                    text-align: center;
                    color: #fff;
                    line-height: .5rem;
                }

                .title {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    font-size: .16rem;
                }
            }

            .active {
                background-color: #254F9E;
            }
        }

        .classification {
            width: 14.8rem;
            margin: 0 auto;
            margin-top: .3rem;

            .title {
                margin-bottom: .1rem;

                i {
                    color: #254F9E;
                    font-size: .24rem;
                }

                span {
                    font-weight: bold;
                    font-size: .18rem;
                    margin-left: .1rem;
                }

            }

            .classificationContainer {
                width: 14.8rem;
                height: 2rem;
                background-color: #F8F8F8;

                .onClick {
                    background-color: #254F9E;
                    color: #fff;
                }

                .content {
                    display: flex;

                    .headerList {
                        width: 1.2rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;

                        p {
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                    .secondBox {
                            display: flex;

                        .secondBoxList {
                            height: 2rem;
                            display: flex;
                            flex-direction: column;
                            flex-wrap: wrap;
                        }
                        .tit {
                            cursor: pointer;
                            margin-left: .1rem;
                            margin-top: .1rem;
                            
                        }
                    }
                }
            }
        }

        .recommend {
            width: 100%;
            margin-top: .3rem;
            background-color: #F0F4F7;

            .recommendContainer {
                width: 14.8rem;
                margin: 0 auto;
                padding: .3rem 0 .5rem;
                
                .title {
                    margin-bottom: .1rem;
                    i {
                        color: #254F9E;
                        font-size: .24rem;
                    }

                    span {
                        font-weight: bold;
                        font-size: .18rem;
                        margin-left: .1rem;
                    }
                }

                .content {
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;

                    .line {
                        position: absolute;
                        width: .01rem;
                        height: calc(100% - .85rem);
                        background-color: #254F9E;
                        left: 50%;
                        top: .85rem;
                    }

                    .list {
                        width: 6.2rem;
                        height: 2.2rem;
                        margin: .1rem 0;
                        display: flex;
                        padding: .3rem .35rem .35rem .1rem;
                        cursor: pointer;

                        .image {
                            width: 1.4rem;
                            height: 1.4rem;
                        }

                        .contentRight {
                            margin-left: .3rem;
                            .name {
                                color: #254F9E;
                                font-size: .18rem;
                            }

                            .article {
                                display: flex;
                                color: #254F9E;
                                font-size: .16rem;
                                margin: .1rem 0;
                                flex-wrap: wrap;
                            }

                            .text {
                                width: 4rem;
                                height: .64rem;
                                color: #666666;
                                overflow: hidden;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 3;
                            }
                        }
                    }
                }
            }

        }

        .friendshipLink {
            width: 14.8rem;
            margin: 0 auto;
            margin-top: .3rem;

            .title {
                margin-bottom: .1rem;

                i {
                    color: #254F9E;
                    font-size: .24rem;
                }

                span {
                    font-weight: bold;
                    font-size: .18rem;
                    margin-left: .1rem;
                }
            }

            .friendshipLinkContainer {
                margin-top: .15rem;
                display: flex;
                flex-wrap: wrap;

                .linkBox {
                    height: 1rem;
                    margin-bottom: .2rem;
                    margin-right: .24rem;

                    .linkImage {
                        width: 2rem;
                        height: 1rem;
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .goBack {
        position: fixed;
        right: 50px;
        bottom: 1.5rem;
        z-index: 1;

        a {
            display: inherit;
            margin-top: .05rem;
            width: 64px;
            height: 64px;
            border: .01rem solid #DDDDDD;
            cursor: pointer;
            font-size: 14px;
            color: #254F9E;
            text-align: center;
            background-color: #fff;
        }

        .iconfont {
            display: block;
            text-align: center;
            font-size: 26px;
            margin: 8px 0 4px;
        }
    }

</style>