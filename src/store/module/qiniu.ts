import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { SET_UPLOAD_TOKEN, SET_UPLOAD_TOKEN_SYNC, ERASER_UPLOAD_TOKEN } from '../types';
import utils from '@/utils/util/util';
import request from '@/utils/axios/axios';

@Module({
    name: 'qiniu',
    namespaced: true
})
export default class QiniuModule extends VuexModule {
    uptoken = '';

    @Mutation
    public [SET_UPLOAD_TOKEN_SYNC](info: { domain: string; upToken: string }) {
        this.uptoken = info.upToken;
        utils.setItem('uptoken', info.upToken);
    }
    @Mutation
    public [ERASER_UPLOAD_TOKEN]() {
        this.uptoken = '';
        utils.removeItem('uptoken');
    }

    @Action
    public async [SET_UPLOAD_TOKEN]() {
        const info = await request.getUpToken();
        console.log(info);
        if (info) {
            this.context.commit(SET_UPLOAD_TOKEN_SYNC, info);
        }
    }
}
