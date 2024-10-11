<template>
    <div class="infoDataWarp">
        <div class="title">{{$t('MemberCenter_personal_data')}}</div>
        <div class="content">
            <div class="left">

            </div>
            <div class="right">
                <div class="label">{{$t('MemberCenter_MemberId')}}：<span>{{userInfo.memNum}}</span></div>
                <div class="label">{{$t('MemberCenter_MemberType')}}：<span>{{userInfo.memTypeName}}</span></div>
                <div class="label">{{$t('MemberCenter_MemberGrade')}}：<span>{{userInfo.memLevelName}}</span></div>
                <div class="label">{{$t('MemberCenter_payment')}}：
                    <p v-for="(item,index) in userInfo.payNames" :key="item" class="payment">{{index+1}}：{{item}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import {getUserInfo} from '@/assets/api/memberCenter/infoData'
export default {
    name: 'InfoData',
    components: {

    },
    setup() {
        const state = reactive({
            userInfo: {},  // 用户信息
        })
        

        onMounted(async() => {
            await getUser()
        })

        // 获取用户信息
        const getUser = async() => {
            let res = await getUserInfo()
            state.userInfo = res.data.result;
        }

        return {
            ...toRefs(state),
            getUser
        }
    },
}
</script>


<style lang="scss" scoped>
    .infoDataWarp {
        position: relative;

        .title {
            font-size: .18rem;
            font-weight: bold;
            margin-bottom: .15rem;
            color: #254F9E;
        }

        .content {
            display: flex;
            justify-content: space-between;

            .left {
                padding: .4rem;
                border: .01rem solid #c3c3c3;
            }

            .right {
                padding: .4rem .55rem;
                border: .01rem solid #c3c3c3;
                height: 3rem;
                width: 6rem;

                .label {
                    line-height: .3rem;

                    span {
                        color: #084498;
                        font-size: .16rem;
                        font-weight: bold;
                    }

                    .payment {
                        margin-left: .8rem;

                    }
                }
            }
            
        }
    }
    * {
        font-size: .18rem;
    }
</style>