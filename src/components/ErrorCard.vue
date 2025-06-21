<script setup lang="ts">
import DataCard from './DataCard.vue';
import Icon from './Icon.vue';
defineProps<{ message: string }>();
const emit = defineEmits(['retry']);
</script>
<template>
  <DataCard>
    <div class="text-center p-4">
      <Icon name="warning" class="mx-auto h-12 w-12 text-red-400" />
      <h3 class="mt-2 text-lg font-bold text-text-base">An Error Occurred</h3>
      <p class="mt-1 text-sm text-text-muted">{{ message }}</p>
      <button @click="emit('retry')" class="btn-primary mt-6">Try Again</button>
    </div>
  </DataCard>
</template>