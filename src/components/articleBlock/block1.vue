<template>
    <div class="article-block-in-all">
        <div class="article-header" v-if="!hideHeader">-&nbsp;{{ header }}&nbsp;-</div>
        <div class="article-title">
            {{ title }}
        </div>
        <div class="article-author">
            <span>{{ type === 'broadcast' ? '主播' : '文' }}&nbsp;/&nbsp;{{ author }}</span>
        </div>
        <slot name="cover"></slot>
        <div class="article-views" v-if="views != null">
            <i class="iconfont">&#xe671;</i>浏览量:<span>{{ views }}</span>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable indent */
import { Component, Vue, Prop } from 'vue-property-decorator';

declare type TYPE = 'read' | 'music' | 'film' | 'broadcast';

@Component
export default class ArticleBlockOne extends Vue {
    @Prop() type!: TYPE;
    @Prop() title!: string;
    @Prop() author!: string;
    @Prop() views!: number;
    @Prop() _id!: string;
    @Prop({ default: false }) hideHeader!: boolean;

    get header() {
        return this.type === 'read'
            ? '阅 读'
            : this.type === 'music'
            ? '音 乐'
            : this.type === 'film'
            ? '影 视'
            : '电 台';
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';
@import '~@/assets/css/mixin.scss';

.article-block-in-all {
    background-color: $white;
    margin: 0 10px 10px;
    padding: 12px;
    font-size: $more-smaller-fontsize;
    color: $light-black;
    .article-header {
        text-align: center;
        padding-bottom: 15px;
    }
    .article-title {
        width: 80%;
        padding-bottom: 10px;
        font-size: $normal-fontsize;
        font-weight: normal;
        color: $black;
        opacity: 0.8;
        @include addEllipsis();
    }
    .article-author {
        padding-bottom: 5px;
    }
    .article-views {
        margin-top: 5px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        i {
            margin-right: 2px;
        }
        span {
            margin-left: 2px;
        }
    }
}
</style>
