/**
 * @description 与海螺原生交互
 * @author 吕岚秋
 * @updateTime 2022/4/12
 */



// 发送消息
const webPostMessage = (object) => {
    if (window.webkit && window.webkit.messageHandlers) {
        return window.webkit.messageHandlers.webPostMessage.postMessage(object);
    }
    if (window.android) {
        return window.android.webPostMessage(JSON.stringify(object));
    }
}

/**
 * 文件下载并预览
 * @param {*} param url-文件路径, fileName-文件名, ofType-文件后缀
 */
const downloadFileNative = (param) => {
    if (window.webkit && window.webkit.messageHandlers) {
        return window.webkit.messageHandlers.downloadFile.postMessage(param)
    }
    if (window.android && window.android.downloadFile) {
        return window.android.downloadFile(param.url, param.fileName)
    }
}

// 关闭钢铁，进入海螺工作台
const closeProject = () => {
    webPostMessage({
        type: 'closeProject'
    })
}

// 关闭应用，退出到海螺登录页面
const logoutProject = () => {
    webPostMessage({
        type: 'logout'
    })
}

const nativeMsgHandler = () => {
    // #ifdef H5
    window.closeProject = closeProject
    window.logoutProject = logoutProject
    window.webPostMessage = webPostMessage
    window.downloadFileNative = downloadFileNative
    // #endif
}
export default nativeMsgHandler
