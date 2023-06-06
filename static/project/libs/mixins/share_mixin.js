module.exports = {
	data() {
		this.$mpShare = {
			title: 'jwell', // 默认为小程序名称
			summary: '',
			imageUrl: '' // 默认为当前页面的截图
		};
		return {
			
		}
	},
	onLoad() {
		// 设置默认的转发参数
		// this.$mpShare = {
		// 	title: '', // 默认为小程序名称
		// 	summary: '',
		// 	imageUrl: '' // 默认为当前页面的截图
		// }
	},
	methods: {
		onShare(options = {}) {
			return new Promise((resolve,reject)=>{
				uni.share({
					...this.$mpShare,
					...options,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
						return resolve(res);
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
						return reject(err)
					}
				});
			})
			
		}
	},
	onShareAppMessage(res) {
		
		let {title,path,imageUrl} = this.$mpShare;
		
		if (!path) {
			let pages = getCurrentPages();
			path = pages[pages.length - 1].$page.fullPath;
		}
		return {
		  title,
		  path,
		  imageUrl
		}
	},
	// #ifdef MP-WEIXIN
	onShareTimeline() {
		return this.$mpShare
	}
	// #endif
}
