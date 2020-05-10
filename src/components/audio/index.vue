<template>
    <div class="audio-wrapper">
        <audio ref="audio" @canplay="handleCanPlayMusic" @stalled="handleErrorMusic">
            <template v-if="src && src.length">
                <source
                    @error="handleErrorMusic(idx)"
                    v-for="(url, idx) of src"
                    :src="url"
                    :key="idx"
                    :type="`audio/${url.split('.').slice(-1)[0]}`"
                />
            </template>
        </audio>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator';
import StoreMixin from '../mixin/store-mixin';
import { FALSIFY_MUSIC_LOAD_STATUS, TRUSIFY_MUSIC_LOAD_STATUS, PAUSE_MUSIC } from '@/store/types';

@Component
export default class Audio extends Mixins(StoreMixin) {
    get src() {
        return this.music_m ? this.music_m.curMusic : [];
    }

    // @Watch('src')
    // handleSrcChanged() {
    //     console.log(this.music_m);
    //     this.music_m[FALSIFY_MUSIC_LOAD_STATUS]();
    // }
    // @Watch('play')
    // onPlayChanged(val: boolean) {
    //     console.log(val);
    //     if (this.music_m && this.music_m.loaded) {
    //         if (val) {
    //             (this.$refs['audio'] as HTMLAudioElement).play();
    //         } else {
    //             (this.$refs['audio'] as HTMLAudioElement).pause();
    //         }
    //     }
    // }
    public created() {
        this.$store.watch(
            (state) => state.music.play,
            (value, oldValue) => {
                if (this.music_m && this.music_m.loaded) {
                    if (value) {
                        (this.$refs['audio'] as HTMLAudioElement).play();
                    } else {
                        (this.$refs['audio'] as HTMLAudioElement).pause();
                    }
                }
            }
        );
        this.$store.watch(
            (state) => state.music.curMusic,
            (value, oldValue) => {
                // 切换歌曲文件时,将canplay状态置为false
                this.music_m[FALSIFY_MUSIC_LOAD_STATUS]();
                this.$toast('音频加载中...', 'info');
            }
        );
    }
    public handleCanPlayMusic() {
        console.log('canplay');
        this.music_m[TRUSIFY_MUSIC_LOAD_STATUS]();
        if (this.music_m.play) {
            (this.$refs['audio'] as HTMLAudioElement).play();
        }
    }
    public handleErrorMusic(index: number) {
        if (index !== this.src.length - 1) {
            // TODO 获取最新音频url并写入database
        } else {
            // source中所有音频文件都无法播放, 淦
            this.$toast('音频文件无法播放, 非常抱歉...', 'info');
            this.music_m[PAUSE_MUSIC]();
        }
    }
}
</script>
<style lang="scss" scoped></style>
