<template>
    <view class="">
        <uni-calendar ref="calendar" :lunar="lunar" :selected="selected" :showMonth="true" @change="change" @monthSwitch="monthSwitch" />
        <view class="info-content" v-if="showSelectedData && selectedData.extraInfo">
            <view v-if="selectedData.extraInfo.info && selectedData.extraInfo.info.length > 3">当前信息：{{ selectedData.extraInfo.info }}</view>
            <!-- <view v-if="selectedData.extraInfo.data">更多信息：{{ selectedData.extraInfo.data }}</view> -->
        </view>
    </view>
</template>

<script>
export default {
    name: 'drag-form-calendaruni',
    props: {
        lunar: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Array,
            default: () => [
                {
                    date: '2019-06-27',
                    info: '签到',
                    data: { custom: '自定义信息', name: '自定义消息头' }
                }
            ]
        },
        showSelectedData: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selectedData: {}
        }
    },
    computed: {},
    watch: {},
    mounted() {
        if(this.$refs.calendar.nowDate){
            this.selectedData = this.$refs.calendar.nowDate
        }
    },
    methods: {
        change(e) {
            this.$emit('change', e)
            this.selectedData = e
        },
        monthSwitch(e) {
            this.$emit('monthSwitch', e)
        }
    }
}
</script>

<style scoped lang="scss">
.info-content {
    & > view {
        font-size: 26rpx;
        padding: 0 30rpx;
        &:first-child {
            padding-top: 10rpx;
        }
        &:last-child {
            padding-bottom: 10rpx;
        }
    }
}
</style>
