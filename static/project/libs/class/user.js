/**
 * User操作相关
 * Author 李膳君 
 *
 * ------Function---------
 * getAccount undefined 获取缓存的账号 return void
 * setAccount String 设置缓存账号 return this
 * login Object:{api,rules,data} 登录 return Promise
 */
export class User {
	
	constructor() {
		this.openId = '$user.openId';
		this.loginAPI = 'user.login';
	}
	// 检查登录是否失效
	checkSession() {
		if (!uni.ue.vuex.get(this.openId)) {
			return Promise.resolve();
		}
		return new Promise((resolve,reject)=>{
			uni.checkSession({
				success: () => {
					console.log('未失效');
					return reject();
				},
				fail: () => {
					console.log('登录失效，重新登录');
					return resolve();
				}
			})
		})
	}
	
	// 登录
	login() {
		// #ifdef MP-WEIXIN
		return new Promise((resolve,reject)=>{
			this.checkSession()
			.then(() =>{  
				uni.login({
					provider: 'weixin',
					success: async ({code}) => {
						let {data=''} = await uni.ue.request(this.loginAPI,{code});
						if (data) {
							console.log(this.loginAPI+'返回：',data)
							uni.ue.vuex.set(this.openId,data);
							return resolve({openId:data});
						}
						return resolve({openId:uni.ue.vuex.get(this.openId)});
					}
				})
			})
			.catch(()=>{
				console.log('不重新登录');
				return resolve({openId:uni.ue.vuex.get(this.openId)});
			})
		})
		// #endif
	}
	
	// 退出登录
	logout() {
		console.log('退出登录');
	}
	
	async queryUser(api='user.queryUser') {
		
	}
	
}