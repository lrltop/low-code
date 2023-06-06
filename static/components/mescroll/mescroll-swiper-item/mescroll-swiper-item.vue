<template>
    <view>
        <mescroll-body v-if="!inSwiper" ref="mescrollRef" :top="top" @init="mescrollInit" @down="downCallback" @up="upCallback">
            <slot></slot>
        </mescroll-body>

        <mescroll-uni
            v-else
            ref="mescrollRef"
            class="list-mescroll"
            :down="downOption"
            :up="upOption"
            @init="mescrollInit"
            @down="downCallback"
            @up="upCallback"
        >
            <slot></slot>
        </mescroll-uni>
    </view>
</template>

<script>
import mescrollUni from '../mescroll-uni.vue'
import MescrollMixin from '../mescroll-mixins.js'

import mescrollBody from '../mescroll-body.vue'

export default {
    name: 'mescroll-swiper-item',
    components: { mescrollUni, mescrollBody },
    mixins: [MescrollMixin],
    props: {
        index: {
            type: Number,
            default: 0
        },
        currentIndex: {
            type: Number,
            default: -1
        },
        height: {
            type: [Number, String],
            default: 100
        },
        top: {
            type: [String, Number],
            default: 0
        }
    },
    data() {
        return {
            inSwiper: false,
            downOption: {
                auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
            },
            upOption: {
                auto: false, // 不自动加载
                page: {
                    size: 10 // 每页数据的数量,默认10
                },
                noMoreSize: 4,
                empty: {
                    use: false
                }
            },
            list: [], //列表数据
            loaded: false,
            isInit: false
        }
    },
    watch: {
        currentIndex(val) {
            if (this.index == val && !this.isInit) this.mescrollTrigger()
        }
    },
    mounted() {
        if (this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$el.id == 'meScrollSwiper') {
            this.inSwiper = true
        }
    },
    methods: {
        mescrollInit(mescroll) {
            this.mescroll = mescroll

            // 自动加载当前tab的数据
            // if (this.index === this.currentIndex) {
            if (this.inSwiper) this.mescrollTrigger()
            // }
        },
        // 主动触发加载
        mescrollTrigger() {
            this.isInit = true // 标记为true
            if (this.mescroll) {
                if (this.mescroll.optDown.use) {
                    this.mescroll.triggerDownScroll()
                } else {
                    this.mescroll.triggerUpScroll()
                }
            }
        },
        downCallback() {
            if (this.mescroll.optUp.use) {
                this.mescroll.resetUpScroll()
            } else {
                setTimeout(() => {
                    this.mescroll.endSuccess()
                }, 500)
            }
        },
        async upCallback(page) {
            this.$emit('upCallback', {
                mescroll: this.mescroll,
                page
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.list-mescroll {
    height: calc(100vh - 64rpx);
}
</style>
