import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { CHANGE_CURRENT_ARTICLE_TYPE, PUSH_ARTICLE, GET_ARTICLE_REGULARLY_ASYNC } from '../types';
import request from '@/utils/axios/axios';

interface Article {
    title: string;
    author: string;
    content: string;
    cover_img: string;
    views: number;
    publish_time: Date;
}
@Module({
    name: 'article',
    namespaced: true
})
export default class ArticleModule extends VuexModule {
    type = '';
    articles: Array<Article> = [];

    @Mutation
    public [CHANGE_CURRENT_ARTICLE_TYPE](type: string) {
        this.type = type;
    }
    @Mutation
    public [PUSH_ARTICLE](articles: Array<Article>) {
        if (articles.length > 0) {
            this.articles = this.articles.concat(articles);
        }
    }
    @Action
    public async [GET_ARTICLE_REGULARLY_ASYNC]() {
        const suffix =
            this.articles.length > 0
                ? this.articles[this.articles.length - 1].publish_time
                : undefined;
        const { code, message, info } = await request.getArticleRegular(suffix);
        if (code === 0) {
            this.context.commit(PUSH_ARTICLE, info);
            return info.length === 0;
        }
        throw Error(message);
    }
}
