import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import CryptoJS from 'crypto-js';
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
    /********************************SPACE/ME********************************************/
    public async getToken(email?: string, password?: string) {
        const { data } = await this.instance.post('/app/me/login', {
            email,
            password: password ? CryptoJS.MD5(password, config.secret_key).toString() : undefined
        });
        return data;
    }
    public async getUserDetails(id: string) {
        const { data } = await this.instance.post('/app/space/getUserDetails', {
            id,
            noauth: 1
        });
        return data;
    }
    public async checkSubscribe(id: string, following: string) {
        const { data } = await this.instance.get('/app/space/checkSubscribe', {
            params: {
                id,
                following,
                noauth: 1
            }
        });
        return data;
    }
    /********************************COLLECTION********************************************/
    public async getTypedArticleCollection(type: string, id: string) {
        const { data } = await this.instance.post('/app/collection/getTypedArticleCollection', {
            type,
            id,
            noauth: 1
        });
        return data;
    }
    public async collectArticle(id: string, article_id: string, type: string) {
        const { data } = await this.instance.post('/app/collection/collectArticle', {
            id,
            article_id,
            type
        });
        return data;
    }
    public async removeCollectArticle(id: string, article_id: string, type: string) {
        const { data } = await this.instance.post('/app/collection/removeCollectArticle', {
            id,
            article_id,
            type
        });
        return data;
    }
}

const request = new Request();

export default request;
