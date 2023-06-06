<template>
    <progress v-bind="$props" 
    fontSize="30rpx"
    @click="$emit('click', $event)" @activeend="$emit('activeend', $event)" />
</template>

<script>
    export default {
        name: 'drag-base-progress',
        props:{
            percent: {
                type: Number,
                default: 50
            },
            showInfo: {
                type: Boolean,
                default: false
            },
            borderRadius: {
                type: [Number, String],
                default: 0
            },
            fontSize: {
                type: [Number, String],
                default: 16
            },
            activeColor: {
                type: String,
                default: '#09BB07'
            },
            backgroundColor: {
                type: String,
                default: '#EBEBEB'
            },
            active: {
                type: Boolean,
                default: false
            },
            activeMode: {
                type: String,
                default: 'backwards'
            },
            duration: {
                type: Number,
                default: 30
            }
        }
    }
</script>

<style scoped>

</style>
