<template>
    <div id="app">
        <transition name="slide-fade">
            <keep-alive v-if="$route.meta.exclude">
                <router-view></router-view>
            </keep-alive>
            <router-view v-else></router-view>
        </transition>
        <transition name="fade-out">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Loading from '@/components/loading/index.vue';
import StoreMixin from '@/components/mixin/store-mixin';
import { TOGGLE_LOADING_ANIMATION } from './store/types';

@Component({
    components: {
        Loading
    },
    mixins: [StoreMixin]
})
export default class ReadApp extends Vue {
    get showLoading() {
        return this.loading_m ? this.loading_m.show : false;
    }
    public created() {
        this.loading_m[TOGGLE_LOADING_ANIMATION]();
    }
    public mounted() {
        this.$nextTick(() => {
            this.loading_m[TOGGLE_LOADING_ANIMATION]();
        });
    }
}
</script>
<style lang="scss" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
    opacity: 0.3;
}
.slide-fade-enter {
    transform: translateX(100%);
}
.slide-fade-leave-to {
    transform: translateX(-100%);
}
.fade-out-leave-active {
    transition: opacity 0.3s ease;
}
.fade-out-leave-to {
    opacity: 0;
}
</style>
