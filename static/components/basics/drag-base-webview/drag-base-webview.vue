<template>
    <web-view class="web-view" :src="src" @message="$emit('onWebViewMessage', $event)"></web-view>
</template>

<script>

export default {
    name: 'drag-base-webview',
    props: {
        src: {
            type: String,
            default: 'https://uniapp.dcloud.io/static/web-view.html'
        }
    }
}
</script>

<style scoped lang="scss">
.web-view {
    width: 100%;
    height: 100%;
}
</style>
