import { VueConstructor } from 'vue';
import imageClipper from './index.vue';

export default {
    install(Vue: VueConstructor) {
        Vue.component(imageClipper.name, imageClipper);
    }
};
