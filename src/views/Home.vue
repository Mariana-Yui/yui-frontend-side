<template>
    <div id="home">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <bottom-bar></bottom-bar>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BottomBar from '@/components/bottomBar/index.vue';

@Component({
    components: {
        BottomBar
    }
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
#home {
    min-height: 100vh;
}
</style>
