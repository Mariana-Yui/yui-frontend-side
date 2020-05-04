import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
    name: 'qiniu',
    namespaced: true
})
export default class QiniuModule extends VuexModule {}
