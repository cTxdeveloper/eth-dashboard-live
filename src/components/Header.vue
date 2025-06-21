<script setup lang="ts">
import { onMounted } from 'vue';
import { useEthStore } from '../stores/useEthStore';
import ThemeSwitcher from './ThemeSwitcher.vue';
import Icon from './Icon.vue';

const store = useEthStore();

onMounted(() => {
    store.fetchData();
    setInterval(() => store.fetchData(), 30000); // Auto-refresh every 30s
});
</script>
<template>
  <header class="flex justify-between items-center pb-6 border-b border-stroke-primary/50">
    <div class="flex items-center gap-3">
        <img src="/logo.svg" alt="ETH Logo" class="h-8 w-8">
        <h1 class="text-2xl font-bold text-copy-base">
            Helios ETH
        </h1>
    </div>
    <div class="flex items-center gap-4">
        <div v-if="store.lastUpdated && !store.isLoading" class="hidden sm:flex items-center gap-2 text-xs text-copy-muted animate-enter">
            <div class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Updated: {{ store.lastUpdated }}</span>
        </div>
        <button @click="store.fetchData(true)" :disabled="store.isManualRefresh" class="p-2 rounded-full text-copy-muted hover:text-copy-base hover:bg-background-secondary/50 transition-all active:scale-90 disabled:cursor-not-allowed">
            <Icon name="refresh" class="h-5 w-5" :class="{'animate-spin': store.isManualRefresh}" />
        </button>
        <ThemeSwitcher />
    </div>
  </header>
</template>