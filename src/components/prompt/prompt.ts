import Vue from 'vue';
import PromptComponent from './prompt.vue';

const showing = false;
const PromptConstructor = Vue.extend(PromptComponent);

const instanceFactory = () => {
    const prompt = new PromptConstructor({
        el: document.createElement('div')
    });
    document.body.appendChild(prompt.$el);
    return prompt;
};

const PromptFactory = (options: any, resolve: (val: string | Record<string, string>) => void) => {
    const instance = instanceFactory() as any;
    instance.dialogVisible = true;
    instance.options.title = options.title || '';
    instance.options.type = options.type || '';
    instance.options.value = options.value || '';
    instance.options.confirmText = options.confirmText || '确定';
    instance.options.bgColor = options.bgColor || 'rgba(0, 0, 0, 0.3)';
    instance.handleConfirm = resolve;
};

export default PromptFactory;
