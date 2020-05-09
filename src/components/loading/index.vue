<template>
    <div class="loading-wrapper">
        <div class="sk-bounce">
            <div class="sk-bounce-dot"></div>
            <div class="sk-bounce-dot"></div>
            <div class="sk-bounce-dot"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
    // @Prop({default: 'transparent'}) backgroundColor: string;
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';
@import '~@/assets/css/mixin.scss';

.loading-wrapper {
    @include forcedCenter();
    z-index: 999999;
    background-color: transparent;
    --sk-size: 50px;
    --sk-color-one: #c4b2f5;
    --sk-color-two: #f8c600;
    --sk-color-three: #f76e57;
    .sk-bounce {
        @include center();
        display: flex;
        width: calc(var(--sk-size) * 1.3);
        justify-content: space-between;
        .sk-bounce-dot {
            width: 25%;
            height: calc(var(--sk-size) * 1.3 / 4);
            border-radius: 50%;
            background-color: var(--sk-color-one);
            animation: sk-flow 1.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s infinite both;
            &:nth-child(1) {
                background-color: var(--sk-color-two);
                animation-delay: -0.3s;
            }
            &:nth-child(2) {
                background-color: var(--sk-color-three);
                animation-delay: -0.15s;
            }
        }
    }
}

@keyframes sk-flow {
    0%,
    80%,
    100% {
        transform: scale(0.1);
    }
    40% {
        transform: scale(1);
    }
}
</style>
