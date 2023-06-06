<template>
    <view class="cu-form-group" @click="$emit('click', $event)">
        <view v-if="labelText" class="title">{{ labelText }}</view>
        <view class="checkbox-group">
            <u-rate
                v-if="showTime"
                v-model="modelValue_" 
                :count="count"
                :disabled="disabled"
                :readonly="readonly"
                :size="size"
                :inactiveColor="inactiveColor"
                :activeColor="activeColor"
                :gutter="gutter"
                :minCount="minCount"
                :allowHalf="allowHalf"
                :touchable="touchable"
                @change="handlerChange"
            ></u-rate>
        </view>
        
    </view>
</template>

<script>
    import props from './props.js';
    export default {
        name: "drag-form-checkbox",
        mixins: [props],
        props: {
            labelText: {
                type: String,
                default: '评分'
            }
        },
        data(){
            return {
                modelValue_: 0,
                showTime: true
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
            }
        },
        watch: {
            modelValue(n){
                this.modelValue_ = n
            },
            modelValue_(n){
                this.modelValue = n
            },
            size(){
                this.showTime = false
                setTimeout(_ => this.showTime = true, 0)
            }
        },
        methods:{
            handlerChange(e) {
                this.$emit('change', e)
            }
        }
    }
</script>

<style scoped lang="scss">
    .cu-form-group{
        /* zoom: .19; */
    }
    .checkbox-group{
        flex: 1;
        height: 80rpx;
        display: flex;
        align-items: center;
    }
    
    
</style>
