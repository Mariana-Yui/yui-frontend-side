<template>
    <div class="music-player" :style="{ 'background-image': `url(${article.music_info.cover})` }">
        <i class="iconfont" @click="handlePlayMusic">
            {{ play ? '&#xe6a5;' : '&#xe6a4;' }}
        </i>
        <div class="cd" :class="{ 'slide': play }"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
import StoreMixin from '@/mixin/store-mixin';
import {
    CHANGE_CURRENT_MUSIC_INFO,
    PLAY_MUSIC,
    PAUSE_MUSIC,
    SET_RELATED_ARTICLE_ID
} from '../../store/types';

interface Article {
    _id?: string;
    author_info?: {
        details: {
            followers: Array<string>;
            _id: string;
        };
        _id: string;
    };
    title?: string;
    author?: string;
    publish_time?: string;
    abstract?: string;
    music_info?: any;
    film_info?: any;
    broadcast?: string;
    type?: string;
    comment?: Array<any>;
    likes?: Array<string>;
    collects?: Array<string>;
}

@Component
export default class MePlayer extends Mixins(StoreMixin) {
    @Prop() article!: Article;

    get play() {
        return this.music_m.play && this.music_m.relatedArticleId === this.article._id;
    }

    public handlePlayMusic() {
        if (this.music_m.relatedArticleId !== this.article._id) {
            this.music_m[SET_RELATED_ARTICLE_ID](this.article._id as string);
            this.music_m[CHANGE_CURRENT_MUSIC_INFO](this.article.music_info);
        }
        if (!this.music_m.play) {
            this.music_m[PLAY_MUSIC]();
        } else {
            this.music_m[PAUSE_MUSIC]();
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/default.scss';

.music-player {
    position: relative;
    width: 80px;
    height: 80px;
    @include bgConfig();
    .iconfont {
        @include center();
        font-size: 30px;
        /* color: $white; */
    }
    .cd {
        @include center();
        width: 60px;
        height: 60px;
        background-image: url('~@/assets/img/article/record-icon.png');
        @include bgConfig();
        z-index: -1;
        transform-origin: center;
        transition: transform 1s ease;
        &.slide {
            transform: translate(10px, -50%);
        }
    }
}
</style>
