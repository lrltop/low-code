<template>
    <image 
        v-if="show"
       class="drag-base-image"
       :src="src"
       :mode="mode"
       :show-menu-by-longpress="showMenuByLongpress"
       @click="$emit('click', $event)"
       @error="$emit('error', $event)"
       @load="$emit('load', $event)"
    ></image>
</template>

<script>
    export default {
        name: 'drag-base-image',
        props:{
            src: {
                type: String,
                default: 'http://img.lemeitu.com/m00/a0/5c/ffc3c39d289296db3b97effa924d4bb6__w.jpg'
            },
            mode: {
                type: String,
                default: 'widthFix'
            },
            showMenuByLongpress: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                show: true
            }
        },
        watch: {
            mode(){
                // 动态设置mode时 image组件会将设置的width和height属性重置
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>

<style scoped lang="scss">

    .drag-base-image{
        // width: 749rpx;
        // background-color: #eeeeee;
        vertical-align: bottom;
        /*resize: both;*/
    }

</style>
