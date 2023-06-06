<template>
    <u-form-item
        class="drag-form-item"
        :label="label"
        :labelWidth="labelWidth"
        :rightIcon="rightIcon"
        :leftIcon="leftIcon"
        :required="required"
        :borderBottom="borderBottom"
        :labelPosition="labelPosition"
    >
        <view style="flex: 1;">
            <slot></slot>
        </view>
        <u-icon :name="rightIcon" v-if="rightIcon" customStyle="margin-left: 5rpx;"></u-icon>
    </u-form-item>
</template>

<script>
    import props from './props.js';
    export default {
        name: "drag-form-item",
        mixins: [props],
        props: {
            
        },
        data(){
            return {
                modelValue_: 0
            }
        }
    }
</script>

<style scoped lang="scss">
.drag-form-item{
    padding: 0 20rpx;
}
</style>
