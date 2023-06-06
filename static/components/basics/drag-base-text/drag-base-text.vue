<template>
    <text 
        class="drag-base-text" 
        :class="[
            textEllipsis != 'none' ? `uni-ellipsis-${ textEllipsis }` : ''
        ]"
        :userSelect="selectable"
        :selectable="selectable"
        @click="$emit('click', $event)"
    >{{ text }}</text>
</template>

<script>
    export default {
        name: 'drag-base-text',
        props:{
            selectable: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: '文本内容'
            },
            textEllipsis: {
                type: String,
                default: 'none'
            }
        },
        data(){
            return {
                
            }
        }
    }
</script>

<style scoped lang="scss">
    .drag-base-text{
		max-width: 750rpx;
        vertical-align: middle;
        display: inline-block;
    }
    .no-text-style{
        min-width: 100rpx;
    }
    // 超出省略
    /* #ifndef APP-NVUE */
    .uni-ellipsis-1 { display: block !important; overflow: hidden; white-space: nowrap !important; text-overflow: ellipsis;word-wrap: break-word;-webkit-line-clamp: 1;-webkit-box-orient: vertical;}
    .uni-ellipsis-2 { display: -webkit-box !important;overflow: hidden;white-space: normal !important;text-overflow: ellipsis;word-wrap: break-word;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
    .uni-ellipsis-3 { display: -webkit-box !important;overflow: hidden;white-space: normal !important;text-overflow: ellipsis;word-wrap: break-word;-webkit-line-clamp: 3;-webkit-box-orient: vertical;}
    /* #endif */
    /* #ifdef APP-NVUE */
    .uni-ellipsis-1 {lines: 1}
    .uni-ellipsis-2 {lines: 2}
    .uni-ellipsis-3 {lines: 3}
    /* #endif */
</style>
