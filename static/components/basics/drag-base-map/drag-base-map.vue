<template>
    <view id="container" style="height: 400rpx;" :style="componentRootNoodStyle">
        <map
            style="width: 100%;height: 100%;"
            :latitude="latitude"
            :longitude="longitude"
            :scale="scale"
            :minScale="minScale"
            :maxScale="maxScale"
            :markers="markers"
            :polyline="polyline"
            :circles="circles"
            :includePoints="includePoints"
            :enableSatellite="enableSatellite"
            :enableTraffic="enableTraffic"
            @regionchange="$emit('mapRegionchange')"
            @tap="$emit('mapTap')"
        ></map>
    </view>
</template>

<script>
export default {
    name: 'drag-base-map',
    props: {
        longitude: {
            type: Number,
            default: 104.07
        },
        latitude: {
            type: Number,
            default: 30.67
        },
        scale: {
            type: Number,
            default: 15
        },
        minScale: {
            type: Number,
            default: 3
        },
        maxScale: {
            type: Number,
            default: 20
        },
        markers: {
            type: Array,
            default: () => []
        },
        polyline: {
            type: Array,
            default: () => []
        },
        circles: {
            type: Array,
            default: () => []
        },
        includePoints: {
            type: Array,
            default: () => []
        },
        enableSatellite: {
            type: Boolean,
            default: false
        },
        enableTraffic: {
            type: Boolean,
            default: false
        },
        componentRootNoodStyle: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style scoped lang="scss"></style>
