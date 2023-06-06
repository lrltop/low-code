<template>
    <view style="display: inline-block;">
        <u-tag
            style=""
            :type="type"
            :disabled="disabled"
            :size="size"
            :shape="shape"
            :text="text"
            :bgColor="bgColor"
            :color="color"
            :borderColor="borderColor"
            :closeColor="closeColor"
            :plainFill="plainFill"
            :plain="plain"
            :closable="closable"
            @click="$emit('click', $event)"
            @close="$emit('close', $event)"
        ></u-tag>
    </view>
    
</template>

<script>
    import props from './props.js';
    export default {
        name: 'drag-base-tag',
        mixins: [props]
    }
</script>

<style scoped lang="scss">
    // /deep/.u-transition{ 
    //     display: inline-block;
    // }
</style>
