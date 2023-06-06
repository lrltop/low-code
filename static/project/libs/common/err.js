import $mConfig,{LOGIN} from '@/libs/config/index.config.js'

const toast = (title = '',{ duration = 2000, icon = 'none',position='center'} = {}) => {
		uni.showToast({title,duration,icon,position});
	}

const $logOut = (msg) => {
	if (msg) {
		toast(msg);
	}
	uni.ue.vuex.set('$user.token','');
	
	let handle = () => {
		let pages = getCurrentPages();
		let route = pages[pages.length - 1].route;
		let loginRoute = LOGIN.ROUTE;
		let routeType = 'navigateTo';
		if (route == loginRoute) {console.log('已经在登录界面了');return;}
		
		if ($mConfig.touristMode && $mConfig.forcedLogin) {routeType = 'reLaunch'}
		uni[routeType]({url:`/${loginRoute}`});
	}
	
	// #ifdef APP-PLUS
		return handle();
	// #endif
	// #ifdef H5
		// 海螺退出登录-ios
		if (window.webkit && window.webkit.messageHandlers) {
			window.webkit.messageHandlers.webPostMessage.postMessage({type:'logout'});
		} 
		// 海螺退出登录-android
		else if(window.android){
			window.android.webPostMessage('{"type":"logout"}');
		}
		// 自定义退出登录
		else {
			return handle();
		}
		return;
	// #endif
}

const specialErrMsgMap = (msg = '出错了，重新刷新试试~')=> {
	let msgMap = {
		'doSearch msg:Connection reset by peer': '出错了，请稍后再试~'
	}
	if (msgMap.hasOwnProperty(msg)) {
		return msgMap[msg];
	}
	return msg
}

const errHandle = (status,msg = '出错了，重新刷新试试~') => {
	if (status == LOGIN.CODE) {
		$logOut();
	} else {
        msg = specialErrMsgMap(msg);
        setTimeout(()=>{
        	toast(msg);
        },200);
    }
	
}	

export {errHandle,$logOut,toast};