<template>
    <u-tooltip 
        :text="text"
        :copyText="copyText"
        :size="size"
        :color="color"
        :bgColor="bgColor"
        :direction="direction"
        :zIndex="zIndex"
        :showCopy="showCopy"
        :buttons="buttons"
        :overlay="overlay"
        :showToast="showToast"
        @click="handlerClick"
    ></u-tooltip >
</template>

<script>
    import props from './props.js';
    export default {
        name: 'drag-feedback-tooltip',
        mixins: [props],
        methods: {
            handlerClick(index){
                this.$emit('click', this.buttons[index])
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
