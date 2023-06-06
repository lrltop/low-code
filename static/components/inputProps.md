### `text`

|属性|类型|默认值|说明|
|--|--|--|--|
|maxlength|number|-|原生属性，最大输入长度|
|minlength|number|-|原生属性，最小输入长度|
|placeholder|string|-|输入框占位文本|
|clearable|boolean|true|是否可清空|
|disabled|boolean|false|禁用|
|random|boolean|false|无默认值时是否随机生成|
|randomLength|number|4|随机生成长度|

### `textarea`

|属性|类型|默认值|说明|
|--|--|--|--|
|maxlength|number|-|原生属性，最大输入长度|
|minlength|number|-|原生属性，最小输入长度|
|placeholder|string|-|输入框占位文本|
|clearable|boolean|false|是否可清空|
|disabled|boolean|false|禁用|
|autosize|boolean / object|false|自适应内容高度，可传入对象，如，{ minRows: 2, maxRows: 6 }|
|rows|number|2|输入框行数|
|showWordLimit|boolean|true|是否显示输入字数统计|

### `number`

|属性|类型|默认值|说明|
|--|--|--|--|
|min|number|-Infinity|设置计数器允许的最小值|
|max|number|Infinity|设置计数器允许的最大值|
|placeholder|string|-|输入框占位文本|
|step|number|1|计数器步长|
|disabled|boolean|false|禁用|
|random|boolean|false|无默认值时是否随机生成|
|randomLength|number|4|随机生成长度|
|stepStrictly|boolean|false|是否只能输入 step 的倍数|
|suffixText|string|-|输入框后缀文字|

### `size`

|属性|类型|默认值|说明|
|--|--|--|--|
|mode|string|normal|输入模式，normal为默认输入框模式、slider为带拖动条的输入框|
|min|number|0|设置计数器允许的最小值，slider拖动最小支持0|
|max|number|99999|设置计数器允许的最大值，slider拖动最小支持130|
|placeholder|string|-|输入框占位文本|
|step|number|1|计数器步长|
|disabled|boolean|false|禁用|
|stepStrictly|boolean|false|是否只能输入 step 的倍数|
|supportAuto|boolean|false|是否可以选择auto自动|

### `boolean`

|属性|类型|默认值|说明|
|--|--|--|--|
|width|number|40|switch 的宽度（px）|
|disabled|boolean|false|禁用|
|activeIconClass|string|-|switch 打开时所显示图标(elementUi)的类名，设置此项会忽略 active-text|
|inactiveIconClass|string|-|switch 关闭时所显示图标(elementUi)的类名，设置此项会忽略 inactive-text|
|activeText|string|-|switch 打开时的文字描述|
|inactiveText|string|-|switch 关闭时的文字描述|
|activeValue|boolean / string / number|true|switch 打开时的值|
|inactiveValue|boolean / string / number|false|switch 关开时的值|
|activeColor|string|#409EFF|switch 打开时的背景色|
|inactiveColor|string|#C0CCDA|switch 关闭时的背景色|

### `datacom`

|属性|类型|默认值|说明|
|--|--|--|--|
|mode|string|single|single = 单层数据编辑，tree =  具有子集 children 的树形数据编辑|

### `JsonEditor`

|属性|类型|默认值|说明|
|--|--|--|--|
|mode|string|text|初始时显示模式，text = 文本编辑，tree =  树形可视化编辑|
|readOnly|boolean|false|是否只读|
|mainMenuBar|boolean|true|显示主菜单栏|
|navigationBar|boolean|true|显示导航栏|
|height|string|500px|json编辑器高度|

### `color`

|属性|类型|默认值|说明|
|--|--|--|--|
|size|string|mini|选择器大小，medium / small / mini|
|disabled|boolean|false|是否禁用|
|showAlpha|boolean|true|是否支持透明度选择|
|colorFormat|string|rgb|写入 v-model 的颜色的格式，hsl / hsv /hex（show-alpha 为 false）/ rgb（show-alpha 为 true）|
|outputFormat|string|hex|输出颜色的格式，hex/ rgb|
|hexOutputOpacity|boolean|true|输出颜色的格式为hex时，是否带上透明度格式，例如#FFFFFF00 -> #FFFFFF|
|predefine|array|-|预定义颜色|

### `dateTime`

|属性|类型|默认值|说明|
|--|--|--|--|
|size|string|mini|输入框尺寸，large, small, mini|
|disabled|boolean|false|是否禁用|
|readonly|boolean|false|完全只读|
|editable|boolean|true|文本框可输入|
|clearable|boolean|true|是否显示清除按钮|
|placeholder|string|选择日期时间|非范围选择时的占位内容|
|startPlaceholder|string|-|范围选择时开始日期的占位内容|
|endPlaceholder|string|-|范围选择时结束日期的占位内容|
|type|string|datetime|显示类型，year/month/date/dates/months/years week/datetime/datetimerange/ daterange/monthrange，[详见element date-picker](https://element.eleme.cn/#/zh-CN/component/date-picker)|
|format|string|yyyy/MM/dd HH:mm:ss|显示在输入框中的格式，[见日期格式](https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi)|
|valueFormat|string|yyyy/MM/dd HH:mm:ss|可选，绑定值的格式。不指定则绑定值为 Date 对象，[见日期格式](https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi)|
|align|string|left|对齐方式，left, center, right|
|pickerOptions|object|{}|当前时间日期选择器特有的选项，[参考](https://element.eleme.cn/#/zh-CN/component/date-picker#picker-options)|
|rangeSeparator|string|'-'|选择范围时的分隔符|
|defaultValue|Date/string|-|可选，选择器打开时默认显示的时间，可被`new Date()`解析|
|defaultTime|string[]|-|范围选择时选中日期所使用的当日内具体时刻，数组，长度为 2，每项值为字符串，形如12:00:00，第一项指定开始日期的时刻，第二项指定结束日期的时刻，不指定会使用时刻 00:00:00|
|unlinkPanels|boolean|false|在范围选择器里取消两个日期面板之间的联动|
|prefixIcon|string|el-icon-date|自定义头部图标的类名，[element-icon](https://element.eleme.cn/#/zh-CN/component/icon)|
|clearIcon|string|el-icon-circle-close|自定义清空图标的类名，[element-icon](https://element.eleme.cn/#/zh-CN/component/icon)|
|appendToBody|boolean|true|DetePicker 自身是否插入至 body 元素上。|

### `slider`

|属性|类型|默认值|说明|
|--|--|--|--|
|inputSize|string|mini|选择器大小，medium / small / mini|
|disabled|boolean|false|是否禁用|
|min|number|0|最小值|
|max|number|100|最大值|
|step|number|1|步长|
|showInput|boolean|false|是否显示输入框，仅在非范围选择时有效|
|showStops|boolean|false|是否显示间断点|
|showTooltip|boolean|true|是否显示 tooltip|
|range|boolean|false|是否为范围选择|
|debounce|number|300|输入时的去抖延迟，毫秒，仅在`showInput`等于true时有效|
