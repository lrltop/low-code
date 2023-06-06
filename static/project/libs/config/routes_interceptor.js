/**
 * 路由拦截器
 */
import $mRouter from '@/libs/common/router.js'
import $debounce from '@/libs/common/debounce.js' 
import $utils from '@/libs/utils/js/utils.js'
import $pages from '@/libs/routes/routes.index.js'
// import {$matomoReport} from '@/libs/common/report.js'
import {$logOut} from "@/libs/common/err.js"

// 设置导航守卫
$mRouter.beforeEach((navType, {route,query:{animationType = "slide-in-right",animationDuration = 200,...param}}) => {
	let _route = route;
	if (typeof route !== 'object') {
		_route = uni.ue.fn.getData($pages, route);
	}
	
	if(!_route.path) {
		throw Error('路由钩子函数中没有找到route对象');
	};
	
	uni.hideKeyboard();
	$debounce.canDoFunction({
		key:"$nRoute",
		time: 500,
		success:async ()=>{
			//验证登录
			// #ifdef MP-WEIXIN
			if (_route.requiresAuth && !uni.ue.vuex.get('$user.openId')) {
				let {openId} = await uni.ue.User.login();
				if (!openId) {
					uni.showToast({
						title: '登录已失效，请稍后重新访问',
						icon: 'error'
					});
					return;
				}
			}
			// #endif
			
			// #ifndef MP-WEIXIN
			if (_route.requiresAuth && !uni.ue.vuex.get('$user.token')) {
				$logOut();
				return;
			}
			// #endif
			let obj = {
				animationType,
				animationDuration,
				url: $utils.objParseUrlAndParam(_route.path, param || {}),
				success() {
                    // TODO 上报记录
					// $matomoReport({action_name: route.name,url:route.path});
				},
				fail() {
					throw Error('需要在pages.json 和 routes.js配置对应窗口路径')
				}
			};
			uni[navType](obj);
		}
	});
})

export default $mRouter;
