import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { CHANGE_CURRENT_ARTICLE_TYPE } from '../types';

@Module({
    name: 'article',
    namespaced: true
})
export default class ArticleModule extends VuexModule {
    type = '';

    @Mutation
    public [CHANGE_CURRENT_ARTICLE_TYPE](type: string) {
        this.type = type;
    }
}
