<template>
    <view class="cu-form-group">
        <view v-if="labelText" class="title">{{ labelText }}</view>
        <uni-data-picker 
            v-model="modelValue" 
            :border="false" 
            :localdata="columns" 
            style="flex: 1;width: 0;" 
            @change="onChange"
        >
            <template v-slot="{data}">
                <u-input 
                    :value="data.map(e => e.text).join('/')"
                    placeholder="请选择"
                    readonly
                    suffixIcon="arrow-right"
                ></u-input>
            </template>
        </uni-data-picker>
    </view>
</template>

<script>
export default {
    name: 'drag-form-picker-level',
    components: {
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        labelText: {
            type: String,
            default: '级联'
        },
        columns: {
            type: Array,
            default: _ => []
        }
    },
    data() {
        return {
            index: 0
        }
    },
    computed: {
        modelValue: {
            set(val) {
                this.$emit('input', val)
            },
            get() {
                return this.value
            }
        }
    },
    methods: {
        onChange(e) {
            const value = e.detail.value
            this.$emit('input', value)
            this.$emit('change', value)
        }
    }
}
</script>

<style scoped></style>
