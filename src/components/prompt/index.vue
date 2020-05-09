<template>
    <transition name="fade-dialog">
        <div
            class="prompt-wrapper"
            v-if="dialogVisible"
            @click="handleCloseDialog"
            :style="{ 'background-color': bgColor }"
        >
            <div class="prompt-dialog" ref="dialog">
                <template v-if="options.type !== 'password'">
                    <span class="title">{{ options.title }}</span>
                    <input v-model="options.input" type="text" />
                </template>
                <template v-else>
                    <span class="old-password">旧密码</span>
                    <input v-model="options.oldPassword" type="password" />
                    <span class="new-password">新密码</span>
                    <input v-model="options.newPassword" type="password" />
                </template>
                <div class="confirm-button" @click.stop="handleConfirm">
                    {{ options.confirmText }}
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Prompt extends Vue {
    private dialogVisible = true;
    private options = {
        title: '',
        type: '',
        input: '',
        oldPassword: '',
        newPassword: '',
        confirmText: '',
        bgColor: ''
    };

    public handleConfirm() {}
    public handleCloseDialog(event: Event) {
        const dialogDOM = this.$refs['dialog'] as HTMLElement;
        const targetDOM = event.target as HTMLElement;
        if (dialogDOM !== targetDOM && !dialogDOM.contains(targetDOM)) {
            this.dialogVisible = true;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';
@import '~@/assets/css/mixin.scss';

.prompt-wrapper {
    @include forcedCenter();
    z-index: 100;
    .prompt-dialog {
        @include center();
    }
}
</style>
