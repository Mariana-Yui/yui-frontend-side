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
                    @blur="focusOnRendered = false"
                />
            </div>
            <div class="email-warn">{{ emailWarn }}</div>
            <div class="password flex">
                <label for="password">密码</label>
                <input
                    v-model="password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="请输入密码"
                    @input="validatePassword"
                />
            </div>
            <div class="password-warn">{{ passwordWarn }}</div>
            <wave-button :isPass="isPass" @touchend="handleTouchEndButton"></wave-button>
            <div class="bottom-help">
                <div class="register" @click="handleGotoRegisterStep1">注册</div>
                <div class="forget-password">忘记密码</div>
            </div>
        </div>
    </login-bg>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import LoginBg from './loginBg.vue';
import WaveButton from '@/components/wave-button/index.vue';
import LoginMixin from '@/mixin/login-mixin';
import StoreMixin from '@/mixin/store-mixin';
import { LOGIN } from '@/store/types';

@Component({
    components: {
        LoginBg,
        WaveButton
    }
})
export default class Login extends Mixins(LoginMixin, StoreMixin) {
    get isPass() {
        return this.emailPass && this.passwordPass;
    }

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
    public async handleGotoRegisterStep1() {
        this.$router.push({ path: '/register/step1' });
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';
@import '~@/assets/css/mixin.scss';

.login-form-wrapper {
    margin: 0 50px;
    .bottom-help {
        display: flex;
        justify-content: space-between;
        font-size: $more-smaller-fontsize;
    }
}
</style>
