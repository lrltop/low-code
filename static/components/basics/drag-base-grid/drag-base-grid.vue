<template>
    <u-grid :col="col" :border="border" :align="align">
        <u-grid-item v-for="(item, index) in list" :key="index" :customStyle="{ height: itemHeight + 'rpx' }" @click="$emit('click', item)">
            <view
                class="icon-box"
                :style="{
                    width: iconBoxSize + 'rpx',
                    height: iconBoxSize + 'rpx',
                    background: item.iconBoxbackground,
                    borderRadius: iconBoxRadius + 'rpx'
                }"
            >
                <image
                    v-if="item.iconType == 'image' || item.icon.substring(0, item.icon.indexOf(':')) == 'image'"
                    :src="item.icon.substring(item.icon.indexOf(':') + 1)"
                    :style="{ width: iconSize * 2 + 'rpx' }"
                    mode="widthFix"
                ></image>

                <u-icon
                    v-else-if="item.icon.substring(0, item.icon.indexOf(':')) == 'uview'"
                    :name="item.icon.substring(item.icon.indexOf(':') + 1)"
                    :size="iconSize"
                    :color="item.iconColor"
                ></u-icon>

                <i
                    v-else
                    class="drag-base-icon"
                    :class="[item.icon.substring(0, item.icon.indexOf(':')), item.icon.substring(item.icon.indexOf(':') + 1)]"
                    :style="{ color: item.iconColor, fontSize: iconSize * 2 + 'rpx' }"
                ></i>
            </view>
            <text class="grid-text" :style="{ marginTop: textDistance + 'rpx', fontSize: fontSize + 'rpx' }">{{ item.name }}</text>
        </u-grid-item>
    </u-grid>
</template>

<script>
export default {
    name: 'drag-base-grid',
    props: {
        list: {
            type: Array,
            default: () => [
                {
                    name: '图片',
                    icon: 'uview:photo'
                },
                {
                    name: '预警',
                    icon: 'hx-icon:hx-icon-yujing'
                },
                {
                    name: '自定义图片',
                    icon: 'image:http://img.lemeitu.com/m00/2f/50/840c937f211bd6b195d919b267263f59__w.jpg'
                },
                {
                    name: '沙漏',
                    icon: 'uview:hourglass',
                    iconColor: '#2979ff'
                },
                {
                    name: '首页',
                    icon: 'uview:home'
                },
                {
                    name: '星星',
                    icon: 'uview:star',
                    iconBoxbackground: '#2979ff',
                    iconColor: '#ffffff'
                }
            ]
        },
        col: {
            type: Number,
            default: 3
        },
        border: {
            type: Boolean,
            default: true
        },
        align: {
            type: String,
            default: 'left'
        },
        itemHeight: {
            type: Number,
            default: 200
        },
        iconBoxSize: {
            type: Number,
            default: 60
        },
        iconBoxbackground: {
            type: String,
            default: 'transpanent'
        },
        iconBoxRadius: {
            type: Number,
            default: 8
        },
        iconSize: {
            type: Number,
            default: 24
        },
        iconColor: {
            type: String,
            default: '#2979ff'
        },
        fontSize: {
            type: Number,
            default: 32
        },
        textDistance: {
            type: Number,
            default: 8
        }
    },
    computed: {
        textStyle() {
            let style = {}
            if (this.bgColor) style['backgroundColor'] = this.bgColor
            return style
        }
    }
}
</script>

<style lang="scss" scoped>
@import url(#{$drag-static-path+'/iconfont/iconfont.css'});
.icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
