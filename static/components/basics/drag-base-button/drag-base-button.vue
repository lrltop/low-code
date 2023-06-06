<template>
    <button 
        class="drag-base-button"
        :size="size"
        :type="type"
        :plain="plain"
        :disabled="disabled"
        :loading="loading"
        :openType="openType"
        :hover-start-time="hoverStartTime"
        :hoverStayTime="hoverStayTime"
        :appParameter="appParameter"
        :lang="lang"
        :sessionFrom="sessionFrom"
        :send-message-title="sendMessageTitle"
        :sendMessagePath="sendMessagePath"
        :sendMessageImg="sendMessageImg"
        :showMessageCard="showMessageCard"
        :groupId="groupId"
        :guildId="guildId"
        :publicId="publicId"
        :style="[btnStyle]"
        @click="$emit('click')"
        @getphonenumber="$emit('getphonenumber', $event)"
        @getuserinfo="$emit('getuserinfo', $event)"
        @error="$emit('error', $event)"
        @opensetting="$emit('opensetting', $event)"
        @launchapp="$emit('launchapp', $event)"
        @contact="$emit('contact', $event)"
        @chooseavatar="$emit('chooseavatar', $event)"
        @addgroupapp="$emit('addgroupapp', $event)"
        @chooseaddress="$emit('chooseaddress', $event)"
        @chooseinvoicetitle="$emit('chooseinvoicetitle', $event)"
        @subscribe="$emit('subscribe', $event)"
        @login="$emit('login', $event)"
    >
    
        <text :style="[textStyle]">{{ text }}</text>
    </button>
</template>

<script>
    export default {
        name: 'drag-base-button',
        props:{
			text: {
				type: String,
				default: '按钮'
			},
            type: {
            	type: String,
            	default: 'primary'
            },
            size: {
            	type: String,
            	default: 'default'
            },
            plain: {
            	type: Boolean,
            	default: false
            },
            disabled: {
            	type: Boolean,
            	default: false
            },
            loading: {
            	type: Boolean,
            	default: false
            },
            openType: {
            	type: String,
            	default: ''
            },
            hoverStartTime: {
            	type: Number,
            	default: 20
            },
            hoverStayTime: {
            	type: Number,
            	default: 70
            },
            appParameter: {
                type: String,
                default: ''
            },
            lang: {
                type: String,
                default: 'en'
            },
            sessionFrom: {
                type: String,
                default: ''
            },
            sendMessageTitle: {
                type: String,
                default: '当前标题'
            },
            sendMessagePath: {
                type: String,
                default: '当前分享路径'
            },
            sendMessageImg: {
                type: String,
                default: '截图'
            },
            showMessageCard: {
                type: Boolean,
                default: false
            },
            groupId: {
                type: String,
                default: ''
            },
            guildId: {
                type: String,
                default: ''
            },
            publicId: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: ''
            },
            fontSize: {
                type: String,
                default: '36rpx'
            },
            bgColor: {
                type: String,
                default: ''
            }
        },
		computed: {
            btnStyle(){
                let style = {}
                if(this.bgColor) style['backgroundColor'] = this.bgColor
                return style
            },
            textStyle(){
                let style = {}
                if(this.color) style['color'] = this.color
                if(this.fontSize) style['fontSize'] = this.fontSize
                return style
            }
        }
    }
</script>

<style >
    .drag-base-button{
        /* // width: 700rpx; */
    }
</style>
