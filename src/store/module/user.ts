import { VuexModule, Mutation, Action, Module } from 'vuex-module-decorators';
import { GET_LOGIN_STATUS, WRITE_INFO_INTO_LOCAL, LOGIN, LOGOUT } from '../types';
import request from '@/utils/axios/axios';
import utils from '@/utils/util/util';

interface User {
    _id: string;
    token: string;
}
@Module({
    name: 'user',
    namespaced: true
})
export default class UserModule extends VuexModule {
    _id = '';
    token = '';
    // 不再将userInfo写入vuex和localStorage, 不合理且操作逻辑也复杂

    get loginStatus() {
        if ((this._id || utils.getItem('_id')) && (this.token || utils.getItem('token'))) {
            return true;
        }
        return false;
    }
    @Mutation
    public [LOGOUT]() {
        this._id = '';
        this.token = '';
        utils.removeItem('_id', 'token');
    }
    @Mutation
    public [WRITE_INFO_INTO_LOCAL](info: User) {
        const { _id, token } = info;
        this._id = _id;
        this.token = token;
        utils.setItem({ _id, token });
    }
    @Action
    public async [LOGIN](account: { email: string; password: string }) {
        const { email, password } = account;
        const { code, message, info } = await request.getToken(email, password);
        if (code === 0) {
            // 登录上报
            request.reportLocation(info._id);
            this.context.commit(WRITE_INFO_INTO_LOCAL, info);
        }
        return { code, message };
    }
}
