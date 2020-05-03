import Vue from 'vue';
import { focus } from 'vue-focus';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/permission';
import store from './store';
import axios from '@/utils/axios';
import util from '@/utils/util';
import '@/assets/css/index.scss';
import '@/assets/ts/postcss';

Vue.config.productionTip = false;

Vue.directive('focus', focus);
Vue.use(axios).use(util);

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
