<template>
    <div class="sk-wave">
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoadingWave extends Vue {}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';
.sk-wave {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    .sk-wave-rect {
        background-color: rgba(0, 0, 0, 0.2);
        height: 100%;
        width: 15%;
        animation: sk-wave 1.2s infinite ease-in-out;
        &:nth-child(1) {
            animation-delay: -1.2s;
        }

        &:nth-child(2) {
            animation-delay: -1.1s;
        }

        &:nth-child(3) {
            animation-delay: -1s;
        }

        &:nth-child(4) {
            animation-delay: -0.9s;
        }

        &:nth-child(5) {
            animation-delay: -0.8s;
        }
    }
}

@keyframes sk-wave {
    0%,
    40%,
    100% {
        transform: scaleY(0.4);
    }
    20% {
        transform: scaleY(1);
    }
}
</style>
