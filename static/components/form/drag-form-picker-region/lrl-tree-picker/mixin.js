export default {
    methods: {
        /**
         * 小程序无法写表达式，所以这里做一层转换
         * @return {String} arguments组合的key
         */
        getKey(){
            return Array.prototype.reduce.call(arguments, (str, add) => str + add, '')
        },
        /**
         * 判断尺寸是否带单位(px、rpx、%)，如有单位直接返回，没有自动加上rpx
         * @param {String|Number} size
         * @return size
         */
        sizeUnit(size){
            if(size || size === 0){
                let value = Number(size)
                return value ? `${value}rpx` : size
            }
            return ''
        },
        /**
         * 转换尺寸为px，如无单位，默认为rpx，将会转换为px
         * @param {String|Number} size
         * @return {Number} px
         */
        sizeRpx2px(size = '0px'){
            size = String(size)
            // 带单位px直接返回
            if(size.search('px') >= 0){
                return Number(size.replace(/px/, ''))
            }else {
                return uni.upx2px(size)
            }
        }
    }
}

