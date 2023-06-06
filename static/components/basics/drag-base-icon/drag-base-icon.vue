<template>
    <view class="icon-custom" @click="$emit('click', $event)">
        <template v-if="iconGroup == 'uview'">
            <u-icon :name="iconName" :size="size" :color="color"></u-icon>
        </template>
        <template v-else>
            <i class="drag-base-icon" :class="`${iconGroup} ${iconName}`" :style="{ color: color, fontSize: $u.addUnit(size) }"></i>
        </template>
    </view>
</template>

<script>
export default {
    name: 'drag-base-icon',
    props: {
        type: {
            type: String,
            default: 'hx-icon:hx-icon-gonggao'
        },
        color: {
            type: String,
            default: '#409EFF'
        },
        size: {
            type: String,
            default: '32rpx'
        }
    },
    data() {
        return {
            iconName: '',
            iconGroup: ''
        }
    },
    watch: {
        type: {
            handler(val) {
                this.iconGroup = val.split(':')[0]
                this.iconName = val.split(':')[1]
            },
            immediate: true
        }
    }
}
</script>

<style scoped lang="scss">
@import url(#{$drag-static-path+'/iconfont/iconfont.css'});
.icon-custom {
    display: inline-block;
    padding: 4px;
}
.drag-base-icon {
    vertical-align: middle;
}
</style>
