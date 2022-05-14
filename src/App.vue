<script setup lang="ts">
import 'vfonts/Lato.css'
import { RouterView } from 'vue-router'
</script>

<template>
    <n-message-provider>
        <RouterView />
    </n-message-provider>
</template>

<style>
#app {
    height: 100vh;
    font-family: v-sans, v-mono, other-fallbacks;
}
</style>
