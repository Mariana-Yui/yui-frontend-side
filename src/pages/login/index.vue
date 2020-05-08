<template>
    <login-bg>
        <div class="login-form-wrapper">
            <div class="email flex">
                <label for="email">邮箱</label>
                <input
                    v-focus="focusOnRendered"
                    v-model="email"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="请输入邮箱"
                    @focus="focusOnRendered = true"
                    @input="validateEmail"
                />
            </div>
            <div class="email-warn">{{ emailWarn }}</div>
            <div class="password flex">
                <label for="password">密码</label>
                <input
                    v-model="password"
                    type="password"
                    id="password"
                    name="email"
                    placeholder="请输入密码"
                    @input="validatePassword"
                />
            </div>
            <div class="password-warn">{{ passwordWarn }}</div>
            <div
                ref="login-btn"
                class="login-button"
                :class="{ active: isPass }"
                @touchstart="handleTouchButton"
                @touchend="handleTouchEndButton"
                @animationend="handleEndAnimation"
            >
                <span>登录</span>
                <div class="wave" ref="wave"></div>
            </div>
            <div class="bottom-help">
                <div class="register">注册</div>
                <div class="forget-password">忘记密码</div>
            </div>
        </div>
    </login-bg>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import LoginBg from './loginBg.vue';
import LoginMixin from '@/components/mixin/login-mixin';
import StoreMixin from '@/components/mixin/store-mixin';
import { LOGIN } from '@/store/types';

@Component({
    components: {
        LoginBg
    }
})
export default class Login extends Mixins(LoginMixin, StoreMixin) {
    public async handleTouchEndButton() {
        if (this.isPass) {
            try {
                const { code, message } = await this.user_m[LOGIN]({
                    email: this.email,
                    password: this.password
                });
                if (code === 0) {
                    this.$router.push('/me');
                    return;
                }
                throw Error(message);
            } catch (error) {
                this.$toast(error.message, 'error');
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';
@import '~@/assets/css/mixin.scss';

.login-form-wrapper {
    margin: 0 50px;
    .flex {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-size: $smaller-fontsize;
        border: 1px solid $gray;
        opacity: 0.4;
        padding: 10px;
        label {
            padding-right: 10px;
            border-right: 1px solid $gray;
        }
        input {
            flex: 1;
            padding-left: 10px;
            border: 0;
            outline-style: none;
        }
    }
    [class$='warn'] {
        height: 15px;
        line-height: 15px;
        font-size: 9px;
        color: rgba(255, 0, 0, 0.7);
    }
    .login-button {
        position: relative;
        margin: 20px 30px 12px;
        padding: 10px 0;
        font-size: $smaller-fontsize;
        font-weight: bold;
        text-align: center;
        color: $white;
        border-radius: 5px;
        background-color: $light-gray;
        overflow: hidden;
        &.active {
            background-color: $black;
        }
        .wave {
            @include equalWidthHeightFather();
            position: absolute;
            background: transparent;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            animation-fill-mode: forwards;
            transform: translate(-50%, -50%);
        }
    }
    .bottom-help {
        display: flex;
        justify-content: space-between;
        font-size: $more-smaller-fontsize;
    }
}
</style>
