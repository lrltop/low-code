<template>
    <view class="cu-form-group">
        <view v-if="labelText" class="title">{{ labelText }}</view>
        <view class="calendar-box cu-form-value-font" @click="open()">
            <view v-if="!modelValue_.length" class="value-nodata">请选择</view>
            <view v-else-if="mode === 'single'" class="value-single">{{ modelValue_[0] }}</view>
            <view v-else-if="mode === 'multiple'" class="value-multiple">
                <text v-for="(date, index) in modelValue_" :key="date">{{ date }}</text>
            </view>
            <view v-else-if="mode === 'range'" class="value-range">
                <text>{{ modelValue_[0] }}</text>
                {{ '\u00a0' }}~{{ '\u00a0' }}
                <text>{{ modelValue_[modelValue_.length - 1] }}</text>
            </view>
        </view>
        <u-calendar
            ref="uCalendar"
            :class="{'closeIconPadding': !title && !showSubtitle}"
            :show="show"
            :title="title"
            :showTitle="!!title"
            :showSubtitle="showSubtitle"
            :mode="mode"
            :startText="startText"
            :endText="endText"
            :customList="customList"
            :color="color"
            :minDate="minDate"
            :maxDate="maxDate"
            :defaultDate="defaultDate"
            :maxCount="maxCount"
            :rowHeight="rowHeight"
            :showLunar="showLunar"
            :showMark="showMark"
            :confirmText="confirmText"
            :confirmDisabledText="confirmDisabledText"
            :closeOnClickOverlay="closeOnClickOverlay"
            :readonly="readonly"
            :maxRange="maxRange"
            :rangePrompt="rangePrompt"
            :showRangePrompt="showRangePrompt"
            :allowSameDay="allowSameDay"
            :round="round"
            :monthNum="monthNum"
            @confirm="handlerConfirm"
            @close="handlerClose"
        ></u-calendar>
    </view>
</template>

<script>
import props from './props.js'
export default {
    name: 'drag-form-calendar',
    mixins: [props],
    props: {
        value: {
            type: [Array, String],
            default: ''
        },
        labelText: {
            type: String,
            default: '日历'
        }
    },
    data() {
        return {
            show: false,
            modelValue_: []
        }
    },
    computed: {
        modelValue: {
            get() {
                return this.value
            },
            set(e) {
                this.$emit('input', e)
            }
        },
        showRangePrompt() {
            return !!this.rangePrompt
        },
        defaultDate() {
            return this.modelValue_
        },
        watchInit(){
            return `${ this.showLunar }-`
        }
    },
    watch: {
        modelValue(n) {
            this.modelValue_ = n
        },
        watchInit(){
            this.$nextTick(() => {
                this.$refs.uCalendar.init()
            })
        }
    },
    methods: {
        open() {
            if (!this.disable) {
                this.show = true
            }
        },
        handlerConfirm(e) {
            this.modelValue_ = e
            this.modelValue = e
            this.$emit('confirm', this.modelValue)
            this.show = false
        },
        handlerClose(e) {
            this.$emit('close')
            this.show = false
        }
    }
}
</script>

<style scoped lang="scss">
.calendar-box {
    flex: 1;
    position: relative;
    margin-right: 24rpx;
}
::v-deep .u-popup{
    flex: 0;
}
.value-nodata,
.value-single,
.value-range {
    height: 80rpx;
    line-height: 80rpx;
    margin-right: 30rpx;
}
.value-nodata{
    color: grey
}
.value-multiple {
    display: flex;
    min-height: 80rpx;
    flex-direction: column;
    text {
        padding: 10rpx 0;
        display: inline-block;
        &:not(:last-child) {
            border-bottom: 1px solid #f5f5ff;
        }
    }
}

.closeIconPadding{
    /deep/.u-calendar{
        padding-top: 70rpx;
    }
}
</style>
