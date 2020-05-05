import Vue from 'vue';
import { focus } from 'vue-focus';
import VueScroller from 'vue-scroller';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/permission';
import store from './store';
import axios from '@/utils/axios';
import util from '@/utils/util';
import toast from '@/components/toast';
import '@/assets/css/index.scss';
import '@/assets/ts/postcss';

Vue.config.productionTip = false;

Vue.directive('focus', focus);
Vue.use(axios)
    .use(util)
    .use(toast)
    .use(VueScroller);

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
