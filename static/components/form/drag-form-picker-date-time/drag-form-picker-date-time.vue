<template>
    <view class="cu-form-group">
        <view v-if="labelText" class="title">{{ labelText }}</view>
        <view class="cu-form-input-box">
            <text v-if="showValue" @click="show = true">{{ showValue }}</text>
            <text v-else style="color: grey" @click="show = true">请选择时间日期</text>
            <u-datetime-picker
                v-model="modelValue"
                :show="show"
                :closeOnClickOverlay="true"
                :mode="mode || 'datetime'"
                @confirm="confirmDate"
                @cancel="show = false"
            ></u-datetime-picker>
        </view>
    </view>
</template>

<script>
export default {
    name: 'drag-form-picker-date-time',
    props: {
        value: {
            type: String,
            default: ''
        },
        labelText: {
            type: String,
            default: '日期'
        },
        mode: {
            type: String,
            default: 'datetime'
        }
    },
    data() {
        return {
            show: false,
            showValue: ''
        }
    },
    computed: {
        modelValue: {
            get() {
                if (this.value) return this.value
                return +new Date()
            },
            set(e) {
                this.$emit('input', e)
            }
        }
    },
    watch: {},
    methods: {
        confirmDate(e) {
            switch (e.mode) {
                case 'date':
                    this.showValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
                    break
                case 'datetime':
                    this.showValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM')
                    break
                case 'year-month':
                    this.showValue = uni.$u.timeFormat(e.value, 'yyyy-mm')
                    break
                default:
                    break
            }
            this.show = false
        }
    }
}
</script>

<style scoped lang="scss">
.cu-form-group {
    /* zoom: .19; */
}
.picker-disabled {
    &::after {
        display: none;
    }
}
</style>
