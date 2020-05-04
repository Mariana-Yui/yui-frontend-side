import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { TOGGLE_LOADING_ANIMATION } from '../types';

@Module({
    name: 'loading',
    namespaced: true
})
export default class ArticleModule extends VuexModule {
    show = false;

    @Mutation
    public [TOGGLE_LOADING_ANIMATION]() {
        this.show = !this.show;
    }
}
