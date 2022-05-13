<script setup lang="ts">
import Content from '@/components/Content.vue'
import { NSpace, NLayout, NLayoutHeader, NLayoutFooter } from 'naive-ui'

const corpName = 'BROCCOLI & CO.'
const authorInfo = 'Made with love in Shanghai'
const bottomInfo = '@2022 Broccoli & Co. All rights reserved.'
</script>

<template>
    <div class="home-page">
        <n-layout-header class="home-page__header">
            {{ corpName }}
        </n-layout-header>
        <Content class="home-page__content" />
        <n-layout-footer class="home-page__footer">
            <div>{{ authorInfo }}</div>
            <div>{{ bottomInfo }}</div>
        </n-layout-footer>
    </div>
</template>

<style scoped lang="scss">
.home-page {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    font-weight: bold;
    &__content {
        flex: 1 1 auto;
    }
    &__header {
        background: $yellow;
        padding: 24px;
        font-weight: 600;
    }
    &__footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: $yellow;
        padding: 18px;
        font-size: 12px;
    }
}
</style>
