module.exports = {
	beforeCreate() {
		// 将vuex方法挂在到ue实例中 beforeCreate created
		let { ue, $store } = this;
		if(typeof $store !== "undefined" && typeof ue.getVuexStore === "undefined"){
			ue.getVuexStore = function(){
				return $store;
			};
			ue.vuex = (name, value) => {
				$store.commit('updateStore', { name, value });
			};
			/**
			 * (推荐) 设置vuex
			 * ue.vuex.set('$user.userInfo.avatar', avatar);
			 */
			ue.vuex.set = (name, value) => {
				$store.commit('updateStore', { name, value });
			};
			/**
			 * (推荐) 读取vuex(具有解除对象内存印射功能，且任意一层数据为undefined，不会报错)
			 * ue.vuex.get('$user.userInfo.avatar');
			 */
			ue.vuex.get = (name) => {
				let value = ue.fn.getData($store.state, name);
				if(typeof value === "undefined") return "";
				return JSON.parse(JSON.stringify(value));
			};
			ue.vuex.getters = (name) => {
				return $store.getters[name];
			};
			/**
			 * 触发vuex的指定actions(异步)
			 * $user是模块名,addFootprint是对应模块的action名称
			 * ue.vuex.dispatch('$user/addFootprint', data);
			 */
			ue.vuex.dispatch = $store.dispatch;
			/**
			 * 触发vuex的指定mutations
			 * $user是模块名,setFootprint是对应模块的action名称
			 * ue.vuex.commit('$user/setFootprint', data);
			 */
			ue.vuex.commit = $store.commit;
			
		}
	},
	computed: {

	}
}
