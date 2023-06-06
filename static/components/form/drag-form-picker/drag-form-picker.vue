<template>
    <view class="cu-form-group">
        <view v-if="labelText" class="title">{{ labelText }}</view>
        <picker
            class="form-picker"
            :class="{ 'picker-disabled': disabled }"
            :value="index"
            :range="columns"
            range-key="text"
            :disabled="disabled"
            @change="PickerChange"
        >
            <view class="form-content">
                <input
                    :value="columns[index] ? columns[index].text : ''"
                    placeholder="请选择"
                    :disabled="true"
                />
                <u-icon name="arrow-right" color="#999" size="18"></u-icon>
            </view>
        </picker>
    </view>
</template>

<script>
export default {
    name: 'drag-form-picker',
    props: {
        value: {
            type: [String, Array],
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        labelText: {
            type: String,
            default: '普通选择'
        },
        columns: {
            type: Array,
            default: _ => []
        }
    },
    data() {
        return {
            index: -1
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(n) {
                this.calculateIndex()
            }
        },
        columns: {
            // deep: true,
            handler(n) {
                this.calculateIndex()
            }
        }
    },
    methods: {
        PickerChange(e) {
            this.index = e.detail.value
            this.$emit('input', this.columns[this.index].value)
        },
        calculateIndex() {
            if (this.value || this.value === 0) {
                this.index = this.columns.findIndex(e => e.value === this.value)
            } else {
                this.index = -1
            }
        }
    }
}
</script>

<style scoped lang="scss">
.picker-disabled {
    &::after {
        display: none;
    }
}
.form-picker {
    height: 90rpx;
    flex-grow: 1;
}
.form-content{
    display: flex;
    align-items: center;
    height: 90rpx;
    input{
        width: 100%;
    }
}
</style>
