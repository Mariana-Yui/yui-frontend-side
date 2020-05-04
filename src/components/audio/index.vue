<template>
    <div class="audio-wrapper">
        <audio :src="src" @canplay="handleCanPlayMusic"></audio>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import StoreMixin from '../mixin/store-mixin';

@Component({ mixins: [StoreMixin] })
export default class App extends Vue {
    get src() {
        return this.music_m.curMusic;
    }
    @Watch('src')
    onMusicSrcChanged() {
        this.music_m;
    }
}
</script>
<style lang="scss" scoped></style>
