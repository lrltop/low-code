/**
 * mescroll组件配合迭代器
 * Author 李膳君 
 *
 * ------Function---------
 * setAPI String 动态设置接口模块 return this
 * setData Object 动态设置接口参数(不包含分页参数) return this
 * customList Array:当前页列表 自定义list返回结构 return list
 * update Object:{num,size} mescroll组件触发上拉时收到的参数 return Array
 */

export class MescrollIterator {
	#catalog;#module;#defaultValue;
	constructor({api,pageKey='pageIndex',pageValue=0,pageSize=10,debug=false,...param}) {
	    this.api = api;
		this.len = 0;
		this.pageKey = pageKey;
		this.#defaultValue = pageValue;
		this.pageValue = pageValue;
		this.pageSize = pageSize;
		this.list = [];
		this.debug = debug;
		this.param = param;
		this.setArrayData = undefined;
	}
	
	setAPI(api) {
		this.api = api;
		return this;
	}
	
	setData({api,pageKey,pageValue,pageSize,debug,...param}) {
		this.param = param;
		return this;
	}
	
	customList(list) {
		return this.list.concat(list);
	}
	
	async update({num,size}) {
		
		if (!this.mescroll) {
			throw new Error('mescroll is undefined');
		}
		
		if (typeof this.setArrayData !== 'function') {
			throw new Error('setArrayData is undefined');
		}
		
		if (num===1) {
			this.pageValue = this.#defaultValue;
			this.len = 0;
		}
		this.pageValue++;
		
		let res = await uni.ue.request(this.api,{
			[this.pageKey]: this.pageValue,
			rows: this.pageSize,
			debug: this.debug,
			...this.param
		});
		
		if (!res.success||res.code!==200) {
			this.pageValue--;
			this.mescroll.endErr();
			return Promise.resolve(this.list);
		}
		
		if (num===1) {
			this.list = [];
		}
		
		let {data=[],total=0} = this.setArrayData(res);
		let cuPageLen = data.length;
		this.len = this.len + cuPageLen;
		this.list = this.customList(data);
		this.mescroll.endBySize(cuPageLen, total);
		return Promise.resolve(this.list);
	}
	
}