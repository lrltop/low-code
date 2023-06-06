let NODE_ENV = process.env.NODE_ENV === 'production'; // 是否为发布环境
let API = 'login'; // 换取token的api

module.exports = {
// #ifdef H5
	async onLoad({token,...option}) {
		if (NODE_ENV && token) {
			this.ue.vuex.set('$user.whelk_token',token);
			let param = this.objParseParam(option);
			param&&(param='&'+param);
			// 重定向隐藏海螺token，通过redirect判断是否从海螺打开
			let newHref = `${window.location.href.split('?')[0]}?redirect=1&datetime=${new Date().getTime()}${param}`
			window.location.href = newHref
		}
	},
	methods: {
		/*
		 * obj 转 params字符串参数  
		 * 例子：{a:1,b:2} => a=1&b=2
		 */
		objParseParam(obj) {
			let paramsStr = "";
			if (obj instanceof Array) return paramsStr;
			if (!(obj instanceof Object)) return paramsStr;
			for (let key in obj) {
				if (obj[key] instanceof Object) {
					obj[key] = JSON.stringify(obj[key]);
				}
				paramsStr += `${key}=${obj[key]}&`;
			}
			return paramsStr.substring(0, paramsStr.length - 1);
		},
		// 获取应用token
		$getH5Token({token}) {
			if (token) {return Promise.reject({status: 200});}
			
			return new Promise((resolve,reject)=>{
				if (NODE_ENV) {
					if (this.ue.vuex.get('$user.whelk_token')) {
						// 通过接口换取应用token
						this.ue.request(API,{
							token:this.ue.vuex.get('$user.whelk_token')
						}).then(token=>{
							this.ue.vuex.set('$user.token', token);
							// 清空传入的token
							this.ue.vuex.set('$user.whelk_token','');
							resolve(token);
						})
					}
					else if (this.ue.vuex.get('$user.token')) {
						resolve(this.ue.vuex.get('$user.token'));
					}
					else {
						reject({status: 401,msg:'登录已过期'});
					}
				}
				else {
					let _token = '开发期间的token'
					this.ue.vuex.set('$user.token', _token);
					resolve(_token);
				}
			})
		}
	}
// #endif	
}
