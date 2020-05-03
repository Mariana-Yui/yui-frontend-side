<template>
    <swiper class="img-swiper" :options="swiperOptions" v-if="imgList && imgList.length > 0">
        <swiper-slide v-for="img in imgList" :key="img.id" @click="handleClickBanner">
            <img class="article-banner-img" :src="img.src" alt="banner" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

@Component({
    components: {
        Swiper,
        SwiperSlide
    }
})
export default class VueSwiper extends Vue {
    private swiperOptions = {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
        }
    };
    private imgList: Array<{ src: string; id: string; [props: string]: any }> = [];

    public async created() {
        try {
            const { code, message, info } = await this.$axios.getBannerInfo();
            if (code === 0) {
                this.imgList = info;
                return;
            }
            throw Error(message);
        } catch (error) {
            console.log(error);
            this.$toast(error.message);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';

.img-swiper {
    width: 100%;
    .article-banner-img {
        width: 100%;
        height: calc(375px / 2);
    }
    .swiper-pagination {
        ::v-deep .swiper-pagination-bullet-active {
            background-color: $white;
            opacity: 0.7;
        }
    }
}
</style>
