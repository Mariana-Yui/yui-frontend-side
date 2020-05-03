import { VueConstructor } from 'vue';
import util from './util';

export * from './util';

export default {
    install(Vue: VueConstructor, options: any) {
        Vue.prototype.$util = util;
    }
};
