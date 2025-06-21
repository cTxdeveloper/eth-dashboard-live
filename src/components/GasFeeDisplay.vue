<script setup lang="ts">
import { useEthStore } from '../stores/useEthStore';
import DataCard from './DataCard.vue';
import SkeletonCard from './SkeletonCard.vue';
import Icon from './Icon.vue';
import AnimatedNumber from './AnimatedNumber.vue';
import type { GasTiers } from '../types';
const store = useEthStore();
const emit = defineEmits<{ (e: 'showDetails', tier: GasTiers): void }>();
</script>
<template>
  <div class="space-y-4">
    <h2 class="px-2 text-sm font-bold text-text-muted uppercase tracking-wider">Gas Oracle</h2>
    <SkeletonCard v-if="store.isLoading" v-for="i in 3" :key="i" heightClass="h-20" />
    <div v-else-if="!store.gas" class="animate-enter">
        <DataCard>
            <p class="text-center text-red-500 font-medium">Gas Data Unavailable</p>
        </DataCard>
    </div>
    <DataCard v-else v-for="(tier, index) in store.gasTiers" :key="tier.name" class="animate-enter" :style="{ 'animation-delay': `${(index + 2) * 100}ms` }">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-bg text-text-accent">
             <Icon :name="tier.icon" />
          </div>
          <div>
            <p class="font-medium text-text-base">{{ tier.name }}</p>
            <button @click="emit('showDetails', tier)" class="text-xs text-text-accent hover:underline">Details</button>
          </div>
        </div>
        <p class="font-mono text-2xl text-text-base">
          <AnimatedNumber :value="tier.gwei" :fraction-digits="0" />
          <span class="text-lg text-text-muted"> gwei</span>
        </p>
      </div>
    </DataCard>
  </div>
</template>