<template>
    <div class="article-block4">
        <div class="article-info">
            <span class="article-title">{{ article.title }}</span>
            <span class="film-name">{{ article.film_info.name }}</span>
        </div>
        <div class="bottom">
            <span class="article-publish-time">{{ article.publish_time }}</span>
            <span class="article-author">{{ article.author }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ArticleBlockFour extends Vue {}
</script>
<style lang="scss" scoped></style>
