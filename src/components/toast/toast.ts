import ToastComponent from './toast.vue';
import Vue from 'vue';

let showing = false;
const ToastConstructor = Vue.extend(ToastComponent);

const instanceFactory = () => {
    const toast = new ToastConstructor({
        el: document.createElement('div')
    });
    // 添加dom元素到文档中
    document.body.appendChild(toast.$el);
    return toast;
};

const ToastFactory = (content: string, type = 'info', duration = 1500) => {
    // debounce
    if (!showing) {
        showing = true;
        const instance: any = instanceFactory();
        instance.show = true;
        instance.content = content;
        instance.type = type;
        instance.duration = duration;

        setTimeout(() => {
            showing = false;
            instance.$data.show = false;
        }, duration);
    }
};

export default ToastFactory;
