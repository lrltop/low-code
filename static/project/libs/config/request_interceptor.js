import store from "@/store"
import $mConfig from "@/libs/config/index.config.js"
import {$logOut} from "@/libs/common/err.js"
// #ifdef APP-NVUE

Function.prototype.asyAfter = function (afterfn) {
	var _self = this;
	return function () {
		var ret = _self.apply(this, arguments);
		if (ret === 'next') {
			return afterfn.apply(this, arguments);
		}
		return ret;
	}
}
// #endif

//默认值
const config = {
	baseUrl: $mConfig.BASEURL, // 请求的根域名
	// 默认的请求头
	// header: {'Content-Type':'application/x-www-form-urlencoded'},
	header: {"Content-Type":"application/json;charset=UTF-8"},
	method: 'POST',
	dataType: 'json',
	loading: false, // 是否显示请求中的loading
	loadingText: '请求中...',
	loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
	showError: true, //是否弹框显示错误信息
	errorText: '访问失败,请稍后重试',
}

//拦截器
const interceptor = {
	
	// 请求前的拦截
	request(options,hasToken) {
		let token = store.getters['$user/token'];
		// let token = getApp().globalData.token;
		if (hasToken && !token) {
			console.log('token不存在，已拦截请求');
			$logOut()
			return false;
		}
		// if(token)options.header['Authorization'] ='Bearer '+token.replace(/^bearer\s/i, '');
		if(token)options.header['Authorization'] = token;
		// console.log(options); 
		return options;
	},
	
	// 请求后的拦截
	response(res,responseAll) {
		let {data,header} = res;
		let validate = isSuccess.asyAfter( isStatusCode );
		if(validate(data)) { return responseAll ? res : data; }
		return false;
	},
	
	
}


//检查success
function isSuccess(data = {}) {
	if (data.hasOwnProperty('Success')) {
		return (data.Success === true ? "next" : false);
	} else {
		return "next";
	}
}
	
//检查Code = 必须存在且等于0时返回true
function isStatusCode(data = {}) {
	if (data.hasOwnProperty('code')) {
		return data.code == "200";
	}
	return true;
}

export {
	config,
	interceptor
}