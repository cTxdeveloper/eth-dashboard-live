<script setup lang="ts">
import { computed } from 'vue';
import type { IconName } from '../types';

const props = defineProps<{
  name: IconName;
  class?: string;
}>();

const iconData = computed(() => {
  switch (props.name) {
    case 'turtle': return { path: 'M13.72 2.72a2.5 2.5 0 0 1 3.56 3.56l-2 2H19a2 2 0 0 1 2 2v2.5a2.5 2.5 0 0 1-4.78 1.22l-1.44-1.44a2.5 2.5 0 0 1-3.56-3.56l2-2zM10.28 21.28a2.5 2.5 0 0 1-3.56-3.56l2-2H5a2 2 0 0 1-2-2v-2.5a2.5 2.5 0 0 1 4.78-1.22l1.44 1.44a2.5 2.5 0 0 1 3.56 3.56l-2 2z' };
    case 'walk': return { path: 'M12 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3 15 3-6 3 6M6 8l6 2 6-2m-6 2v6' };
    case 'rocket': return { path: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.05-.64-.75-2.21-.8-3.05-.05Zm7.5-1.5-3-3a2.25 2.25 0 0 1 0-3.18l3-3a2.25 2.25 0 0 1 3.18 0l3 3a2.25 2.25 0 0 1 0 3.18l-3 3a2.25 2.25 0 0 1-3.18 0ZM12 15l3 3m-9 3 6-6' };
    case 'refresh': return { path: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8m0-5v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16m0 5v-5h5' };
    case 'sun': return { path: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z' };
    case 'moon': return { path: 'M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z' };
    case 'warning': return { path: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' };
    default: return { path: '' };
  }
});
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="props.class">
    <path :d="iconData.path" />
  </svg>
</template>