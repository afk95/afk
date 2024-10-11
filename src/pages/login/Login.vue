<template>
    <div class="loginWrap">
        <div class="content">
            <div class="left">
                <p class="tips">登录您的账户</p>
                <p class="username">用户名</p>
                <el-input v-model="username" placeholder="请输入" class="elInput" />
                <p class="username">密码</p>
                <el-input v-model="password" show-password placeholder="请输入" class="elInput" />
                <div class="loginBtn">
                    <el-button type="primary" class="elButton" color="#084498" @click="loginFn">登录</el-button>
                    <p class="forgetPassword" @click="jump">创建一个账户？</p>
                    <p class="forgetPassword" @click="forgetPasswordFn">忘记密码？</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {reactive, toRefs} from 'vue'
import {useRouter} from 'vue-router'
import loginApi from '@/assets/api/loginApi'
import { ElMessage } from 'element-plus'
export default {
    name: "Login",
    setup() {
        const router = useRouter();
        //state
        const state = reactive({
            username: 'admin', // 用户名
            password: '123456', // 密码
        })

        // 登录
        const loginFn = () => {
            // loginApi.checkLoginName({
            //     loginName: state.username
            // }).then(res => {
            //     loginApi.shoplogin({
            //         username: state.username,
            //         password: state.password,
            //     }).then(res => {
            //         sessionStorage.setItem('token', res.data.result.token)
            //         sessionStorage.setItem('userName',res.data.result.username)
            //         router.push('/home')
            //     })
            // })
            router.push('/center')
        }
        // 注册
        const jump = () => {
            router.push('/register')
        }

        // 忘记密码
        const forgetPasswordFn = () => {
            router.push('/forgetPassword')
        }

        return {
            ...toRefs(state),
            jump,
            loginFn,
            forgetPasswordFn,
        }
    }
}
</script>
<style lang="scss" scoped>
.loginWrap {
    position: relative;
    width: 100%;
    overflow: hidden;

    .title {
        margin: .2rem 0 .2rem 2.46rem;
        color: #800f69;
        font-size: .28rem;
    }

    .content {
        width: 12.45rem;
        border: .01rem solid #666;
        margin: 0 auto;
        display: flex;
        padding: .5rem;

        .left {
            .tips {
                color: #666;
            }
            .username {
                margin: .2rem 0 .1rem;
            }
            .elInput {
                width: 5rem;
            }
            .loginBtn {
                margin-top: .4rem;
                .elButton {
                    width: 2.2rem;
                    height: .45rem;
                }
                .forgetPassword {
                    margin-top: .2rem;
                    color: #084498;
                    cursor: pointer;
                }
            }
        }

        .right {
            margin-left: 1.5rem;
            .tips {
                color: #666;
            }

            .elButton {
                width: 2.2rem;
                height: .45rem;
                border-color: #1F71B1;
                color: #1F71B1;
                margin-top: .2rem;
            }
        }
    }
}

</style>