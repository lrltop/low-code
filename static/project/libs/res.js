/**
 * 全局资源加载配置
 */
import $mConfig from "@/libs/config/index.config.js"
// import $assets from './config/assets.config.js'
import {$logOut,toast} from './common/err'
import $utils from '@/libs/utils/js/utils.js'
import arithmeticHandler from './common/arithmeticHandler.js' 
import nativeMsgHandler from './common/nativeMsgHandler.js' 
import {ue} from './ue.js'

// nvue窗口不会进入install，需要在vuexMixin内手动配置
const install = (Vue) => {
	uni.ue = ue;
	Vue.prototype.ue = ue;
	Vue.prototype.ue.init({Vue});
	
	Vue.prototype.$mConfig = $mConfig;
	// Vue.prototype.$assets = $assets;
	Vue.prototype.$utils = $utils;
	Vue.prototype.$logOut = $logOut;
	Vue.prototype.toast = toast;
    arithmeticHandler(); // 链式四则运算
    nativeMsgHandler(); // 与原生交互，方法挂在window对象上
	// Vue.prototype.$log = window.console.log;
	//可在此加入更多资源
	
	// 设置color
	Vue.directive("ue-color",function(el,binding,vnode){
		el.style["color"]= binding.value;
	})
	
	// 设置灰度
	Vue.directive("ue-filter",function(el,binding,vnode){
		let value = Number(binding.value) || 100;
		el.style["filter"]= `grayscale(${value}%)`;
	})
}

export default {
	install
}