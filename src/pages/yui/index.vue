<template>
    <div id="yui">
        <logo-header></logo-header>
        <template v-for="article in newAriticle">
            <article-block-two :article="article" :key="article._id"></article-block-two>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LogoHeader from '@/components/logoHeader/index.vue';
import ArticleBlockTwo from '@/components/articleBlock/block2.vue';

@Component({
    components: {
        LogoHeader,
        ArticleBlockTwo
    }
})
export default class YUI extends Vue {}
</script>
<style lang="scss" scoped>
#yui {
    margin: 0 0 60px;
    .content-wrapper {
        padding-top: 40px;
    }
}
</style>
