<template>
    <u-popup
        :show="popupShow"
        :overlay="overlay"
        :mode="mode"
        :duration="duration"
        :closeable="closeable"
        :overlayStyle="overlayStyle"
        :overlayOpacity="overlayOpacity"
        :closeOnClickOverlay="closeOnClickOverlay"
        :zIndex="zIndex"
        :safeAreaInsetBottom="safeAreaInsetBottom"
        :safeAreaInsetTop="safeAreaInsetTop"
        :closeIconPos="closeIconPos"
        :round="round"
        :zoom="zoom"
        :bgColor="bgColor"
        :customStyle="{
            width: width
        }"
        @open="$emit('open')"
        @close="handlerClose"
    >
        <view
            :style="[
                {
                    overflow: 'scroll',
                    height: height
                },
                componentRootNoodStyle
            ]"
        >
            <slot></slot>
        </view>
    </u-popup>
</template>

<script>
import props from './props.js'
export default {
    name: 'drag-popup-popup',
    mixins: [props],
    data() {
        return {
            popupShow: true
        }
    },
    computed: {},
    watch: {
        show(val) {
            this.popupShow = val
        }
    },
    created() {
        this.popupShow = this.show
    },
    methods: {
        handlerClose(e) {
            this.$emit('close')
            this.popupShow = false
        }
    }
}
</script>

<style scoped lang="scss"></style>
