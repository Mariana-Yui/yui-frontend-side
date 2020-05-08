import router from './index';
import util from '@/utils/util/util';
import request from '@/utils/axios/axios';

router.beforeEach(async (to, from, next) => {
    console.log(to, from);
    const token = util.getItem('token');
    // 需要登录
    if (to.matched.some((record: { meta: { requireAuth: boolean } }) => record.meta.requireAuth)) {
        if (token != null) {
            if (from.path !== '/login') {
                try {
                    const { code, message } = await request.getToken();
                    next();
                } catch (error) {
                    console.log(error);
                    next({ path: '/guide', replace: true });
                }
            } else {
                next();
            }
        } else {
            next({ path: '/guide', replace: true });
        }
    } else {
        if (to.path === '/guide') {
            if (token != null) {
                try {
                    const { code, message } = await request.getToken();
                    next({ path: '/me', replace: true });
                } catch (error) {
                    console.log(error);
                    next();
                }
            } else {
                next();
            }
        } else {
            next();
        }
    }
});

router.afterEach((to, from) => {});

export default router;
