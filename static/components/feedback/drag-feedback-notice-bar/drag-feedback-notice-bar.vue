<template>
    <u-notice-bar
        :custom-style="{ ... componentRootNoodStyle, 'background-color': bgColor || componentRootNoodStyle['background-color']}"
        :text="overText"
        :direction="direction"
        :step="step"
        :icon="icon"
        :mode="mode"
        :color="color || componentRootNoodStyle.color"
        :bgColor="bgColor"
        :speed="speed"
        :fontSize="fontSize"
        :duration="duration"
        :disableTouch="disableTouch"
        @click="handlerClick"
        @close="handlerClose"
    ></u-notice-bar>
</template>

<script>
import props from './props.js'
export default {
    name: 'drag-feedback-notice-bar',
    mixins: [props],
    props: {
        texts: {
            type: Array,
            default: _ => ['滚动通知']
        },
        componentRootNoodStyle: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        overText() {
            if (this.direction === 'row' && !this.step) {
                return this.texts[0]
            } else {
                return this.texts
            }
        }
    },
    methods: {
        handlerClick(index) {
            if (this.direction === 'row' && !this.step) {
                index = 0
            }
            this.$emit('click', {
                index,
                text: this.texts[index]
            })
        },
        handlerClose(e) {
            this.$emit('close', close)
        }
    }
}
</script>

<style scoped lang="scss"></style>
