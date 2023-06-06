<template>
    <scroll-view
        :scroll-top="scrollTop"
        :scroll-left="scrollLeft"
        :scroll-x="scrollX"
        :scroll-y="scrollY"
        :scroll-into-view="scrollIntoView"
        :scroll-with-animation="scrollWithAnimation"
        :enable-back-to-top="enableBackToTop"
        class="scroll-view"
        :style="{ 'white-space': scrollX ? 'nowrap' : 'normal', height: scrollY ? viewHeight + 'rpx' : '300rpx' }"
        @scrolltoupper="$emit('scrolltoupper', $event)"
        @scrolltolower="$emit('scrolltolower', $event)"
        @scroll="$emit('scroll', $event)"
    >
        <slot></slot>
    </scroll-view>
</template>

<script>
export default {
    components: {},
    props: {
        scrollX: {
            type: Boolean,
            default: false
        },
        scrollY: {
            type: Boolean,
            default: false
        },
        scrollTop: {
            type: [String, Number],
            default: 0
        },
        scrollLeft: {
            type: [String, Number],
            default: 0
        },
        viewHeight: {
            type: Number,
            default: 300
        },
        scrollIntoView: {
            type: String,
            default: ''
        },
        scrollWithAnimation: {
            type: Boolean,
            default: false
        },
        enableBackToTop: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    methods: {}
}
</script>
<style lang="scss">
uni-scroll-view {
    white-space: normal !important;
}
</style>
