<template>
    <view class="cu-form-group drag-form-textarea">
        <view 
            v-if="labelText" 
            class="drag-form-textarea-label"
            :style="[
                labelStyle
            ]"
            
            
        >{{ labelText }}</view>
        <view class="drag-form-textarea-box"
            :style="[inputStyle]"
        >
            <textarea
                :value="innerValue"
                class="drag-form-textarea-box-textarea cu-form-value-font"
                name="input" 
                
                :placeholder="placeholder"
                :disabled="disabled"
                :maxlength="maxlength"
                :cursorSpacing="cursorSpacing"
                :focus="focus"
                :cursor="cursor"
                :selectionStart="selectionStart"
                :selectionEnd="selectionEnd"
                :confirmType="confirmType"
                :autoHeight="autoHeight"
                :confirmHold="confirmHold"
                :showConfirmBar="showConfirmBar"
                :adjustPosition="adjustPosition"
                :autoBlur="autoBlur"
                @focus="onFocus"
                @blur="onBlur"
                @linechange="onLinechange"
                @input="onInput"
                @confirm="onConfirm"
                @keyboardheightchange="onKeyboardheightchange"
            ></textarea>
            <view v-if="count" class="drag-form-textarea-box-count">
                {{ innerValue.length }}/{{ maxlength }}
            </view>
        </view>
        
    </view>
</template>

<script>
    export default {
        name: "FormText",
        props: {
            value: {
                type: [String, Number, Boolean],
                default: ''
            },
            labelText: {
                type: String,
                default: '文本域'
            },
            labelWidth: {
                type: String,
                default: '100rpx'
            },
            labelFontSize: {
                type: String,
                default: '30rpx'
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
            count: {
                type: Boolean,
                default: true
            },
            cursorSpacing: {
                type: Number,
                default: 0
            },
            focus: {
                type: Boolean,
                default: false
            },
            autoHeight: {
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
            showConfirmBar: {
                type: Boolean,
                default: true
            },
            adjustPosition: {
                type: Boolean,
                default: true
            },
            autoBlur: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
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
        methods:{
            // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
            setFormatter(e) {
            	this.innerFormatter = e
            },
            onFocus(e) {
                this.$emit("focus", e);
            },
            onBlur(e) {
                this.$emit("blur", e);
            },
            onLinechange(e) {
                this.$emit("linechange", e);
            },
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
            onConfirm(e) {
                this.$emit("confirm", e);
            },
            onKeyboardheightchange(e) {
                this.$emit("keyboardheightchange", e);
            }
        }
    }
</script>

<style scoped lang="scss">
    .drag-form-textarea{
        background-color: #ffffff;
        padding: 10upx 30upx;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        font-size: 30upx;
        color: #555;
        .drag-form-textarea-label{
            padding-top: 14rpx;
            margin-right: 15rpx;
        }
        .drag-form-textarea-box{
            flex: 1;
            box-sizing: border-box;
            padding: 10rpx 20rpx;
            // border-radius: 5rpx ;
            // border: 1px solid #f5f5f5;
            .drag-form-textarea-box-textarea{
                width: 100%;
                // height: 100%;
                font-size: inherit;
                color: inherit;
                line-height: inherit;
                font-weight: inherit;
            }
            .drag-form-textarea-box-count{
                text-align: right;
                font-size: 12px;
                color: #909193;
            }
        }
    }
    
</style>
