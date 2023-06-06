<template>
    <video
        id="myVideo"
        class="i-video-style"
        :src="src"
        :controls="controls"
        :autoplay="autoplay"
        :muted="muted"
        :loop="loop"
        :direction="direction"
        :poster="poster"
        :title="title"
        @play="$emit('onVideoPlay', $event)"
        @pause="$emit('onVideoPause', $event)"
        @ended="$emit('onVideoEnded', $event)"
        @fullscreenchange="$emit('onVideoFullscreenchange', $event)"
        @error="$emit('onVideoError', $event)"
    ></video>
</template>

<script>
export default {
    name: 'drag-base-video',
    props: {
        src: {
            type: String,
            default: 'https://www.xyzlink.cn/shiyi/file/static/video_list/video_list/1.mp4'
        },
        controls: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        loop: {
            type: Boolean,
            default: false
        },
        muted: {
            type: Boolean,
            default: false
        },
        direction: {
            type: Number,
            default: 0
        },
        poster: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    },
    mounted(res) {
        this.videoContext = uni.createVideoContext('myVideo')
    },
    beforeDestroy() {
        try{
            this.videoContext.pause()
        }catch(e){
            //TODO handle the exception
            // console.log(e)
        }
    }
}
</script>

<style scoped lang="scss">
.i-video-style {
    width: 100%;
    display: block;
}
</style>
