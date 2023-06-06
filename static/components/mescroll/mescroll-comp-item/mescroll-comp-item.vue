<template>
	<!-- 当mescroll-body写在子组件时,父页面需引入mescroll-comp.js的mixins -->
	<mescroll-body ref="mescrollRef" :top="top" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<!-- 数据列表 -->
		<slot></slot>
	</mescroll-body>
</template>

<script>
	import MescrollMixin from "../mescroll-mixins.js";
	import mescrollBody from "../mescroll-body.vue";
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
        components: {
            mescrollBody
        },
        props: {
          top: {
              type: [String, Number],
              default: 0
          }  
        },
		data() {
			return {
			}
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网加载数据
                this.$emit('upCallback', {
                    mescroll: this.mescroll,
                    page
                })
			}
		}
	}
</script>
