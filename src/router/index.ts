import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

const All = () => import('@/pages/all/index.vue');
const Yui = () => import('@/pages/yui/index.vue');
const Guide = () => import('@/pages/login/guide.vue');
const Login = () => import('@/pages/login/index.vue');
const Register = () => import('@/pages/register/index.vue');
const Step1 = () => import('@/pages/register/step1.vue');
const Step2 = () => import('@/pages/register/step2.vue');
const UserSpace = () => import('@/pages/space/index.vue');
const Profile = () => import('@/pages/profile/index.vue');
const Collection = () => import('@/pages/space/collection.vue');
const Search = () => import('@/pages/search/index.vue');
const Article = () => import('@/pages/article/index.vue');
const NotFound = () => import('@/pages/404/index.vue');

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
                component: UserSpace,
                meta: {
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: '/guide',
        name: 'Guide',
        component: Guide
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        children: [
            {
                path: 'step1',
                name: 'RegisterStep1',
                component: Step1
            },
            {
                path: 'step2',
                name: 'RegisterStep2',
                component: Step2
            }
        ]
    },
    {
        path: '/space/:id',
        name: 'UserSpace',
        component: UserSpace
    },
    {
        path: '/collection/:id',
        name: 'SpaceCollection',
        component: Collection,
        meta: {
            exclude: true
        }
    },
    {
        path: '/profile',
        name: 'UserProfile',
        component: Profile,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
        meta: {
            exclude: true
        }
    },
    {
        path: '/article',
        name: 'Article',
        component: Article,
        meta: {
            exclude: true
        }
    },
    {
        path: '*',
        name: '404',
        component: NotFound
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, position) {
        return { x: 0, y: 0 };
    }
});

export default router;
