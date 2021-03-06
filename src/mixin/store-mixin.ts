import { Vue, Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import MusicModule from '@/store/module/music';
import UserModule from '@/store/module/user';
import ArticleModule from '@/store/module/article';
import LoadingModule from '@/store/module/loading';
import QiniuModule from '@/store/module/qiniu';
import { TOGGLE_LOADING_ANIMATION } from '@/store/types';

declare module 'vue/types/vue' {
    interface Vue {
        music_m: MusicModule;
        user_m: UserModule;
        article_m: ArticleModule;
        loading_m: LoadingModule;
        qiniu_m: QiniuModule;
    }
}

@Component
export default class StoreMixin extends Vue {
    music_m!: MusicModule;
    user_m!: UserModule;
    article_m!: ArticleModule;
    loading_m!: LoadingModule;
    qiniu_m!: QiniuModule;

    public created() {
        this.music_m = getModule(MusicModule, this.$store);
        this.user_m = getModule(UserModule, this.$store);
        this.article_m = getModule(ArticleModule, this.$store);
        this.loading_m = getModule(LoadingModule, this.$store);
        this.qiniu_m = getModule(QiniuModule, this.$store);
    }
}
