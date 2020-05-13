<template>
    <div id="yui">
        <logo-header></logo-header>
        <vue-scroller
            ref="vue-scroller"
            @refresh="handleRefresh"
            @infinite="handleInfinite"
            class="content-scroller"
        >
            <template v-for="article in newArticle">
                <article-block-two :article="article" :key="article._id"></article-block-two>
            </template>
        </vue-scroller>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import StoreMixin from '@/mixin/store-mixin';
import LogoHeader from '@/components/logoHeader/index.vue';
import ArticleBlockTwo from '@/components/articleBlock/block2.vue';
import VueScroller from '@/components/scroller/index.vue';
import { GET_ARTICLE_REGULARLY_ASYNC, GET_LATEST_ARTICLE_ASYNC } from '@/store/types';

@Component({
    components: {
        LogoHeader,
        ArticleBlockTwo,
        VueScroller
    },
    mixins: [StoreMixin]
})
export default class YUI extends Vue {
    private scroller: any = {};
    private noMore = false;

    get newArticle() {
        return this.article_m ? this.article_m.articles : [];
    }

    // public async created() {}
    public mounted() {
        this.$nextTick(() => {
            this.scroller = (this.$refs['vue-scroller'] as Vue).$refs['scroller'] as any;
            ((this.scroller.$el as HTMLElement).querySelector(
                '.loading-layer'
            ) as HTMLElement).style.paddingBottom = '24px';
        });
    }
    public async handleRefresh() {
        setTimeout(async () => {
            await this.article_m[GET_LATEST_ARTICLE_ASYNC]();
            this.scroller.finishPullToRefresh();
        }, 1000);
    }
    public async handleInfinite() {
        setTimeout(async () => {
            this.noMore = await this.article_m[GET_ARTICLE_REGULARLY_ASYNC]();
            if (this.scroller.loadingState === 2) {
                const wave = (this.scroller.$el as HTMLElement).querySelector(
                    '.js-wave'
                ) as HTMLElement;
                wave.style.height = '0px';
                wave.style.marginTop = '0px';
            } else {
                const wave = (this.scroller.$el as HTMLElement).querySelector(
                    '.js-wave'
                ) as HTMLElement;
                wave.style.height = '30px';
                wave.style.marginTop = '15px';
            }
            this.scroller.finishInfinite(this.noMore);
        }, 1000);
    }
}
</script>
<style lang="scss" scoped>
#yui {
    /* margin: 0 0 60px; */
    .content-scroller {
        padding-top: 40px;
    }
}
</style>
