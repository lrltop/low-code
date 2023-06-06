import {config,interceptor} from "@/libs/config/request_interceptor.js"
import $mConfig from "@/libs/config/index.config.js"
import {errHandle} from "./err.js"
import $utils from "@/libs/utils/js/utils.js"
import mockjsInterceptor from "./mockjs_interceptor.js"

const HTTP = (
url,{
	method,
	header={},headers,
	hasToken = false,
	responseAll = false,
	loading = config.loading,
	loadingText = config.loadingText,
	loadingMask = config.loadingMask,
	showError = config.showError,
	errorText:msg = config.errorText,
    APIID= 'baseUrl',
	debug = false,
	...data
}={}) => {
	let options = {
		method,
		url: url.indexOf('http') == 0 ? url : 
		($mConfig[APIID] + (url.indexOf('/') == 0 ? url : '/' + url)),
		data: data || {},
		header: headers ? headers : Object.assign({},config.header,header)
	};
	// mock数据
	if ($mConfig[APIID] && $mConfig[APIID] === 'http://mockjs.com') {
	    return new Promise((resolve, reject)=>{
	        loading&&uni.showLoading({title: loadingText,mask: loadingMask});
	        setTimeout(()=>{
	            loading&&uni.hideLoading();
	            return resolve(mockjsInterceptor.init(options))
	        }, 300)
	    })
	}
	if (interceptor.request && typeof interceptor.request === 'function') {
		let tmpConfig = {};
		let interceptorReuest = interceptor.request(options,hasToken);
		if (interceptorReuest === false) {
			console.log("拦截器认为不需要继续请求");
			return Promise.reject({statusCode:-100});
		}
		options = interceptorReuest;
	}
	// #ifdef APP-PLUS
	debug&&console.log('--send--',options);
	// #endif
	// #ifndef APP-PLUS
	debug&&console.log('--send--',JSON.stringify(options));
	// #endif
	
	return new Promise((resolve,reject)=>{
		loading&&uni.showLoading({title: loadingText,mask: loadingMask});
		options.complete = (res) => {
			// #ifdef APP-PLUS
			debug&&console.log(url,'uni=>res',res);
			// #endif
			// #ifndef APP-PLUS
			debug&&console.log(url,'uni=>res',JSON.stringify(res));
			// #endif
			loading&&uni.hideLoading();
			if (interceptor.response && typeof interceptor.response === 'function') {
				let resInterceptors = interceptor.response(res,responseAll);
				if (resInterceptors !== false) {
					return resolve(resInterceptors);
				}
			}
			else if (res.statusCode == '200') {
				return resolve(res.data);
			}
			// 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
			reject(res.data);
		};
		
		uni.request(options);
		
	}).catch(err=> {
		console.log(`
		----------------------ERROR----------------------\n
		请求地址:${options.url}\n
		请求头:${JSON.stringify(options.header)}\n
		参数:${JSON.stringify(options.data)}\n
		错误信息:${JSON.stringify(err)}\n
		--------------------ERROR-END----------------------
		`);
		if (showError) {
			let jsons = $utils.isJSON(err.responseText);
			if (jsons) {msg = jsons.error.message;}
			errHandle(err.code || err.Code || err.statusCode || err.status || 0, err.message||err.Message||err.msg || msg);
		}
		return Promise.reject(err);
	});
}

const FILE = (url,{
	headers,header,
	hasToken = false,
	responseAll = false,
	loading = config.loading,
	loadingText = config.loadingText,
	loadingMask = config.loadingMask,
	showError = config.showError,
	errorText:msg = config.errorText,
	filePath,name ='file',
	files = [],
	timeout = 100000,
    APIID= 'baseUrl',
	debug = false,
	...formData
}, requestType) => {
	let options = {
		url: url.indexOf('http') == 0 ? url : 
		($mConfig[APIID] + (url.indexOf('/') == 0 ? url : '/' + url)),
		header: headers ? headers : Object.assign({},config.header,header),
		filePath,
		timeout,
		formData
	};
	
	if (requestType == 'uploadFile') {
		Object.assign(options,{filePath,name});
		if (files.length) {
			options['files'] = files;
		}
	}
	
	if (interceptor.request && typeof interceptor.request === 'function') {
		let interceptorReuest = interceptor.request(options,hasToken);
		if (interceptorReuest === false) {
			console.log("拦截器认为不需要继续请求");
			return Promise.reject({statusCode:-100});
		}
		options = interceptorReuest;
	};
	
	// #ifdef APP-PLUS
	debug&&console.log('--send--',options);
	// #endif
	// #ifndef APP-PLUS
	debug&&console.log('--send--',JSON.stringify(options));
	// #endif
	
	return new Promise((resolve,reject)=>{
		loading&&uni.showLoading({title: loadingText,mask: loadingMask});
		options.complete = (res) => {
			// #ifdef APP-PLUS
			debug&&console.log(url,requestType+'=>res',res);
			// #endif
			// #ifndef APP-PLUS
			debug&&console.log(url,requestType+'=>res',JSON.stringify(res));
			// #endif
			loading&&uni.hideLoading();
			if (interceptor.fileResponse && typeof interceptor.fileResponse === 'function') {
				let resInterceptors = interceptor.fileResponse(res,responseAll);
				if (resInterceptors !== false) {
					resolve(resInterceptors);
				}
			}
			else if (res.statusCode == 200) {
				resolve(res.data);
			}
			// 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
			try{
				res.data = JSON.parse(res.data);
			}catch(e){
				reject(res);
			}
			reject(res.data);
		};
			
		uni[requestType](options);
		
	}).catch(err=> {
		console.log(`
		----------------------ERROR----------------------\n
		请求地址:${options.url}\n
		请求头:${JSON.stringify(options.header)}\n
		附件:${filePath}\n
		参数:${JSON.stringify(options.formData)}\n
		错误信息:${JSON.stringify(err)}\n
		--------------------ERROR-END----------------------
		`);
		if (showError) {
			let jsons = $utils.isJSON(err.responseText);
			if (jsons) {msg = jsons.error.message;}
			errHandle(err.code || err.Code || err.statusCode || err.status || 0, err.message||err.Message||err.msg || msg);
		}
		return Promise.reject(err);
	});
	
	
}


export default {
	get(url, param = {}) {
		return HTTP(url,Object.assign(param,{method: "GET"}));
	},
	hasget(url, param = {}) {
		return HTTP(url,Object.assign(param,{method: "GET",hasToken: true}));
	},
	post(url, param = {}) {
		return HTTP(url,Object.assign(param,{method: "POST"}));
	},
	haspost(url, param = {}) {
		return HTTP(url,Object.assign(param,{method: "POST",hasToken: true}));
	},
	put(url, param = {}) {
		return HTTP(url,Object.assign(param,{method: "PUT"}));
	},
	hasput(url, param = {}) {
		return HTTP(url,Object.assign(param,{method: "PUT",hasToken: true}));
	},
	delete(url, param = {}) {
		return HTTP(url,Object.assign(param,{method: "DELETE"}));
	},
	hasdelete(url, param = {}) {
		return HTTP(url,Object.assign(param,{method: "DELETE",hasToken: true}));
	},
	upload(url, param = {},hasToken = false) {
		return FILE(url,{hasToken,...param},"uploadFile");
	},
	download(url, param = {},hasToken = false) {
		return FILE(url,{hasToken,...param},"downloadFile");
	}
}