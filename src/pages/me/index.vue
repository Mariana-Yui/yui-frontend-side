<template>
    <div class="me">
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
export default class ME extends Vue {}
</script>
<style lang="scss" scoped></style>
