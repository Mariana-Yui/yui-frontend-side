<template>
    <transition name="fade-toast">
        <div class="toast-wrapper" v-if="show">
            <div class="toast" :class="position" :style="color">
                {{ content }}
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Toast extends Vue {
    private content = '';
    private duration = 1500;
    private position = 'top';
    private show = false;
    private type = 'info';
    private color!: { 'background-color': string; 'border': string; 'color': string };

    @Watch('type', { immediate: true })
    onTypeChanged(val: string) {
        switch (this.type) {
            case 'info': {
                this.color = {
                    'background-color': '#edf2fc',
                    'border': '1px solid #ebeef5',
                    'color': '#909399'
                };
                break;
            }
            case 'success': {
                this.color = {
                    'background-color': '#f0f9eb',
                    'border': '1px solid #e1f3d8',
                    'color': '#67c23a'
                };
                break;
            }
            case 'warning': {
                this.color = {
                    'background-color': '#fdf6ec',
                    'border': '1px solid #faecd8',
                    'color': '#e6a23c'
                };
                break;
            }
            case 'error': {
                this.color = {
                    'background-color': '#fef0f0',
                    'border': '1px solid #fde2e2',
                    'color': '#f56c6c'
                };
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';
/* top 不行quq */
.fade-toast-enter,
.fade-toast-leave-to {
    opacity: 0;
    transform: translateY(-100px);
}
.fade-toast-enter-active,
.fade-toast-leave-active {
    transition: all 0.4s ease;
}

.toast-wrapper {
    position: fixed;
    width: 100%;
    height: auto;
    top: 50px;
    left: 0;
    display: flex;
    justify-content: center;
    z-index: 99999;
    .toast {
        width: 40%;
        padding: 10px 15px;
        font-size: $smaller-fontsize;
        word-break: break-all;
        word-wrap: break-word;
        white-space: normal;
        border-radius: 4px;
    }
}
</style>
