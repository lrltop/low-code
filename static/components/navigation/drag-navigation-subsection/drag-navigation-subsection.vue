<template>
    <u-subsection 
        ref="subsection"
        :list="list" 
        :mode="mode"
        :current="overCurrent"
        :activeColor="activeColor"
        :fontSize="fontSize"
        :inactiveColor="inactiveColor"
        :bold="bold"
        :bgColor="bgColor"
        :keyName="keyName"
        @change="handlerChange"
    ></u-subsection>
</template>

<script>
    import props from './props.js';
    export default {
        name: 'drag-navigation-tabs',
        mixins: [props],
        data(){
            return {
                overCurrent: 0
            }
        },
        computed: {
            overList(){
                // 深拷贝一下list，uTabs会在list数据里面加一侧rect数据
                return JSON.parse(JSON.stringify(this.list))
            }
        },
        watch: {
            current(index){
                this.overCurrent = index
            },
            overList(list){
                this.overCurrent = Math.min(this.overCurrent, list.length - 1)
            },
            mode(){
                this.$nextTick(_ => {
                    this.$refs.subsection.init()
                })
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

</style>
