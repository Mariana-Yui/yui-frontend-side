<template>
    <login-bg>
        <div class="register-form-step1">
            <div class="email flex">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    v-focus="focusOnRendered"
                    v-model="email"
                    placeholder="请输入邮箱"
                    @focus="focusOnRendered = true"
                    @blur="focusOnRendered = false"
                    @input="validateEmail"
                />
            </div>
            <div class="email-warn">{{ emailWarn }}</div>
            <wave-button
                :isPass="isPass"
                btnText="获取验证码"
                @touchend="handleTouchEndButton"
            ></wave-button>
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
import LoginMixin from '@/mixin/login-mixin';

@Component({
    components: {
        LoginBg,
        WaveButton
    }
})
export default class RegisterStep1 extends Mixins(LoginMixin) {
    get isPass() {
        return this.emailPass;
    }

    public async handleTouchEndButton() {
        if (this.isPass) {
            try {
                const { code, message } = await this.$axios.checkUsableEmail(this.email);
                if (code === 0) {
                    // 可用的注册邮箱
                    this.$toast(message, 'info');
                    this.$router.push({ path: '/register/step2', query: { email: this.email } });
                    return;
                }
                throw Error(message);
            } catch (error) {
                this.$toast(error.message, 'error');
                this.email = '';
                this.validateEmail();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';

.register-form-step1 {
    margin: 0 50px;
    .bottom-help {
        text-decoration: underline;
        font-size: $more-smaller-fontsize;
        text-align: center;
    }
}
</style>
