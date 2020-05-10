import { VueConstructor } from 'vue';
import PromptFactory from './prompt';

interface Options {
    title: string;
    type?: string;
    value?: string;
    password?: { oldPassword: string; newPassword: string };
    confirmText?: string;
    bgColor?: string;
}
export type Prompt = (
    options: Options,
    resolve: (val: string | { oldPassword: string; newPassword: string }) => void
) => void;

export default {
    install(Vue: VueConstructor, options: any) {
        Vue.prototype.$prompt = PromptFactory;
    }
};
