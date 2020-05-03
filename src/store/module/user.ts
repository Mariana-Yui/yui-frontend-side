import { VuexModule, Mutation, Action, Module } from 'vuex-module-decorators';
import { GET_LOGIN_STATUS } from '../types';

@Module({
    name: 'user',
    namespaced: true
})
export default class UserModule extends VuexModule {
    _id = '';
    userInfo: any = {};
    token = '';

    @Mutation
    public [GET_LOGIN_STATUS]() {
        if (this._id && this.userInfo.length > 0 && this.token) {
            return true;
        }
        return false;
    }
}
