/**
 * 表单验证与提交
 * Author 李膳君 
 *
 * ------Function---------
 * submit Object:{api 接口目录.模块,rules 校验条件,...option 提交参数} 提交表单 return promise
 */

const form = require("@/libs/utils/js/formValidation.js");

export class Form {
	async submit({api,rules=[],data={}}) {
		if (rules.length) {
			//进行表单检查
			let checkRes = form.validation(data, rules);
			if (checkRes) {
				uni.showToast({title: checkRes,icon: 'none'});
				return Promise.reject({statusCode:-100});
			}
		}
		return uni.ue.request(api,data);
	}
}