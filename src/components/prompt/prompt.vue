<template>
    <transition name="fade-dialog">
        <div
            class="prompt-wrapper"
            v-if="dialogVisible"
            @click="handleCloseDialog"
            :style="{ 'background-color': options.bgColor }"
        >
            <div class="prompt-dialog" ref="dialog">
                <template v-if="options.type !== 'password'">
                    <span class="title">{{ options.title }}</span>
                    <input v-model="options.value" type="text" class="last" />
                </template>
                <template v-else>
                    <span class="old-password">旧密码</span>
                    <input v-model="options.password.oldPassword" type="password" />
                    <span class="new-password">新密码</span>
                    <input v-model="options.password.newPassword" type="password" class="last" />
                </template>
                <span class="confirm-button" @click.stop="confirm">
                    {{ options.confirmText }}
                </span>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Prompt extends Vue {
    private dialogVisible = false;
    private options = {
        title: '',
        type: '',
        value: '',
        password: {
            oldPassword: '',
            newPassword: ''
        },
        confirmText: '',
        bgColor: ''
    };

    public async confirm() {
        try {
            if (this.options.type === 'password') {
                await this.handleConfirm(this.options.password);
            } else {
                await this.handleConfirm(this.options.value);
            }
        } catch (error) {}
        this.dialogVisible = false;
    }
    public handleConfirm(value: string | Record<string, string>) {}
    public handleCloseDialog(event: Event) {
        const dialogDOM = this.$refs['dialog'] as HTMLElement;
        const targetDOM = event.target as HTMLElement;
        if (dialogDOM !== targetDOM && !dialogDOM.contains(targetDOM)) {
            this.dialogVisible = false;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';
@import '~@/assets/css/mixin.scss';

.fade-dialog-enter,
.fade-dialog-leave-to {
    opacity: 0.3;
}
.fade-dialog-enter-active,
.fade-dialog-leave-active {
    transition: opacity 0.2s linear;
}

.prompt-wrapper {
    @include forcedCenter();
    z-index: 100;
    .prompt-dialog {
        @include center();
        top: 40%;
        width: 80%;
        box-sizing: border-box;
        padding: 15px 15px 30px;
        font-size: $smaller-fontsize;
        background-color: $white;
        border: 1px solid $light-black;
        border-radius: 4px;
        .title,
        .old-password,
        .new-password {
            display: block;
            font-weight: 600;
            margin-bottom: 10px;
        }
        input {
            border: 1px solid $light-black;
            box-sizing: border-box;
            width: 90%;
            height: 25px;
            margin-bottom: 10px;
            padding-left: 10px;
            background-color: transparent;
            outline-style: none;
            &.last {
                margin-bottom: 30px !important;
            }
        }
        .confirm-button {
            position: absolute;
            bottom: 15px;
            right: 15px;
            padding: 4px;
            border-radius: 1px;
            border: 1px solid $light-black;
        }
    }
}
</style>
