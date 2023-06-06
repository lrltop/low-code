export default {
    props: {
        // 标题
        title: {
            type: [String, Number],
            default: "青春是生命之河中最璀璨的一颗明珠"
        },
        // 标题下方的描述信息
        label: {
            type: [String, Number],
            default: "时间带不走年轮，流年带不走青春，青春属于有梦想有追求的人，只要保持一颗积极向上的心，青春就属于你。"
        },
        // 右侧的内容
        value: {
            type: [String, Number],
            default: ""
        },
        // 是否禁用cell
        disabled: {
            type: Boolean,
            default: false
        },
        // 是否显示下边框
        border: {
            type: Boolean,
            default: true
        },
        // 内容是否垂直居中(主要是针对右侧的value部分)
        center: {
            type: Boolean,
            default: false
        },
        // 是否开启点击反馈(表现为点击时加上灰色背景)
        clickable: {
            type: Boolean,
            default: false
        },
        // 是否展示右侧箭头并开启点击反馈
        isLink: {
            type: Boolean,
            default: true
        },
        // 是否显示表单状态下的必填星号(此组件可能会内嵌入input组件)
        required: {
            type: Boolean,
            default: false
        },
        // 右侧的图标箭头
        rightIcon: {
            type: String,
            default: "uview:heart-fill"
            // default: "uview:arrow-right"
        },
        // 右侧箭头的方向，可选值为：left，up，down
        arrowDirection: {
            type: String,
            default: "right"
        },
        // 单位元的大小，可选值为large
        size: {
            type: String,
            default: "medium"
        },
        // 点击cell是否阻止事件传播
        stop: {
            type: Boolean,
            default: uni.$u.props.cell.stop
        },
        // 标识符，cell被点击时返回
        name: {
            type: [Number, String, Array, Object, Boolean],
            default: uni.$u.props.cell.name
        }
    }
}
