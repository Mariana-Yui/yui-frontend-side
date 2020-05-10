import Vue from 'vue';
import Vuex from 'vuex';
import user from './module/user';
import music from './module/music';
import article from './module/article';
import loading from './module/loading';
import qiniu from './module/qiniu';

Vue.use(Vuex);
// state.[moduleName].[variable]访问模块变量
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
