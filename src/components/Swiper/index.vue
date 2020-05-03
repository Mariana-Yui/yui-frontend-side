<template>
    <swiper class="img-swiper" :options="swiperOptions">
        <swiper-slide v-for="(img, idx) of imgList" :key="img.id" @click="idx">
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
export default class App extends Vue {
    private swiperOptions = {
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
        }
    };
    private imgList: Array<{ src: string; id: string; [props: string]: any }> = [];

    public created() {}
}
</script>
<style lang="scss" scoped></style>
