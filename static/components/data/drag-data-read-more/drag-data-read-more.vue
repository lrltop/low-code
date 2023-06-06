<template>
    <u-read-more
        ref="readMore"
        :showHeight="showHeight"
        :toggle="toggle"
        :closeText="closeText"
        :openText="openText"
        :color="color"
        :fontSize="fontSize"
        :shadowStyle="shadowStyle"
        :textIndent="textIndent"
        :name="name"
        @open="$emit('open', $event)"
        @close="$emit('close', $event)"
    >
        <view style="min-height: 40rpx;text-indent: 0;">
            <slot name="default"></slot>
        </view>
    </u-read-more>
</template>

<script>
    import props from './props.js';
    export default {
        name: 'drag-navigation-empty',
        mixins: [props],
        computed: {
            propsWatchInit(){
                return {
                    showHeight: this.showHeight,
                    openText: this.openText,
                    closeText: this.closeText
                }
            }
        },
        watch: {
            /**
             * 这里监听的目的：动态修改了关闭打开以及showHeight 组件内部不会重新计算内容高度，导致显示不正确
             */
            propsWatchInit(){
                this.init()
            }
        },
        methods: {
            init(){
                if(this.initTimeId) clearTimeout(this.initTimeId)
                this.initTimeId = setTimeout(_ => {
                    this.$nextTick(_ => {
                        console.log('计算')
                        this.$refs.readMore.init()
                    })
                }, 200)
               
            }
        }
    }
</script>

<style scoped lang="scss">
    /deep/ *{
        zoom: 1;
    }
</style>
