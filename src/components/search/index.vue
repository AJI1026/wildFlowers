<!--搜索框组件-->
<template>
    <div class="search-container">
        <el-input v-model="input" placeholder="订单搜索">
            <i slot="suffix" class="iconfont icon-sousuo" style="position: relative; top: 10px; left: -5px; font-size: 26px;"></i>
        </el-input>
    </div>
</template>

<script>
    export default {
        name: 'search-container',
        data() {
            return {
                input: '',
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search-container {
        display: flex;
        align-items: center;
        width: 200px;
        height: 20px;
        line-height: 20px;
    }
</style>
