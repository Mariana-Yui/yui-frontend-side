import router from './index';

router.beforeEach((to, from, next) => {
    next();
});

router.afterEach((to, from) => {});

export default router;
