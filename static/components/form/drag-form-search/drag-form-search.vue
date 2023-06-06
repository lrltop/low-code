<template>
    <u-search
        v-model="keyword"
        :placeholder="placeholder"
        :placeholderColor="placeholderColor"
        :bgColor="bgColor"
        :clearabled="clearabled"
        :focus="focus"
        :showAction="showAction"
        :actionStyle="actionStyle"
        :actionText="actionText"
        :inputAlign="inputAlign"
        :inputStyle="inputStyle"
        :disabled="disabled"
        :borderColor="borderColor"
        :searchIcon="searchIcon"
        :searchIconColor="searchIconColor"
        :searchIconSize="searchIconSize"
        :margin="margin"
        :color="color"
        :maxlength="maxlength"
        :height="height"
        :label="label"
        :animation="animation"
        @search="$emit('search', $event)"
        @click="$emit('click', $event)"
        @focus="$emit('focus', $event)"
        @change="$emit('change', $event)"
        @blur="$emit('blur', $event)"
        @custom="$emit('custom', $event)"
    ></u-search>
</template>

<script>
export default {
    name: 'drag-form-search',
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入搜索关键字'
        },
        placeholderColor: {
            type: String,
            default: '#909399'
        },
        bgColor: {
            type: String,
            default: '#f2f2f2'
        },
        clearabled: {
            type: Boolean,
            default: true
        },
        focus: {
            type: Boolean,
            default: false
        },
        showAction: {
            type: Boolean,
            default: false
        },
        actionStyle: {
            type: Object,
            default: () => {}
        },
        actionText: {
            type: String,
            default: '搜索'
        },
        inputAlign: {
            type: String,
            default: 'left'
        },
        inputStyle: {
            type: Object,
            default: () => {}
        },
        disabled: {
            type: Boolean,
            default: false
        },
        borderColor: {
            type: String,
            default: 'transparent'
        },
        searchIconColor: {
            type: String,
            default: '#909399'
        },
        searchIconSize: {
            type: Number,
            default: 22
        },
        color: {
            type: String,
            default: '#606266'
        },
        searchIcon: {
            type: String,
            default: 'search'
        },
        margin: {
            type: String,
            default: '0'
        },
        animation: {
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number,
            default: -1
        },
        height: {
            type: [Number, String],
            default: 45
        },
        label: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            keyword: ''
        }
    },
    created() {
        this.keyword = this.value
    },
    watch: {
        value(val) {
            this.$emit('input', this.keyword)
        }
    }
}
</script>

<style scoped></style>
