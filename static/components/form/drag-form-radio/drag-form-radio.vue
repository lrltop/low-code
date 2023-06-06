<template>
    <view class="cu-form-group" >
        <view v-if="labelText" class="title">{{ labelText }}</view>
        <u-radio-group
            v-if="show"
            v-model="modelValue"
            :disabled="disabled"
            :shape="shape"
            :activeColor="activeColor"
            :inactiveColor="inactiveColor"
            class="radio-group"
            :size="size"
            :iconSize="iconSize"
            :iconColor="iconColor"
            :placement="placement"
            :iconPlacement="iconPlacement"
            :borderBottom="borderBottom"
            :labelDisabled="labelDisabled"
            @change="RadioChange"
        >
            <u-radio v-for="(item, index) in columns" 
                :key="index" 
                class="form-radio" 
                :name="item.value" 
                :label="item.text" 
                :iconColor="iconColor"
                :customStyle="labelStyle"
                :labelSize="labelSize"
                :labelColor="labelColor"
            />
        </u-radio-group>
    </view>
</template>

<script>
export default {
    name: 'drag-form-radio',
    props: {
        value: {
            type: [String, Number, Boolean],
            default: ''
        },
        labelText: {
            type: String,
            default: '单选'
        },
        placement: {
            type: String,
            default: 'row'
        },
        columns: {
            type: Array,
            default: _ => [{
                    "value": "1",
                    "text": "选项1"
                },
                {
                    "value": "2",
                    "text": "选项2"
                }
            ]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        shape: {
            type: String,
            default: 'circle'
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
            type: String,
            default: "36rpx"
        },
        iconSize: {
            type: String,
            default: "24rpx"
        },
        labelDisabled: {
            type: Boolean,
            default: false
        },
        labelSize: {
            type: String,
            default: "28rpx"
        },
        iconColor: {
            type: String,
            default: '#ffffff'
        },
        labelColor: {
            type: String,
            default: '#303133'
        },
        labelWidth: {
            type: [String, Number],
            default: -1
        },
        labelMargin: {
            type: [String, Number],
            default: 5
        },
        iconPlacement: {
            type: [String],
            default: 'left'
        },
        borderBottom: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
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
        watchShow(){
            this.show = false
            this.$nextTick(_ => {
                this.show = true
            })
        }
    },
    created() {},
    methods: {
        RadioChange(e) {
            this.modelValue = e
            this.$emit('change', e)
        }
    }
}
</script>

<style scoped lang="scss">
.radio-group {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    margin-left: -10rpx;
}
.form-radio{
    margin: 5rpx 10rpx;
}
</style>
