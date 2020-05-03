import { VueConstructor } from 'vue';
import request from './axios';

export * from './axios';

export default {
    install(Vue: VueConstructor, options: any) {
        Vue.prototype.$axios = request;
    }
};
