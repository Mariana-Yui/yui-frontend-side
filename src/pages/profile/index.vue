<template>
    <div class="user-profile-wrapper">
        <common-header :title="user.username"></common-header>
        <div class="profile">
            <div class="avatar-wrapper">
                <span class="text">头像</span>
                <span
                    class="avatar"
                    :style="{ 'background-image': `url(${user.avatar})` }"
                    @click="handleChangeAvatar"
                ></span>
            </div>
            <div class="username-wrapper" @click="openDialog('昵称', 'username', user.username)">
                <span class="text">昵称</span>
                <span class="username">{{ user.username }}</span>
                <i class="iconfont rotate">&#xe641;</i>
            </div>
            <div
                class="description-wrapper"
                @click="openDialog('简介', 'description', user.description)"
            >
                <span class="text">简介</span>
                <span class="description">{{ user.description }}</span>
                <i class="iconfont rotate">&#xe641;</i>
            </div>
            <div class="background-wrapper" @click="handleChangeBackground">
                <span class="text">背景</span>
                <i class="iconfont rotate">&#xe641;</i>
            </div>
            <div class="email-wrapper" @click="openDialog('邮箱', 'email', user.email)">
                <span class="text">邮箱</span>
                <span class="email">{{ user.email }}</span>
                <i class="iconfont rotate">&#xe641;</i>
            </div>
            <div class="phone-wrapper" @click="openDialog('手机', 'phone', user.phone)">
                <span class="text">手机</span>
                <span class="phone">{{ user.phone }}</span>
            </div>
            <div class="modify-password-wrapper" @click="openDialog('密码')">
                <span class="text">修改密码</span>
                <i class="iconfont rotate">&#xe641;</i>
            </div>
            <div class="logout-wrapper" @click.stop="handleLogOut">
                <span class="text">退出登录</span>
            </div>
        </div>
        <input
            ref="upload"
            @change="handleChangeFile"
            type="file"
            accept=".jpg, .png"
            style="display: none;"
        />
        <image-clipper
            ref="clipper"
            v-if="visible"
            :img="imgUrl"
            :clipper-img-width="clipperImgWidth"
            :clipper-img-height="clipperImgHeight"
            @cancel="visible = false"
            @confirm="confirm"
        ></image-clipper>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import CommonHeader from '@/components/logoHeader/common.vue';
import {
    LOGOUT,
    SET_UPLOAD_TOKEN,
    TOGGLE_LOADING_ANIMATION,
    ERASER_UPLOAD_TOKEN,
    TRUIFY_LOADING_ANIMATION,
    FALSIFY_LOADING_ANIMATION
} from '@/store/types';
import StoreMixin from '@/mixin/store-mixin';
import config from '@/config/config.defaults';

@Component({
    components: {
        CommonHeader
    }
})
export default class Profile extends Mixins(StoreMixin) {
    private user = {
        avatar: '',
        username: '',
        description: '',
        background: '',
        email: '',
        phone: '',
        _id: ''
    };
    private imgUrl = '';
    private visible = false;
    private clipperImgWidth = 600;
    private clipperImgHeight = 600;

    public async created() {
        try {
            const { code, message, info } = await this.$axios.getUserInfo(
                this.user_m._id || this.$util.getItem('_id')
            );
            if (code === 0) {
                this.user = info;
                return;
            }
            throw Error(message);
        } catch (error) {
            this.$toast(error.message, 'error');
        }
    }
    public handleLogOut() {
        this.user_m[LOGOUT]();
        this.$router.push({ path: '/all', query: { redirect: 'logout' } });
    }
    public handleChangeAvatar() {
        (this.$refs['upload'] as HTMLElement).click();
    }
    public handleChangeBackground() {
        this.clipperImgWidth = 900;
        this.clipperImgHeight = 500;
        (this.$refs['upload'] as HTMLElement).click();
    }
    public async handleChangeFile(event: Event) {
        const file = ((event.target as any).files as FileList)[0];
        const imgUrl = await this.$util.blobToBase64(file);
        this.imgUrl = imgUrl;
        this.visible = true;
    }
    public async confirm(blob: Blob, type: 'avatar' | 'background') {
        try {
            this.loading_m[TRUIFY_LOADING_ANIMATION]();
            // 没有uptoken就获取
            if (!this.$util.getItem('uptoken')) {
                await this.qiniu_m[SET_UPLOAD_TOKEN]();
            }
            const random = this.$util.getRandomUploadName('png');
            const key = `${config.upload_domain}/${random}`;
            const hash = await this.$axios.uploadFile(blob, random, this.$util.getItem('uptoken'));
            this.user[type] = key;
            await this.updateUserInfo(type === 'avatar' ? '头像' : '背景图片');
        } catch (error) {
            console.log(error);
            // uptoken过期,再来一次
            if (error.isRequestError && error.code === 401) {
                this.qiniu_m[ERASER_UPLOAD_TOKEN]();
                this.confirm(blob, type);
            } else {
                this.$toast('上传失败, 请重试...', 'error');
            }
        }
        this.loading_m[FALSIFY_LOADING_ANIMATION]();
        this.visible = false;
    }
    public async updateUserInfo(prefix: string) {
        try {
            const { code, message, info } = await this.$axios.updateUserInfo(this.user);
            if (code === 0) {
                this.$toast(`${prefix}更换成功`, 'success');
                return;
            }
            throw Error(message);
        } catch (error) {
            console.log(error.message);
            this.$toast(error.message, 'error');
        }
    }
    public openDialog(
        title: string,
        key?: 'username' | 'description' | 'email' | 'phone',
        value?: string
    ) {
        let type: string | undefined;
        if (title === '密码') type = 'password';
        this.$prompt({ title, value, type }, async (val) => {
            if (type === 'password' && typeof val !== 'string') {
                if (
                    !this.$rule.password.pattern.test(val.oldPassword) ||
                    !this.$rule.password.pattern.test(val.newPassword)
                ) {
                    this.$toast(this.$rule.password.message, 'error');
                } else if (val.oldPassword === val.newPassword) {
                    this.$toast('新/旧密码不能相同', 'error');
                } else {
                    try {
                        let info = await this.$axios.checkPassword(
                            this.user.username,
                            val.oldPassword
                        );
                        if (info.code === 0) {
                            info = await this.$axios.updatePassword(
                                this.user.username,
                                val.newPassword
                            );
                            if (info.code === 0) {
                                this.$toast('修改密码成功, 请重新登录~', 'success');
                                this.user_m[LOGOUT]();
                                this.$router.push({
                                    path: '/guide',
                                    query: { redirect: 'profile' }
                                });
                                return;
                            }
                        }
                        throw Error(info.message);
                    } catch (error) {
                        this.$toast(error.message, 'error');
                    }
                }
            } else {
                if (val === '') {
                    this.$toast(`${title}不能为空`, 'error');
                } else {
                    try {
                        if (key !== undefined && typeof val === 'string') {
                            this.user[key] = val;
                        }
                        const { code, message } = await this.$axios.updateUserInfo(this.user);
                        if (code === 0) {
                            this.$toast(`修改${title}成功`, 'success');
                            return;
                        }
                        throw Error(message);
                    } catch (error) {
                        this.$toast(error.message, 'error');
                    }
                }
            }
        });
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';

.user-profile-wrapper {
    padding-top: 40px;
    color: $black;
    .profile {
        [class$='wrapper'] {
            background-color: $white;
            display: flex;
            padding: 10px;
            .text {
                color: $gray;
                padding-right: 15px;
            }
            .rotate {
                transform: rotate(180deg);
            }
        }
        .avatar-wrapper {
            margin-top: 3px;
            justify-content: space-between;
            align-items: center;
            .avatar {
                width: 50px;
                height: 50px;
                margin-right: 20px;
                border-radius: 50%;
                background-repeat: no-repeat;
                background-position-x: 50%;
                background-size: cover;
            }
        }
        .username-wrapper {
            margin-top: 10px;
            .username {
                flex: 1;
            }
        }
        .description-wrapper {
            margin-top: 1px;
            .description {
                flex: 1;
            }
        }
        .background-wrapper {
            margin-top: 10px;
            justify-content: space-between;
        }
        .email-wrapper {
            margin-top: 10px;
            .email {
                flex: 1;
            }
        }
        .phone-wrapper {
            margin-top: 1px;
            .phone {
                flex: 1;
            }
        }
        .modify-password-wrapper {
            margin-top: 15px;
            justify-content: space-between;
        }
        .logout-wrapper {
            margin-top: 15px;
            justify-content: space-between;
        }
    }
}
</style>
