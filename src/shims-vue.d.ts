import Vue from 'vue';
import { Request } from '@/utils/axios';
import { Utils } from '@/utils/util';
import { Rule } from '@/utils/rule';
import { Toast } from '@/components/toast';
import { Prompt } from '@/components/prompt';

declare module '*.vue' {
    export default Vue;
}

declare module 'vue/types/vue' {
    interface Vue {
        $axios: Request;
        $util: Utils;
        $rule: Rule;
        $toast: Toast;
        $prompt: Prompt;
    }
}
