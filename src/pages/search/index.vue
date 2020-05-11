<template>
    <div class="search-page">
        <common-header :title="title"></common-header>
        <div class="search-input-wrapper">
            <input type="text" v-model="keyword" placeholder="Search Article" />
            <i class="iconfont">&#xe632;</i>
        </div>
        <div ref="articles" class="article-wrapper">
            <template v-if="articles && articles.length && type === 'read'">
                <article-block-four
                    v-for="article in articles"
                    :key="article._id"
                    :article="article"
                ></article-block-four>
            </template>
        </div>
        <div class="wave-loading">
            <wave-loading v-if="!ending"></wave-loading>
            <span>无更多文章</span>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable indent */
import * as _ from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import CommonHeader from '@/components/logoHeader/common.vue';
import ArticleBlockFour from '@/components/articleBlock/block4.vue';
import WaveLoading from '@/components/loading/wave.vue';

interface Article {
    _id: string;
    title: string;
    author: string;
    publish_time: string;
    abstract?: string;
    music_info?: any;
    film_info?: any;
    broadcast?: string;
}

@Component({
    components: {
        CommonHeader,
        ArticleBlockFour,
        WaveLoading
    }
})
export default class Search extends Vue {
    private articles: Article[] = [];
    private keyword = '';
    private ending = false;
    private requesting = false;
    private count = 5;
    private turn = 0;
    // 滑动离页面底部距离小于threshold时发送请求
    private threshold = 5;

    get type() {
        return this.$route.query.type;
    }
    get title() {
        return this.type === 'read'
            ? '阅读文章'
            : this.type === 'music'
            ? '音乐文章'
            : this.type === 'film'
            ? '电影文章'
            : '电台文章';
    }
    get skip() {
        return this.count * this.turn;
    }

    public async getTypedArticles() {
        try {
            this.requesting = true;
            const { code, message, info } = await this.$axios.getTypedArticles(
                this.type as string,
                this.count,
                this.skip
            );
            if (code === 0) {
                this.articles.push(...info.articles);
                // 通知前端是否还有文章
                this.ending = info.ending;
                this.turn++;
                this.requesting = false;
                return;
            }
            throw Error(message);
        } catch (error) {
            this.$toast(error.message, 'error');
        }
    }
    public async created() {
        await this.getTypedArticles();
    }
    public async mounted() {
        this.$nextTick(() => {
            const self = this;
            window.addEventListener(
                'scroll',
                _.throttle(async () => {
                    const { clientHeight, scrollTop } = document.documentElement;
                    const articleHeight = (self.$refs['articles'] as HTMLElement).clientHeight;
                    console.log(articleHeight - scrollTop - clientHeight - 50);
                    if (articleHeight - scrollTop - clientHeight - 50 < this.threshold) {
                        // 请求已发送或无更多内容不再触发
                        if (!this.requesting && !this.ending) {
                            await this.getTypedArticles();
                        }
                    }
                }, 60)
            );
        });
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';

.search-page {
    padding-top: 70px;
    background-color: $white;
    .search-input-wrapper {
        position: fixed;
        top: 40px;
        left: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        background-color: $white;
        z-index: 110;
        input {
            flex: 1;
            height: 20px;
            outline-style: none;
            border: 0;
            padding: 0;
            color: $gray;
        }
        i {
            display: block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 18px;
        }
    }
    .article-wrapper {
        padding: 0 20px 20px;
        ::v-deep .article-block4 {
            margin-top: 20px;
        }
    }
    .wave-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        background-color: $defaultBg;
    }
}
</style>
