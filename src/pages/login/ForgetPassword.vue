<template>
    <div class="forgetPasswordWarp">
        <p class="title">{{$t('login_login_forgetPassword')}}</p>
        <div class="content">
            <p class="tips">{{$t('forgetPassword_tips')}}</p>
            <el-form label-position="top"
                     :rules="rules"
                     ref="fromRules"
                     :model="formData">
                <el-form-item :label="$t('MemberCenter_user_name')" prop="address">
                    <el-input class="elInput" v-model="formData.address" />
                </el-form-item>
                <el-form-item :label="$t('forgetPassword_verificaCode')" prop="code">
                    <el-input class="elInput" v-model="formData.code" />
                    <el-button v-if="countdown"
                               type="primary"
                               color="#084498"
                               @click="getCode">{{$t('forgetPassword_getCode')}}</el-button>
                <el-button type="primary" class="elButton" color="#084498" disabled v-else>{{verificationSecond}}{{$t('forgetPassword_seconds')}}</el-button>
                </el-form-item>
                <el-form-item :label="$t('MemberCenter_newPassword')" prop="newPass">
                    <el-input class="elInput" show-password v-model="formData.newPass" />
                </el-form-item>
            </el-form>
            <div class="btnBox">
                <el-button type="primary" class="elButton" color="#084498" @click="submitFn">{{$t('submit')}}</el-button>
                <router-link to="/login">
                    <el-button type="primary" class="elButton blak" color="#084498">{{$t('forgetPassword_backLogin')}}</el-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue-demi'
import { ElMessage } from 'element-plus'
import loginApi from '@/assets/api/loginApi'
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
export default {
    name: 'ForgetPassword',
    setup() {
        const router = useRouter();
        const i18n = useI18n();
        const fromRules = ref(null)
        const state = reactive({
            formData: {
                address: '',
                code: '',
                newPass: '',
            },
            verificationSecond: 300,
            verificationTimer: null,
            countdown: true,
            rules: {
                address: [{ required: true, message: i18n.t('please_enter'), trigger: 'blur' }],
                code: [{ required: true, message: i18n.t('please_enter'), trigger: 'blur' }],
                newPass: [{ required: true, message: i18n.t('please_enter'), trigger: 'blur' }],
            }
        })

        const getCode = () => {
            if (!state.formData.address) {
                ElMessage.error(i18n.t('ElMessage_uname'))
                return;
            }
            loginApi.getCode({address:state.formData.address}).then(res => {
                if (res.data.code ===0) {
                    state.countdown = false;
                    // 倒计时
                    state.verificationTimer = setInterval(() => {
                        if (state.verificationSecond === 0) {
                            state.countdown = true;// 结束倒数
                            state.verificationSecond = 300;// 初始化
                            clearInterval(state.verificationTimer);
                            return;
                        }
                        state.verificationSecond--;
                    }, 1000);
                }
            })
        }
        // 提交
        const submitFn = () => {
            fromRules.value.validate((vaild) => {
                if (vaild) {
                    loginApi.resetPass(state.formData).then(res => {
                        if (res.data.code ===0) {
                            ElMessage.success('修改成功！')
                            router.push('/login')
                        }
                    })
                }
            })
        }
        
        return {
            ...toRefs(state),
            fromRules,
            getCode,
            submitFn
        }
    },
}
</script>

<style lang="scss" scoped>
.forgetPasswordWarp {
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
        .tips {
            color: #666;
        }
        .username {
            margin: .2rem 0 .1rem;
        }
        .elInput {
            width: 5rem;
        }
        
        .btnBox {
            margin-top: .4rem;
            .elButton {
                width: 2.2rem;
                height: .45rem;
            }
            .blak {
                margin-left: .1rem;
            }
            .forgetPassword {
                margin-top: .2rem;
                color: #084498;
                cursor: pointer;
            }
        }
    }

}
</style>