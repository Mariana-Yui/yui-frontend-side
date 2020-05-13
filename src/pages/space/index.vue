<template>
    <div class="user-space-wrapper">
        <common-header v-if="!self" :title="userInfo.username"></common-header>
        <i v-else class="iconfont user-profile-icon" @click="handleGotoProfile">&#xe68c;</i>
        <div
            class="user-profile"
            :class="{ 'add-padding-top': !self }"
            :style="{
                'background-image': `url(${userInfo.background})`
            }"
        >
            <div class="user-line">
                <div class="user-following">
                    关注{{ self ? '我' : 'TA' }}的<span>{{
                        userInfo.details &&
                            userInfo.details.followers &&
                            userInfo.details.followers.length
                    }}</span>
                </div>
                <div
                    class="user-avatar"
                    :style="{ 'background-image': `url(${userInfo.avatar})` }"
                ></div>
                <div class="user-followers">
                    {{ self ? '我' : 'TA' }}关注的<span>{{
                        userInfo.details &&
                            userInfo.details.following &&
                            userInfo.details.following.length
                    }}</span>
                </div>
            </div>
            <div class="username">{{ userInfo.username }}</div>
            <div class="description">{{ userInfo.description }}</div>
            <div
                class="subscribe"
                :class="{ following: isSubscribe }"
                v-if="!self"
                @click="handleSubscribe"
            >
                关注{{ isSubscribe ? '中' : '' }}
            </div>
        </div>
        <div class="user-collection">
            <div class="collection-title">{{ self ? '我' : 'TA' }}的收藏</div>
            <ul class="collection-gallery">
                <li
                    class="collection-icon"
                    v-for="(img, idx) of gallery"
                    :key="idx"
                    :style="{ 'background-image': `url(${img.src})` }"
                    :alt="img.type"
                    @click="handleGotoCollectionPage(img.type)"
                ></li>
            </ul>
        </div>
        <div class="user-article">
            <div class="article-header">{{ self ? 'My' : '' }}&nbsp;Moment</div>
            <div
                class="no-article"
                v-if="
                    userInfo.details &&
                        userInfo.details.created &&
                        userInfo.details.created.length === 0
                "
            >
                {{ self ? '你' : 'TA' }}还没有发布过文章{{ self ? ',快去创建吧~' : '' }}
            </div>
            <div
                class="articles"
                v-if="
                    userInfo.details &&
                        userInfo.details.created &&
                        userInfo.details.created.length > 0
                "
            >
                <template v-for="article in userInfo.details.created">
                    <article-block-two
                        :article="article"
                        :key="article._id"
                        :hideCollect="true"
                    ></article-block-two>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import StoreMixin from '@/mixin/store-mixin';
import CommonHeader from '@/components/logoHeader/common.vue';
import ArticleBlockTwo from '@/components/articleBlock/block2.vue';
import {} from '@/store/types';

@Component({
    components: {
        CommonHeader,
        ArticleBlockTwo
    }
})
export default class UserSpace extends Mixins(StoreMixin) {
    private userInfo: {
        _id: string;
        details: {
            following: Array<string>;
            followers: Array<string>;
        };
    } = {
        _id: '',
        details: {
            following: [],
            followers: []
        }
    };
    private gallery = [
        {
            type: 'read',
            src: require('@/assets/img/space/collect-image.png')
        },
        {
            type: 'read',
            src: require('@/assets/img/space/collect-reading.png')
        },
        {
            type: 'music',
            src: require('@/assets/img/space/collect-music.png')
        },
        {
            type: 'film',
            src: require('@/assets/img/space/collect-film.png')
        },
        {
            type: 'broadcast',
            src: require('@/assets/img/space/collect-sound.png')
        }
    ];
    // private isFollowing = false;

    get self() {
        return (
            !this.$route.params.id ||
            this.$route.params.id === (this.user_m._id || this.$util.getItem('_id'))
        );
    }
    get _id() {
        return this.$route.params.id || this.user_m._id || this.$util.getItem('_id');
    }
    get myId() {
        return this.user_m._id || this.$util.getItem('_id');
    }
    get isSubscribe() {
        return (
            this.userInfo &&
            this.userInfo.details &&
            Array.isArray(this.userInfo.details.followers) &&
            this.userInfo.details.followers.includes(this.myId)
        );
    }

    public async created() {
        if (this._id) {
            try {
                const { code, message, info } = await this.$axios.getUserDetails(this._id);
                if (code === 0) {
                    info.details.created = Object.values(
                        info.details.created as Record<string, any[]>
                    ).reduce((prev: Array<any>, cur: Array<any>) => {
                        return prev.concat(cur);
                    }, []);
                    this.userInfo = info;
                } else {
                    throw Error(message);
                }
                // if (!this.self) {
                //     await this.checkSubscribe();
                // }
            } catch (error) {
                this.$toast(error.message, 'error');
            }
        } else {
            this.$router.replace({ path: '/guide', query: { redirect: 'space' } });
        }
    }
    // public async checkSubscribe() {
    //     if (this.user_m.loginStatus) {
    //         const { code, message } = await this.$axios.checkSubscribe(
    //             this.user_m._id || this.$util.getItem('_id'),
    //             this.$route.params.id
    //         );
    //         if (code === 0) {
    //             this.isFollowing = true;
    //         }
    //     }
    // }
    public handleGotoCollectionPage(type: string) {
        this.$router.push({ path: `/collection/${this._id}`, query: { type } });
    }
    public handleGotoProfile() {
        this.$router.push({ path: '/profile', query: { redirect: 'me' } });
    }
    public async handleSubscribe() {
        try {
            const { code, message } = await this.$axios.getToken();
            if (code === 0) {
                if (!this.isSubscribe) {
                    // 关注
                    try {
                        if (this.userInfo && this.userInfo.details) {
                            const { code, message } = await this.$axios.subscribeAuthor(
                                this.myId,
                                this.userInfo._id
                            );
                            if (code === 0) {
                                this.userInfo.details.followers.push(this.myId);
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
                        if (this.userInfo && this.userInfo.details) {
                            const { code, message } = await this.$axios.removeSubscribeAuthor(
                                this.myId,
                                this.userInfo._id
                            );
                            if (code === 0) {
                                const index = this.userInfo.details.followers.indexOf(this.myId);
                                index > -1 && this.userInfo.details.followers.splice(index, 1);
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
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';
@import '~@/assets/css/mixin.scss';

.user-space-wrapper {
    .user-profile-icon {
        width: 40px;
        height: 40px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99999;
        color: $white;
        line-height: 40px;
        text-align: center;
        font-size: $more-larger-fontsize;
        font-weight: bold;
    }
    .user-profile {
        position: relative;
        padding: 40px 70px 70px;
        color: $black;
        background-position-x: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        .user-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .user-following,
            .user-followers {
                /* color: $gray; */
                color: $light-white;
                font-size: $smaller-fontsize;
                span {
                    padding-top: 5px;
                    display: block;
                    /* color: $black; */
                    font-weight: 550;
                    text-align: center;
                }
            }
            .user-avatar {
                width: 60px;
                height: 60px;
                border: 2px solid $white;
                border-radius: 50%;
                background-position-x: 50%;
                background-size: cover;
                background-repeat: no-repeat;
            }
        }
        .username {
            margin-top: 8px;
            text-align: center;
            font-weight: 600;
            color: $light-white;
        }
        .description {
            margin-top: 8px;
            text-align: center;
            font-size: $more-smaller-fontsize;
            line-height: $normal-fontsize;
            /* color: $gray; */
            color: $light-white;
            font-weight: 500;
        }
        .subscribe {
            position: absolute;
            padding: 4px;
            @include center();
            text-align: center;
            font-size: $smaller-fontsize;
            color: $gray;
            border: 1px solid $gray;
            border-radius: 2px;
            top: 80%;
            &.following {
                color: $light-white;
                background-color: $gray;
            }
        }
    }
    .add-padding-top {
        padding-top: 80px;
    }
    .user-collection {
        background-color: $white;
        color: $black;
        .collection-title {
            padding: 10px 10px 15px;
            font-size: $more-smaller-fontsize;
        }
        .collection-gallery {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 30px;
            .collection-icon {
                height: 40px;
                margin-right: 30px;
                background-size: 100% auto;
                background-repeat: no-repeat;
                background-position-x: 50%;
                &:nth-child(1) {
                    width: 29.65px;
                }
                &:nth-child(2) {
                    width: 39.53px;
                }
                &:nth-child(3) {
                    width: 27.3px;
                }
                &:nth-child(4) {
                    width: 26.82px;
                }
                &:nth-child(5) {
                    width: 29.18px;
                    margin-right: 0;
                }
            }
        }
    }
    .user-article {
        margin-top: 4px;
        .article-header {
            padding: 20px 0;
            text-align: center;
            font-weight: 350;
            background-color: $white;
        }
        .no-article {
            padding: 20px 0;
            font-size: $more-smaller-fontsize;
            text-align: center;
        }
    }
}
</style>
