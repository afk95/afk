<template>
    <div class="footerWrap">
        <div class="info">
            <!-- <span>PerkinElmer中国区电商平台</span>
            <span>© 1998 - 2022 上海铂铜生物科技有限公司</span>
            <span>保留所有权利 沪ICP备15033100号-1</span> -->
            <span>© 2022 上海铂铜生物科技有限公司</span>
            <span>保留所有权利 <a target="_blank" href="https://beian.miit.gov.cn">沪ICP备2022033431号-1</a></span>
        </div>
    </div>
</template>
<script>
export default {
    name: "Footer",
}
</script>
<style lang="scss" scoped>
.footerWrap {
    width: 100%;
    height: 120px;
    position: relative;
    background-color: #323232;
    margin-top: 20px;

    .info {
        color: #D6D6D6;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 400;
    }
}
</style>