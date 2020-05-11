import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {
    PLAY_MUSIC,
    PAUSE_MUSIC,
    TRUSIFY_MUSIC_LOAD_STATUS,
    FALSIFY_MUSIC_LOAD_STATUS,
    SET_RELATED_ARTICLE_ID,
    CHANGE_CURRENT_MUSIC_INFO,
    CHANGE_CURRENT_MUSIC_SOURCE,
    SPLICE_CURRENT_MUSIC_SOURCE
} from '../types';

interface MusicInfo {
    name: string;
    urls: Array<string>;
    album: string;
    artists: string;
    cover: string;
    id: string;
}

@Module({
    name: 'music',
    namespaced: true
})
export default class MusicModule extends VuexModule {
    play = false;
    loaded = false;
    curMusicInfo: MusicInfo = {
        id: '',
        name: '',
        album: '',
        artists: '',
        cover: '',
        urls: []
    };
    relatedArticleId = '';

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
    @Mutation
    public [CHANGE_CURRENT_MUSIC_INFO](info: MusicInfo) {
        this.curMusicInfo = info;
    }
    @Mutation
    public [CHANGE_CURRENT_MUSIC_SOURCE](urls: string[]) {
        this.curMusicInfo.urls = urls;
    }
    @Mutation
    public [SPLICE_CURRENT_MUSIC_SOURCE](index: number) {
        this.curMusicInfo.urls.splice(index, 1);
    }
    @Mutation
    public [SET_RELATED_ARTICLE_ID](id: string) {
        this.relatedArticleId = id;
    }
}
