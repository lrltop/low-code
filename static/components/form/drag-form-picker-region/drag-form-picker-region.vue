<template>
    <view class="drag-form-input">
        <view v-if="labelText" class="title drag-form-input-label" :style="[ labelStyle ]">{{ labelText }}</view>
        
        <!-- <uni-data-picker :border="false" :localdata="columns" :map="{text: 'value', value: 'code'}" @change="onChange"></uni-data-picker> -->
        <view class="drag-form-input-box"
            :style="[inputStyle]"
            
        >
            <view v-if="showValueText" class="drag-form-input-box-input" @click="open">
                <text>{{ showValueText }}</text>
            </view>
            <view v-else class="drag-form-input-box-input placeholder" @click="open">{{ placeholder }}</view>
            <!-- <input class="drag-form-input-box-input" :value="showValueText" placeholder="请选择" disabled /> -->
            <u-icon
                v-if="showValueText"
                class="drag-form-input-box-clear"
                name="close-circle-fill"
                color="#c6c7cb"
                size="18"
                @click="onClear"
            ></u-icon>
        </view>
        
        <LrlTreePicker
            ref="LrlTreePicker"
            style="width: 0;flex: 0;"
            :localdata="columns"
            :map="{text: 'value', value: 'code'}"
            @confirm="onConfirm"
        ></LrlTreePicker>
    </view>
</template>

<script>
    import addresData from './addresData.js';
    import LrlTreePicker from './lrl-tree-picker/lrl-tree-picker.vue'
    export default {
        name: "drag-form-picker-region",
        components: {
            LrlTreePicker
        },
        props: {
            value: {
                type: [String, Array],
                default: _ => []
            },
            labelText: {
                type: String,
                default: '地区'
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
            placeholder: {
                type: String,
                default: "请选择"
            },
            separator: {
                type: String,
                default: "/"
            }
        },
        data(){
            return {
                index: 0,
                modelValue_: [],
                data: '',
                columns: addresData
            }
        },
        computed: {
            showValueText(){
                return this.modelValue_.map(e => e.value).join(this.separator) // value - addresData
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
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(e){
                    this.modelValue_ = e
                }
            }
        },
        methods: {
            open(){
                this.$refs['LrlTreePicker'].open(null, this.modelValue_)
            },
            onChange(e) {
                const value = e.detail.value
                this.$emit('input', value)
                this.$emit('change', value)
            },
            onConfirm({ value }) {
                console.log(value)
                this.modelValue_ = value
                this.$emit('input', this.modelValue_ )
                this.$emit('change', this.modelValue_ )
            },
            onClear(){
                this.modelValue_ = []
                this.$emit('input', this.modelValue_)
                this.$emit('change', this.modelValue_)
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
            padding: 0 20rpx;
            height: 90rpx;
            line-height: 90rpx;
            // border-radius: 5rpx ;
            // border: 1px solid #f5f5f5;
            .drag-form-input-box-input{
                // width: 100%;
                flex: 1;
                width: 0;
                overflow-x: scroll;
                height: 100%;
                font-size: inherit;
                color: inherit;
                line-height: inherit;
                font-weight: inherit;
                border-style: none;
                outline: none;
                white-space: nowrap;
                &.placeholder{
                    color: #c3c4cf;
                }
            }
            .drag-form-input-box-clear{
                margin-left: 5rpx;
            }
        }
    }
</style>
