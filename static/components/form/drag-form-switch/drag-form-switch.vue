<template>
    <view class="cu-form-group " @click="$emit('click', $event)">
        <view v-if="labelText" class="title"
            :style="[labelStyle]"
        >{{ labelText }}</view>
        <view class="cu-form-switch"
            :style="{
                justifyContent: contentAlign
            }"
        >
            <label class="cu-form-switch-label-l">{{ leftText }}</label>
            <switch :class="modelValue_ ? 'checked':''" :checked="modelValue_" :disabled="disabled" @change="switchChange"></switch>
            <label class="cu-form-switch-label-r">{{ rightText }}</label>
        </view>
    </view>
</template>

<script>
    export default {
        name: "drag-form-switch",
        props: {
            value: {
                type: [String, Number, Boolean],
                default: false
            },
            labelText: {
                type: [String, Number],
                default: '开关'
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
            leftText: {
                type: [String, Number],
                default: '打开'
            },
            rightText: {
                type: [String, Number],
                default: '关闭'
            },
            contentAlign: {
                type: String,
                default: 'flex-end'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                modelValue_: false
            }
        },
        computed: {
            modelValue: {
                get(){
                    return this.value
                },
                set(e){
                    this.$emit('input', e)
                }
            },
            labelStyle(){
                return {
                    width: this.labelWidth,
                    fontSize: this.labelFontSize,
                    color: this.labelColor
                }
            }
        },
        watch: {
            modelValue(n){
                this.modelValue_ = n
            }
        },
        methods:{
            switchChange(e) {
                this.modelValue = e.detail.value
                this.modelValue_ = e.detail.value
                console.log(e.detail.value)
                this.$emit('change', e.detail.value)
            }
        }
    }
</script>

<style scoped lang="scss">
    .cu-form-group{
        /* zoom: .19; */
    }

    switch{
        /* zoom: 5; */
    }
    .title{
        margin-right: 15rpx;
        text-align: left;
    }
    .cu-form-switch{
        flex: 1;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .cu-form-switch-label-l{
            display: inline-block;
            margin-right: 20rpx;
        }
        .cu-form-switch-label-r{
            display: inline-block;
            margin-left: 20rpx;
        }
    }
</style>
