/**
 * 对象深拷贝
 * @author yxk
 * @param target 被拷贝的对象
 * @returns {Object} 拷贝结果
 */
export function deepClone(target = null) {
    let res
    if (typeof target === 'object') {
        if (isArray(target)) {
            res = []
            target.forEach(item => {
                res.push(deepClone(item))
            })
        } else if (isObject(target)) {
            res = {}
            const keys = Object.keys(target)
            keys.forEach(key => {
                res[key] = deepClone(target[key])
            })
        } else {
            res = target
        }
    } else {
        res = target
    }
    return res
}
/**
 * 判断val是否为一个对象，返回一个bool值
 * @param {Object} val 
 * @return {Boolean}
 */
function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}
/**
 * 判断arr是否为一个数组，返回一个bool值
 * @param {Object} arr 
 * @return {Boolean}
 */
function isArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
/**
 * 防抖
 * @param {Function} fn 要执行的方法
 * @param {Number} wait 防抖时间
 * @param {Boolean} first 是否先执行，用于某些业务逻辑下后执行可能会出现与预期不符的效果，默认false
 * @return {Function} 返回一个闭包函数，重复调用此函数即可
 */
export const debounce = function(fn, wait = 100, first = false) {
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        if (timer){
             clearTimeout(timer)
        }else if(first){
            fn.apply(context, args);
        }
        timer = setTimeout(function() {
            if(!first) fn.apply(context, args);
            timer = null;
        }, wait)
    }
}
/**
 * 节流
 * @param {Function} fn 要执行的方法
 * @param {Number} wait 节流时间
 * @param {Boolean} first 是否先执行，用于某些业务逻辑下后执行可能会出现与预期不符的效果，默认false
 * @return {Function} 返回一个闭包函数，重复调用此函数即可
 */
export const throttle = function(fn, wait = 50, first = false) {
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        if (!timer) {
            first && fn.apply(context, args)
            timer = setTimeout(function() {
                !first && fn.apply(context, args);
                timer = null;
            }, wait)
        }
    }
}

/**
 * async await 简写的时间等待
 * @param {Number} s 等待时间毫秒 
 */
export function timeWait(s = 0){
    return new Promise(r => setTimeout(r, s))
}

/**
 * 简化promise式查询
 * @param {ID|ClassName} selector 
 * @param {*} that 
 * @param {*} all 
 */
export function getRect(selector, that, all) {
    return new Promise(resolve => {
        uni.createSelectorQuery().
        in(that)[all ? 'selectAll' : 'select'](selector)
        .boundingClientRect(rect => {
            resolve(rect)
        })
        .exec()
    })
}
/**
 * 查找父组件，摘自 u-view v2.0 源码
 */
export function findParent(name = undefined, that) {
    let parent = that.$parent
    // 通过while历遍，这里主要是为了H5需要多层解析的问题
    while (parent) {
        // 父组件
        if (parent.$options && parent.$options.name !== name) {
            // 如果组件的name不相等，继续上一级寻找
            parent = parent.$parent
        } else {
            return parent
        }
    }
    return false
}