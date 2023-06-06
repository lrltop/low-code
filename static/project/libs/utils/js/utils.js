export default {
	/* 
	 * 判断是否为json类型字符串
	 */
	isJSON(str) {
		if (str instanceof Object) {
			return str;
		} else if (typeof str == 'string') {
			try {
				let obj = JSON.parse(str);
				if (obj && typeof obj == 'object') {
					return obj;
				} else {
					return false;
				}
			} catch (e) {
				return false;
			}
		} else {
			return false;
		}
	},

	/* 
	 * 将cityNo 转 cityName
	 * cityData:原数据
	 * cityNo：二级地区编码
	 */
	getCityName(cityData, cityNo) {
		if (!cityNo) return;
		if (!(cityData instanceof Array)) return;
		// 9112
		cityNo += "";
		for (let i = 0; i < cityData.length; i++) {
			let sheng = cityData[i];
			for (let j = 0; j < sheng.children.length; j++) {
				let shi = sheng.children[j];
				if (shi.value == cityNo) {
					// 使用return 终止循环
					return `${sheng.label}-${shi.label}`;
				}
			}
		}
	},

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

	/* 
	 * obj 转 路由地址带参数
	 * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
	 */
	objParseUrlAndParam(path, obj) {
		let url = path || "/";
		let paramsStr = "";
		if (obj instanceof Array) return url;
		if (!(obj instanceof Object)) return url;
		paramsStr = this.objParseParam(obj);
		paramsStr && (url += "?");
		url += paramsStr;
		return url;
	},

	/* 
	 * 获取url字符串参数
	 */
	getRequestParameters(locationhref) {
		let href = locationhref || "";
		let theRequest = new Object();
		let str = href.split("?")[1];
		if (str != undefined) {
			let strs = str.split("&");
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},

	/* 
	 * 银行卡每四位空格
	 */
	formatCardNo(cardNo) {
		cardNo += "";
		return cardNo.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
	},

	/**
	 * 乘法，解决js精度损失问题
	 * @param {*} arg1 
	 * @param {*} arg2 
	 */
	accMul(arg1, arg2) {
		arg1 = arg1 || 0;
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length
		} catch (e) {}
		try {
			m += s2.split(".")[1].length
		} catch (e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	},
	/**
	 * 数量展示
	 * @param {*} 12300 1.2万
	 */
	formatCountNumber(num) {
		num = parseFloat(num);
		if (!num || num == null || num == NaN) {
			return 0;
		}
		if (typeof (num) == 'number') {
			// 获得整数位的长度
			let strNumSize = (tempNum = '') => {
				let stringNum = tempNum.toString();
				let index = stringNum.indexOf(".");
				let newNum = stringNum;
				if (index != -1) {
					newNum = stringNum.substring(0, index);
				}
				return newNum.length;
			};
			// 保留两位小数
			let toFloor = ({
				tempNum = 0,
				size = 2
			}) => {
				let stringNum = tempNum.toString();
				let stringNumArr = stringNum.split('.');
				if (stringNumArr[1]) {
					let suffix = stringNumArr[1].substr(0, 2);
					return `${stringNumArr[0]}.${suffix}`;
				}
				return tempNum;
			};
			let units = ["", "万", "亿", "万亿"];
			let dividend = 10000;
			let curentNum = num;
			let curentUnit = units[0];
			for (let i = 0; i < 4; i++) {
				curentUnit = units[i];
				if (strNumSize(curentNum) < 5) {
					break;
				}
				curentNum = curentNum / dividend;
			}
			let result = toFloor({
				tempNum: curentNum
			});
			return `${result}${curentUnit}`;
		} else {
			return 0;
		}
	},
	/**
	 * dnvue设置样式
	 * @param {Object} str
	 */
	styleInto(str) {
		let styleObject = '';
		for (let i in str) {
			styleObject += i.replace(/([A-Z])/g, "-$1").toLowerCase() + ':' + str[i] + ';'
		}
		return styleObject;
	},
}