<template>
    <login-bg>
        <div class="register-form-step2">
            <div class="code flex">
                <label for="code">验证码</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    v-model="code"
                    placeholder="请输入验证码"
                    @input="validateCode"
                />
            </div>
            <div class="code-warn">{{ codeWarn }}</div>
            <div class="username flex">
                <label for="username">昵称</label>
                <input
                    type="username"
                    id="username"
                    name="username"
                    v-model="username"
                    placeholder="请输入昵称"
                    @input="validateUsername"
                />
            </div>
            <div class="username-warn">{{ usernameWarn }}</div>
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
                <span>注册遇到困难?</span>
            </div>
        </div>
    </login-bg>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import LoginBg from '../login/loginBg.vue';
import WaveButton from '@/components/wave-button/index.vue';
import LoginMixin from '@/components/mixin/login-mixin';
import { LOGIN } from '../../store/types';

@Component({
    components: {
        LoginBg,
        WaveButton
    }
})
export default class RegisterStep2 extends Mixins(LoginMixin) {
    get isPass() {
        return this.codePass && this.usernamePass && this.passwordPass;
    }

    public async handleTouchEndButton() {
        if (this.isPass && typeof this.$route.query.email === 'string') {
            try {
                const { code, message } = await this.$axios.checkUsableUserInfo(
                    this.code,
                    this.username,
                    this.$route.query.email,
                    this.password
                );
                if (code === 0) {
                    this.$toast(message, 'success');
                    if (typeof this.$route.query.email === 'string') {
                        const info = await this.user_m[LOGIN]({
                            email: this.$route.query.email,
                            password: this.password
                        });
                        if (info.code === 0) {
                            this.$router.push({ path: '/me', query: { redirect: 'register' } });
                            return;
                        }
                        throw Error(info.message);
                    }
                } else if (code === -2) {
                    this.$toast(message, 'info');
                    this.$router.replace({ path: '/register/step1', query: { redirect: 'step2' } });
                } else {
                    this.$toast(message, 'error');
                }
            } catch (error) {
                this.$toast(error.message, 'error');
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';

.register-form-step2 {
    margin: 0 50px;
    .bottom-help {
        text-decoration: underline;
        font-size: $more-smaller-fontsize;
        text-align: center;
    }
}
</style>
