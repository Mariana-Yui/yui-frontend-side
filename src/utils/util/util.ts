import moment from 'moment/moment';

export class Utils {
    // 记得revokeObjectURL
    public arrayBufferToBlob(arraybuffer: ArrayBuffer): string {
        const blob = new Blob([arraybuffer]);
        const url = window.URL.createObjectURL(blob);
        return url;
    }
    public fileToBlob(file: File, needUrl = true): string | Blob {
        const blob = new Blob([file]);
        if (needUrl) {
            const url = window.URL.createObjectURL(blob);
            return url;
        } else {
            return blob;
        }
    }
    private _setItem(key: string, val: any): void {
        // 简单判断是否是原始类型
        if (val == null || typeof val === 'function') {
            // eslint-disable-next-line quotes
            throw new Error("can't set item which is undefined or null");
        } else if (typeof val === 'object') {
            window.localStorage.setItem(key, JSON.stringify(val));
        } else {
            window.localStorage.setItem(key, val);
        }
    }
    public setItem(key: string | Record<string, any>, val?: any): void {
        if (typeof key === 'string') {
            this._setItem(key, val);
        } else {
            for (const [k, v] of Object.entries(key)) {
                this._setItem(String(k), v);
            }
        }
    }
    public getItem(key: string): any {
        // 不再判断空值, function
        const value = window.localStorage.getItem(key) as string;
        try {
            return JSON.parse(value);
        } catch (err) {
            return value;
        }
    }
    public removeItem(...keys: string[]): void {
        keys.forEach((k: string) => {
            window.localStorage.removeItem(k);
        });
    }
    public getRandomUploadName(suffix = 'jpg') {
        const date = moment().format('YYYY/MM/DD/');
        const random = Math.random()
            .toString(16)
            .slice(2);
        return 'yui-' + date + random + `.${suffix}`;
    }
    public isPlainObject(obj: any) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
}

const utils = new Utils();

export default utils;
