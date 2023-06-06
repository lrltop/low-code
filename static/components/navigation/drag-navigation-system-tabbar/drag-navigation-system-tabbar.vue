<template>
    <u-tabbar
    	:value="currentIndex"
    	:fixed="true"
    	:placeholder="true"
    	:safeAreaInsetBottom="true"
        :activeColor="tabbarConfig.selectedColor"
        :inactiveColor="tabbarConfig.color"
        :customStyle="{
            backgroundColor: tabbarConfig.backgroundColor
        }"
    	@change="handlerClick"
    >
    	<drag-navigation-system-tabbar-item 
            v-for="(item,index) in tabbarList"
            :key="index"
            :text="item.text" 
            :icon="currentPage && currentPage === item.pagePath ? item.selectedIconPath : item.iconPath" 
            :dot="item.dot"
            :badge="item.badge"
            :max="item.max || 999"
        ></drag-navigation-system-tabbar-item>
    </u-tabbar>
</template>

<script>
    /**
     * 内置处理tabbar
     */
    import { mapState } from 'vuex';
    export default {
        name: 'drag-navigation-system-tabbar',
        data(){
            return {
                currentPage: ''
            }
        },
        computed: {
            ...mapState({
                tabbarList: state => state.$app.tabbarList,
                tabbarConfig: state => state.$app.tabbarConfig
            }),
            currentIndex(){
                if(this.currentPage){
                    return this.tabbarList.findIndex(e => e.pagePath === this.currentPage)
                }
                return -1
            }
        },
        created() {
            this.init()
        },
        methods: {
            init(){
                uni.hideTabBar();
                let pages = getCurrentPages();
                this.currentPage = '/' + pages[pages.length - 1].route;
            },
            handlerClick(index){
                if(index !== this.currentIndex){
                    // pages_index_index
                    let ueRoute = this.tabbarList[index].pagePath.replace(/\//g, '_')
                    ueRoute = ueRoute.substring(1, ueRoute.length)
                    this.ue.switchTab(ueRoute)
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
