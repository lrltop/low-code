<template>
    <view class="drag-data-album">
        <u-album
            v-if="urls.length"
            ref="album"
            :urls="urls"
            :keyName="keyName"
            :singleSize="singleSize"
            :multipleSize="multipleSize"
            :space="space"
            :singleMode="singleMode"
            :multipleMode="multipleMode"
            :maxCount="maxCount"
            :previewFullImage="previewFullImage"
            :rowCount="rowCount"
            :showMore="showMore"
        ></u-album>
        <view v-else >
            暂无图片
        </view>
    </view>
    
</template>

<script>
    export default{
        name: 'drag-data-album',
        props: {
            urls: {
                type: Array,
                default: _ => [
                    "http://img.lemeitu.com/m00/a0/5c/ffc3c39d289296db3b97effa924d4bb6__w.jpg",
                    "http://img.lemeitu.com/m00/a0/5c/ffc3c39d289296db3b97effa924d4bb6__w.jpg",
                    "http://img.lemeitu.com/m00/2d/34/ef812ef475af89c643b0111e66d8ff00__w.jpg",
                    "http://img.lemeitu.com/m00/2f/50/840c937f211bd6b195d919b267263f59__w.jpg",
                    "http://img.lemeitu.com/m00/06/5e/43a7cdfc525476cb15c099900c256832__w.jpg",
                    "http://img.lemeitu.com/m00/34/59/09e16260c1f600683269018c43ab0ea5__w.jpg",
                    "http://img.lemeitu.com/m00/a3/8f/580d3094ae6eea64c915c309b9f1ebce__w.jpg",
                    "http://img.lemeitu.com/m00/06/4a/6a5a7b23518b822b15dbab9e4c9e75f6__w.jpg",
                    "http://img.lemeitu.com/m00/24/3c/b43c0ca796899f5e54365a90dd5d1366__w.jpg"
                ]
            },
            // 指定从数组的对象元素中读取哪个属性作为图片地址
            keyName: {
                type: String,
                default: uni.$u.props.album.keyName
            },
            // 单图时，图片长边的长度
            singleSize: {
                type: [String, Number],
                default: uni.$u.props.album.singleSize
            },
            // 多图时，图片边长
            multipleSize: {
                type: [String, Number],
                default: '80rpx'
            },
            // 多图时，图片水平和垂直之间的间隔
            space: {
                type: [String, Number],
                default: uni.$u.props.album.space
            },
            // 单图时，图片缩放裁剪的模式
            singleMode: {
                type: String,
                default: uni.$u.props.album.singleMode
            },
            // 多图时，图片缩放裁剪的模式
            multipleMode: {
                type: String,
                default: uni.$u.props.album.multipleMode
            },
            // 最多展示的图片数量，超出时最后一个位置将会显示剩余图片数量
            maxCount: {
                type: [String, Number],
                default: uni.$u.props.album.maxCount
            },
            // 是否可以预览图片
            previewFullImage: {
                type: Boolean,
                default: false
            },
            // 每行展示图片数量，如设置，singleSize和multipleSize将会无效
            rowCount: {
                type: [String, Number],
                default: uni.$u.props.album.rowCount
            },
            // 超出maxCount时是否显示查看更多的提示
            showMore: {
                type: Boolean,
                default: uni.$u.props.album.showMore
            }
        },
        computed: {
            
        }
    }
</script>

<style scoped>
    /deep/ *{
        zoom: 1 ;
    }
    .drag-data-album{
        width: max-content;
    }
</style>