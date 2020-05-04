<template>
    <div class="article-block2">
        <img :src="article.src" alt="" />
        <div class="article-info">
            <div class="article-title">{{ article.title }}</div>
            <div class="article-author">{{ article.author }}</div>
            <div class="bottom">
                <span class="article-time">{{ article.publishTime }}</span>
                <div class="article-button">
                    <i class="article-collection"></i>
                    <i class="article-share"></i>
                    <i class="article-views"></i>
                    <span class="views">{{ article.views }}</span>
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
        views: number;
    };
}
</script>
<style lang="scss" scoped></style>
