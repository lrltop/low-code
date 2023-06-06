<template>
    <view class="cu-form-group" @click="$emit('click', $event)">
        <view v-if="labelText" class="title">{{ labelText }}</view>
        <u-checkbox-group
            v-if="show"
            v-model="modelValue_"
            :placement="placement"
            :shape="shape"
            :activeColor="activeColor"
            :inactiveColor="inactiveColor"
            :size="size"
            :labelSize="labelSize"
            :labelColor="labelColor"
            :labelDisabled="labelDisabled"
            :iconColor="iconColor"
            :iconSize="iconSize"
            :iconPlacement="iconPlacement"
            :borderBottom="borderBottom"
            :disabled="disabled"
            class="checkbox-group"
            @change="checkboxChange"
        >
            <u-checkbox
                v-for="(item, index) in columns"
                :key="index"
                class="checkbox"
                :customStyle="labelStyle"
                :labelSize="labelSize"
                :label="item.text"
                :name="item.value"
                :iconSize="iconSize"
                :iconColor="iconColor"
                :disabled="item.disabled"
            ></u-checkbox>
        </u-checkbox-group>
    </view>
</template>

<script>
export default {
    name: 'drag-form-checkbox',
    props: {
        value: {
            type: [String, Number, Boolean],
            default: ''
        },
        labelText: {
            type: String,
            default: '多选'
        },
        placement: {
            type: String,
            default: 'row'
        },
        shape: {
            type: String,
            default: 'square'
        },
        activeColor: {
            type: String,
            default: '#2979ff'
        },
        inactiveColor: {
            type: String,
            default: '#c8c9cc'
        },
        size: {
            type: [String, Number],
            default: '18px'
        },
        labelSize: {
            type: [String, Number],
            default: '14px'
        },
        labelColor: {
            type: [String],
            default: '#303133'
        },
        labelDisabled: {
            type: Boolean,
            default: false
        },
        iconColor: {
            type: [String],
            default: '#ffffff'
        },
        iconSize: {
            type: [String, Number],
            default: '12'
        },
        iconPlacement: {
            type: [String],
            default: 'left'
        },
        borderBottom: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Array,
            default: _ => [
                {
                    value: '1',
                    text: '选项1',
                    selected: false,
                    disable: false
                },
                {
                    value: '2',
                    text: '选项2',
                    selected: false,
                    disable: false
                }
            ]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        labelWidth: {
            type: [String, Number],
            default: -1
        },
        labelMargin: {
            type: [String, Number],
            default: 5
        }
    },
    data() {
        return {
            // modelValue: '',
            modelValue_: [],
            show: true
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
        labelStyle(){
            let style = {
                marginTop: `${ this.labelMargin }rpx`,
                marginBottom: `${ this.labelMargin }rpx`
            }
            if(this.labelWidth > 0 ){
                style['width'] = `${ this.labelWidth }rpx`
            }
            return style
        },
        watchShow(){
                return `${ this.iconPlacement }-${ this.iconColor }`
            }
    },
    watch: {
        modelValue(n) {
            this.modelValue_ = n
        },
        watchShow(){
            this.show = false
            this.$nextTick(_ => {
                this.show = true
            })
        }
    },
    methods: {
        checkboxChange(e) {
            // console.log(e)
            // this.modelValue = e.detail.value
            // this.modelValue_ = e.detail.value
            this.$emit('change', e)
        }
    }
}
</script>

<style scoped lang="scss">
.checkbox-group {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    margin-left: -10rpx;
    .checkbox {
        margin: 5rpx 10rpx;
    }
}
</style>
