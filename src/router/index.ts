import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

const All = () => import('@/pages/all/index.vue');
const Yui = () => import('@/pages/yui/index.vue');
const Me = () => import('@/pages/me/index.vue');

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: {
            name: 'All'
        },
        children: [
            {
                path: '/all',
                name: 'All',
                component: All
            },
            {
                path: '/yui',
                name: 'Yui',
                component: Yui
            },
            {
                path: '/me',
                name: 'Me',
                component: Me
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
