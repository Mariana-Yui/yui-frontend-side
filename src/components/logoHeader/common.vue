<template>
    <div class="common-header">
        <i class="iconfont" @click="handleGoToBack">&#xe641;</i>
        {{ title }}
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CommonHeader extends Vue {
    @Prop() title!: string;

    public handleGoToBack() {
        this.$router.go(-1);
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/default.scss';

.common-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: $white;
    text-align: center;
    color: $black;
    font-size: $smaller-fontsize;
    font-weight: 600;
    i.iconfont {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: $larger-fontsize;
    }
}
</style>
