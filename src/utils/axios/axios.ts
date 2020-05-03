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
                    router.replace({ path: '/login' });
                }
                return Promise.reject(error);
            }
        );
    }
}

const request = new Request();

export default request;
