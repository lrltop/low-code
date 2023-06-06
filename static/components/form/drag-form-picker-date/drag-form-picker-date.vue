<template>
    <view class="cu-form-group">
        <view v-if="labelText" class="title">{{ labelText }}</view>

        <uni-datetime-picker
            v-if="show"
            ref="uniDatetimePicker"
            v-model="modelValue_"
            class="uni-datetime-picker" 
            :border="false"
            :type="type"
            :disabled="disabled"
            :start="start"
            :end="end"
            :returnType="returnType"
            :rangeSeparator="rangeSeparator"
            :placeholder="placeholder"
            :startPlaceholder="startPlaceholder"
            :endPlaceholder="endPlaceholder"
            :clearIcon="clearIcon"
            :hideSecond="hideSecond"
            @change="change"
            @maskClick="$emit('maskClick', $event)"
        >
            <!-- <view>fadfad</view> -->
        </uni-datetime-picker>
    </view>
</template>

<script>
    export default {
        name: "drag-form-picker",
        props: {
            value: {
                type: [Array, String],
                default: ''
            },
            labelText: {
                type: String,
                default: '日期'
            },
            type: {
                type: String,
                default: 'datetime'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            start: {
                type: [String, Number],
                default: ''
            },
            end: {
                type: [String, Number],
                default: ''
            },
            returnType: {
                type: String,
                default: 'string'
            },
            border: {
                type: Boolean,
                default: true
            },
            rangeSeparator: {
                type: String,
                default: "-"
            },
            placeholder: {
                type: String,
                default: ""
            },
            startPlaceholder: {
                type: String,
                default: ""
            },
            endPlaceholder: {
                type: String,
                default: ""
            },
            clearIcon: {
                type: Boolean,
                default: true
            },
            hideSecond: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                show: true,
                modelValue_: ''
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
            watchShow(){
                return `${ this.type }`
            }
        },
        watch: {
            modelValue(n){
                this.modelValue_ = n
            },
            async watchShow(){
                this.show = false
                await this.$nextTick()
                this.show = true
                await this.$nextTick()
                this.modifyFn()
                console.log('aaf')
            }
        },
        mounted() {
            this.modifyFn()
        },
        methods: {
            modifyFn(){
                /**
                 * 因平台编辑为pc下编辑，导致uni ui组件样式为pc特定样式，
                 * 这里重写一下组件的platform方法判断
                 */
                this.$refs.uniDatetimePicker.platform = function(){
                    const systemInfo = uni.getSystemInfoSync()
                    this.isPhone = true
                    this.windowWidth = systemInfo.windowWidth
                }
            },
            change(e){
                this.modelValue = e
                this.$emit('change', e)
            }
        }
    }
</script>

<style scoped lang="scss">
    .uni-datetime-picker{
        flex: 1;
        height: 40px;
    }
</style>
