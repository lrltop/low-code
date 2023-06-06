/**
 * @description 链式处理四则运算
 * 
 */

const handler = {
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
     * 加法
     * @param arg1
     * @param arg2
     * @returns {Number}
     */
    accAdd(arg1, arg2) {
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2))
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m
    },
    /**
     * 减法
     * @param arg1
     * @param arg2
     * @returns
     */
    accSub(arg1, arg2) {
        var r1, r2, m, n;
        try {
    		      r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        //last modify by deeka
        //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    /**
     * 除法
     * @param arg1
     * @param arg2
     * @returns {Number}
     */
    accDiv(arg1, arg2) {
        var t1 = 0,
            t2 = 0,
     		     r1, r2;
     	  try {
            t1 = arg1.toString().split(".")[1].length
        } catch (e) {}
     	  try {
            t2 = arg2.toString().split(".")[1].length
        } catch (e) {}
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }
}



const arithmeticHandler = () => {
    // 乘法
    Number.prototype.times = function(num) {
        if (typeof num !== 'number') {
            console.log('请输入数值类型进行计算');
        }
        return Number(handler.accMul(this, num))
    }
    // 除法
    Number.prototype.div = function(num) {
        if (typeof num !== 'number') {
            console.log('请输入数值类型进行计算');
        }
        return Number(handler.accDiv(this, num))
    }
    // 加法
    Number.prototype.add = function(num) {
        if (typeof num !== 'number') {
            console.log('请输入数值类型进行计算');
        }
        return Number(handler.accAdd(this, num))
    }
    // 减法
    Number.prototype.sub = function(num) {
        if (typeof num !== 'number') {
            console.log('请输入数值类型进行计算');
        }
        return Number(handler.accSub(this, num))
    }
}
export default arithmeticHandler