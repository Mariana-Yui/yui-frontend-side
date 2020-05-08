<template>
    <div class="article-block3">
        <div
            class="music-cover"
            :style="{ 'background-image': `url(${article.music_info.cover})` }"
        ></div>
        <div class="article-info">
            <span class="article-title">{{ article.title }}</span>
            <span class="music-info">
                {{ article.music_info.name }}&nbsp;/&nbsp;{{ article.music_info.artists }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ArticleBlockThree extends Vue {
    @Prop() article!: {
        title: string;
        music_info: { cover: string; name: string; artists: string };
    };
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/default.scss';

.article-block3 {
    padding: 22px 25px 0;
    display: flex;
    font-weight: 300;
    font-size: 15px;
    .music-cover {
        flex: 0 0 80px;
        height: 80px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position-x: 50%;
    }
    .article-info {
        flex: 1;
        position: relative;
        .article-title {
            display: block;
            padding: 4px 0 0 8px;
            max-width: 220px;
            @include addEllipsis();
        }
        .music-info {
            display: block;
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: 10px;
        }
    }
}
</style>
