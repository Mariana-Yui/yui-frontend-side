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
                    :to="{ path: `/search/${art.type}` }"
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
                    @click="handleGotoArticlePage(top._id, top.type)"
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
                            <div class="mask">
                                <i class="iconfont">{{ music.play ? '&#xe6a5;' : '&#xe6a4;' }}</i>
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
import { Component, Vue } from 'vue-property-decorator';
import LogoHeader from '@/components/logoHeader/index.vue';
import VueSwiper from '@/components/Swiper/index.vue';
import ArticleBlockOne from '@/components/articleBlock/block1.vue';
import StoreMixin from '@/components/mixin/store-mixin';
import { CHANGE_CURRENT_ARTICLE_TYPE } from '../../store/types';

@Component({
    components: {
        LogoHeader,
        VueSwiper,
        ArticleBlockOne
    },
    mixins: [StoreMixin]
})
export default class ALL extends Vue {
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

    public async created() {
        try {
            const { code, message, info } = await this.$axios.getTopViewArticles();
            if (code === 0) {
                this.topView = info;
                return;
            }
            throw Error(message);
        } catch (error) {
            console.log(error);
            this.$toast(error.message, 'error');
        }
    }
    public handleGotoArticlePage(id: string, type: string) {
        this.$router.push({ path: '/article', query: { id, type } });
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
            .film-name {
                display: flex;
                justify-content: flex-end;
                margin-top: 5px;
            }
        }
    }
}
</style>
