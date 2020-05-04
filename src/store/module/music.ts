import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {
    CHANGE_CURRENT_MUSIC_SOURCE,
    PLAY_MUSIC,
    PAUSE_MUSIC,
    TRUSIFY_MUSIC_LOAD_STATUS,
    FALSIFY_MUSIC_LOAD_STATUS
} from '../types';

@Module({
    name: 'music',
    namespaced: true
})
export default class MusicModule extends VuexModule {
    play = false;
    loaded = false;
    curMusic = '';

    @Mutation
    public [PLAY_MUSIC]() {
        this.play = true;
    }
    @Mutation
    public [PAUSE_MUSIC]() {
        this.play = false;
    }
    @Mutation
    public [FALSIFY_MUSIC_LOAD_STATUS]() {
        this.loaded = false;
    }
    @Mutation
    public [TRUSIFY_MUSIC_LOAD_STATUS]() {
        this.loaded = true;
    }
    public [CHANGE_CURRENT_MUSIC_SOURCE](url: string) {
        this.curMusic = url;
    }
}
