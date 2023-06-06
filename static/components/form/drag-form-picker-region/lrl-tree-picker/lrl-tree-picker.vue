<template>
    <u-popup :show="show" mode="bottom" closeable :bgColor="bgColor" round="10" @close="popupShow" >
        <view class="lrl-tree-picker" :style="[boxStyle]" @touchmove.stop.prevent="stopPropagation">
            <view class="lrl-tree-picker__title">
                <text v-if="title" class="lrl-tree-picker__title--text" :style="[titleStyle]">{{ title }}</text>
                <slot name="title"></slot>
            </view>
            <view class="lrl-tree-picker__tabs">
                <scroll-view 
                    class="lrl-tree-picker__tabs__scroll" 
                    :scroll-x="true"
                    :scroll-with-animation="true" 
                    :scroll-into-view="'tree-' + intoViewId"
                >
                    <view class="lrl-tree-picker__tabs__scroll__box">
                        <text 
                            v-for="(item, index) in activeList" :key="index"
                            :id="'tree-' + index"
                            :class="[
                                'lrl-tree-picker__tabs__cell',
                                activeCurrent == index && !showPlease ? 
                                    'lrl-tree-picker-tabs--active' : 'lrl-tree-picker-tabs--inactive'
                            ]"
                            :style="[activeCurrent == index && !showPlease ? tabsActiveStyle : tabsInactiveStyle]"
                            @click="tabSwitch(item, index)"
                         >{{ item[mapKey.text] }}</text>
                        <text v-if="showPlease"
                            id="tree-choose"
                            class="lrl-tree-picker__tabs__cell lrl-tree-picker-tabs--please"
                        >
                            请选择
                        </text>
                    </view>
                </scroll-view>
            </view>
            <view id="dataview" class="lrl-tree-picker__dataview">
                <swiper 
                    v-if="optionMode == 'swiper'" 
                    class="lrl-tree-picker__swiper" 
                    :current="swiperCurrent" 
                    @change="swiperChange"
                >
                    <swiper-item v-for="(list,index) in activeSeletctList" :key="index" 
                        class="lrl-tree-picker__swiper__item"
                     >
                        <lrlTreePickerScroll
                            :key="getKey('swiperList-', index)" 
                            optionMode="swiper"
                            :listIndex="index"
                            :list="list"
                            :checkedValue="activeList[index] ? activeList[index][mapKey.value] : ''"
                            @choose="choose($event, index)"
                        ></lrlTreePickerScroll>
                    </swiper-item>
                </swiper>
                <template v-else>
                    <template v-for="(item,index) in activeSeletctList" >
                        <lrlTreePickerScroll
                            v-if="index === swiperCurrent"
                            :key="getKey('arrayScroll-', index)"
                            optionMode="array"
                            :listIndex="index"
                            :list="activeSeletctList[index]"
                            :checkedValue="activeList[index] ? activeList[index][mapKey.value] : ''"
                            @choose="choose($event, index)"
                        ></lrlTreePickerScroll>
                    </template>
                    
                </template>
<!-- <lrlTreePickerScroll
    v-else
    key="arrayPickerScroll"
    optionMode="array"
    :listIndex="swiperCurrent"
    :list="activeSeletctList[swiperCurrent]"
    :checkedValue="activeList[swiperCurrent] ? activeList[swiperCurrent][mapKey.value] : ''"
    @choose="choose($event, swiperCurrent)"
    ></lrlTreePickerScroll> -->
                <view 
                    v-if="loading && loadingBanTap" 
                    class="lrl-tree-picker__dataview__loadingMask"
                    @touchmove.stop.prevent="stopPropagation"
                ></view>
                <template v-if="loading" >
                    <!-- #ifdef APP-NVUE -->
                    <view class="lrl-tree-picker__dataview__loadingNvue" :style="[loadingBoxNvueStyle]" >
                    <!-- #endif -->
                        <view 
                            v-if="loadingMode != 'none'"
                            class="lrl-tree-picker__dataview__loadingIcon" 
                        >   
                            <slot name="loading">
                                <u-loading-icon
                                    :size="sizeUnit(loadingSize)"
                                    :color="loadingColor"
                                    :mode="loadingMode"
                                    ></u-loading-icon>
                            </slot>
                        </view>
                        
                    <!-- #ifdef APP-NVUE -->
                    </view>
                    <!-- #endif -->
                </template>
            </view>
            
            <view class="lrl-tree-picker__tools">
                <text class="lrl-tree-picker__tools__empty" @click="empty()">清空</text>
                <button 
                    class="lrl-tree-picker__tools__button" 
                    type="primary" 
                    :style="[{backgroundColor: confirmBtnStyle.bgColor}]"
                    @click="confirm()"
                >
                    <text 
                        class="lrl-tree-picker__tools__button__text"
                        :style="[{color: confirmBtnStyle.color}]"
                    >确 认</text>
                </button>
            </view>
        </view>
        
    </u-popup>
</template>

<script>
    import { deepClone, debounce, throttle, timeWait} from './tools.js';
    import mixin from './mixin.js'
    import lrlTreePickerScroll from './lrl-tree-picker-scroll.vue';
    /**
     * TreePicker 无限级联选择器
     * @description [app|app-nvue|h5|mp-weixin] 基于 u-popup u-loading-icon 的底部弹出无限级联选择器，通过调用组件 open 打开选择并设置默认选择（可调用 setActive 设置默认选择）
     * @author liruilin
     * @property {String}         title              选择器顶部标题
     * @property {Array}          localdata          选择数据，datacom组件数据格式，可设置 map 属性设置对应key，children 仅在mode = children 时生效
     * @property {String}         mode = [children|array] 数据结构模式
     *  @value children 父子层级数据，适用于一次性拉取完毕数据
     *  @value array 数组排列层级数据，适用于接口动态请求，可通过 change 事件去设置loading并获取网络数据
     * @property {String}         optionMode = [swiper|single] 选项列表展示方式，选择数据量过大出现swiper滑动卡顿时可以使用 single 单一列表模式
     *  @value swiper swiper展示模式，动态体验更好
     *  @value single 单一列表展示，每次只渲染当前列表，选择数据量过大出现swiper滑动卡顿时使用此模式
     * @property {Boolean}        loading = [true|false]        加载loading显示状态，关联属性 loadingBanTap
     * @property {Boolean}        loadingBanTap = [true|false]  在loading时禁止点击操作，默认true
     * @property {String}         loadingMode = [circle|spinner|semicircle|none] 加载图标样式，自u-loading-icon组件，nvue样式会与其他端有所不同，如需自定义，使用插槽 loading 即可(nvue的插槽宽度限制120rpx，超出将会裁剪)
     *  @value circle 圆形
     *  @value spinner 花朵形
     *  @value semicircle 半圆形
     *  @value none 不显示
     * @property {Nuber}          loadingSize        加载图标大小，默认单位rpx，默认值50
     * @property {String}         loadingColor       加载图标颜色，默认 #68b2ce
     * @property {String|Number}  height = [fullScreen] 选择器高度，默认单位rpx，默认值700，可选 fullScreen 为满屏，设置的高度超过屏幕会自动满屏
     *  @value fullScreen 满屏
     * @property {String}         bgColor            选择器背景颜色
     * @property {Object}         map                {text, value, children} 数据key映射，text为显示文字映射，value为唯一值映射，children为子集映射
     * @property {Object}         titleStyle         标题样式
     * @property {Object}         tabsActiveStyle    横向tab已选择展示数据样式，默认为底部边框，非nvue推荐使用deep修改.lrl-tree-picker-tabs--active样式 
     * @property {Object}         tabsInactiveStyle  横向tab未选择展示数据样式，默认为底部边框，非nvue推荐使用deep修改.lrl-tree-picker-tabs--inactive样式
     * @property {Object}         cellActiveStyle    竖向选择数据选中样式，默认颜色#007aff，非nvue推荐使用deep修改.lrl-tree-picker-cell--active样式
     * @property {Object}         cellInactiveStyle  竖向选择数据未选中样式，默认颜色#333333，非nvue推荐使用deep修改.lrl-tree-picker-cell--inactive样式
     * @property {Object}         confirmBtnStyle    确认按钮样式{ bgColor, color }
     * @property {String}         tapHandlerMode = [throttle|debounce] 点击选择事件处理方式，都为立即执行事件
     *  @value throttle 节流处理
     *  @value debounce 防抖处理
     * @property {Number}         tapHandlerTime     选择事件防抖/节流处理时间，单位ms，默认100
     * @property {Boolean}        openJumpPosition = [true|false] 下次打开时是否自动滚动到已选择项上，默认 true
     * @property {Boolean}        finishAutoClose  = [true|false] 选择到最后一级时是否自动关闭并触发confirm事件，默认 false
     * @event    {Function}       confirm            点击确认或选择到最后一级触发，携带以父到子依次排列数组形式选择数据，此数据格式同为设置默认选择 setActive 数据格式
     * @event    {Function}       empty              点击清空按钮触发
     * @event    {Function}       change             在选择了一项数据后触发，可在mode = array的时用于动态请求接口获取数据
     * @example <lrl-tree-picker ref="lrlTreePicker" :localdata="localdata"></lrl-tree-picker>
     */
    export default {
        name: 'lrl-tree-picker',
        components: {
            lrlTreePickerScroll
        },
        mixins: [
            mixin
        ],
        props: {
            localdata: {
                type: Array,
                default: () => {
                    return []
                }
            },
            mode: {
                type: String,
                default: 'children'
            },
            optionMode: {
                type: String,
                default: 'swiper'
            },
            loading: {
                type: Boolean,
                default: false
            },
            loadingBanTap: {
                type: Boolean,
                default: true
            },
            loadingColor: {
                type: String,
                default: '#68b2ce'
            },
            loadingSize: {
                type: [Number, String],
                default: 50
            },
            loadingMode: {
                type: String,
                default: 'spinner'
            },
            height: {
                type: [String, Number],
                default: 1100
            },
            bgColor: {
                type: String,
                default: '#FFF'
            },
            title: {
                type: String,
                default: ''
            },
            map: {
                type: Object,
                default: () => {
                    return {
                        text: 'text',
                        value: 'value',
                        children: 'children'
                    }
                }
            },
            titleStyle: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            tabsActiveStyle: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            tabsInactiveStyle: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            cellActiveStyle: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            cellInactiveStyle: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            confirmBtnStyle: {
                type: Object,
                default: () => {
                    return {
                        bgColor: '#007aff',
                        color: '#fff'
                    }
                }
            },
            tapHandlerMode: {
                type: String,
                default: 'throttle'
            },
            tapHandlerTime: {
                type: Number,
                default: 100
            },
            openJumpPosition: {
                type: Boolean,
                default: true
            },
            finishAutoClose: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                show: false,        // u-popup 打开关闭状态
                dataloading: false, // 加载显示状态
                intoViewId: '',     // 已选择栏目设置滚动id
                activeCurrent: 0,   // 当前选择位置
                swiperCurrent: 0,   // swiper位置
                activeList: [],     // 已选择级联列表
                activeSeletctList: [],
                loadingBoxNvueStyle: {}
            }
        },
        computed: {
            /**
             * 合并映射key
             */
            mapKey(){
                return Object.assign({
                    text: 'text',
                    value: 'value',
                    children: 'children'
                }, this.map)
            },
            boxStyle(){
                /**
                 * 计算高度，选择器高度不能大于屏幕高度
                 */
                let systemInfo = uni.getSystemInfoSync(),
                    maxHeight = systemInfo.safeArea.height,
                    heightPx = this.height === 'fullScreen' ? maxHeight : this.sizeRpx2px(this.height)
                // #ifdef APP-PLUS
                // app端需减去手机状态栏高度
                // maxHeight -= (systemInfo.statusBarHeight)
                // #endif
               
                // #ifdef MP
                // 小程序需要减去右上角胶囊高度，TODO 支付宝小程序高度计算
                let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
                maxHeight -= (menuButtonInfo.height + menuButtonInfo.top - systemInfo.statusBarHeight)
                // #endif
                return {
                    height: Math.min(heightPx, maxHeight) + 'px'
                }
            },
            showPlease(){
                return this.activeSeletctList.length > this.activeList.length && this.swiperCurrent == this.activeList.length
            },
            tapModeObserver(){
                return {
                    type: this.tapHandlerMode,
                    time: this.tapHandlerTime
                }
            }
        },
        watch: {
            localdata: {
                deep: true,
                handler(newList, oldList){
                    // TODO 在选项数据发生改变时重新计算待选列表
                    // if(this.mode == 'array'){
                        this.countList(this.activeList)
                        // this.activeSeletctList
                    // }
                }
            },
            // 监听事件处理方式改变，设置
            tapModeObserver: {
                immediate: true,
                handler({type, time}){
                    this.chooseHd = null
                    let fn = type == 'throttle' ? throttle : debounce
                    this.chooseHd = fn.apply(this, [function(){
                        this._choose(...arguments)
                    }, time, true])
                }
            }
            
        },
        created() {
            // 在open的时候自定义参数，将在 confirm 和 empty 回调返回
            this.customParam = ''
            // 点击选择处理
            this.chooseHd
            // 滚动列表组件
            this.children = []
        },
        methods: {
            /**
             * 做一层防抖处理，免去修改this
             */
            choose(){
                this.chooseHd(...arguments)
            },
            /**
             * 点击 选择
             */
            async _choose({item, index}, parentIndex){
                // 删除当前选择层级后的已选择数据
                let delData = this.activeList.splice(parentIndex + 1, this.activeList.length)
                // 点击选择删除多余的选择列表，以免反复选择造成的组件状态保留，例如滚动位置...
                this.activeSeletctList.splice(parentIndex + 1 , this.activeSeletctList.length)
                await this.$nextTick()
                // 把当前选择数据添加到已选择列表
                let addData = deepClone(item)
                if(this.mode == 'children'){
                    let childrenList = addData[this.mapKey.children]
                    if(Array.isArray(childrenList) && childrenList.length){
                        this.activeSeletctList.push(childrenList)
                    }
                    // * 清楚不必要的子集数据
                    delete addData[this.mapKey.children]
                }else {
                    // array数据格式直接查找下一级索引
                    if(this.localdata[parentIndex + 1]){
                        this.activeSeletctList.push(this.localdata[parentIndex + 1])
                    }
                }
                if(
                    // 判断是否重复点击，重复点击不触发change
                    (this.activeList[parentIndex] || {})[this.mapKey.value] == addData[this.mapKey.value] &&
                    // 如有被删减掉的数据说明在上一级重新选择过
                    !delData.length
                ){
                    this.$set(this.activeList, parentIndex, addData)
                }else {
                    this.$set(this.activeList, parentIndex, addData)
                    this.$emit('change', {
                        value: deepClone(this.activeList),
                        custom: this.customParam
                    })
                }
                
                
                await this.resetPosition()
                // 选择到最后一级自动关闭
                if(!this.activeSeletctList[this.activeList.length] && this.finishAutoClose){
                    this.confirm()
                }
            },
            /**
             * 点击已选择项切换
             */
            tabSwitch(item, index){
                this.activeCurrent = index
                this.swiperCurrent = index
                this.$nextTick(() => {
                    this.intoListChecked(this.swiperCurrent)
                })
                this.setActiveIntoViewId(index - 1)
            },
            swiperChange(e){
                this.activeCurrent = e.detail.current
                this.swiperCurrent = e.detail.current
                this.intoListChecked(this.swiperCurrent)
                this.setActiveIntoViewId(this.activeCurrent)
            },
            // 设置滚动list滚动到已选择
            intoListChecked(index){
                if(this.openJumpPosition){
                    this.$nextTick(() => {
                        this.children[this.optionMode == 'swiper' ? index : 0].intoChecked()
                    })
                }
            },
            /**
             * 设置横向已选择滚动位置，id不带 tree- 前缀
             * @param id
             */
            setActiveIntoViewId(id){
                if(id == this.intoViewId){
                    this.intoViewId = ''
                }
                this.$nextTick(function(){
                    this.intoViewId = id
                })
            },
            /**
             * 打开选择器，为外部调用方法
             * @param {*} params 传入自定义参数，confirm 和 empty 时返回，多用于业务类型判断。
             * @param {Array} aclist 默认选择数据，格式[{text,value}]，为数组依次排列
             */
            async open(params = null, aclist){
                this.popupShow()
                // 目前发现在微信小程序端，popup关闭后scorll组件实例并不会销毁，这里手动初始化一次
                this.children.forEach(vm => {
                    vm.init()
                })
                
                this.customParam = params
                // 设置默认选择
     //            if(Array.isArray(aclist) || !this.activeList.length ){
					// await timeWait(300)
					// this.setActive(aclist || [])
     //            }
				await timeWait(300)
				this.setActive(aclist || this.activeList)
                this.$nextTick(function(){
                    this.setActiveIntoViewId(this.activeList.length - 1)
					this.intoListChecked(Math.max(this.activeList.length - 1, 0))
                    // #ifdef APP-NVUE
                    this.loadingPosition()
                    // #endif
                })
            },
            /**
             * 设置默认选择，可为外部调用方法
             * @param {Array} list 默认选择数据，已对象数组 [{text, value}] 父到子依次排列
             */
            setActive(list){
                if(Array.isArray(list)){
                    this.countList(deepClone(list))
                    this.activeList = deepClone(list)
                    this.$nextTick(() => {

						// this.intoListChecked(this.children.length - 1)
						this.intoListChecked(Math.max(this.activeList.length - 1, 0))
                    })
                }
            },
            /**
             * 根据已选列表设置待选列表。
             * @param {Object} list [{text, value}]
             */
            countList(list){
                let map = this.mapKey
                if(this.mode == 'children'){
                    // 默认第一级为localdata第一层
                    let sList = [
                            // this.localdata.map(ele => { 
                            //     return { 
                            //         [map.text]: ele[map.text], 
                            //         [map.value]: ele[map.value]
                            //     }
                            // })
                            this.localdata
                        ],
                        // 循环保留上一级，用于依次查找
                        parent = this.localdata
                        
                    for(let i = 0; i< list.length; i++){
                        let acitem = list[i]
                        // i = 0 第一次直接在第一级查找，而不是children
                        let findData = i === 0 ? parent : parent[map.children]
                        if(Array.isArray(findData) && findData.length){
                            let find = findData.find(f => {
                                // 关键判断 value ，判断是否数据此层级数据
                                return acitem[map.value] == f[map.value]
                            })
                            // 查找到属于当前层级
                            if(find) {
                                // 保存当前层级，用于下一次循环参照
                                parent = find
                                // 判断是否还有下一级数据，有就push到swiperList中，以供界面选择
                                if(Array.isArray(find[map.children]) && find[map.children].length){
                                    sList.push(find[map.children])
                                }
                            }else {
                                break
                            }
                        }else {
                            break
                        }
                    }
                    this.activeSeletctList = sList
                }else {
                    let length = list.length,
                        sList = []
                    for(let i = 0;i < length; i++){
                        let currData = this.localdata[i]
                        // 当前已选择层级数据存在于 当前层级 列表中就进行添加list
                        let has = !!currData && currData.some((item) => {
                            return item[map.value] == list[i][map.value]
                        })
                        if(has){
                            sList.push(currData)
                        }else {
                            break
                        }
                    }
                    if(sList.length == list.length && this.localdata.length > sList.length){
                        sList.push(this.localdata[sList.length])
                    }
                    this.activeSeletctList = length > 0 ? sList : [this.localdata[0]]
                }
                this.resetPosition()
            },
            async resetPosition(){
                await this.$nextTick()
                // 设置当前选择位置到最后一层
                this.activeCurrent = this.activeList.length - 1
                this.swiperCurrent = this.activeSeletctList.length - 1
                // 如果swiper列表数量大于已选列表说明还有下一级，滚动到 请选择 标签上
                if(this.swiperCurrent > this.activeCurrent){
                    // 设置滚动位置到 已选择 标签上
                    this.$nextTick(function(){
                        this.setActiveIntoViewId('choose')
                    })
                }else {
                    this.activeCurrent = this.activeList.length - 1
                    this.setActiveIntoViewId(this.activeCurrent)
                }
            },
            /**
             * 因nvue不支持百分比，通过动态查询设置loading 图标百分比位置
             */
            loadingPosition(){
                // #ifdef APP-NVUE
                let query = uni.createSelectorQuery().in(this)
                query.select('#dataview').boundingClientRect(viewRect => {
                    // TODO nvue 暂时用upx转换计算位置
                    let boxW = uni.upx2px(120)
                    this.loadingBoxNvueStyle = {
                        'top':  (viewRect.height * 0.35 - boxW / 2) + 'px',
                        'left': (viewRect.width / 2 - boxW / 2) + 'px'
                    }
                })
                .exec()
                // #endif
            },
            /**
             * 外部调用关闭
             */
            close(){
                this.popupShow()
            },
            /**
             * 控制打开状态
             */
            popupShow(){
                this.show = !this.show
                if(!this.show){
                    this.dataloading = false
                }
            },
            /**
             * 确定选择
             */
            confirm() {
                this.$emit('confirm', {
                    value: deepClone(this.activeList),
                    custom: this.customParam
                })
                this.popupShow()
            },
            /**
             * 清空选择
             */
            empty(){
                this.activeCurrent = 0
                this.swiperCurrent = 0
                this.activeList = []
                this.countList([])
                this.$emit('empty', { custom: this.customParam })
            },
            // 取消冒泡
            stopPropagation(e) {
            	// #ifndef APP-NVUE
            	e.stopPropagation()
            	// #endif
            },
        }
    }
</script>

<style lang="scss" scoped>
    /* #ifndef APP-NVUE */
    view{
        display: flex;
        flex-direction: column;
    }
    /* #endif */
    
    $lrl-tree-picker-padding-top: 40rpx;
    $lrl-tree-picker-padding-right: 20rpx;
    $lrl-tree-picker-padding-bottom: 30rpx;
    $lrl-tree-picker-padding-left: 20rpx;
    // $lrl-tree-picker-title-height: 40rpx;
    $lrl-tree-picker-title-padding-top: 3rpx;
    $lrl-tree-picker-title-padding-bottom: 3rpx;
    $lrl-tree-picker-title-font-size: 36rpx;
    $lrl-tree-picker-title-font-weight: 600;
    $lrl-tree-picker-tabs-height: 90rpx;
    $lrl-tree-picker-tabs-margin-top: 20rpx;
    $lrl-tree-picker-tabs-border-bottom: 1px solid #f5f5f5;
    $lrl-tree-picker-tabs-cell-min-width: 200rpx;
    $lrl-tree-picker-tabs-cell-padding-right: 3rpx;
    $lrl-tree-picker-tabs-cell-padding-left: 3rpx;
    $lrl-tree-picker-tabs-cell-font-size: 30rpx;
    $lrl-tree-picker-tabs-cell-font-weight: 500;
    $lrl-tree-picker-tabs-cell-line-height: 90rpx;
    $lrl-tree-picker-dataview-border-bottom: 1px solid #f5f5f5;
    $lrl-tree-picker-loadingbox-width: 130rpx;
    $lrl-tree-picker-loadingbox-height: 130rpx;
    $lrl-tree-picker-tools-margin-top: 20rpx;
    $lrl-tree-picker-tools-empty-font-size: 30rpx;
    $lrl-tree-picker-tools-empty-color: #999;
    $lrl-tree-picker-tools-button-width: 400rpx;
    $lrl-tree-picker-tools-button-line-height: 40rpx;
    $lrl-tree-picker-tools-button-margin-right: 50rpx;
    $lrl-tree-picker-tools-button-padding: 20rpx;
    $lrl-tree-picker-tools-button-font-size: 32rpx;
    $lrl-tree-picker-tools-button-color: #FFFFFF;
    
    .lrl-tree-picker-tabs--active{
        border-bottom: 4rpx solid #007aff;
    }
    .lrl-tree-picker-tabs--inactive{
        
    }
    .lrl-tree-picker-tabs--please{
        color: #d0d0d0;
        border-bottom: 4rpx solid #007aff;
    }
    
    .lrl-tree-picker{
        padding-top: $lrl-tree-picker-padding-top;
        padding-right: $lrl-tree-picker-padding-right;
        padding-bottom: $lrl-tree-picker-padding-bottom;
        padding-left: $lrl-tree-picker-padding-left;
        
        &__title{
            align-items: center;
            // height: $lrl-tree-picker-title-height;
            padding-top: $lrl-tree-picker-title-padding-top;
            padding-bottom: $lrl-tree-picker-title-padding-bottom;
            &--text{
                font-size: $lrl-tree-picker-title-font-size;
                font-weight: $lrl-tree-picker-title-font-weight;
            }
        }
        
        &__tabs{
            flex-direction: row;
            // height: $lrl-tree-picker-tabs-height;
            margin-top: $lrl-tree-picker-tabs-margin-top;
            border-bottom: $lrl-tree-picker-tabs-border-bottom;
            &__scroll{
                flex: 1;
                flex-direction: row;
                flex-wrap: nowrap;
                white-space: nowrap;
                &__box{
                    /* #ifndef APP-NVUE */
                    width: max-content;
                    /* #endif */
                    flex-direction: row;
                }
            }
            &__cell{
                padding-left: $lrl-tree-picker-tabs-cell-padding-left;
                padding-right: $lrl-tree-picker-tabs-cell-padding-right;
                line-height: $lrl-tree-picker-tabs-cell-line-height;
                /* #ifndef APP-NVUE */
                min-width: $lrl-tree-picker-tabs-cell-min-width;
                display: block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                /* #endif */
                /* #ifdef APP-NVUE */
                width: $lrl-tree-picker-tabs-cell-min-width;
                lines: 1;
                text-overflow: ellipsis;
                /* #endif */
                text-align: center;
                font-size: $lrl-tree-picker-tabs-cell-font-size;
                font-weight: $lrl-tree-picker-tabs-cell-font-weight;
                white-space: nowrap;
                word-wrap: normal;
            }
        }
        
        &__dataview{
            position: relative;
            flex: 1;
            border-bottom: $lrl-tree-picker-dataview-border-bottom;
            &__loadingMask{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                // background-color: rgba(0,0,0,0.1);
            }
            &__loadingNvue{
                position: absolute;
                justify-content: center;
                align-items: center;
                width:  $lrl-tree-picker-loadingbox-width;
                height: $lrl-tree-picker-loadingbox-height;
            }
            &__loadingIcon{
                /* #ifndef APP-NVUE */
                position: absolute;
                top: 40%;
                left: 50%;
                transform: translate(-50%, -50%);
                /* #endif */
            }
        }
        
        &__swiper{
            flex: 1;
            &__item{
                flex: 1;
                /* #ifndef APP-NVUE */
                width: 100%;
                /* #endif */
                position: relative;
            }
        }
        
        
        &__tools{
            margin-top: $lrl-tree-picker-tools-margin-top;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: center;
            &__empty{
                font-size: $lrl-tree-picker-tools-empty-font-size;
                color: $lrl-tree-picker-tools-empty-color;
            }
            &__button{
                width: $lrl-tree-picker-tools-button-width;
                line-height: $lrl-tree-picker-tools-button-line-height;
                margin-right: $lrl-tree-picker-tools-button-margin-right;
				margin-left: 0;
                padding: $lrl-tree-picker-tools-button-padding;
                &__text{
                    font-size: $lrl-tree-picker-tools-button-font-size;
                    color: $lrl-tree-picker-tools-button-color;
                }
            }
        }
    }
</style>