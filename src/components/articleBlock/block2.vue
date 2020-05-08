<template>
    <div class="article-block2">
        <img class="article-cover" :src="article.cover_img" alt="" />
        <div class="article-info">
            <template v-if="!isCollect">
                <div class="article-title">{{ article.title }}</div>
                <div class="article-author">{{ article.author }}</div>
            </template>
            <template v-else>
                <div class="article-abstract">{{ article.abstract }}</div>
            </template>
            <div class="bottom">
                <span class="article-time">{{ article.publish_time.split(/\s/)[0] }}</span>
                <div class="article-button">
                    <i
                        v-if="!hideCollect"
                        class="article-collection"
                        :class="{ 'collection-active': isCollectionActive }"
                        @click="handleCollectArticle"
                    ></i>
                    <i class="article-share"></i>
                    <i
                        class="article-likes"
                        :class="{ 'like-active': isLikeActive }"
                        @click="handleLikeArticle"
                    ></i>
                    <span class="likes">{{ article.likes && article.likes.length }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import StoreMixin from '@/components/mixin/store-mixin';

@Component
export default class ArticleBlockTwo extends Mixins(StoreMixin) {
    @Prop() article!: {
        _id: string;
        type: string;
        src: string;
        title: string;
        author: string;
        publishTime: string;
        likes: Array<string>;
        collects: Array<string>;
        abstract?: string;
    };
    @Prop({ default: false }) hideCollect!: boolean;
    @Prop({ default: false }) isCollect!: boolean;
    private isCollectionActive = false;
    private isLikeActive = false;

    public created() {
        const id = this.user_m._id || this.$util.getItem('_id');
        if (this.article.likes.includes(id)) {
            this.isLikeActive = true;
        }
        if (!this.hideCollect && this.article.collects.includes(id)) {
            this.isCollectionActive = true;
        }
    }
    public async handleCollectArticle() {
        try {
            const { code, message } = await this.$axios.getToken();
            if (code === 0) {
                let info;
                if (!this.isCollectionActive) {
                    info = await this.$axios.collectArticle(
                        this.user_m._id || this.$util.getItem('_id'),
                        this.article._id,
                        this.article.type
                    );
                } else {
                    info = await this.$axios.removeCollectArticle(
                        this.user_m._id || this.$util.getItem('_id'),
                        this.article._id,
                        this.article.type
                    );
                }
                if (info.code === 0) {
                    this.isCollectionActive = !this.isCollectionActive;
                    return;
                }
                throw Error(info.message);
            }
            throw Error(message);
        } catch (error) {
            if (error.response && error.response.status === 401) return;
            this.$toast('该操作需要登录进行~');
            this.$router.replace({ path: '/guide' });
        }
    }
    public async handleLikeArticle() {}
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';

.article-block2 {
    background-color: $white;
    padding: 0 0 10px;
    .article-cover {
        width: 100%;
        height: calc(375px / 1.7);
    }
    .article-info {
        padding: 30px 50px 0;
        .article-title,
        .article-author {
            word-break: break-all;
            word-wrap: break-word;
            text-align: center;
            line-height: 1.5;
            margin-bottom: 8px;
        }
        .article-author {
            font-size: $smaller-fontsize;
            margin-bottom: 12px;
        }
        .article-abstract {
            font-size: $smaller-fontsize;
            line-height: $normal-fontsize;
            text-align: center;
            padding-bottom: 30px;
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            font-size: $smaller-fontsize;
            .article-button {
                display: flex;
                align-items: center;
                .article-collection,
                .article-likes,
                .article-share {
                    margin-right: 10px;
                    width: $smaller-fontsize;
                    height: $smaller-fontsize;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position-x: 50%;
                }
                .article-likes {
                    margin-right: 5px;
                }
                .article-collection {
                    background-image: url('~@/assets/img/yui/collect.png');
                }
                .collection-active {
                    background-image: url('~@/assets/img/yui/collect-active.png');
                }
                .article-share {
                    background-image: url('~@/assets/img/yui/share.png');
                }
                .article-likes {
                    background-image: url('~@/assets/img/yui/like.png');
                }
                .like-active {
                    background-image: url('~@/assets/img/yui/like-active.png');
                }
            }
        }
    }
}
</style>
