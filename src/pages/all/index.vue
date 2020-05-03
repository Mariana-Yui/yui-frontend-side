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
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LogoHeader from '@/components/logoHeader/index.vue';
import VueSwiper from '@/components/Swiper/index.vue';

@Component({
    components: {
        LogoHeader,
        VueSwiper
    }
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
            name: '电影',
            cover: require('@/assets/img/all/film-thumb.jpg')
        },
        {
            type: 'sound',
            name: '电台',
            cover: require('@/assets/img/all/sound-thumb.jpg')
        }
    ];
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';

#all {
    margin: 0 0 50px;
    .content-wrapper {
        margin-top: 40px;
        .article-gallery {
            margin: 20px;
            display: flex;
            justify-content: space-around;
            .artX-thumb {
                @include equalWidthHeightFather(23%, 23%);
                background-repeat: no-repeat;
                background-size: cover;
                background-position-x: 50%;
                span {
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                    color: rgba(255, 255, 255, 0.8);
                }
            }
        }
    }
}
</style>
