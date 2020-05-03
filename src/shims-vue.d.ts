import Vue from 'vue';
import { Request } from '@/utils/axios';
import { Utils } from '@/utils/util';
import { Toast } from '@/components/toast';

declare module '*.vue' {
    export default Vue;
}

declare module 'vue/types/vue' {
    interface Vue {
        $axios: Request;
        $util: Utils;
        $toast: Toast;
    }
}
