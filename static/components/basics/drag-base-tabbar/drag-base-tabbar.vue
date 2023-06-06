<template>
    <u-tabbar class="custom-map" :value="value" @change="change" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
        <template v-if="tabbarData && tabbarData.list">
            <u-tabbar-item
                v-for="item in tabbarData.list"
                :name="item.pagePath"
                :text="item.text"
                :icon="item.icon"
                :badge="item.badge"
                :dot="item.dot"
                @click="tabbarItemClick"
            >
                <template v-if="item.activeIcon && item.inactiveIcon">
                    <image class="custom-icon" slot="active-icon" :src="item.activeIcon" mode="widthFix"></image>
                    <image class="custom-icon" slot="inactive-icon" :src="item.inactiveIcon" mode="widthFix"></image>
                </template>
            </u-tabbar-item>
        </template>
    </u-tabbar>
</template>

<script>
export default {
    name: 'drag-base-map',
    props: {
        tabbarData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            value: ''
        }
    },
    methods: {
        change(name) {
            this.value = name
        },
        tabbarItemClick(name) {
            this.value = name
            this.$emit('tabbarClick', name)
        }
    }
}
</script>

<style scoped lang="scss">
.custom-map {
    z-index: 999;
    position: sticky;
    bottom: 0;
}
</style>
