<template>
    <div class="mainCounterWarp">
        <div class="container">
            <div class="menu">
                <div class="userInfo">
                    <el-upload class="avatar-uploader"
                               ref="upload"
                               :show-file-list="false"
                               :http-request="uploadFile"
                               accept="image/png, image/jpg, image/jpeg">
                               <p class="tips">编辑头像</p>
                            <el-avatar v-if="imageUrl"
                                    style="width: .98rem;height: .98rem;"
                                    size="large"
                                    :src="imageUrl">
                            </el-avatar>
                            <el-avatar v-else
                                    class="userImage"
                                    size="large">
                            </el-avatar>
                        </el-upload>
                    <p class="timeOut">{{time}}！</p>
                    <p class="userName">{{userNmae}}</p>
                    <div class="line"></div>
                </div>
                <div class="menuContent">
                    <p class="title">{{ $t('header_myOrder') }}</p>
                    <router-link to="/memberCenter/myOrder" class="node">{{$t('MemberCenter_all_orders')}}</router-link>
                    <router-link to="/memberCenter/underReview" class="node">{{$t('MemberCenter_under_review')}}</router-link>
                    <router-link to="/memberCenter/consignment" class="node">{{$t('MemberCenter_to_be_shipped')}}</router-link>
                    <router-link to="/memberCenter/shipped" class="node">{{$t('MemberCenter_shipped')}}</router-link>
                    <router-link to="/memberCenter/received" class="node">{{$t('MemberCenter_invoicing')}}</router-link>
                    <router-link to="/memberCenter/refunding" class="node">{{$t('MemberCenter_return')}}</router-link>
                    <router-link to="/memberCenter/refund" class="node">{{$t('MemberCenter_return_goods')}}</router-link>
                    <router-link to="/memberCenter/reject" class="node">{{$t('MemberCenter_reject')}}</router-link>
                    <p class="title">{{$t('MemberCenter_member_info')}}</p>
                    <router-link to="/memberCenter/infoData" class="node">{{$t('MemberCenter_personal_data')}}</router-link>
                    <router-link to="/memberCenter/addRess" class="node">{{$t('MemberCenter_receiving_address')}}</router-link>
                    <router-link to="/memberCenter/invoice" class="node">{{$t('MemberCenter_invoice_information')}}</router-link>
                    <p class="title">{{$t('header_security_center')}}</p>
                    <router-link to="/memberCenter/editPassword" class="node">{{$t('MemberCenter_change_password')}}</router-link>
                    <router-link to="/home" class="node" @click="outLogin">{{$t('MemberCenter_log_out')}}</router-link>
                </div>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>


<script>
import { onMounted, reactive, toRefs, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n';
import {editPic,getUserInfo} from '@/assets/api/memberCenter/infoData'
import {openUpload} from '@/assets/api/other/OrderDetail.js'
export default {
    name: 'MainCounter',
    setup() {
        const i18n = useI18n();
        const state = reactive({
            userNmae: sessionStorage.getItem('userName'),
            time: '',
            imageUrl: '',
        })

        onMounted(() => {
            getTime();
            getData();
        })
        // 获取头像
        const getData = async() => {
            if (sessionStorage.getItem('token')) {
                let res = await getUserInfo()
                state.imageUrl = res.data.result.headPic
            }
        }

        // 获取时间
        const getTime = () => {
            let time = new Date()
            if (time.getHours() >=6&&time.getHours()<12) {
                state.time = i18n.t('MemberCenter_good_morning')
            } else if (time.getHours()>=12&&time.getHours()<18) {
                state.time = i18n.t('MemberCenter_good_afternoon') 
            } else {
                state.time = i18n.t('MemberCenter_good_evening') 
            }
        }

        // 退出登录
        const outLogin = () => {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userName')
        }



        // 上传头像
        const uploadFile = async(file) => {
            const formData = new FormData()
            formData.append('file', file.file)
            let res = await openUpload(formData)
            if (res.data.code === 0) {
                let image = res.data.result[0]
                let result = await editPic({headPic:image})
                if (result.data.code === 0) {
                    ElMessage.success(i18n.t('ElMessage_uploadSuccess'))
                    await getData();
                }
            }
        }

        return {
            ...toRefs(state),
            outLogin,
            getTime,
            uploadFile,
            getData
        }
    },
}
</script>

<style lang="scss" scoped>
.mainCounterWarp {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 0 2.2rem;
    margin-top: .2rem;

    .container {
        margin: 0 auto;
        display: flex;

        .menu {
            width: 3rem;
            background-color: #F7F7F7;
            height: 9.1rem;

            .userInfo {
                padding-top: .3rem;
                margin: 0 auto;
                text-align: center;
                

                .avatar-uploader {
                    position: relative;

                    .userImage {
                        width: .98rem;
                        height: .98rem;
                        background-color: #eeeeee;
                    }
                    .tips {
                        position: absolute;
                        color: #fff;
                        background-color: rgba(0,0,0,.4);
                        width: .98rem;
                        height: .98rem;
                        border-radius: 50%;
                        line-height: .98rem;
                        font-size: .18rem;
                        display: none;
                    }

                    .el-upload:hover .tips {
                        display: block !important;
                    }

                }

                .timeOut {
                    margin-top: .1rem;
                    font-size: .16rem;
                }

                .userName {
                    font-weight: bold;
                    font-size: .18rem;
                    margin: .08rem 0;
                }

                .line {
                    width: 2rem;
                    height: .02rem;
                    background-color: #c8c8c8;
                    margin: .2rem auto 0;
                }
            }

            .menuContent {
                padding: .3rem;

                .title {
                    font-size: .16rem;
                    font-weight: bold;
                    line-height: .36rem;
                }
                .node {
                    font-size: .16rem;
                    color: #777777;
                    line-height: .36rem;
                    display: inherit;
                }
            }
        }

        .content {
            width: calc(100% - 3rem);
            margin-left: .2rem;
            padding-bottom: .4rem;
        }
    }
}

</style>