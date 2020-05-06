/* eslint-disable no-useless-escape */
interface FormRule {
    pattern: RegExp;
    message: string;
}

export class Rule {
    public username!: FormRule;
    public password!: FormRule;
    public email!: FormRule;

    public constructor() {
        this.username = {
            pattern: /^([\u4e00-\u9fa5]+|[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*|([a-zA-Z]+\s?)+|[a-zA-Z]+(·[a-zA-Z]+)*)$/,
            message: '用户名只能包含纯英文或中文'
        };
        this.password = {
            pattern: /^[\w_]{6,16}$/,
            message: '密码长度需6-16位且只包含字母,数字,_'
        };
        this.email = {
            pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            message: '邮箱格式错误'
        };
    }
    public validator(form: Record<string, any>, cb: (pass: boolean) => void) {
        let pass = true;
        for (const key in form) {
            if ((this as any)[key] == null) {
                throw Error(`无法对${key}进行规则校检`);
            }
            if (!(this as any)[key]['pattern'].test(form[key])) {
                pass = false;
                break;
            }
        }
        cb(pass);
    }
}

const rule = new Rule();

export default rule;
