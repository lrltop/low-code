<template>
    <view class="cu-form-group">
        <view v-if="labelText" class="title">{{ labelText }}</view>
        <slider
            class="slider"
            :min="min"
            :max="max"
            :step="step"
            :value="modelValue_"
            :activeColor="activeColor"
            :backgroundColor="backgroundColor"
            :blockSize="$u.getPx(blockSize)"
            :blockColor="blockColor"
            :showValue="showValue"
            :disabled="disabled"
            @changing="changingHandler"
            @change="changeHandler"
        ></slider>
    </view>
</template>

<script>
export default {
    props: {
        labelText: {
            type: String,
            default: '滑动选择'
        },
        value: {
            type: [Number, String],
            default: 0
        },
        blockSize: {
            type: [Number, String],
            default: 18
        },
        min: {
            type: [Number, String],
            default: 0
        },
        max: {
            type: [Number, String],
            default: 100
        },
        step: {
            type: [Number, String],
            default: 1
        },
        activeColor: {
            type: [String],
            default: '#2979ff'
        },
        backgroundColor: {
            type: [String],
            default: '#c0c4cc'
        },
        blockColor: {
            type: [String],
            default: '#ffffff'
        },
        showValue: {
            type: [Boolean],
            default: false
        },
        disabled: {
            type: [Boolean],
            default: false
        }
    },
    data() {
        return {
            // drag编辑时需要中间过渡一层，以供预览显示
            modelValue_: 0
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(n) {
                this.modelValue_ = n || 0
            }
        }
    },
    methods: {
        // 拖动过程中触发
        changingHandler(e) {
            const { value } = e.detail
            this.modelValue_ = value
            // 更新v-model的值
            this.$emit('input', value)
            // 触发事件
            this.$emit('changing', value)
        },
        // 滑动结束时触发
        changeHandler(e) {
            const { value } = e.detail
            this.modelValue_ = value
            // 更新v-model的值
            this.$emit('input', value)
            // 触发事件
            this.$emit('change', value)
        }
    }
}
</script>

<style scoped lang="scss">
    .slider{
        flex-grow: 1;
    }
</style>
