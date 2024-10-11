<template>
    <router-view></router-view>
</template>
<script>
import {onMounted, provide} from "vue";
import * as echarts from 'echarts'
import {useI18n} from "vue-i18n";

  (function (doc, win) {

    var docEl = doc.documentElement,

      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',

      recalc = function () {

        var clientWidth = docEl.clientWidth;

        if (!clientWidth) return;

        docEl.style.fontSize = 50 * (clientWidth / 1080) + 'px';

        console.log(docEl.style.fontSize)

      };

    if (!doc.addEventListener) return;

    win.addEventListener(resizeEvt, recalc, false);

    doc.addEventListener('DOMContentLoaded', recalc, false);

  })(document, window);

export default {
    setup(props, ctx) {
        // 写入打包时间
        onMounted(() => {
            document.querySelector('body').setAttribute('VITE_APP_BUILDTIME', import.meta.env.VITE_APP_BUILDTIME)
        })

        // 取 i18n 缓存
        const i18n = useI18n()
        onMounted(async () => {
            i18n.locale.value = sessionStorage.getItem('i18n') || 'zh'
        })

        provide('ec', echarts)
        let info = {name: '张三'}
        provide('info', info)
        return {}
    }
}
</script>