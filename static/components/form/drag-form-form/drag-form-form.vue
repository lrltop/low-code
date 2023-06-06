<template>
    <view class="form-component">
        <u--form
            ref="form"
            :model="formData"
            :rules="rules"
            :errorType="errorType"
            :borderBottom="borderBottom"
            :labelWidth="labelWidth"
            :labelAlign="labelAlign"
            :labelPosition="labelPosition"
        >
            <u-form-item
                v-for="(item, index) in formItemList"
                :key="item.key"
                :ref="'item' + item.key"
                :label="item.label"
                :prop="item.key"
                :borderBottom="borderBottom"
                :required="item.required"
            >
                <u-checkbox-group v-if="item.formType == 'checkbox'" v-model="formData[item.key]">
                    <u-checkbox
                        v-for="checkboxItem in item.rangeList"
                        :key="checkboxItem.name"
                        :label="checkboxItem.label"
                        :name="checkboxItem.name"
                    ></u-checkbox>
                </u-checkbox-group>

                <u-radio-group v-else-if="item.formType == 'radio'" v-model="formData[item.key]">
                    <u-radio v-for="radioItem in item.rangeList" :key="radioItem.name" :label="radioItem.label" :name="radioItem.name"></u-radio>
                </u-radio-group>

                <uni-data-picker
                    v-else-if="item.formType == 'picker'"
                    v-model="formData[item.key]"
                    :map="{ text: 'label', value: 'name' }"
                    :localdata="item.rangeList"
                    :border="false"
                    @change="$refs.form.validateField(item.key)"
                ></uni-data-picker>

                <template v-else-if="item.formType == 'calendar'">
                    <text v-if="formData[item.key]" @click="item.show = true">
                        {{
                            item.mode == 'range'
                                ? formData[item.key][0] + '~' + formData[item.key][formData[item.key].length - 1]
                                : formData[item.key]
                        }}
                    </text>
                    <text v-else style="color: grey" @click="item.show = true">请选择日期</text>
                    <u-calendar
                        :show="item.show"
                        :closeOnClickOverlay="true"
                        :mode="item.mode || 'range'"
                        @confirm="
                            item.mode && item.mode != 'single' ? (formData[item.key] = $event) : (formData[item.key] = $event[0])
                            item.show = false
                        "
                        @close="item.show = false"
                    ></u-calendar>
                </template>

                <template v-else-if="item.formType == 'date'">
                    <text v-if="formData[item.key]" @click="item.show = true">{{ formData[item.key] }}</text>
                    <text v-else style="color: grey" @click="item.show = true">请选择时间日期</text>
                    <u-datetime-picker
                        :value="+new Date()"
                        :show="item.show"
                        :closeOnClickOverlay="true"
                        :mode="item.mode || 'datetime'"
                        @confirm="confirmDate($event, item)"
                        @cancel="item.show = false"
                        @change="$refs.form.validateField(item.key)"
                    ></u-datetime-picker>
                </template>

                <u-number-box v-else-if="item.formType == 'numberBox'" v-model="formData[item.key]"></u-number-box>

                <u-switch v-else-if="item.formType == 'switch'" v-model="formData[item.key]"></u-switch>
                <u-slider v-else-if="item.formType == 'slider'" v-model="formData[item.key]" showValue></u-slider>
                <u--textarea
                    v-else-if="item.formType == 'textarea'"
                    v-model="formData[item.key]"
                    :placeholder="item.placeholder ? item.placeholder : '请输入'"
                    count
                ></u--textarea>
                <u--input v-else v-model="formData[item.key]" border="none" :placeholder="item.placeholder ? item.placeholder : '请输入'"></u--input>
            </u-form-item>
        </u--form>
        <view v-if="buttonFixed" class="footer-container">
            <u-button class="button" :type="buttonType" style="margin-top: 40rpx;" @click="submit">{{ buttonText }}</u-button>
        </view>
        <u-button v-else :type="buttonType" style="margin-top: 40rpx;" @click="submit">{{ buttonText }}</u-button>
        <!-- <u-button style="margin-top: 20rpx;" @click="reset">重置</u-button> -->
    </view>
</template>

<script>
export default {
    name: 'drag-form-item',
    props: {
        formItemList: {
            type: Array,
            default: () => []
        },
        // 当前form的需要验证字段的集合
        // model: {
        //     type: Object,
        //     default: uni.$u.props.form.model
        // },
        // 验证规则
        // rules: {
        //     type: [Object, Function, Array],
        //     default: uni.$u.props.form.rules
        // },
        // 有错误时的提示方式，message-提示信息，toast-进行toast提示
        // border-bottom-下边框呈现红色，none-无提示
        errorType: {
            type: String,
            default: uni.$u.props.form.errorType
        },
        // 是否显示表单域的下划线边框
        borderBottom: {
            type: Boolean,
            default: uni.$u.props.form.borderBottom
        },
        // label的位置，left-左边，top-上边
        labelPosition: {
            type: String,
            default: uni.$u.props.form.labelPosition
        },
        // label的宽度，单位px
        labelWidth: {
            type: [String, Number],
            default: '130rpx'
        },
        // lable字体的对齐方式
        labelAlign: {
            type: String,
            default: uni.$u.props.form.labelAlign
        },
        // lable的样式，对象形式
        labelStyle: {
            type: Object,
            default: uni.$u.props.form.labelStyle
        },
        buttonText: {
            type: String,
            default: '提交'
        },
        buttonType: {
            type: String,
            default: 'primary'
        },
        buttonFixed: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formData: {},
            rules: {}
        }
    },
    watch: {
        formItemList: {
            handler(val) {
                if (val.length > 0) {
                    val.forEach(item => {
                        let formType = item.formType
                        if (formType == 'checkbox') {
                            this.$set(this.formData, item.key, [])
                        } else if (formType == 'switch') {
                            this.$set(this.formData, item.key, false)
                        } else if (formType == 'slider') {
                            this.$set(this.formData, item.key, 51)
                        } else {
                            this.$set(this.formData, item.key, '')
                        }

                        this.rules[item.key] = {
                            type: item.type,
                            required: item.required,
                            message: item.message || item.placeholder,
                            trigger: ['blur', 'change'],
                            validator: (rule, value, callback) => {
                                return !uni.$u.test[item.validator](value)
                            }
                        }
                    })
                    setTimeout(() => {
                        this.$refs.form.setRules(this.rules)
                    })
                }
                console.log(this.formData)
            },
            immediate: true
        }
    },
    methods: {
        submit() {
            this.$refs.form.validate().then(res => {
                this.$emit('submit', this.formData)
            }).catch(errors => {
            })
        },
        reset() {
            this.$refs.form.resetFields()
            setTimeout(() => {
                this.$refs.form.clearValidate()
            })
        },
        confirmDate(e, item) {
            switch (e.mode) {
                case 'date':
                    this.formData[item.key] = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
                    break
                case 'datetime':
                    this.formData[item.key] = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM')
                    break
                case 'year-month':
                    this.formData[item.key] = uni.$u.timeFormat(e.value, 'yyyy-mm')
                    break
                default:
                    break
            }
            item.show = false
        }
    }
}
</script>

<style scoped lang="scss">
.form-component {
    padding: 20rpx 30rpx;
    ::v-deep .u-radio,
    ::v-deep .u-checkbox {
        margin-right: 20rpx;
    }
    ::v-deep .u-slider {
        flex-grow: 1;
    }
}
.footer-container {
    height: calc(env(safe-area-inset-bottom) / 2 + 80rpx);
    .button {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 9;
        height: calc(env(safe-area-inset-bottom) / 2 + 80rpx);
        padding-bottom: calc(env(safe-area-inset-bottom) / 2);
        width: 750rpx;
        border-radius: 0;
    }
}
</style>
