import Vue from 'vue';
import { Request } from '@/utils/axios';
import { Utils } from '@/utils/util';

declare module '*.vue' {
    export default Vue;
}

declare module 'vue/types/vue' {
    interface Vue {
        $axios: Request;
        $util: Utils;
    }
}
