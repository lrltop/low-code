<template>
    <u-swiper
        class="swiper"
        :list="list"
        :keyName="keyName"
        :radius="radius"
        :loading="loading"
        :indicator="indicator"
        :height="height"
        :bgColor="bgColor"
        :indicatorMode="indicatorMode"
        :indicatorInactiveColor="indicatorInactiveColor"
        :indicatorActiveColor="indicatorActiveColor"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :current="current"
        :current-item-id="currentItemId"
        :circular="circular"
        :vertical="vertical"
        :active-class="activeClass"
        :changing-class="changingClass"
        :acceleration="acceleration"
        :disable-programmatic-animation="disableProgrammaticAnimation"
        :previousMargin="filterUnit(previousMargin) == 0 ? null : previousMargin"
        :nextMargin="filterUnit(nextMargin) == 0 ? null : nextMargin"
        :displayMultipleItems="displayMultipleItems"
        :imgMode="imgMode"
        @change="$emit('change', $event)"
        @click="$emit('click', $event)"
    >
    </u-swiper>
</template>

<script>
export default {
    name: 'drag-base-swiper-image',
    props: {
        list:{
            type: Array,
            default: ()=>[]
        },
        keyName: {
            type: String,
            default: ""
        },
        radius: {
            type: String,
            default: "4px"
        },
        bgColor: {
            type: String,
            default: "#f3f4f6"
        },
        loading: {
            type: Boolean,
            default: false
        },
        indicator: {
            type: Boolean,
            default: true
        },
        indicatorInactiveColor: {
            type: String,
            default: 'rgba(0, 0, 0, .5)'
        },
        indicatorActiveColor: {
            type: String,
            default: '#000000'
        },
        indicatorMode: {
            type: String,
            default: 'line'
        },
        vertical: {
            type: Boolean,
            default: false
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        interval: {
            type: Number,
            default: 3000
        },
        duration: {
            type: Number,
            default: 500
        },
        current: {
            type: Number,
            default: 0
        },
        currentItemId: {
            type: String,
            default: ''
        },
        circular: {
            type: Boolean,
            default: false
        },
        previousMargin: {
            type: String,
            default: "0"
        },
        nextMargin: {
            type: String,
            default: "0"
        },
        displayMultipleItems: {
            type: Number,
            default: 1
        },
        imgMode: {
            type: String,
            default: "aspectFill"
        },
        height: {
            type: String,
            default: "130px"
        },

        // 支付宝小程序参数
        activeClass: {
            type: String,
            default: ''
        },
        changingClass: {
            type: String,
            default: ''
        },
        acceleration: {
            type: Boolean,
            default: false
        },
        disableProgrammaticAnimation: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        filterUnit(size){
            return size ? size.replace(/rpx|rem|px|vh/g, "") : ""
        }
    }
}
</script>

<style>

</style>
