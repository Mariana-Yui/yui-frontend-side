import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import CryptoJS from 'crypto-js';
import * as qiniu from 'qiniu-js';
import { filterXSS } from 'xss';
import publicIP from 'public-ip';
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
                    router.push({ path: '/guide', query: { redirect: error.config.url } });
                }
                return Promise.reject(error);
            }
        );
    }
    /********************************NETEASE********************************************/
    public async getNetEaseVIPCookie() {
        await this.instance.get('/app/me/music/getNetEaseVIPCookie', { params: { noauth: 1 } });
    }
    public async getNewMusicUrl(id: string) {
        const { data } = await this.instance.get('/app/me/music/getNewMusicUrl', {
            params: { id }
        });
        return data;
    }
    public async updateMusicUrls(id: string, music_info: any) {
        const { data } = await this.instance.post('/app/me/music/updateMusicUrls', {
            id,
            music_info,
            noauth: 1
        });
        return data;
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
        try {
            const { data } = await this.instance.post('/app/me/login', {
                email,
                password: password
                    ? CryptoJS.MD5(password, config.secret_key).toString()
                    : undefined
            });
            return data;
        } catch (error) {
            console.log(error.message);
        }
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
    /********************************COLLECTION/LIKE********************************************/
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
    public async likeArticle(id: string, article_id: string, type: string) {
        const { data } = await this.instance.post('/app/me/likeArticle', {
            id,
            article_id,
            type
        });
        return data;
    }
    public async removeLikeArticle(id: string, article_id: string, type: string) {
        const { data } = await this.instance.post('/app/me/removeLikeArticle', {
            id,
            article_id,
            type
        });
        return data;
    }
    /********************************PROFILE********************************************/
    public async getUserInfo(id: string) {
        const { data } = await this.instance.post('/app/me/profile/getUserInfo', {
            id
        });
        return data;
    }
    public async updateUserInfo(user: Record<string, any>) {
        const { data } = await this.instance.post('/app/me/profile/updateUserInfo', user);
        return data;
    }
    public async checkPassword(username: string, password: string) {
        const { data } = await this.instance.post('/app/me/profile/checkPassword', {
            username,
            password: CryptoJS.MD5(password, config.secret_key).toString()
        });
        return data;
    }
    public async updatePassword(username: string, password: string) {
        const { data } = await this.instance.post('/app/me/profile/updatePassword', {
            username,
            password: CryptoJS.MD5(password, config.secret_key).toString()
        });
        return data;
    }
    /********************************QINIU********************************************/
    public async getUpToken() {
        const { data } = await this.instance.get('/qiniu/getUpToken');
        return data;
    }
    public async uploadFile(
        file: Blob,
        key: string,
        token: string,
        putExtra: Record<string, any> = { fname: '', params: {}, mimeType: null },
        config = { useCdnDomain: true }
    ) {
        return new Promise((resolve, reject) => {
            const observer = {
                next: (res: any) => {
                    // console.log(res.total.percent);
                },
                error: (error: any) => {
                    console.log(error.message);
                    reject(error);
                },
                complete: (res: any) => {
                    resolve(res);
                }
            };
            const observable = qiniu.upload(file, key, token, putExtra, config);
            const subscription = observable.subscribe(observer);
        });
    }
    /********************************REGISTER********************************************/
    public async checkUsableEmail(email: string) {
        const { data } = await this.instance.post('/app/me/register/checkUsableEmail', { email });
        return data;
    }
    public async checkUsableUserInfo(
        code: string,
        username: string,
        email: string,
        password: string
    ) {
        const { data } = await this.instance.post('/app/me/register/checkUsableUserInfo', {
            code,
            username,
            email,
            password: CryptoJS.MD5(password, config.secret_key).toString()
        });
        return data;
    }
    /********************************SEARCH********************************************/
    public async getTypedArticles(type: string, size: number, skip: number, keywords?: string) {
        const { data } = await this.instance.post('/app/me/search/getTypedArticles', {
            type,
            size,
            skip,
            keywords,
            noauth: 1
        });
        return data;
    }
    /********************************ARTICLE********************************************/
    public async getArticleContent(id: string) {
        const { data } = await this.instance.post('/app/me/article/getArticleContent', {
            id,
            noauth: 1
        });
        return data;
    }
    public async subscribeAuthor(id: string, author_id: string) {
        const { data } = await this.instance.post('/app/me/article/subscribeAuthor', {
            id,
            author_id
        });
        return data;
    }
    public async removeSubscribeAuthor(id: string, author_id: string) {
        const { data } = await this.instance.post('/app/me/article/removeSubscribeAuthor', {
            id,
            author_id
        });
        return data;
    }
    public async addArticleViews(id: string) {
        const { data } = await this.instance.get('/app/me/article/addArticleViews', {
            params: {
                id,
                noauth: 1
            }
        });
        return data;
    }
    public async publishComment(id: string, article_id: string, comment: string, type: string) {
        const { data } = await this.instance.post('/app/me/article/publishComment', {
            id,
            article_id,
            comment: filterXSS(comment),
            type
        });
        return data;
    }
    public async deleteComment(comment_id: string, article_id: string, type: string) {
        const { data } = await this.instance.post('/app/me/article/deleteComment', {
            comment_id,
            article_id,
            type
        });
        return data;
    }
    public async likeComment(id: string, comment_id: string, type: string) {
        const { data } = await this.instance.post('/app/me/article/likeComment', {
            id,
            comment_id,
            type
        });
        return data;
    }
    public async removeLikeComment(id: string, comment_id: string, type: string) {
        const { data } = await this.instance.post('/app/me/article/removeLikeComment', {
            id,
            comment_id,
            type
        });
        return data;
    }
    /********************************ARTICLE********************************************/
    public async reportLocation(id: string) {
        const ip = await publicIP.v4({ timeout: 5000 });
        await this.instance.get('/app/report/reportLocation', {
            params: {
                ip,
                id
            }
        });
    }
    public async reportViews() {
        await this.instance.get('/app/report/reportViews');
    }
}

const request = new Request();

export default request;
