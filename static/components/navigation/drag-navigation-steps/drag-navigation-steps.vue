<template>
    <u-steps 
        :direction="direction"
        :current="overCurrent"
        :activeColor="activeColor"
        :inactiveColor="inactiveColor"
        :activeIcon="activeIcon"
        :inactiveIcon="inactiveIcon"
        :dot="dot"
    >
    	<u-steps-item 
            v-for="(item,index) in list"
            :key="index"
            :title="item.title"
            :desc="item.desc"
            :iconSize="iconSize"
            :error="item.error"
        >
        </u-steps-item>
    </u-steps>
</template>

<script>
    import props from './props.js';
    export default {
        name: 'drag-navigation-steps',
        mixins: [props],
        props: {
            list: {
                type: Array,
                default: _ => {
                    return [
                        {title: "步骤1", desc: "", error: false},
                        {title: "步骤2", desc: "", error: false},
                        {title: "步骤3", desc: "", error: false}
                    ]
                } 
            } 
        },
        data(){
            return {
                overCurrent: 0
            }
        },
        watch: {
            current(index){
                this.overCurrent = index
            },
            overList(list){
                this.overCurrent = Math.min(this.overCurrent, list.length - 1)
            }
        },
        methods: {
            handlerChange(e){
                this.overCurrent = e
                this.$emit('change', {
                    index: e,
                    item: this.list[e]
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    /deep/ *{
        zoom: 1;
    }
</style>
