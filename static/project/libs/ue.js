// #ifdef H5
import whelkH5Mixin from './mixins/whelk_h5_mixin'
// #endif
import $mRouter from '@/libs/config/routes_interceptor.js'
// import $apis from '@/libs/apis/apis.index.js'
import request from "@/libs/common/request.js";
import storeMixin from '@/libs/mixins/store_mixin.js'
import shareMixin from '@/libs/mixins/share_mixin.js'
import fn from './function/index'
import {User} from './class/user.js'
import {Form} from '@/libs/class/form.js'
const form = new Form;

export var ue = {
	/*----路由----*/
	navigateTo: (module,query)=>$mRouter.navigateTo(module,query),
	redirectTo: (module,query)=>$mRouter.redirectTo(module,query),
	reLaunch: (module,query)=>$mRouter.reLaunch(module,query),
	switchTab: (module,query)=>$mRouter.switchTab(module,query),
	back: (delta,query)=>$mRouter.back(delta,query),
	getBackOpts: (fn)=> $mRouter.getBackOpts(fn),
	/*----request----*/
	// request:(module,data={})=> fn.getObject($apis,module)(data),
	request:({api, method, APIID, _needAuthorization_, params={}}={})=> {
        // 添加token校验
        if (_needAuthorization_) {
						method = 'has'+method.toLowerCase()
        }
        params['APIID'] = APIID
        return request[method](api, params)
    },
    // 表单校验
    formRequest: ({api,data={},rules=[]})=>form.submit({api,rules,data}),
	/*----function----*/
	fn,
	/*----用户管理----*/
	User: new User()
};

ue.setPrototypeFn = function() {
	// 钱币格式转换
	// Extend the default Number object with a formatMoney() method:
	// usage: someVar.formatMoney(decimalPlaces, symbol, thousandsSeparator, decimalSeparator)
	// defaults: (2, "$", ",", ".")
	Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
		places = !isNaN(places = Math.abs(places)) ? places : 2;
		symbol = symbol !== undefined ? symbol : "$";
		thousand = thousand || ",";
		decimal = decimal || ".";
		var number = this,
			negative = number < 0 ? "-" : "",
			i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
			j = (j = i.length) > 3 ? j % 3 : 0;
		return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
	};
	
	// promise.then或promise.catch执行后立即执行finally
	Promise.prototype.finally = function (callback) {
	  let P = this.constructor;
	  return this.then(
	    value  => P.resolve(callback()).then(() => value),
	    reason => P.resolve(callback()).then(() => { throw reason })
	  );
	}
	
	/**
	 * 击鼓传花
	 * @callback afterfn 下一个要执行的函数，若需要继续往下传return 'next'
	 * @example 
	 * let fns = afn.asyAfter( bfn ).asyAfter( cfn );
	 * fns(arg);
	 */
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
	
	/**
	 * 日期格式转换
	 * @param {String} fmt 转换格式yyyy=年,MM=月,dd=日,EE=周(EEE=星期),HH=24h,hh=12h
	 * @example new Date().pattern('yyyy年MM月dd日 EE HH:mm:ss');
	 */
	Date.prototype.pattern = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份         
			"d+": this.getDate(), //日         
			"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
			"H+": this.getHours(), //小时         
			"m+": this.getMinutes(), //分         
			"s+": this.getSeconds(), //秒         
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度         
			"S": this.getMilliseconds() //毫秒         
		};
		var week = {
			"0": "\u65e5",
			"1": "\u4e00",
			"2": "\u4e8c",
			"3": "\u4e09",
			"4": "\u56db",
			"5": "\u4e94",
			"6": "\u516d"
		};
		if(/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		if(/(E+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
		}
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	}
	return {
		_formatMoney:Number.prototype.formatMoney,
		_finally:Promise.prototype.finally,
		_asyAfter:Function.prototype.asyAfter,
		_pattern:Date.prototype.pattern
	}
}

ue.init = function({Vue}) {
	Vue.prototype.$fn = fn;
	Vue.mixin(shareMixin);
	Vue.mixin(storeMixin);
	// #ifdef H5
	Vue.mixin(whelkH5Mixin);
	// #endif
	ue.setPrototypeFn();
}


