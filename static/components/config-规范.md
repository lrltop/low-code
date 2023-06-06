``` json
{
	// 组件名称，例如：drag-base-button
	"componentName": "",
	// 组件文字名称，例如：按钮
	"name": "",
	// 组件描述，可以讲注意事项或者平台兼容性在这里
	"description": "按钮",
    /**
     * 在画布编辑模式时选中效果
     * cover 可以在编辑时禁止组件内部的鼠标点击动作，但是不能禁止组件根节点的点击事件
     * plain 在编辑时不会禁止内部元素鼠标点击动作（默认）
     */
    "canvasSelectedMode": "plain",
    // 是否自定义解析处理样式，自定义处理将会通过 `componentRootNoodStyle` 属性传递给组件
    "customHandleStyle": false,
	/**
     * 组件属性
     */
	"props": [
		{
			// 属性名称
			"label": "",
			// 属性描述，可以讲注意事项或者平台兼容性在这里
			"description": "",
			// 属性key
			"key": "",
            // 属性展示分类
            "classify": "",
			/**
             * 数据类型
             * String 字符串
             * Number 数字
             * Boolean 布尔
             * Array 数组
             * Object 对象
             */ 
			"type": "",
			/**
             * 输入组件类型，具体表现为相应的组件选择输入数据
             * text   String 文本框输入(默认) 
             * textarea String 文本域
             * color  String 颜色输入，支持 rgb、rgba、hex、颜色代码格式的颜色
             * image  String 图片输入 
             * size   String 尺寸大小输入，只支持解析px、rpx、vh
             * icon   String 图标选择（包含海星和uview图标选择，格式为 haixin:star或uview:star，:前为图标类型，需要组件自己判断处理）
             * uviewIcon String uview图标选择
             * api    String 接口选择
             * date   String 时间选择
             * boolean Boolean 布尔类型输入
             * number  Number  数字类型输入
             * dateTime   String 日期时间选择
             * dataName     Any  限制只能绑定dataName
             * datacom      Array datacom数据格式编辑  [datacom规范](https://gitee.com/dcloud/datacom)
             * jsonEditor   Array|Object json编辑器
             */
			"inputType": "",
            // 输入组件属性，查看 inputProps.md
            "inputProps": {},
			/**
             * 默认值
             */
			"default": "",
			// 自定义待选项
			"section": [
				{
					// 待选项名称
					"label": "",
					// 待选项描述，可以讲注意事项或者平台兼容性在这里
					"description": "",
					// 待选项值
					"value": ""
				}
			],
            /**
             * TODO 估计不得要这个了
             * 公共待选项
             * fontSize 文字大小
             * color    颜色
             * imageMode image组件mode属性
             * shadow   css阴影值
             */
            "sectionMode": "",
            // 属性依赖，依赖于某个属性值才会显示设置
            "must": {
                // 依赖属性 例如 position
                "key": "",
                // 依赖值，支持数组多个值，例如："value": ["absolute"，"fixed"]
                "value": []
            }
		}
	],
	// 组件事件
	"events": [
		{
			// 事件文字名称
			"label": "",
			// 事件名
			"key": "change",
			// 事件描述，可以讲注意事项或者平台兼容性在这里
			"description": "",
			// 事件参数
			"params": [],
            // 属性依赖，依赖于某个属性值才会显示设置
            "must": {
                // 依赖属性
                "key": "position",
                // 依赖值，支持数组多个值，例如："value": ["absolute"，"fixed"]
                "value": ["absolute"]
            }
		}
	],
    // 组件内部可通过ref调用的事件
    "methods": [
        {
        	// 事件文字名称
        	"label": "",
        	// 事件名
        	"key": "change",
        	// 事件描述，可以讲注意事项或者平台兼容性在这里
        	"description": "",
        	// 事件参数
        	"params": []
        }
    ],
    "slot": {
        /**
         * 循环具名插槽，也就是动态的插槽
         * vForPrefix 循环slot name前缀，需要与组件对应
         * vForProps 根据指定props循环
         */
        "vForPrefix": "tab-", // 实际循环出来的前缀为tab-0、tab-1、...
        "vForProps": "list",
        
        /**
         * ... 其余为命名的具名插槽，值为插槽的描述
         * 以下为例子，都可以自定义
         */
        "default": "默认内容",
        "left": "左侧内容",
        "right": "右侧内容",
        "center": "中间内容",
        "custom": "自定义"
    },
    "extraJs": {
        /**
         * @Author 吕岚秋
         * 需要额外js支撑的组件，可以配置这个节点，比如组件需要minin.js混入
         * 2022/12/14  目前只处理了mixins的逻辑
         */
        "mixins": {
            // "sourceValue": "@/components/mescroll/mixins/mescroll-comp.js",
            // "specifier": "MescrollCompMixin"
        }
    },
    // 子组件，类似radio-group和radio组件、el-collapse和el-collapse-item这种组件关系
    // "children": {
    //     "name": "",
    //     "length": 1
    // }
    
}

// object array深层类型数据可视化编辑示例：

    // 被编辑的数据：
    {
        "text": "文字",
        "icon": "图标",
        "style": {
            "fontSize": "30rpx",
            "color": "red"
        },
        "texts": [
            "文字",
            "文字"
        ],
        "children": [
            {
                
            }
        ]
    }
    // props配置
    {
        "key": "",
        "label": "属性",
        "inputType": "Object",
        "inputProps": {
            "props": {
                "text": {
                    "label": "文字",
                    "inputType": "text",
                    "inputProps": {},
                    "default": ""
                },
                "icon": : {
                    "label": "图标",
                    "inputType": "icon",
                    "inputProps": {},
                    "default": ""
                },
                "style": : {
                    "label": "样式",
                    "inputType": "style",
                    "inputProps": {},
                    "default": ""
                },
                "inner": {
                    "label": "内容",
                    "inputType": "Object",
                    "inputProps": {
                        "props": {
                            "text": {
                                "label": "文字",
                                "inputType": "text",
                                "inputProps": {},
                                "default": "文字"
                            },
                            "src": {
                                "label": "图片",
                                "inputType": "image",
                                "inputProps": {},
                                "default": ""
                            }
                        }
                    }
                },
                "children":{
                    "label": "子集",
                    "inputType": "Array",
                    "default": "",
                    "inputProps": {
                        "maxLength": 5,
                        "itemInputType": "Object",
                        "itemDefault": "",
                        "itemInputProps": {
                            "props": {
                                "text": {
                                    "label": "文字",
                                    "inputType": "text",
                                    "inputProps": {}
                                },
                                "icon": : {
                                    "label": "图标",
                                    "inputType": "icon",
                                    "inputProps": {}
                                },
                                "style": : {
                                    "label": "样式",
                                    "inputType": "style",
                                    "inputProps": {}
                                }
                            }
                        }
                    }
                }
            }
        }
    }

```

