<template>
    <view class="steps bg-white padding">
        <view class="cu-steps">
            <view v-for="(item,index) in basicsList" :key="index" class="cu-item" :class="index>basics?'':'text-red'">
                <text :class="'cuIcon-' + item.cuIcon"></text> {{ item.name }}
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "drag-color-steps",
        data() {
            return {
                basicsList: [{
                    cuIcon: 'usefullfill',
                    name: '开始'
                }, {
                    cuIcon: 'radioboxfill',
                    name: '等待'
                }, {
                    cuIcon: 'roundclosefill',
                    name: '错误'
                }, {
                    cuIcon: 'roundcheckfill',
                    name: '完成'
                }, ],
                basics: 0,
            };
        },
    }
</script>

<style scoped>
    .steps{
        /* zoom: .2; */
    }
</style>
