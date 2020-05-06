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
                    @blur="validateEmail"
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
                    @blur="validatePassword"
                />
            </div>
            <div class="password-warn">{{ passwordWarn }}</div>
            <div
                ref="login-btn"
                class="login-button"
                :class="{ active: isPass }"
                @click="handleTouchButton"
            >
                登录
            </div>
            <div class="bottom-help">
                <div class="register">注册</div>
                <div class="forget-password">忘记密码</div>
            </div>
        </div>
    </login-bg>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginBg from './loginBg.vue';

@Component({
    components: {
        LoginBg
    }
})
export default class Login extends Vue {
    private focusOnRendered = true;
    private email = '';
    private password = '';
    private isPass = false;
    private emailWarn = '';
    private passwordWarn = '';

    public validateEmail() {
        if (!this.$rule.email.pattern.test(this.email)) {
            this.emailWarn = this.$rule.email.message;
        } else {
            this.emailWarn = '';
        }
        this.focusOnRendered = false;
    }
    public validatePassword() {
        if (!this.$rule.password.pattern.test(this.password)) {
            this.passwordWarn = this.$rule.password.message;
        } else {
            this.passwordWarn = '';
        }
    }
    public handleTouchButton() {
        ((this.$refs['login-btn'] as Vue).$el.querySelector(
            ':after'
        ) as HTMLElement).style.animation = '';
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';

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
    .password {
        margin-bottom: 20px;
    }
    [class$='warn'] {
        height: 15px;
        line-height: 15px;
        font-size: 9px;
        color: rgba(255, 0, 0, 0.7);
    }
    .login-button {
        margin: 0 30px 12px;
        padding: 10px 0;
        font-size: $smaller-fontsize;
        font-weight: bold;
        text-align: center;
        color: $white;
        border-radius: 5px;
        background-color: $black;
        opacity: 0.15;
        &.active {
            opacity: 0.7;
        }
    }
    .bottom-help {
        display: flex;
        justify-content: space-between;
        font-size: $more-smaller-fontsize;
    }
}
</style>
