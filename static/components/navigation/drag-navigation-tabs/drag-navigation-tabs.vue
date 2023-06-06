<template>
    <view>
        <u-tabs
            :duration="duration"
            :list="overList"
            :lineColor="lineColor"
            :lineWidth="lineWidth"
            :lineHeight="lineHeight"
            :lineBgSize="lineBgSize"
            :scrollable="scrollable"
            :current="overCurrent"
            :activeStyle="{
                color: activeTextColor
            }"
            :inactiveStyle="{
                color: inactiveTextColor
            }"
            keyName="text"
            @click="handlerClick"
            @change="handlerChange"
        ></u-tabs >
        <view>
            <template v-for="(item,index) in list">
                <view
                    v-if="index === overCurrent"
                    :key="index"
                >
                    <slot
                        :name="'slot-' + index"
                    ></slot>
                </view>
            </template>
        </view>
    </view>
</template>

<script>
    import props from './props.js';
    export default {
        name: 'drag-navigation-tabs',
        mixins: [props],
        props: {
            activeTextColor: {
                type: String,
                default: 'rgb(48, 49, 51)'
            },
            inactiveTextColor: {
                type: String,
                default: '#606266'
            },
            list: {
                type: Array,
                default: _ => [
                    {text: '菜单1'},
                    {text: '菜单2'},
                    {text: '菜单3'},
                    {text: '菜单4'}
                ]
            }
        },
        data(){
            return {
                overCurrent: 0
            }
        },
        computed: {
            overButtons(){
                return this.buttons.map(e => e.text)
            },
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
            }
        },
        methods: {
            handlerClick(e){
                this.overCurrent = e.index
                this.$emit('click',{ 
                    index: e.index,
                    item: this.list[e.index]
                })
            },
            handlerChange(e){
                this.overCurrent = e.index
                this.$emit('change', {
                    index: e.index,
                    item: this.list[e.index]
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
