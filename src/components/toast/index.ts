import ToastFactory from './toast';
import { VueConstructor } from 'vue';

export type Toast = (content: string, type?: string, duration?: number) => void;

export default {
    install(Vue: VueConstructor, options: any) {
        Vue.prototype.$toast = ToastFactory;
    }
};
