import { Vue, Component } from 'vue-property-decorator';
import { Debounce, Bind } from 'lodash-decorators';

// declare module 'vue/types/vue' {
//     interface Vue {
//         focusOnRendered: boolean;
//         emailPass: boolean;
//         passwordPass: boolean;
//         isPass: boolean;
//         email: string;
//         password: string;
//         passwordWarn: string;
//         validateEmail: () => void;
//         validatePassword: () => void;
//         handleTouchButton: () => void;
//         handleEndAnimation: () => void;
//     }
// }

@Component
export default class LoginMixin extends Vue {
    public focusOnRendered = true;
    public code = '';
    public email = '';
    public password = '';
    public username = '';
    public emailPass = false;
    public passwordPass = false;
    public codePass = false;
    public usernamePass = false;
    public codeWarn = '';
    public emailWarn = '';
    public passwordWarn = '';
    public usernameWarn = '';

    @Bind()
    @Debounce(500)
    public validateEmail() {
        if (!this.$rule.email.pattern.test(this.email)) {
            this.emailWarn = this.$rule.email.message;
            this.emailPass = false;
        } else {
            this.emailWarn = '';
            this.emailPass = true;
        }
    }
    @Bind()
    @Debounce(500)
    public validatePassword() {
        if (!this.$rule.password.pattern.test(this.password)) {
            this.passwordWarn = this.$rule.password.message;
            this.passwordPass = false;
        } else {
            this.passwordPass = true;
            this.passwordWarn = '';
        }
    }
    @Bind()
    @Debounce(500)
    public validateUsername() {
        if (!this.$rule.username.pattern.test(this.username)) {
            this.usernameWarn = this.$rule.username.message;
            this.usernamePass = false;
        } else {
            this.usernamePass = true;
            this.usernameWarn = '';
        }
    }
    @Bind()
    @Debounce(500)
    public async validateCode() {
        if (this.code.length !== 4) {
            this.codeWarn = '验证码长度为4';
            this.codePass = false;
        } else {
            this.codeWarn = '';
            this.codePass = true;
        }
    }
}
