<template>
    <div id="all">
        <logo-header></logo-header>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LogoHeader from '@/components/logoHeader/index.vue';

@Component({
    components: {
        LogoHeader
    }
})
export default class ALL extends Vue {}
</script>
<style lang="scss" scoped></style>
