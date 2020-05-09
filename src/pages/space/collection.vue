<template>
    <div class="article-collection-wrapper">
        <common-header :title="title"></common-header>
        <div class="no-typed-collection" v-if="collection && collection.length === 0">
            <span>无{{ title }}</span>
        </div>
        <div class="article-gallery" v-if="$route.query.type === 'read' && hasCollection">
            <template v-for="article in collection">
                <article-block-two
                    :article="article"
                    :key="article._id"
                    :isCollect="true"
                ></article-block-two>
            </template>
        </div>
        <div class="article-gallery" v-if="$route.query.type === 'music' && hasCollection">
            <template v-for="article in collection">
                <article-block-three :article="article" :key="article._id"></article-block-three>
            </template>
        </div>
        <div class="article-gallery" v-if="$route.query.type === 'film' && hasCollection">
            <template v-for="article in collection">
                <article-block-four :article="article" :key="article._id"></article-block-four>
            </template>
        </div>
        <div class="article-gallery" v-if="$route.query.type === 'broadcast' && hasCollection">
            <template v-for="article in collection">
                <article-block-one
                    class="add"
                    type="broadcast"
                    :title="article.title"
                    :author="article.author"
                    :_id="article._id"
                    :key="article._id"
                    :hideHeader="true"
                >
                    <template v-slot:cover>
                        <div class="broadcast-cover">
                            <img :src="article.cover_img" alt="" srcset="" />
                            <div class="mask">
                                <div class="broadcast-img"></div>
                            </div>
                        </div>
                    </template>
                </article-block-one>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable indent */
import { Component, Vue, Provide } from 'vue-property-decorator';
import CommonHeader from '@/components/logoHeader/common.vue';
import ArticleBlockOne from '@/components/articleBlock/block1.vue';
import ArticleBlockTwo from '@/components/articleBlock/block2.vue';
import ArticleBlockThree from '@/components/articleBlock/block3.vue';
import ArticleBlockFour from '@/components/articleBlock/block4.vue';

@Component({
    components: {
        CommonHeader,
        ArticleBlockOne,
        ArticleBlockTwo,
        ArticleBlockThree,
        ArticleBlockFour
    }
})
export default class ArticleCollection extends Vue {
    private collection: Array<any> = [];

    get hasCollection() {
        return this.collection && this.collection.length > 0;
    }

    get title() {
        if (this.$route.query.type) {
            console.log(this.$route.query.type);
            const type = this.$route.query.type;
            return type === 'read'
                ? '图文收藏'
                : type === 'music'
                ? '音乐收藏'
                : type === 'film'
                ? '影视收藏'
                : '电台收藏';
        }
        return '';
    }

    public async created() {
        if (!['read', 'music', 'film', 'broadcast'].includes(this.$route.query.type as string)) {
            this.$toast('incorrect type', 'error');
            return this.$router.go(-1);
        }
        const id = this.$route.params.id;
        if (id) {
            try {
                const { code, message, info } = await this.$axios.getTypedArticleCollection(
                    this.$route.query.type as string,
                    id
                );
                if (code === 0) {
                    this.collection = info;
                    return;
                }
                throw Error(message);
            } catch (error) {
                this.$toast(error.message, 'error');
            }
        } else {
            this.$toast('no user id', 'error');
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/default.scss';

.article-collection-wrapper {
    .no-typed-collection {
        @include forcedCenter(fixed, 40px);
        z-index: 99999;
        font-size: $normal-fontsize;
        span {
            @include center();
        }
    }
    .article-gallery {
        padding-top: 40px;
        .add {
            margin-top: 10px;
            [class$='cover'] {
                position: relative;
                img {
                    width: 100%;
                    height: calc(375px / 2);
                }
                .line {
                    height: 12px;
                    background-image: url('~@/assets/img/all/film-icon.png');
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                .mask {
                    display: flex;
                    @include forcedCenter(absolute);
                    background-color: $light-black;
                    color: $white;
                    font-size: $larger-fontsize;
                    justify-content: center;
                    align-items: center;
                    span {
                        position: relative;
                        max-width: 80%;
                        line-height: $more-larger-fontsize;
                        max-height: calc(#{$more-larger-fontsize} * 3);
                        word-wrap: break-word;
                        word-break: break-all;
                        overflow: hidden;
                        /* @include addEllipsisWhenLines($light-black); */
                    }
                    div.broadcast-img {
                        width: 80%;
                        height: calc(375px / 8);
                        background-image: url('~@/assets/img/all/sound-icon.png');
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position-x: 50%;
                    }
                    i {
                        font-size: 40px;
                        color: rgba(255, 255, 255, 0.8);
                    }
                }
            }
        }
    }
}
</style>
