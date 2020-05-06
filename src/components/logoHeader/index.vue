<template>
    <div class="logo-header">
        <div class="logo"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LogoHeader extends Vue {}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';
@import '~@/assets/css/mixin.scss';

.logo-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 40px;
    background-color: $white;
    .logo {
        @include center();
        width: 40%;
        height: 40px;
        background-image: url('~@/assets/img/logo.png');
        background-size: contain;
        background-position-x: 50%;
        background-repeat: no-repeat;
    }
}
</style>
