<template>
    <div id="all">
        <logo-header></logo-header>
        <div class="content-wrapper">
            <vue-swiper></vue-swiper>
            <!-- 不同文章类型 -->
            <div class="article-gallery">
                <router-link
                    tag="div"
                    v-for="art in arts"
                    :key="art.type"
                    :style="{ 'background-image': `url(${art.cover})` }"
                    :to="{ path: '/search', query: { type: art.type } }"
                    class="artX-thumb"
                >
                    <span>{{ art.name }}</span>
                </router-link>
            </div>
            <!-- article blocks -->
            <div class="article-top-views">
                <article-block-one
                    v-for="top in topView"
                    :key="top._id"
                    :author="top.author"
                    :type="top.type"
                    :views="top.views"
                    :title="top.title"
                    :_id="top._id"
                    @click="handleGotoArticlePage(top._id)"
                >
                    <template v-slot:cover>
                        <div class="read-cover" v-if="top.type === 'read'">
                            <img :src="top.cover_img" alt="" />
                            <div class="mask">
                                <span>{{ top.abstract }}</span>
                            </div>
                        </div>
                        <div class="film-cover" v-if="top.type === 'film'">
                            <div class="line"></div>
                            <img :src="top.cover_img" alt="" srcset="" />
                            <div class="line"></div>
                            <div class="mask">
                                <span>{{ top.film_info.quote }}</span>
                            </div>
                        </div>
                        <div class="film-name" v-if="top.type === 'film'">
                            ———&nbsp;《{{ top.film_info.name }}》
                        </div>
                        <div class="music-cover" v-if="top.type === 'music'">
                            <img :src="top.cover_img" alt="" />
                            <div
                                class="album-img"
                                :style="{
                                    'background-image': `url(${top.music_info.cover})`,
                                    'animation-play-state': animationPlayState
                                }"
                                :class="{
                                    'spinner-animation': spin
                                }"
                            ></div>
                            <div class="mask">
                                <i class="iconfont" @click.stop="handlePlayMusic(top)">
                                    {{
                                        music_m.play && top._id === music_m.relatedArticleId
                                            ? '&#xe6a5;'
                                            : '&#xe6a4;'
                                    }}
                                </i>
                            </div>
                        </div>
                        <div class="broadcast-cover" v-if="top.type === 'broadcast'">
                            <img :src="top.cover_img" alt="" srcset="" />
                            <div class="mask">
                                <div class="broadcast-img"></div>
                            </div>
                        </div>
                    </template>
                </article-block-one>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import LogoHeader from '@/components/logoHeader/index.vue';
import VueSwiper from '@/components/Swiper/index.vue';
import ArticleBlockOne from '@/components/articleBlock/block1.vue';
import StoreMixin from '@/mixin/store-mixin';
import {
    PLAY_MUSIC,
    CHANGE_CURRENT_MUSIC_INFO,
    PAUSE_MUSIC,
    SET_RELATED_ARTICLE_ID
} from '@/store/types';

@Component({
    components: {
        LogoHeader,
        VueSwiper,
        ArticleBlockOne
    }
})
export default class ALL extends Mixins(StoreMixin) {
    private arts = [
        {
            type: 'read',
            name: '阅读',
            cover: require('@/assets/img/all/reading-thumb.jpg')
        },
        {
            type: 'music',
            name: '音乐',
            cover: require('@/assets/img/all/music-thumb.jpg')
        },
        {
            type: 'film',
            name: '影视',
            cover: require('@/assets/img/all/film-thumb.jpg')
        },
        {
            type: 'broadcast',
            name: '电台',
            cover: require('@/assets/img/all/sound-thumb.jpg')
        }
    ];
    private topView: Array<any> = [];
    private animationPlayState = 'running';
    private spin = false;

    public async created() {
        try {
            // this.$store.watch(
            //     (state) => state.music.,
            //     (value, oldValue) => {
            //         if (value) {
            //             // infinite rotate 这里点击之后这个动画就一直在, 只是通过控制running/paused, 所以只需要置为true
            //             this.spin = true;
            //         }
            //     }
            // );
            const { code, message, info } = await this.$axios.getTopViewArticles();
            if (code === 0) {
                this.topView = info;
                // spin or not
                const musicArticle = info.filter((article: any) => article.music_info)[0];
                if (this.music_m.play && this.music_m.relatedArticleId === musicArticle._id) {
                    this.spin = true;
                }
                return;
            }
            throw Error(message);
        } catch (error) {
            console.log(error);
            this.$toast(error.message, 'error');
        }
    }
    public handleGotoArticlePage(id: string) {
        this.$router.push({ path: '/article', query: { id } });
    }
    public handlePlayMusic(top: any) {
        const { music_info, _id }: { music_info: any; _id: string } = top;
        if (music_info && music_info.urls && music_info.urls.length > 0) {
            if (this.music_m.relatedArticleId !== top._id) {
                this.music_m[SET_RELATED_ARTICLE_ID](_id);
                // 设置音频url
                this.music_m[CHANGE_CURRENT_MUSIC_INFO](music_info);
            }
            if (!this.music_m.play) {
                // 播放
                this.music_m[PLAY_MUSIC]();
                // 运行animation
                this.animationPlayState = 'running';
            } else {
                this.music_m[PAUSE_MUSIC]();
                this.animationPlayState = 'paused';
            }
        } else {
            this.$toast('音乐文件缺失, 非常抱歉...', 'info');
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/default.scss';

#all {
    margin: 0 0 60px;
    .content-wrapper {
        padding-top: 40px;
        .article-gallery {
            margin: 25px 15px;
            display: flex;
            justify-content: space-around;
            .artX-thumb {
                @include equalWidthHeightFather(23%, 23%);
                background-repeat: no-repeat;
                background-size: cover;
                background-position-x: 50%;
                span {
                    font-size: $more-smaller-fontsize;
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                    color: rgba(255, 255, 255, 0.8);
                }
            }
        }
        .article-top-views {
            [class$='cover'] {
                position: relative;
                img {
                    width: 100%;
                    height: calc(375px / 2);
                }
                .album-img {
                    @include equalWidthHeightFather(40%, 40%);
                    @include center();
                    background-size: cover;
                    background-position-x: 50%;
                    background-repeat: no-repeat;
                    border-radius: 50%;
                    transform-origin: top left;
                    transform: rotate(30deg) translate(-50%, -50%);
                    &.spinner-animation {
                        animation: spinner 10s linear infinite;
                    }
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
                    font-size: $normal-fontsize;
                    justify-content: center;
                    align-items: center;
                    span {
                        position: relative;
                        max-width: 80%;
                        line-height: $more-larger-fontsize;
                        max-height: calc(#{$more-larger-fontsize} * 5);
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
            .film-name {
                display: flex;
                justify-content: flex-end;
                margin-top: 5px;
            }
        }
    }
}

@keyframes spinner {
    from {
        transform: rotate(30deg) translate(-50%, -50%);
    }
    to {
        transform: rotate(390deg) translate(-50%, -50%);
    }
}
</style>
