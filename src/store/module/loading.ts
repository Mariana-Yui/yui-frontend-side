import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {
    TOGGLE_LOADING_ANIMATION,
    TRUIFY_LOADING_ANIMATION,
    FALSIFY_LOADING_ANIMATION
} from '../types';

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
    @Mutation
    public [TRUIFY_LOADING_ANIMATION]() {
        this.show = true;
    }
    @Mutation
    public [FALSIFY_LOADING_ANIMATION]() {
        this.show = false;
    }
}
