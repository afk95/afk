<template>
    <div class="warp">
        <div id="echarts" class="echarts"></div>
        {{info.name}}
    </div>
    
  <div class="root">
    <transition-group tag="div" class="container">
      <div class="item" :class="'item' + i"
           v-for="(item, i) in items"
           :style="{ 'background-color': item.color, border: '1px solid' }"
           draggable="true"
           @dragstart="handleDragStart($event, item)"
           @dragover.prevent="handleDragOver($event, item)"
           @dragenter="handleDragEnter($event, item)"
           @dragend="handleDragEnd($event, item)">
            <p>{{ item.key }}</p>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { inject, onMounted, nextTick, reactive, toRefs } from 'vue'
export default {
    setup() {
        let ecahrts = inject('ec')
        const info = inject('info')
        const state = reactive({
            items: [
                { key: 11111, color: "#3883a0" },
                { key: 22222, color: "#4883a0" },
                { key: 33333, color: "#5883a0" },
                { key: 44444, color: "#6883a0" },
                { key: 55555, color: "#7883a0" },
                { key: 66666, color: "#8883a0" },
                { key: 77777, color: "#9883a0" },
                { key: 88888, color: "#9883a1" },
                { key: 99999, color: "#9883a1" },
                { key: 91919, color: "#9883a1" },
            ],
            ending: null,
            dragging: null,
        })
        const handleDragStart = (e,item) => {
            state.dragging = item;
        }

        const handleDragEnd = (e, item) => {
            if (state.ending.key === state.dragging.key) {
                return;
            }
            let newItems = [...state.items];
            let src = newItems.indexOf(state.dragging);
            let dst = newItems.indexOf(state.ending);
            newItems.splice(src, 1, ...newItems.splice(dst, 1, newItems[src]));
            state.items = newItems;
            nextTick(() => {
                state.dragging = null;
                state.ending = null;

            })
        }
        const handleDragOver = (e) => {
            // 首先把div变成可以放置的元素，即重写dragenter/dragover
            // 在dragenter中针对放置目标来设置
            e.dataTransfer.dropEffect = "move";
        }
        const handleDragEnter = (e, item) => {
            // 为需要移动的元素设置dragstart事件
            e.dataTransfer.effectAllowed = "move";
            state.ending = item;
        }
        onMounted(() => {
            let myChart = ecahrts.init(document.querySelector(".echarts"));
            myChart.setOption({
                title: { text: "总用户量" },
                tooltip: {},
                xAxis: {
                    data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
                },
                yAxis: {},
                series: [
                {
                    name: "用户量",
                    type: "line",
                    data: [5, 20, 36, 10, 10, 20],
                },
                ],
            });
        })
        
        return {
            ...toRefs(state),
            info,
            handleDragStart,
            handleDragEnd,
            handleDragOver,
            handleDragEnter
        }
    },
}
</script>

<style lang="scss" scoped>
.warp {
    height: 300px;
}
.echarts {
    height: 300px;
}
.container {
    display: flex;
    flex-wrap: wrap;
}
.item {
  width: 200px;
  height: 200px;
  margin: 10px;
  color: #fff;
  transition: all linear .3s;
}
</style>