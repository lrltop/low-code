<template>
    <view class="cu-form-group" @click="$emit('click', $event)">
        <view v-if="labelText" class="title">{{ labelText }}</view>
        <view class="checkbox-group">
            <u-number-box 
                v-model="modelValue_" 
                :min="min"
                :max="max"
                :step="step"
                :integer="integer"
                :disabled="disabled"
                :disabledInput="disabledInput"
                :asyncChange="asyncChange"
                :inputWidth="inputWidth"
                :showMinus="showMinus"
                :showPlus="showPlus"
                :decimalLength="decimalLength"
                :longPress="longPress"
                :color="color"
                :buttonSize="buttonSize"
                :bgColor="bgColor"
                :cursorSpacing="cursorSpacing"
                :disablePlus="disablePlus"
                :disableMinus="disableMinus"
                @change="handlerChange"
                @focus="$emit('focus', $event)"
                @blur="$emit('blur', $event)"
                @overlimit="handlerOverlimit"
            ></u-number-box>
        </view>
        
    </view>
</template>

<script>
    import props from './props.js';
    export default {
        name: "drag-form-number-box",
        mixins: [props],
        props: {
            labelText: {
                type: String,
                default: '步进器'
            }
        },
        data(){
            return {
                modelValue_: 0
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
            }
        },
        methods:{
            handlerChange(e) {
                
                this.$emit('change', e)
            },
            handlerOverlimit(e){
                this.$emit('overlimit', e)
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
