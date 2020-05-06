import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import config from '@/config/config.defaults';
import utils from '../util/util';
import router from '@/router/permission';

export class Request {
    private instance: AxiosInstance;

    public constructor() {
        this.instance = axios.create({
            baseURL: config.baseUrl,
            withCredentials: true
        });
        this.instance.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        this.instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                const token = utils.getItem('token');
                if (token) {
                    config.headers['Authorization'] = `bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
        this.instance.interceptors.response.use(
            (res: AxiosResponse) => res,
            (error: AxiosError) => {
                if (error.response && error.response.status === 401) {
                    utils.removeItem('_id', 'userInfo', 'token');
                    router.replace({ path: '/guide', query: { redirect: error.config.url } });
                }
                return Promise.reject(error);
            }
        );
    }
    /********************************ALL********************************************/
    // 轮播图
    public async getBannerInfo() {
        const { data } = await this.instance.get('/app/all/getBannerInfo', {
            params: { noauth: 1 }
        });
        return data;
    }
    // top view
    public async getTopViewArticles() {
        const { data } = await this.instance.get('/app/all/getTopViewArticles', {
            params: { noauth: 1 }
        });
        return data;
    }
    /********************************YUI********************************************/
    public async getArticleRegular(suffix: Date | undefined) {
        const { data } = await this.instance.post('/app/yui/getArticleRegular', {
            noauth: 1,
            suffix
        });
        return data;
    }
    public async getLatestArticle(prefix: Date) {
        const { data } = await this.instance.post('/app/yui/getLatestArticle', {
            noauth: 1,
            prefix
        });
        return data;
    }
    /********************************ME********************************************/
    public async testToken(username?: string, password?: string) {
        const { data } = await this.instance.post('/app/me/loginStatus', { username, password });
        return data;
    }
}

const request = new Request();

export default request;
