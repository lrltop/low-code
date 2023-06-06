<template>
    <!-- <view class="charts-box"> -->
        <qiun-data-charts
            ref="chart"
            :style="[componentRootNoodStyle]"
            class="charts-box"
            type="column"
            style="transform: scale(1) !important;"
            :animation="false"
            :opts="{
                color: optsColor,
                padding: optsPadding,
                legend: optsLegend,
                xAxis: optsXAxis,
                yAxis: optsYAxis,
                extra: { column }
            }"
            :chartData="chartData"
        />
    <!-- </view> -->
</template>

<script>
export default {
    name: 'drag-chart-column',
    props: {
        componentRootNoodStyle: {
            type: Object,
            default: _ => ({})
        },
        chartData: {
            type: Object,
            default: () => {}
        },
        column: {
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
        componentRootNoodStyle(styleObj, oldStyleObj){
            // if(styleObj.width != oldStyleObj.width || styleObj.height != oldStyleObj.height){
                // this.$nextTick(() => {
                //     this.$refs.chart.resizeHandler()
                // })
                if(this.timeId) clearTimeout(this.timeId)
                this.timeId = setTimeout(() => {
                    this.$refs.chart.resizeHandler()
                }, 200)
            // }
        }
    },
    created() {}
}
</script>

<style scoped lang="scss">
.charts-box {
    // width: 100%;
    height: 500rpx;
}
</style>
