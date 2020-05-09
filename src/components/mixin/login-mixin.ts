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
    public email = '';
    public password = '';
    public emailPass = false;
    public passwordPass = false;
    public emailWarn = '';
    public passwordWarn = '';

    get isPass() {
        return this.emailPass && this.passwordPass;
    }
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
        this.focusOnRendered = false;
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
    public handleTouchButton(event: TouchEvent) {
        if (this.isPass) {
            const { clientX, clientY } = event.touches[0];
            const { left, top, width, height } = (this.$refs[
                'login-btn'
            ] as HTMLElement).getBoundingClientRect();
            const [Xpercent, Ypercent] = [(clientX - left) / width, (clientY - top) / height];
            const wave = this.$refs['wave'] as HTMLElement;
            wave.style['top'] = `${Ypercent * 100}%`;
            wave.style['left'] = `${Xpercent * 100}%`;
            wave.style['animation'] = 'wave .7s ease';
        }
    }
    public handleEndAnimation() {
        if (this.isPass) {
            const wave = this.$refs['wave'] as HTMLElement;
            if (wave) {
                wave.style['top'] = '';
                wave.style['left'] = '';
                wave.style['animation'] = '';
            }
        }
    }
}
