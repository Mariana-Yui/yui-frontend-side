import { VueConstructor } from 'vue';
import rule from './rule';

export * from './rule';
export default {
    install(Vue: VueConstructor, options: any) {
        Vue.prototype.$rule = rule;
    }
};
