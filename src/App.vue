<template>
    <div id="app">
        <transition name="slide-fade">
            <!-- <keep-alive :exclude="['SpaceCollection', 'Search', 'Article']"> -->
            <router-view></router-view>
            <!-- </keep-alive> -->
        </transition>
        <transition name="fade-out">
            <loading v-show="showLoading"></loading>
        </transition>
        <my-audio></my-audio>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Loading from '@/components/loading/index.vue';
import MyAudio from '@/components/audio/index.vue';
import StoreMixin from '@/mixin/store-mixin';
import { TOGGLE_LOADING_ANIMATION } from './store/types';

@Component({
    components: {
        Loading,
        MyAudio
    },
    mixins: [StoreMixin]
})
export default class ReadApp extends Vue {
    get showLoading() {
        return this.loading_m ? this.loading_m.show : false;
    }
    public async beforeCreate() {
        try {
            await this.$axios.getNetEaseVIPCookie();
        } catch (error) {
            console.log(error);
        }
    }
    public created() {
        this.loading_m[TOGGLE_LOADING_ANIMATION]();
        // 上报信息不用await
        window.addEventListener('load', (e) => {
            this.$axios.reportViews();
            if (this.user_m._id || this.$util.getItem('_id')) {
                this.$axios.reportLocation(this.user_m._id || this.$util.getItem('_id'));
            }
        });
        window.addEventListener('beforeunload', (e) => {
            this.$axios.reportViews();
            if (this.user_m._id || this.$util.getItem('_id')) {
                this.$axios.reportLocation(this.user_m._id || this.$util.getItem('_id'));
            }
            // eslint-disable-next-line no-useless-escape
            const confirmationMessage = '\o/';

            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage; //Webkit, Safari, Chrome
        });
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
