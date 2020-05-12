import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ArticleMixin extends Vue {
    @Prop() article!: {
        _id: string;
        type: string;
        src: string;
        title: string;
        author: string;
        publishTime: string;
        likes: Array<string>;
        collects: Array<string>;
        abstract?: string;
    };
    public isCollectionActive = false;
    public isLikeActive = false;

    public async handleCollectArticle() {
        try {
            const { code, message } = await this.$axios.getToken();
            if (code === 0) {
                let info;
                if (!this.isCollectionActive) {
                    info = await this.$axios.collectArticle(
                        this.user_m._id || this.$util.getItem('_id'),
                        this.article._id,
                        this.article.type
                    );
                } else {
                    info = await this.$axios.removeCollectArticle(
                        this.user_m._id || this.$util.getItem('_id'),
                        this.article._id,
                        this.article.type
                    );
                }
                if (info.code === 0) {
                    this.isCollectionActive = !this.isCollectionActive;
                    return;
                }
                throw Error(info.message);
            }
            throw Error(message);
        } catch (error) {
            if (error.response && error.response.status === 401) return;
            this.$toast('该操作需要登录进行~');
            this.$router.replace({ path: '/guide' });
        }
    }
    public async handleLikeArticle() {
        try {
            const { code, message } = await this.$axios.getToken();
            if (code === 0) {
                let info;
                if (!this.isLikeActive) {
                    this.article.likes.push(this.user_m._id || this.$util.getItem('_id'));
                    info = await this.$axios.likeArticle(
                        this.user_m._id || this.$util.getItem('_id'),
                        this.article._id,
                        this.article.type
                    );
                } else {
                    const index = this.article.likes.indexOf(
                        this.user_m._id || this.$util.getItem('_id')
                    );
                    index > -1 && this.article.likes.splice(index, 1);
                    info = await this.$axios.removeLikeArticle(
                        this.user_m._id || this.$util.getItem('_id'),
                        this.article._id,
                        this.article.type
                    );
                }
                if (info.code === 0) {
                    this.isLikeActive = !this.isLikeActive;
                    return;
                }
                throw Error(info.message);
            }
            throw Error(message);
        } catch (error) {
            if (error.response && error.response.status === 401) return;
            this.$toast('该操作需要登录进行~');
            this.$router.replace({ path: '/guide' });
        }
    }
}
