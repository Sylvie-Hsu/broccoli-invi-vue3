<script setup lang="ts">
import { NButton } from 'naive-ui'

const topText = 'A better way'
const bottomText = 'to enjoy every day.'
const moreText = 'Be the first to know when we launch.'
const btnText = 'Request an Invitation'
</script>

<template>
    <div class="content">
        <div class="title">{{ topText }}</div>
        <div class="title">{{ bottomText }}</div>
        <div class="more-info">{{ moreText }}</div>
        <div>
            <n-button strong secondary>{{ btnText }}</n-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: $white;
    .title {
        font-size: 40px;
    }
    .more-info {
        font-size: 16px;
        padding: 10px;
    }
}
</style>
