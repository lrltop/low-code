<template>
    <view class="charts-box" :style="[componentRootNoodStyle]">
        <qiun-data-charts
            ref="chart"
            type="bar"
            :animation="false"
            :opts="{
                color: optsColor,
                padding: optsPadding,
                legend: optsLegend,
                xAxis: optsXAxis,
                yAxis: optsYAxis,
                extra: { bar }
            }"
            :chartData="chartData"
        />
    </view>
</template>

<script>
export default {
    name: 'drag-chart-bar',
    props: {
        componentRootNoodStyle: {
            type: Object,
            default: _ => ({})
        },
        chartData: {
            type: Object,
            default: () => {}
        },
        bar: {
            type: Object,
            default: () => {}
        },
        optsColor: {
            type: Array,
            default: () => []
        },
        optsPadding: {
            type: Array,
            default: () => []
        },
        optsLegend: {
            type: Object,
            default: () => {}
        },
        optsXAxis: {
            type: Object,
            default: () => {}
        },
        optsYAxis: {
            type: Object,
            default: () => {}
        },
        optsExtra: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
        }
    },
    watch: {
        componentRootNoodStyle(){
            if(this.timeId) clearTimeout(this.timeId)
            this.timeId = setTimeout(() => {
                this.$refs.chart.resizeHandler()
            }, 200)
        }
    },
    created() {}
}
</script>

<style scoped lang="scss">
.charts-box {
    width: 100%;
    height: 500rpx;
}
</style>
