<template>
    <div class="editPasswordWarp">
        <div class="title">{{$t('MemberCenter_change_password')}}</div>
        <div class="content">
            <p>{{$t('MemberCenter_oldPassword')}}</p>
            <el-input class="elInput" v-model="oldPasswd" size="large" show-password/>
            <p>{{$t('MemberCenter_newPassword')}}</p>
            <el-input class="elInput" v-model="newPasswd" size="large" show-password/>
            <p>{{$t('MemberCenter_againPassword')}}</p>
            <el-input class="elInput" v-model="confirmPasswd" size="large" show-password/>
            <div>
                <el-button color="#084498" @click="submit" class="elButton">{{$t('MemberCenter_modification')}}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import {updatePasswd} from '@/assets/api/memberCenter/editPassword'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import {useRouter} from 'vue-router'
export default {
    name: 'EditPassword',
    setup() {
        const router = useRouter();
        const i18n = useI18n();
        const state = reactive({
            oldPasswd: '',
            newPasswd: '',
            confirmPasswd: '',
        })

        onMounted(() => {
            if (!sessionStorage.getItem('token')) {
                ElMessage({
                    message: '请先登录账号！',
                    type: 'error',
                    duration: '1000'
                })
                router.push('/login')
            }
        })

        const submit = async() => {
            if (!state.oldPasswd || !state.newPasswd || !state.confirmPasswd) {
                ElMessage.error(i18n.t('MemberCenter_inputPassword'))
            } else if (state.newPasswd !== state.confirmPasswd) {
                ElMessage.error(i18n.t('MemberCenter_keepPassword'))
            } else {
                let res = await updatePasswd(state);
                if (res.data.result) {
                    ElMessage.error(i18n.t('ElMessage_editSuccess'))
                    state.oldPasswd = '';
                    state.newPasswd = '';
                    state.confirmPasswd = '';
                } else {
                    ElMessage.error(i18n.t('MemberCenter_originalError'))
                }
            }
        }
        

        return {
            ...toRefs(state),
            submit
        }
    },
}
</script>

<style lang="scss" scoped>
    .editPasswordWarp {
        position: relative;

        .title {
            font-size: .18rem;
            font-weight: bold;
            margin-bottom: .15rem;
            color: #254F9E;
        }
        
        .content {
            padding: .3rem 0 0 .1rem;


            .elInput {
                width: 5rem;
                margin: .1rem 0;
            }

            .elButton {
                margin-top: .2rem;
                color: #fff;
            }
        }
    }

</style>