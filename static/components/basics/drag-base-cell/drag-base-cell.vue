<template>
    <u-cell
        :style="componentRootNoodStyle"
        :customStyle="componentRootNoodStyle"
        :title="title"
        :value="value"
        :label="label"
        :disabled="disabled"
        :border="border"
        :center="center"
        :clickable="clickable"
        :isLink="isLink"
        :required="required"
        :arrowDirection="arrowDirection"
        :titleStyle="titleStyle"
        :size="size"
        :stop="stop"
        :name="name"
        @click="$emit('click', $event)"
    >   
        <template v-slot:icon v-if="leftIcon">
            <drag-base-icon
                :type="leftIcon"
                :color="leftIconColor"
                :size="leftIconSize"
            ></drag-base-icon>
        </template>
        <template v-slot:right-icon v-if="rightIcon && !isLink">
            <drag-base-icon
                :type="rightIcon"
                :color="rightIconColor"
                :size="rightIconSize"
            ></drag-base-icon>
        </template>
        <template v-slot:title >
            <text 
                v-if="title" 
                class="u-cell__title-text" 
                :style="[titleStyle]"
                :class="[
                    disabled && 'u-cell--disabled', 
                    size === 'large' && 'u-cell__title-text--large',
                    titleEllipsis != 'none' ? `uni-ellipsis-${ titleEllipsis }` : ''
                ]"
            >{{ title }}</text>
        </template>
        <template v-slot:label >
            <text class="u-cell__label"
            	:class="[
                    disabled && 'u-cell--disabled', 
                    size === 'large' && 'u-cell__label--large',
                    labelEllipsis != 'none' ? `uni-ellipsis-${ labelEllipsis }` : ''
                ]"
                :style="[labelStyle]"
            >{{ label }}</text>
        </template>
        <template v-slot:value >
            <text class="u-cell__value"
            	:class="[disabled && 'u-cell--disabled', size === 'large' && 'u-cell__value--large']"
                :style="[valueStyle]"
            >{{ value }}</text>
        </template>
    </u-cell>
</template>

<script>
    import props from './props.js'
    export default {
        name: 'drag-base-cell',
        mixins: [props],
        props: {
            leftIcon: {
                type: String,
                default: 'hx-icon:hx-icon-gonggao'
            },
            leftIconSize: {
                type: String,
                default: '40rpx'
            },
            leftIconColor: {
                type: String,
                default: 'rgb(96, 98, 102)'
            },
            rightIconSize: {
                type: String,
                default: '40rpx'
            },
            rightIconColor: {
                type: String,
                default: 'rgb(96, 98, 102)'
            },
            titleSize: {
                type: String,
                default: '15px'
            },
            titleColor: {
                type: String,
                default: '#303133'
            },
            labelColor: {
                type: String,
                default: '#909193'
            },
            valueColor: {
                type: String,
                default: '#606266'
            },
            titleEllipsis: {
                type: String,
                default: 'none'
            },
            labelEllipsis: {
                type: String,
                default: 'none'
            },
            componentRootNoodStyle: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                
            }
        },
        computed: {
            titleStyle(){
                return {
                    fontSize: this.titleSize,
                    color: this.titleColor
                }
            },
            labelStyle(){
                return {
                    color: this.labelColor
                }
            },
            valueStyle(){
                return {
                    color: this.valueColor
                }
            }
        }
    }
</script>

<style scoped lang="scss">

	$u-cell-title-font-size: 15px !default;
	$u-cell-title-line-height: 22px !default;
	$u-cell-title-color: $u-main-color !default;
    $u-cell-title-flex:1 !default;
    $u-cell-title-font-size-large: 16px !default;
    $u-cell-label-font-size: 12px !default;
    $u-cell-label-color: $u-tips-color ;
    $u-cell-label-line-height: 18px !default;
    $u-cell-label-font-size-large: 14px !default;
    $u-cell-label-margin-top:5px !default;
    $u-cell-disabled-color: #c8c9cc !default;
    $u-cell-line-height: 24px !default;
    $u-cell-value-font-size: 14px !default;
    $u-cell-value-color: $u-content-color !default;
    $u-cell-value-font-size-large: 15px !default;


    ::v-deep .u-cell__body{
        height: 100%;
    }
    .u-cell__title {
        flex: $u-cell-title-flex;
        &-text {
            font-size: $u-cell-title-font-size;
            line-height: $u-cell-title-line-height;
            color: $u-cell-title-color;
            &--large {
                font-size: $u-cell-title-font-size-large;
            }
        }

    }

    .u-cell__label{
        margin-top: $u-cell-label-margin-top;
        font-size: $u-cell-label-font-size;
        color: $u-cell-label-color;
        line-height: $u-cell-label-line-height;
        &--large {
            font-size: $u-cell-label-font-size-large;
        }
    }
    .u-cell__value {
        text-align: right;
        font-size: $u-cell-value-font-size;
        line-height: $u-cell-line-height;
        color: $u-cell-value-color;
        &--large {
            font-size: $u-cell-value-font-size-large;
        }
    }
    .u-cell--disabled {
        color: $u-cell-disabled-color;
        /* #ifndef APP-NVUE */
        cursor: not-allowed;
        /* #endif */
    }
    
    /deep/.u-cell__title{
        width: 0;
    }
    // 超出省略
    /* #ifndef APP-NVUE */
    .uni-ellipsis-1 { width: 100%; display: block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
    .uni-ellipsis-2 { display: -webkit-box;overflow: hidden;white-space: normal !important;text-overflow: ellipsis;word-wrap: break-word;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
    .uni-ellipsis-3 { display: -webkit-box;overflow: hidden;white-space: normal !important;text-overflow: ellipsis;word-wrap: break-word;-webkit-line-clamp: 3;-webkit-box-orient: vertical;}
    /* #endif */
    /* #ifdef APP-NVUE */
    .uni-ellipsis-1 {lines: 1}
    .uni-ellipsis-2 {lines: 2}
    .uni-ellipsis-3 {lines: 3}
    /* #endif */
</style>
