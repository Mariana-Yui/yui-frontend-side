import router from './index';
import util from '@/utils/util/util';
import request from '@/utils/axios/axios';

router.beforeEach(async (to, from, next) => {
    console.log(to, from);
    // 需要登录
    if (to.matched.some((record: { meta: { requireAuth: boolean } }) => record.meta.requireAuth)) {
        const token = util.getItem('token');
        if (token != null) {
            try {
                const { code, message } = await request.testToken();
                next();
            } catch (error) {
                console.log(error);
                next({ path: '/login', replace: true });
            }
        } else {
            next({ path: '/login', replace: true });
        }
    } else {
        next();
    }
});

router.afterEach((to, from) => {});

export default router;
