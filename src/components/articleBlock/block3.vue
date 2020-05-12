<template>
    <div class="article-block3" @click="handleGotoMainPage">
        <div
            class="music-cover"
            :style="{ 'background-image': `url(${article.music_info.cover})` }"
            v-if="article.music_info"
        ></div>
        <div
            class="broadcast-cover"
            :style="{ 'background-image': `url(${article.cover_img})` }"
            v-if="article.broadcast_url"
        ></div>
        <div class="article-info">
            <span class="article-title">{{ article.title }}</span>
            <span class="music-info" v-if="article.music_info">
                {{ article.music_info.name }}&nbsp;/&nbsp;{{ article.music_info.artists }}
            </span>
            <span class="broadcast-info" v-if="article.broadcast_url"
                >主播&nbsp;/&nbsp;{{ article.author }}</span
            >
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ArticleBlockThree extends Vue {
    @Prop() article!: {
        _id: string;
        title: string;
        music_info?: { cover: string; name: string; artists: string };
        author?: string;
        broadcast_url?: string;
    };

    public handleGotoMainPage() {
        this.$router.push({
            path: '/article',
            query: { id: this.article._id }
        });
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/default.scss';

.article-block3 {
    display: flex;
    font-weight: 300;
    font-size: 15px;
    /* border: 0.5px solid rgba(0, 0, 0, 0.1); */
    border-radius: 3px;
    background-color: $white;
    .music-cover,
    .broadcast-cover {
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
        .music-info,
        .broadcast-info {
            display: block;
            position: absolute;
            bottom: 5px;
            right: 10px;
            font-size: 10px;
        }
    }
}
</style>
