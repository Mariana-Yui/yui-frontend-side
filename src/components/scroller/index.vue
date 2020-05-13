<template>
    <scroller
        ref="scroller"
        :on-refresh="emitRefresh"
        :on-infinite="emitInfinite"
        noDataText="没有更多文章"
    >
        <template v-slot:refresh-spinner>
            <loading-wave></loading-wave>
        </template>
        <template v-slot:default>
            <slot></slot>
        </template>
        <template v-slot:infinite-spinner>
            <loading-wave class="js-wave"></loading-wave>
        </template>
    </scroller>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import LoadingWave from '../loading/wave.vue';

@Component({
    components: {
        LoadingWave
    }
})
export default class VueScroller extends Vue {
    public emitRefresh() {
        this.$emit('refresh');
    }
    public emitInfinite() {
        this.$emit('infinite');
    }
}
</script>
<style lang="scss" scoped>
::v-deep .spinner-holder {
    display: inline-block;
}
::v-deep .sk-wave {
    margin-top: 15px;
}
</style>
