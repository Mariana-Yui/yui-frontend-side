<template>
    <div class="article-header">
        <i class="iconfont" @click="handleGotoBack">&#xe641;</i>
        <div class="icons">
            <i
                class="collection"
                :class="{ 'is-active': isCollectionActive }"
                @click="handleCollectArticle"
            ></i>
            <i class="share"></i>
            <i class="like" :class="{ 'is-active': isLikeActive }" @click="handleLikeArticle"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import ArticleMixin from '@/mixin/article-mixin';
import StoreMixin from '@/mixin/store-mixin';

@Component
export default class ArticleHeader extends Mixins(ArticleMixin, StoreMixin) {
    public handleGotoBack() {
        this.$router.go(-1);
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';

.article-header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    background-color: $white;
    i {
        width: 40px;
        height: 40px;
    }
    .iconfont {
        font-size: $larger-fontsize;
        font-weight: 700;
        line-height: 40px;
        text-align: center;
    }
    .icons {
        display: flex;
        .collection {
            background-image: url('~@/assets/img/yui/collect.png');
            &.is-active {
                background-image: url('~@/assets/img/yui/collect-active.png');
            }
        }
        .share {
            background-image: url('~@/assets/img/yui/share.png');
        }
        .like {
            background-image: url('~@/assets/img/yui/like.png');
            &.is-active {
                background-image: url('~@/assets/img/yui/like-active.png');
            }
        }
        i {
            width: 37px;
            background-size: $larger-fontsize;
            background-repeat: no-repeat;
            background-position: 50%;
        }
    }
}
</style>
