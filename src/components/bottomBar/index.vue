<template>
    <div class="bottom-bar">
        <router-link
            tag="div"
            :to="{ 'path': '/all' }"
            class="all iconfont"
            :class="{ 'current': cur === 'all' }"
            @click="handleClickTag"
        >
            &#xe696;
            <span>ALL</span>
        </router-link>
        <router-link
            tag="div"
            :to="{ 'path': '/yui' }"
            class="yui iconfont"
            :class="{ 'current': cur === 'yui' }"
            @click="handleClickTag"
        >
            &#xe610;
            <span>YUI</span>
        </router-link>
        <router-link
            tag="div"
            :to="{ 'path': '/me' }"
            class="me iconfont"
            :class="{ 'current': cur === 'me' }"
            @click="handleClickTag"
        >
            &#xe614;
            <span>ME</span>
        </router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BottomBar extends Vue {
    get cur() {
        return (
            this.$route.path.match(/\/(.*)$/) &&
            (this.$route.path.match(/\/(.*)$/) as Array<any>)[1]
        );
    }
    public handleClickTag() {}
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';

.bottom-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: $white;
    display: flex;
    align-items: center;
    div.iconfont {
        flex: 1;
        font-size: 22px;
        text-align: center;
        &.current {
            color: $black;
            /* font-size: 26px; */
            animation: small-to-big 0.2s ease-in-out;
            animation-fill-mode: forwards;
        }
        span {
            font-size: $more-smaller-fontsize;
            display: block;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
    }
}

@keyframes small-to-big {
    25% {
        font-size: 20px;
    }
    100% {
        font-size: 26px;
    }
}
</style>
