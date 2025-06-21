<script setup lang="ts">
import { useEthStore } from '../stores/useEthStore';
import Icon from './Icon.vue';
const store = useEthStore();
</script>
<template>
  <button @click="store.toggleTheme" class="p-2 rounded-full bg-background-secondary/50 border border-stroke-primary text-copy-muted hover:text-copy-base transition-colors">
    <Icon v-if="store.theme === 'dark'" name="sun" class="h-5 w-5" />
    <Icon v-else name="moon" class="h-5 w-5" />
  </button>
</template>