<template>
    <div class="article-block2">
        <img class="article-cover" :src="article.cover_img" alt="" />
        <div class="article-info">
            <div class="article-title">{{ article.title }}</div>
            <div class="article-author">{{ article.author }}</div>
            <div class="bottom">
                <span class="article-time">{{ article.publish_time.split(/\s/)[0] }}</span>
                <div class="article-button">
                    <i
                        class="article-collection"
                        :class="{ 'collection-active': isCollectionActive }"
                    ></i>
                    <i class="article-share"></i>
                    <i class="article-likes" :class="{ 'like-active': isLikeActive }"></i>
                    <span class="likes">{{ article.likes }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ArticleBlockTwo extends Vue {
    @Prop() article!: {
        src: string;
        title: string;
        author: string;
        publishTime: string;
        likes: number;
    };
    private isCollectionActive = false;
    private isLikeActive = false;
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';

.article-block2 {
    background-color: $white;
    padding: 0 0 10px;
    .article-cover {
        width: 100%;
        height: calc(375px / 2);
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
