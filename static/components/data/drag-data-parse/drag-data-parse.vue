<template>
    <u-parse 
        v-if="show"
        :bgColor="bgColor"
        :content="content"
        :copyLink="copyLink"
        :domain="domain"
        :errorImg="errorImg"
        :lazyLoad="lazyLoad"
        :loadingImg="loadingImg"
        :pauseVideo="pauseVideo"
        :previewImg="previewImg"
        :scrollTable="scrollTable"
        :selectable="selectable"
        :setTitle="setTitle"
        :showImgMenu="showImgMenu"
        :tagStyle="tagStyle"
        :useAnchor="useAnchor"
        @load="emit('load', $event)"
        @ready="emit('ready', $event)"
        @error="emit('error', $event)"
        @imgTap="emit('imgTap', $event)"
        @linkTap="emit('linkTap', $event)"
    >
    </u-parse>
    
</template>

<script>
    export default{
        name: 'drag-data-parse',
        props: {
            bgColor: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: '<div style="color: red;">富文本<div>'
            },
            copyLink: {
        	  type: Boolean,
        	  default: uni.$u.props.parse.copyLink
            },
            domain: {
                type: String,
                default: ''
            },
            errorImg: {
        	  type: String,
        	  default: uni.$u.props.parse.errorImg
            },
            lazyLoad: {
        	  type: Boolean,
        	  default: uni.$u.props.parse.lazyLoad
            },
            loadingImg: {
        	  type: String,
        	  default: uni.$u.props.parse.loadingImg
            },
            pauseVideo: {
        	  type: Boolean,
        	  default: uni.$u.props.parse.pauseVideo
            },
            previewImg: {
        	  type: Boolean,
        	  default: uni.$u.props.parse.previewImg
            },
            scrollTable: Boolean,
            selectable: Boolean,
            setTitle: {
        	  type: Boolean,
        	  default: uni.$u.props.parse.setTitle
            },
            showImgMenu: {
        	  type: Boolean,
        	  default: uni.$u.props.parse.showImgMenu
            },
            tagStyle: {
                type: Object,
                default: _ => ({})
            },
            useAnchor: {
                type: [Boolean, Number],
                default: false
            }
        },
        data(){
            return {
                show: true
            }
        },
        watch: {
            /**
             * 这里监听是因为tagStyle属性并不是双向绑定实时渲染的，需要重新销毁创建富文本才能进行注册显示。
             */
            tagStyle: {
                immediate: true,
                handler(){
                    this.show = false
                    // if(this.showTimeId) clearTimeout(this.showTimeId)
                    // this.showTimeId = setTimeout(_ => {
                    //     this.show = true
                    // }, 10)
                    this.$nextTick(() => {
                        this.show = true
                    })
                }
            }
            
        },
        methods: {
            emit(ev, event){
                console.log(ev)
                this.$emit(ev, event)
            }
        }
        
    }
</script>

<style scoped>

</style>