<template>
    <div class="login-wrapper">
        <div class="login-background">
            <div class="bg-cover">
                <div class="logo"></div>
                <div class="quote">—— TAKE&nbsp; A&nbsp; BREAK ——</div>
            </div>
        </div>
        <div class="slot-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoginBg extends Vue {}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/default.scss';

.login-wrapper {
    @include forcedCenter();
    background-color: $white;
    .login-background {
        @include equalWidthHeightFather(100%, 61.58%);
        background-image: url('~@/assets/img/login-bg.png');
        background-repeat: no-repeat;
        background-position-x: 50%;
        background-size: cover;
        .bg-cover {
            @include equalWidthHeightChild(70%, 0, 100%, 20%);
            .logo {
                height: 80px;
                background: url('~@/assets/img/logo.png') no-repeat;
                background-size: contain;
                background-position-x: 50%;
            }
            .quote {
                margin-top: -5px;
                text-align: center;
                font-size: $more-larger-fontsize;
                color: $light-black;
                font-weight: 350;
            }
        }
    }
    .slot-wrapper {
        margin-top: calc(#{$more-larger-fontsize} + 50px);
    }
}
</style>
