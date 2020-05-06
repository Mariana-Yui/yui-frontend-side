<template>
    <div class="guide-bg">
        <div class="guide">
            <div class="guide-title"></div>
            <router-link
                tag="div"
                :to="{ path: '/login', query: { redirect: 'guide' } }"
                class="guide-button"
                >登录</router-link
            >
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoginGuide extends Vue {}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/default.scss';

.guide-bg {
    @include forcedCenter(fixed);
    .guide {
        top: 45% !important;
        @include center();
        .guide-title {
            width: calc(375px / 2);
            height: calc(375px / 4.5);
            background-image: url('~@/assets/img/logo.png');
            background-repeat: no-repeat;
            background-size: contain;
            background-position-x: 50%;
        }
        .guide-button {
            width: 20%;
            margin: 0 auto;
            padding: 5px 20px;
            text-align: center;
            font-size: $smaller-fontsize;
            color: $black;
            border: 1px solid $black;
            border-radius: 13px;
            box-shadow: 0px 1px 4px $light-black;
        }
    }
}
</style>
