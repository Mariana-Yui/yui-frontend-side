import Vue from 'vue';
import Vuex from 'vuex';
import user from './module/user';
import music from './module/music';
import article from './module/article';
import loading from './module/loading';
import qiniu from './module/qiniu';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        music,
        article,
        loading,
        qiniu
    }
});
