<template>
    <view class="cu-form-group drag-form-picker-time">
        <view v-if="labelText" class="drag-form-picker-time-label" :style="[labelStyle]">{{ labelText }}</view>
        <view class="drag-form-picker-time-box" :style="[inputStyle]">
            <picker
                class="drag-form-picker-time-box-picker"
                :class="{ 'picker-disabled': disabled }"
                :disabled="disabled"
                mode="time"
                @change="PickerChange"
            >
                <input class="drag-form-picker-time-box-picker-input" :value="modelValue_" placeholder="请选择" :disabled="true" />
            </picker>
        </view>
    </view>
</template>

<script>
export default {
    name: 'drag-form-picker',
    props: {
        value: {
            type: [Array, String],
            default: ''
        },
        labelText: {
            type: String,
            default: '时间'
        },
        labelWidth: {
            type: String,
            default: '120rpx'
        },
        labelFontSize: {
            type: String,
            default: '30rpx'
        },
        labelColor: {
            type: String,
            default: '#333333'
        },
        borderWidth: {
            type: String,
            default: '1px'
        },
        borderColor: {
            type: String,
            default: '#f5f5f5'
        },
        borderStyle: {
            type: String,
            default: 'solid'
        },
        borderRadius: {
            type: String,
            default: '5rpx'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            index: 0,
            modelValue_: ''
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
        labelStyle() {
            return {
                width: this.labelWidth,
                fontSize: this.labelFontSize,
                color: this.labelColor
            }
        },
        inputStyle() {
            return {
                // borderWidth: this.borderWidth,
                // borderColor: this.borderColor,
                // borderStyle: this.borderStyle,
                // borderRadius: this.borderRadius
            }
        }
    },
    watch: {
        modelValue(n) {
            this.modelValue_ = n
        }
    },
    methods: {
        PickerChange(e) {
            this.modelValue = e.detail.value
            this.modelValue_ = e.detail.value
        }
    }
}
</script>

<style scoped lang="scss">
.drag-form-picker-time {
    background-color: #ffffff;
    padding: 0 30upx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 30upx;
    color: #555;
    .drag-form-picker-time-label {
        margin-right: 20rpx;
    }
    .drag-form-picker-time-box {
        flex: 1;
        display: flex;
        box-sizing: border-box;
        height: 90rpx;
        // border-radius: 5rpx ;
        // border: 1px solid #f5f5f5;
        .drag-form-picker-time-box-picker {
            padding: 0;
            box-sizing: border-box;
            .drag-form-picker-time-box-picker-input {
                // width: 100%;
                box-sizing: border-box;
                flex: 1;
                height: 90rpx;
                font-size: inherit;
                color: inherit;
                line-height: inherit;
                font-weight: inherit;
                border-style: none;
                outline: none;
            }
        }
    }
}
.picker-disabled {
    &::after {
        display: none;
    }
}
</style>
