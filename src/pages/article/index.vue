<template>
    <div class="article-content-wrapper">
        <article-header ref="article-header" :article="article"></article-header>
        <article class="main">
            <span class="title">{{ article.title }}</span>
            <span class="author"
                >{{ article.type === 'broadcast' ? '主播' : '文' }}&nbsp;/&nbsp;{{
                    article.author
                }}</span
            >
            <div class="cover" :style="{ 'background-image': `url(${article.cover_img})` }">
                <div class="player-wrapper" v-if="article.type === 'music'">
                    <me-player :article="article"></me-player>
                </div>
            </div>
            <div class="content" v-html="article.content"></div>
        </article>
        <div class="author-wrapper">
            <div class="author-header header">作者</div>
            <div class="author-profile" v-if="article.author_info">
                <div
                    class="author-avatar avatar"
                    :style="{ 'background-image': `url(${article.author_info.avatar})` }"
                    @click="handleGotoHomePage"
                ></div>
                <div class="author-info">
                    <span class="author-name">{{ article.author_info.username }}</span>
                    <span class="author-description">{{ article.author_info.description }}</span>
                </div>
                <div
                    class="subscribe"
                    :class="{ 'is-active': isSubscribe }"
                    @click="handleSubscribe"
                    v-if="myId !== article.author_info._id"
                >
                    {{ isSubscribe ? '已' : '' }}关注
                </div>
            </div>
        </div>
        <div class="comment-wrapper" v-if="article.comment">
            <div class="comment-header header">评论</div>
            <div class="has-comment" v-if="article.comment.length">
                <div class="comment" v-for="comment in article.comment" :key="comment._id">
                    <div class="speaker-line">
                        <div
                            class="speaker-avatar avatar"
                            :style="{ 'background-image': `url(${comment.user_id.avatar})` }"
                        ></div>
                        <span class="speaker-name">{{ comment.user_id.username }}</span>
                        <span class="speaker-publish-time">{{ comment.user_id.create_time }}</span>
                    </div>
                    <div class="comment-content">{{ comment.content }}</div>
                    <div class="bottom-line">
                        <span
                            class="delete"
                            v-if="comment.user_id._id === myId"
                            @click="handleDeleteComment(comment)"
                        >
                            删除
                        </span>
                        <i
                            class="like"
                            :class="{ 'is-active': comment.likes.indexOf(myId) > -1 }"
                            @click="handleLikeComment(comment)"
                        ></i>
                        <span class="like-number">{{ comment.likes.length }}</span>
                    </div>
                </div>
            </div>
            <div class="no-comment" v-else>文章还没有人评论</div>
        </div>
        <div class="bottom-comment-input">
            <input v-model="comment" type="text" placeholder="写评论" />
            <span @click="handlePublishComment">发布</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import ArticleHeader from '@/components/logoHeader/article.vue';
import MePlayer from '@/components/meplayer/index.vue';
import StoreMixin from '@/mixin/store-mixin';

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

@Component({
    components: {
        ArticleHeader,
        MePlayer
    }
})
export default class Main extends Mixins(StoreMixin) {
    public article: Article = {};
    private comment = '';

    get id() {
        return this.$route.query.id;
    }
    get myId() {
        return this.user_m._id || this.$util.getItem('_id');
    }
    get isSubscribe() {
        return (
            this.article.author_info &&
            this.article.author_info.details &&
            Array.isArray(this.article.author_info.details.followers) &&
            this.article.author_info.details.followers.includes(this.myId)
        );
    }

    public async created() {
        try {
            if (typeof this.id === 'string') {
                await this.$axios.addArticleViews(this.id);
                const { code, message, info } = await this.$axios.getArticleContent(this.id);
                if (code === 0) {
                    this.article = info;
                    this.setArticleHeader();
                    return;
                }
                throw Error(message);
            }
        } catch (error) {
            this.$toast(error.message, 'error');
        }
    }
    public setArticleHeader() {
        if (this.article.likes && this.article.collects) {
            if (this.article.likes.includes(this.myId)) {
                (this.$refs['article-header'] as any).isLikeActive = true;
            }
            if (this.article.collects.includes(this.myId)) {
                (this.$refs['article-header'] as any).isCollectionActive = true;
            }
        }
    }
    public async handleSubscribe() {
        try {
            const { code, message } = await this.$axios.getToken();
            if (code === 0) {
                if (!this.isSubscribe) {
                    // 关注
                    try {
                        if (this.article.author_info && this.article.author_info.details) {
                            const { code, message } = await this.$axios.subscribeAuthor(
                                this.myId,
                                this.article.author_info._id
                            );
                            if (code === 0) {
                                this.article.author_info.details.followers.push(this.myId);
                                this.$toast(message, 'success');
                                return;
                            }
                            throw Error(message);
                        }
                    } catch (error) {
                        this.$toast(error.message, 'error');
                    }
                } else {
                    // 取消关注
                    try {
                        if (this.article.author_info && this.article.author_info.details) {
                            const { code, message } = await this.$axios.removeSubscribeAuthor(
                                this.myId,
                                this.article.author_info._id
                            );
                            if (code === 0) {
                                const index = this.article.author_info.details.followers.indexOf(
                                    this.myId
                                );
                                index > -1 &&
                                    this.article.author_info.details.followers.splice(index, 1);
                                this.$toast(message, 'info');
                                return;
                            }
                            throw Error(message);
                        }
                    } catch (error) {
                        this.$toast(error.message, 'error');
                    }
                }
            } else {
                throw Error(message);
            }
        } catch (error) {
            this.$toast('需要登录操作~', 'info');
            this.$router.push({ path: '/guide', query: { redirect: 'subscribe' } });
        }
    }
    public handleGotoHomePage() {
        this.article.author_info &&
            this.$router.push({ name: 'UserSpace', params: { id: this.article.author_info._id } });
    }
    public async handlePublishComment() {
        if (this.comment !== '') {
            try {
                const { code, message } = await this.$axios.getToken();
                if (code === 0) {
                    const { code, message, info } = await this.$axios.publishComment(
                        this.myId,
                        this.article._id as string,
                        this.comment,
                        this.article.type as string
                    );
                    if (code === 0 && this.article.comment) {
                        this.article.comment.push(info);
                        this.comment = '';
                    }
                } else {
                    this.comment = '';
                    throw Error('not login');
                }
            } catch (error) {
                if (error.message === 'not login') {
                    this.$toast('需要登录操作~', 'info');
                    this.$router.push({ path: '/guide', query: { redirect: 'comment' } });
                }
            }
        }
    }
    public async handleDeleteComment(comment: { likes: Array<string>; _id: string }) {
        try {
            const { code, message } = await this.$axios.deleteComment(
                comment._id,
                this.article._id as string,
                this.article.type as string
            );
            if (code === 0) {
                this.$toast('删除评论成功', 'success');
                if (this.article.comment) {
                    const index = this.article.comment.indexOf(comment);
                    if (index > -1) {
                        this.article.comment.splice(index, 1);
                    }
                }
                return;
            }
            throw Error(message);
        } catch (error) {
            this.$toast(error.message, 'error');
        }
    }
    public async handleLikeComment(comment: { likes: Array<string>; _id: string }) {
        try {
            const { code, message } = await this.$axios.getToken();
            if (code === 0) {
                if (comment.likes.indexOf(this.myId) === -1) {
                    // 点赞
                    const { code, message } = await this.$axios.likeComment(
                        this.myId,
                        comment._id,
                        this.article.type as string
                    );
                    if (code === 0 && this.article.comment) {
                        comment.likes.push(this.myId);
                        return;
                    }
                    throw Error(message);
                } else {
                    // 取消点赞
                    const { code, message } = await this.$axios.removeLikeComment(
                        this.myId,
                        comment._id,
                        this.article.type as string
                    );
                    if (code === 0 && this.article.comment) {
                        const index = comment.likes.indexOf(this.myId);
                        index > -1 && comment.likes.splice(index, 1);
                        return;
                    }
                    throw Error(message);
                }
            } else {
                throw Error('not login');
            }
        } catch (error) {
            if (error.message === 'not login') {
                this.$toast('需要登录操作~', 'info');
                this.$router.push({ path: '/guide', query: { redirect: 'comment' } });
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';
@import '~@/assets/css/mixin.scss';

.article-content-wrapper {
    min-height: 100vh;
    padding: 40px 0 46px;
    box-sizing: border-box;
    background-color: $white;
    .avatar {
        border-radius: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position-x: 50%;
    }
    .header {
        padding: 5px;
        border-left: 3px solid $gray;
        color: $black;
    }
    .bottom-comment-input {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        padding: 15px;
        background-color: $light-gray;
        input {
            flex: 1;
            padding: 0;
            border: 0;
            outline-style: none;
            color: $gray;
            background-color: transparent;
        }
        span {
            padding-left: 20px;
        }
    }
    .main {
        padding: 20px 15px;
        .title {
            display: block;
            font-weight: 500;
            font-size: $more-larger-fontsize;
            margin-bottom: 8px;
            color: $black;
        }
        .author {
            display: block;
            margin-bottom: 5px;
            font-size: $more-smaller-fontsize;
        }
        .cover {
            position: relative;
            height: calc(375px / 2);
            margin-bottom: 20px;
            border-radius: 5px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position-x: 50%;
            /* 播放器 */
            .player-wrapper {
                @include center();
            }
        }
        .content {
            padding-bottom: 10px;
            line-height: $article-lineheight;
            ::v-deep p {
                font-size: $article-fontsize;
            }
            ::v-deep img {
                border-radius: 5px;
            }
            ::v-deep h1,
            h2,
            h3 {
                font-weight: bolder;
            }
            ::v-deep h1 {
                font-size: 32px;
                margin-top: 10.72px;
                margin-bottom: 10.72px;
            }
            ::v-deep h2 {
                font-size: 24px;
                margin-top: 13.28px;
                margin-bottom: 13.28px;
            }
            ::v-deep h3 {
                font-size: 18.72px;
                margin-top: 16px;
                margin-bottom: 16px;
            }
            ::v-deep span {
                display: block;
                text-align: center;
                font-size: $smaller-fontsize;
            }
        }
    }
    .author-wrapper {
        padding: 0 15px;
        .author-profile {
            padding: 15px 0;
            display: flex;
            align-items: center;
            .author-avatar {
                width: 45px;
                height: 45px;
            }
            .author-info {
                flex: 1;
                padding-left: 10px;
                .author-name {
                    display: block;
                    font-size: 17px;
                    font-weight: 400;
                    color: $black;
                }
                .author-description {
                    display: block;
                    font-size: 13px;
                    max-width: 80%;
                }
            }
            .subscribe {
                padding: 5px 10px;
                border: 1px solid $gray;
                font-size: $smaller-fontsize;
                border-radius: 2px;
                &.is-active {
                    background-color: $gray;
                    color: $white;
                }
            }
        }
    }
    .comment-wrapper {
        padding: 0 15px 40px;
        .no-comment {
            padding-top: 40px;
            text-align: center;
        }
        .has-comment {
            .comment {
                margin-top: 20px;
                .speaker-line {
                    display: flex;
                    align-items: center;
                    .speaker-avatar {
                        width: 35px;
                        height: 35px;
                    }
                    .speaker-name {
                        padding: 10px;
                        font-size: $article-fontsize;
                        font-weight: 350;
                        flex: 1;
                    }
                    .speaker-publish-time {
                        font-size: $smaller-fontsize;
                    }
                }
                .comment-content {
                    padding: 20px 30px;
                    line-height: $more-larger-fontsize;
                }
                .bottom-line {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    .delete {
                        color: rgba(0, 0, 255, 0.7);
                        text-decoration: underline;
                    }
                    i.like {
                        margin-left: 10px;
                        width: $normal-fontsize;
                        height: $normal-fontsize;
                        background-image: url('~@/assets/img/yui/like.png');
                        background-size: contain;
                        background-position: 50%;
                        background-repeat: no-repeat;
                        &.is-active {
                            background-image: url('~@/assets/img/yui/like-active.png');
                        }
                    }
                    span {
                        margin-left: 3px;
                        font-size: $more-smaller-fontsize;
                    }
                }
            }
        }
    }
}
</style>
