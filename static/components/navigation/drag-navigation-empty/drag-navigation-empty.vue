<template>
    <u-empty 
        :show="show"
        :icon="icon"
        :text="text"
        :textColor="textColor"
        :textSize="textSize"
        :iconColor="iconColor"
        :iconSize="iconSize"
        :mode="mode"
        :width="width"
        :height="height"
        :marginTop="marginTop"
    >
        <view style="width: 500rpx;">
            
        <slot name="default"></slot>
        </view>
    </u-empty>
</template>

<script>
    import props from './props.js';
    export default {
        name: 'drag-navigation-empty',
        mixins: [props]
    }
</script>

<style scoped lang="scss">
    /deep/ *{
        zoom: 1;
    }
</style>
