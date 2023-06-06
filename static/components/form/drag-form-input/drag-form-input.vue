<template>
    <view class="cu-form-group drag-form-input">
        <view v-if="labelText" class="drag-form-input-label"
            :style="[ labelStyle ]"
        >{{ labelText }}</view>
        <view class="drag-form-input-box"
            :style="[inputStyle]"
        >
            <input
                :value="innerValue"
                class="drag-form-input-box-input" 
                :type="type"
                :password="password || type === 'password' || undefined"
                :placeholder="placeholder"
                :disabled="disabled"
                :maxlength="maxlength"
                :cursorSpacing="cursorSpacing"
                :focus="focus"
                :cursor="cursor"
                :selectionStart="selectionStart"
                :selectionEnd="selectionEnd"
                :confirmType="confirmType"
                :confirmHold="confirmHold"
                :adjustPosition="adjustPosition"
                :autoBlur="autoBlur"
                @click="onClick"
                @input="onInput"
                @blur="onBlur"
                @focus="onFocus"
                @confirm="onConfirm"
                @keyboardheightchange="onkeyboardheightchange"
            ></input>
            <u-icon 
                v-if="isShowClear"
                class="drag-form-input-box-clear"
                name="close-circle-fill"
                color="#c6c7cb"
                size="18"
                @click="onClear"
            ></u-icon>
        </view>
        <slot></slot>
    </view>
</template>

<script>
    export default {
        name: "drag-form-input",
		props: {
			value: {
                type: [String, Number, Boolean],
                default: ''
            },
            labelText: {
                type: String,
                default: '标题'
            },
            labelWidth: {
                type: String,
                default: '100rpx'
            },
            labelFontSize: {
                type: String,
                default: '28rpx'
            },
            labelColor: {
                type: String,
                default: '#333333'
            },
            borderWidth: {
                type: String,
                default: '1px'
            },
            borderColor: {
                type: String,
                default: '#f5f5f5'
            },
            borderStyle: {
                type: String,
                default: 'solid'
            },
            borderRadius: {
                type: String,
                default: '5rpx'
            },
            type: {
                type: String,
                default: 'text'
            },
            password: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '请输入'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            maxlength: {
                type: Number,
                default: 140
            },
            cursorSpacing: {
                type: Number,
                default: 0
            },
            focus: {
                type: Boolean,
                default: false
            },
            cursor: {
                type: [Number, String],
                default: ""
            },
            selectionStart: {
                type: Number,
                default: -1
            },
            selectionEnd: {
                type: Number,
                default: -1
            },
            confirmType: {
                type: String,
                default: 'done'
            },
            confirmHold: {
                type: Boolean,
                default: false
            },
            adjustPosition: {
                type: Boolean,
                default: true
            },
            autoBlur: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: true
            }
		},
        data(){
            return {
                // 输入框的值
                innerValue: "",
                // 是否处于获得焦点状态
                focused: false,
                // value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
                firstChange: true,
                // value绑定值的变化是由内部还是外部引起的
                changeFromInner: false,
                // 过滤处理方法
                innerFormatter: value => value
            }
        },
        computed: {
            overValue: {
                get(){
                    return this.value
                },
                set(n){
                    this.$emit('input', n)
                }
            },
            labelStyle(){
                return {
                    width: this.labelWidth,
                    fontSize: this.labelFontSize,
                    color: this.labelColor
                }
            },
            inputStyle(){
                return {
                    borderWidth: this.borderWidth,
                    borderColor: this.borderColor, 
                    borderStyle: this.borderStyle,
                    borderRadius: this.borderRadius
                }
            },
            // 是否显示清除控件
            isShowClear() {
                const { clearable, disabled, focused, innerValue } = this;
                return !!clearable && !disabled && !!focused && innerValue !== "";
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(newVal, oldVal) {
                    this.innerValue = newVal;
                    /* #ifdef H5 */
                    // 在H5中，外部value变化后，修改input中的值，不会触发@input事件，此时手动调用值变化方法
                    if (
                        this.firstChange === false &&
                        this.changeFromInner === false
                    ) {
                        this.valueChange();
                    }
                    /* #endif */
                    this.firstChange = false;
                    // 重置changeFromInner的值为false，标识下一次引起默认为外部引起的
                    this.changeFromInner = false;
                },
            },
        },
        methods: {
            // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
            setFormatter(e) {
            	this.innerFormatter = e
            },
            // 当键盘输入时，触发input事件
            onInput(e) {
                let { value = "" } = e.detail || {};
                // 格式化过滤方法
                const formatter = this.formatter || this.innerFormatter
                const formatValue = formatter(value)
                // 为了避免props的单向数据流特性，需要先将innerValue值设置为当前值，再在$nextTick中重新赋予设置后的值才有效
                this.innerValue = value
                this.$nextTick(() => {
                	this.innerValue = formatValue;
                	this.valueChange();
                })
            },
            // 输入框失去焦点时触发
            onBlur(event) {
                this.$emit("blur", event.detail.value);
                // H5端的blur会先于点击清除控件的点击click事件触发，导致focused
                // 瞬间为false，从而隐藏了清除控件而无法被点击到
                uni.$u.sleep(50).then(() => {
                    this.focused = false;
                });
            },
            // 输入框点击
            onClick(event) {
                this.$emit("click", this.value);
            },
            // 输入框聚焦时触发
            onFocus(event) {
                this.focused = true;
                this.$emit("focus");
            },
            // 点击完成按钮时触发
            onConfirm(event) {
                this.$emit("confirm", this.innerValue);
            },
            // 键盘高度发生变化的时候触发此事件
            // 兼容性：微信小程序2.7.0+、App 3.1.0+
            onkeyboardheightchange() {
                this.$emit("keyboardheightchange");
            },
            // 内容发生变化，进行处理
            valueChange() {
                const value = this.innerValue;
                this.$nextTick(() => {
                    this.$emit("input", value);
                    // 标识value值的变化是由内部引起的
                    this.changeFromInner = true;
                    this.$emit("change", value);
                });
            },
            // 点击清除控件
            onClear() {
                this.innerValue = "";
                this.$nextTick(() => {
                    this.valueChange();
                    this.$emit("clear");
                });
            },
            /**
             * 在安卓nvue上，事件无法冒泡
             * 在某些时间，我们希望监听u-from-item的点击事件，此时会导致点击u-form-item内的u-input后
             * 无法触发u-form-item的点击事件，这里通过手动调用u-form-item的方法进行触发
             */
            clickHandler() {
                // #ifdef APP-NVUE
                if (uni.$u.os() === "android") {
                    const formItem = uni.$u.$parent.call(this, "u-form-item");
                    if (formItem) {
                        formItem.clickHandler();
                    }
                }
                // #endif
            }
        }
    }
</script>

<style scoped lang="scss">
    .drag-form-input{
        background-color: #ffffff;
        padding: 10upx 30upx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 30upx;
        color: #555;
        .drag-form-input-label{
            margin-right: 15rpx;
        }
        .drag-form-input-box{
            flex: 1;
            display: flex;
            box-sizing: border-box;
            padding: 10rpx 20rpx;
            height: 90rpx;
            // border-radius: 5rpx ;
            // border: 1px solid #f5f5f5;
            .drag-form-input-box-input{
                // width: 100%;
                flex: 1;
                height: 100%;
                font-size: inherit;
                color: inherit;
                line-height: inherit;
                font-weight: inherit;
                border-style: none;
                outline: none;
            }
            .drag-form-input-box-clear{
                margin-left: 5rpx;
            }
        }
    }
</style>
