<script setup lang="ts">
import { computed } from 'vue';
import { clsx } from 'clsx';
const props = defineProps({
  heightClass: { type: String, default: 'h-24' }
});
const cardClasses = computed(() => clsx('bg-background-secondary/50 p-4 rounded-xl animate-pulse', props.heightClass));
</script>
<template>
  <div :class="cardClasses"></div>
</template>