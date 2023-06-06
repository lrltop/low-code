<template>
    <scroll-view
        :key="getKey('lp-list-', listIndex)" 
        class="picker__list"
        :scroll-y="true" 
        :scroll-into-view="intoViewId"
        :scroll-with-animation="withAnimation"
        :scroll-top="scrollTop"
    >
        <view
            v-for="(item, index) in list"
            :id="getKey('cell-', listIndex, '-' , index)"
            :key="item[map.value]"
            @click="$emit('choose', {item, index})"
        >
            <text
                class="picker__list__cell" 
                :class="[
                    checkedValue === item[map.value] ? 'lrl-tree-picker-cell--active' : 'lrl-tree-picker-cell--inactive'
                ]"
                :style="checkedValue === item[map.value] ? cellActiveStyle : cellInactiveStyle"
            >
                {{ item[map.text] }}
            </text>
        </view>
        
    </scroll-view>
</template>

<script>
    import { findParent } from './tools.js';
    import mixin from './mixin.js'
    export default {
        name: 'lrl-tree-picker-scroll',
        mixins: [
            mixin
        ],
        props: {
            optionMode: {
                type: String,
                default: ''
            },
            // 当前列表所属索引
            listIndex: {
                type: Number,
                default: 0
            },
            // 当前列表选中value值
            checkedValue: {
                type: [String, Number],
                default: ''
            },
            list: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data(){
            return {
                intoViewId: '',
                map: {},
                cellActiveStyle: {},
                cellInactiveStyle: {},
                withAnimation: true,
                scrollTop: 0
            }
        },
        watch: {
            // 监听index变化，只有单一列表模式才会有此listIndex变化，swiper模式是循环出来的，不涉及到会切换listIndex
            listIndex: {
                handler(i){
                    if(![null, undefined, NaN, ''].includes(this.checkedValue)){
                        // 未有已选中就跳转到最顶部
                        this.withAnimation = false
                        this.scrollTop = -1
                        this.$nextTick(() => {
                            this.scrollTop = 0
                            this.withAnimation = true
                        })
                    }
                    
                }
            }
        },
        created() {
            this.init()
        },
        beforeDestroy(){
            let parent = findParent('lrl-tree-picker', this)
            if(this.optionMode === 'swiper'){
                parent.children.splice( this.listIndex, parent.children.length)
            }else {
                // parent.children = []
            }
        },
        methods: {
            // 初始化
            init(){
                let parent = findParent('lrl-tree-picker', this)
                // 是否已经自动跳转过位置
                this.hasInto = false
                // 字段映射
                this.map = parent.map
                // 选中样式
                this.cellActiveStyle = parent.cellActiveStyle
                // 未选中样式
                this.cellInactiveStyle = parent.cellInactiveStyle
                // console.log('初始化', this.optionMode, this.listIndex)
                if(this.optionMode === 'swiper'){
                    // swiper模式有多个list，所以需要通过索引设置当前组件 的位置
                    parent.children[this.listIndex] = this
                }else {
                    // 单一列表模式始终只有一个list
                    parent.children = []
                    parent.children[0] = this
                    // console.log('塞进', parent.children)
                }
                
            },
            // 滚动到已选择项上
            intoChecked(){
                // 如果有已选中就跳转到已选中项
                if(![null, undefined, NaN, ''].includes(this.checkedValue)){
                    if(
                        !(this.optionMode === 'swiper' && this.hasInto)
                    ){
                        let index =  + this.list.findIndex(e => e[this.map.value] == this.checkedValue)
                        // 如果未查找到就滚动到第一项
                        // index = index == -1 ? 0 : index
                        this.$nextTick(() => {
                            setTimeout(this.setIntoViewId, 200, 'cell-' + this.listIndex + '-' + index)
                        })
                    }
                    this.hasInto = true
                    return true
                }
                return false
            },
            // 跳转
            setIntoViewId(id){
                
                // 设置跳转id时如果相同不会触发scroll-view的滚动，因此清空一次
                if(id == this.intoViewId){
                    this.intoViewId = ''
                }
                this.$nextTick(function(){
                    this.intoViewId = id
                })

            }
            
        }
    }
</script>

<style lang="scss">
    $lrl-tree-picker-cell-active-color: #007aff;
    $lrl-tree-picker-cell-active-background-color: aliceblue;
    $lrl-tree-picker-cell-active-font-size: 32rpx;
    
    $lrl-tree-picker-cell-inactive-color: #333;
    $lrl-tree-picker-cell-inactive-font-size: 32rpx;
    
    $lrl-tree-picker-cell-padding: 20rpx;
    
    .lrl-tree-picker-cell--active{
        color: $lrl-tree-picker-cell-active-color;
        background-color: $lrl-tree-picker-cell-active-background-color;
        font-size: $lrl-tree-picker-cell-active-font-size;
    }
    .lrl-tree-picker-cell--inactive{
        color: $lrl-tree-picker-cell-inactive-color;
        font-size: $lrl-tree-picker-cell-inactive-font-size;
    }
    .picker{
        &__list{
            position: absolute;
            top: 8rpx;
            left: 0;
            right: 0;
            bottom: 0;
            &__cell{
                word-wrap: break-word;
                padding: $lrl-tree-picker-cell-padding;
                // nvue不能继承样式的原因，所以直接使用text标签作为修改样式元素
                /* #ifndef APP-NVUE */
                display: block;
                /* #endif */
            }
        }
    }
    
</style>