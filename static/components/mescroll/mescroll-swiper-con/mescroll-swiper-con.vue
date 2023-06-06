<template>
    <view>
        <me-tabs v-model="currentTabIndex" :tabs="tabs" :tab-width="tabWidth"></me-tabs>
        <swiper id="meScrollSwiper" class="list-body" :current="currentTabIndex" @change="swiperChange">
            <swiper-item v-for="(item, index) in tabs" :key="index">
                <slot :name="'slot-' + index"></slot>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
import meTabs from '../components/me-tabs.vue'
export default {
    name:'mescroll-swiper-con',
    components: {
        meTabs
    },
    props: {
        tabs: {
            type: Array,
            default: () => [{ name: '全部' }, { name: '分类一' }, { name: '分类二' }]
        },
        tabWidth: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            currentTabIndex: 0
        }
    },
    watch: {
    },
    onLoad() {
    },
    onUnload() {},
    methods: {
        swiperChange(e) {
            this.currentTabIndex = e.detail.current
        },
    }
}
</script>

<style lang="scss" scoped>
.list-body {
    padding-top: 64rpx;
    height: calc(100vh - 64rpx);
}
</style>
