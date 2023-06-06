<template>
    <view class="drag-navigation-link">
        <u-link
            :text="text"
            :color="color"
            :fontSize="fontSize"
            :underLine="underLine"
            :href="href"
            :lineColor="lineColor"
            :mpTips="mpTips"
        ></u-link>
    </view>
</template>

<script>
    import props from './props.js';
    export default {
        name: 'drag-navigation-empty',
        mixins: [props]
    }
</script>

<style scoped lang="scss">
    .drag-navigation-link{
        display: inline-block;
    }
</style>
