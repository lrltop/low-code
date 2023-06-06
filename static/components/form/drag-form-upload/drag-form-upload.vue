<template>
    <view class="cu-form-group">
        <view v-if="labelText" class="title">{{ labelText }}</view>
        <u-upload
            :accept="accept"
            :capture="captureData"
            :compressed="compressed"
            :camera="camera"
            :maxDuration="maxDuration"
            :action="actionUrl"
            :fileList="fileList"
            :multiple="multiple"
            :maxCount="maxCount"
            :width="width"
            :height="height"
            :imageMode="imageMode"
            :name="name"
            :sizeType="sizeTypeData"
            :deletable="deletable"
            :maxSize="maxSizeData"
            :uploadText="uploadText"
            :formData="Object.assign({ filePath: name }, formData)"
            :disabled="ue.isPlat"
            @afterRead="afterRead"
            @delete="deletePic"
            @oversize="oversize"
            @beforeRead="beforeRead"
        ></u-upload>
    </view>
</template>
<script>
export default {
    name: 'drag-form-upload',
    props: {
        labelText: {
            type: String,
            default: '图片上传'
        },
        accept: {
            type: String,
            default: 'image'
        },
        capture: {
            type: String,
            default: 'both'
        },
        compressed: {
            type: Boolean,
            default: true
        },
        camera: {
            type: String,
            default: 'back'
        },
        maxDuration: {
            type: Number,
            default: 60
        },
        actionUrl: {
            type: String,
            default: ''
        },
        // 显示已上传的文件列表
        fileList: {
            type: Array,
            default: () => []
        },
        // 最大上传数量
        maxCount: {
            type: [String, Number],
            default: 1
        },
        // 内部预览图片区域和选择图片按钮的区域宽度
        width: {
            type: [String, Number],
            default: '80'
        },
        // 内部预览图片区域和选择图片按钮的区域高度
        height: {
            type: [String, Number],
            default: '80'
        },
        imageMode: {
            type: String,
            default: 'scaleToFill'
        },
        formData: {
            type: Object,
            default: () => {}
        },
        name: {
            type: String,
            default: 'file'
        },
        sizeType: {
            type: String,
            default: 'both'
        },
        multiple: {
            type: Boolean,
            default: true
        },
        deletable: {
            type: Boolean,
            default: true
        },
        maxSize: {
            type: Number,
            default: 10
        },
        uploadText: {
            type: String,
            default: '选择图片'
        }
    },
    data() {
        return {
            baseUrl: ''
        }
    },
    computed: {
        sizeTypeData() {
            return this.sizeType == 'both' ? ['original', 'compressed'] : [this.sizeType]
        },
        captureData() {
            return this.sourceType == 'both' ? ['album', 'camera'] : [this.sourceType]
        },
        maxSizeData() {
            if (this.maxSize) {
                return this.maxSize * 1024 * 1024
            }
            return 0
        }
    },
    watch: {},
    created() {},
    methods: {
        deletePic(event) {
            this.fileList.splice(event.index, 1)
            this.$emit('uploadFileRemove', event, this.fileList)
        },
        // 新增图片
        async afterRead(event) {
            console.log('afterRead')
            // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
            let lists = [].concat(event.file)
            let fileListLen = this.fileList.length
            lists.map(item => {
                this.fileList.push({
                    ...item,
                    status: 'uploading',
                    message: '上传中'
                })
            })
            for (let i = 0; i < lists.length; i++) {
                const result = await this.uploadFilePromise(lists[i].url)
                let item = this.fileList[fileListLen]
                this.fileList.splice(
                    fileListLen,
                    1,
                    Object.assign(item, {
                        status: 'success',
                        message: '',
                        url: result
                    })
                )
                fileListLen++
            }
            this.$emit('uploadSuccess', event, this.fileList)
        },
        uploadFilePromise(url) {
            return new Promise((resolve, reject) => {
                let a = uni.uploadFile({
                    url: this.actionUrl,
                    filePath: url,
                    name: this.name,
                    formData: this.formData,
                    success: res => {
                        setTimeout(() => {
                            resolve(res.data.data)
                        }, 1000)
                    }
                })
            })
        },
        oversize() {
            this.toast('上传图片过大')
        },
        beforeRead() {
            console.log(1)
        }
    }
}
</script>

<style scoped lang="scss"></style>
