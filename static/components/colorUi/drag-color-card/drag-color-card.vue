<strong></strong><template>
    <view class="cu-card case" :class="isCard?'no-card':''">
        <view class="cu-item shadow">
            <view class="image">
                <view style="width: 100%;height: 350upx;" :style="{backgroundImage: `url(${imageUrl })`}"></view>
                <view class="cu-tag bg-blue">{{ tag }}</view>
                <view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{ title }}</text></view>
            </view>
            <view class="cu-list menu-avatar">
                <view class="cu-item">
                    <view class="cu-avatar round lg" :style="{backgroundImage: `url(${ avatarUrl })`}"></view>
                    <view class="content flex-sub">
                        <view class="text-grey">{{ userName }}</view>
                        <view class="text-gray text-sm flex justify-between">
                            {{ desc }}
                            <view class="text-gray text-sm">
                                <text class="cuIcon-attentionfill margin-lr-xs"></text> {{ showNum }}
                                <text class="cuIcon-appreciatefill margin-lr-xs"></text> {{ praiseNum }}
                                <text class="cuIcon-messagefill margin-lr-xs"></text> {{ commentNum }}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "drag-color-card",
        props: {
            tag: {
                type: String,
                default: '史诗'
            },
            imageUrl: {
                type: String,
                default: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/1ae87107-2943-4ba6-be2b-390ca27c6260.png'
            },
            title: {
                type: String,
                default: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。'
            },
            avatarUrl: {
                type: String,
                default: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7c946930-bcf2-11ea-b997-9918a5dda011.png'
            },
            userName: {
                type: String,
                default: '正义天使'
            },
            desc: {
                type: String,
                default: '十天前'
            },
            showNum: {
                type: Number,
                default: 0
            },
            praiseNum: {
                type: Number,
                default: 0
            },
            commentNum: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                isCard: false
            };
        },
        methods: {
        }
    }
</script>

<style scoped>
    .cu-card{
        /* zoom: .2; */
    }
</style>
