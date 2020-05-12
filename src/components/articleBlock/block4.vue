<template>
    <div
        class="article-block4"
        :style="{ 'background-image': `url(${article.cover_img})` }"
        @click="handleGotoMainPage"
    >
        <div class="article-info">
            <span class="article-title">{{ article.title }}</span>
            <span class="film-name" v-if="article.film_info">《{{ article.film_info.name }}》</span>
        </div>
        <div class="bottom">
            <span class="article-publish-time">{{ publish_time }}</span>
            <span class="article-author"><i>&copy;</i>{{ article.author }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ArticleBlockFour extends Vue {
    @Prop() article!: {
        _id: string;
        cover_img: string;
        title: string;
        film_info?: {
            name: string;
            quote: string;
        };
        publish_time: string;
        author: string;
    };

    get publish_time() {
        if (this.article) {
            return this.article.publish_time
                .split(/\s/)[0]
                .split('-')
                .join('/');
        }
        return '';
    }
    public handleGotoMainPage() {
        this.$router.push({ path: '/article', query: { id: this.article._id } });
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';
@import '~@/assets/css/mixin.scss';

.article-block4 {
    height: calc(375px / 2.4);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-position-x: 50%;
    background-size: cover;
    color: $white;
    border-radius: 4px;
    .article-info {
        .article-title {
            max-width: calc(335px * 0.8);
            @include addEllipsis();
        }
        .film-name {
            padding-top: 10px;
            font-size: $more-smaller-fontsize;
            text-align: center;
            font-weight: 350;
        }
        span {
            display: block;
        }
    }
    .bottom {
        position: absolute;
        right: 10px;
        bottom: 10px;
        font-size: $more-smaller-fontsize;
        font-weight: 350;
        span {
            display: block;
            &:last-child {
                padding-top: 3px;
                text-align: center;
                i {
                    vertical-align: middle;
                }
            }
        }
    }
}
</style>
