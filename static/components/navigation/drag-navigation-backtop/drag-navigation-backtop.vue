<template>
    <u-back-top :mode="mode" :icon="icon" :text="text" :duration="duration" :bottom="bottom" :right="right" :z-index="zIndex"></u-back-top>
</template>

<script>
export default {
    name: 'drag-navigation-empty',
    props: {
        mode: {
            type: String,
            default: 'circle'
        },
        icon: {
            type: String,
            default: 'arrow-upward'
        },
        text: {
            type: String,
            default: ''
        },
        duration: {
            type: [String, Number],
            default: 100
        },
        bottom: {
            type: [String, Number],
            default: 100
        },
        right: {
            type: [String, Number],
            default: 20
        },
        zIndex: {
            type: [String, Number],
            default: 9
        }
    }
}
</script>

<style scoped lang="scss">
/deep/ * {
    zoom: 1;
}
</style>
