<template>
    <div class="paginationWrap">
        <el-pagination @size-change="changePageSize"
                       @current-change="changePageNumber"
                       :current-page.sync="pageNumber"
                       :page-sizes="[20, 50, 100, 200, 500, 1000]"
                       :page-size="pageSize"
                       layout="prev, pager, next, jumper"
                       :total="pageTotal">
        </el-pagination>
    </div>
</template>
<script>
import {watch} from "vue"

export default {
    name: "Pagination",
    props: {
        // 页数
        pageNumber: {
            default: 1,
            type: Number
        },
        // 每页条数
        pageSize: {
            default: 20,
            type: Number
        },
        // 总条数
        pageTotal: {
            default: 100,
            type: Number
        },
    },
    emits: ['update:pageNumber'],
    setup(props, ctx) {
        // 页数 change
        const changePageNumber = (pageNumber) => {
            ctx.emit('update:pageNumber', pageNumber)
        }

        // 每页条数 change
        const changePageSize = (pageSize) => {

        }

        watch(() => props.pageNumber, () => {
            ctx.emit('ajax')
        })

        return {
            changePageNumber,
            changePageSize,
        }
    }
}
</script>
<style lang="scss" scoped>
.paginationWrap {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>