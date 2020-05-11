<template>
    <div
        ref="button"
        class="button"
        :class="{ active: isPass }"
        @touchstart="handleTouchButton"
        @touchend="emitTouchEnd"
        @animationend="handleEndAnimation"
    >
        <span>{{ btnText }}</span>
        <div class="wave" ref="wave"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class WaveButton extends Vue {
    @Prop({ default: false }) isPass!: boolean;
    @Prop({ default: '登录' }) btnText!: string;
    public handleTouchButton(event: TouchEvent) {
        if (this.isPass) {
            const { clientX, clientY } = event.touches[0];
            const { left, top, width, height } = (this.$refs[
                'button'
            ] as HTMLElement).getBoundingClientRect();
            const [Xpercent, Ypercent] = [(clientX - left) / width, (clientY - top) / height];
            const wave = this.$refs['wave'] as HTMLElement;
            wave.style['top'] = `${Ypercent * 100}%`;
            wave.style['left'] = `${Xpercent * 100}%`;
            wave.style['animation'] = 'wave .7s ease';
        }
    }
    public emitTouchEnd() {
        this.$emit('touchend');
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
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';
@import '~@/assets/css/mixin.scss';

.button {
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
</style>
