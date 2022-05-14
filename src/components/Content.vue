<script setup lang="ts">
import { reactive } from 'vue'
import InvitationModal from './InvitationModal.vue'

const topText: string = 'A better way'
const bottomText: string = 'to enjoy every day.'
const moreText: string = 'Be the first to know when we launch.'
const btnText: string = 'Request an Invitation'
const state = reactive({ showModal: false })

function onClickBtn() {
    toggleModal()
}

function toggleModal() {
    state.showModal = !state.showModal
}
</script>

<template>
    <div class="content">
        <div class="title">{{ topText }}</div>
        <div class="title">{{ bottomText }}</div>
        <div class="more-info">{{ moreText }}</div>
        <div>
            <n-button strong secondary @click="onClickBtn">{{ btnText }}</n-button>
        </div>
        <InvitationModal :show-modal="state.showModal" @close="toggleModal" />
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
