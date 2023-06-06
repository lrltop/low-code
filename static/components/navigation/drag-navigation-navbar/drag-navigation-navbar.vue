<template>
    <u-navbar
        :style="componentRootNoodStyle"
        :titleStyle="componentRootNoodStyle"
        :title="title"
        :fixed="fixed"
        :border="border"
        :leftIcon="isBackShow ? leftIcon : ''"
        :bgColor="bgColor"
        :height="height"
        :autoBack="isBackShow && !ue.isPlat"
        :placeholder="true"
    >
        <view slot="center" v-if="customTitle"><slot name="center"></slot></view>
        <view slot="right"><slot name="right"></slot></view>
    </u-navbar>
</template>

<script>
export default {
    name: 'drag-navigation-navbar',
    components: {},
    props: {
        title: {
            type: String,
            default: '导航栏'
        },
        customTitle: {
            type: Boolean,
            default: false
        },
        isBackShow: {
            type: Boolean,
            default: true
        },
        fixed: {
            type: Boolean,
            default: true
        },
        border: {
            type: Boolean,
            default: false
        },
        leftIcon: {
            type: String,
            default: 'arrow-left'
        },
        leftText: {
            type: String,
            default: ''
        },
        rightText: {
            type: String,
            default: ''
        },
        rightIconType: {
            type: String,
            default: ''
        },
        rightIconColor: {
            type: String,
            default: ''
        },
        rightIconSize: {
            type: Number,
            default: 32
        },
        bgColor: {
            type: String,
            default: '#ffffff'
        },
        height: {
            type: String,
            default: '44px'
        },
        componentRootNoodStyle: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style scoped lang="scss"></style>
