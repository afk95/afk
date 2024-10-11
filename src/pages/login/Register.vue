<template>
    <div class="registerWarp">
        <p class="title">{{$t('login_register_title')}}</p>
        <div class="content">
            <div class="left">

            </div>
            <div class="right">
                <p>{{$t('login_register_tips')}}</p>
                <ul class="ul">
                    <li>{{$t('login_register_li1')}}</li>
                    <li>{{$t('login_register_li2')}}</li>
                    <li>{{$t('login_register_li3')}}</li>
                    <li>{{$t('login_register_li4')}}</li>
                    <li>{{$t('login_register_li5')}}</li>
                    <li>{{$t('login_register_li6')}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {reactive, toRefs, ref} from 'vue'
import {useRouter} from 'vue-router'
import { ElMessage } from 'element-plus'
import loginApi from '@/assets/api/loginApi'
import {useI18n} from 'vue-i18n'
export default {
    name: "Register",
    components: {

    },
    setup() {
        const i18n = useI18n()
        const router = useRouter();
        const state = reactive({
            ruleForm: {}
        })

        const register = (ruleForm) => {
            loginApi.register(ruleForm).then(res => {
                if (res.data.code === 0) {
                    ElMessage.success(i18n.t('login_register_succeeded'))
                    setTimeout(() => {
                        router.push('/home')
                    }, 1000);
                }
            })
        }


        return {
            ...toRefs(state),
            register,
            router
        }
    }
}
</script>
<style lang="scss" scoped>
    .registerWarp {
        position: relative;
        width: 100%;

        .title {
            margin: .2rem 0 .2rem 2.46rem;
            color: #800f69;
            font-size: .28rem;
        }

        .content {
            width: 12.45rem;
            border: .01rem solid #666;
            margin: 0 auto;
            padding: .5rem;
            display: flex;
            justify-content: space-between;


            .left {
                .tit {
                    color: #8a8a8a;
                    margin-bottom: .2rem;
                }
                .elInput {
                    width: 3rem;
                }

                .tips {
                    margin-top: .1rem;
                    color: #8a8a8a;
                    font-size: .16rem;
                }

                .clause {
                    margin-top: .1rem;
                    display: flex;
                    align-items: center;

                    .text {
                        margin-left: .1rem;
                        font-size: .16rem;
                        color: #084498;
                        cursor: pointer;
                    }
                }
                
                .txt {
                    font-size: .16rem;
                }
                
                .elButton {
                    margin-top: .2rem;
                    width: 2.2rem;
                    height: .45rem;
                }
            }

            .right {
                font-size: .16rem;
                padding: .3rem;
                background-color: #F2F2F2;
                height: 100%;
                width: 6rem;

                .ul {
                    margin-left: .4rem;

                    li {
                        margin: .1rem 0;
                    }
                }
            }
        }
    }
</style>