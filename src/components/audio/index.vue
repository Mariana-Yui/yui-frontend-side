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
import {
    FALSIFY_MUSIC_LOAD_STATUS,
    TRUSIFY_MUSIC_LOAD_STATUS,
    PAUSE_MUSIC,
    CHANGE_CURRENT_MUSIC_SOURCE,
    SPLICE_CURRENT_MUSIC_SOURCE
} from '@/store/types';

@Component
export default class Audio extends Mixins(StoreMixin) {
    get src() {
        return this.music_m ? this.music_m.curMusicInfo.urls : [];
    }
    get musicId() {
        return this.music_m ? this.music_m.curMusicInfo.id : '';
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
            (state) => state.music.curMusicInfo,
            (value, oldValue) => {
                // 切换歌曲文件时,将canplay状态置为false
                this.music_m[FALSIFY_MUSIC_LOAD_STATUS]();
                this.$toast('音频加载中, 加载完成后播放...', 'info');
            },
            {
                deep: true
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
    public async handleErrorMusic(index: number) {
        if (index === this.music_m.curMusicInfo.urls.length - 1) {
            // source中所有音频文件都无法播放, 淦
            this.$toast('音频文件无法播放, 非常抱歉...', 'info');
            // 获取最新音频url并写入database
            await this.tryGetNewMusicUrl();
            await this.updateMusicUrls();
        } else {
        }
    }
    // 尝试获取最新的音频链接
    public async tryGetNewMusicUrl() {
        try {
            const { code, message, info } = await this.$axios.getNewMusicUrl(this.musicId);
            if (code === 0) {
                this.music_m[CHANGE_CURRENT_MUSIC_SOURCE](info);
                // 更换了source之后需要手动调用load重新加载audio对象
                (this.$refs['audio'] as HTMLAudioElement).load();
                return;
            }
            throw Error(message);
        } catch (error) {
            console.log(error);
            this.$toast('获取最新音频文件失败, 非常抱歉...', 'info');
            this.music_m[PAUSE_MUSIC]();
        }
    }
    // 发送请求写入数据库
    public async updateMusicUrls() {
        try {
            const { code, message, info } = await this.$axios.updateMusicUrls(
                this.music_m.relatedArticleId,
                this.music_m.curMusicInfo
            );
            if (code === 0) {
                console.log('最新音频url写入数据库');
                return;
            }
            throw Error(message);
        } catch (error) {
            console.log(error.message);
        }
    }
}
</script>
<style lang="scss" scoped></style>
