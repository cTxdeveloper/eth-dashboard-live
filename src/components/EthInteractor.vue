<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEthStore } from '../stores/useEthStore';
import DataCard from './DataCard.vue';
import SkeletonCard from './SkeletonCard.vue';
import AnimatedNumber from './AnimatedNumber.vue';
const store = useEthStore();
const ethAmount = ref(1);
const usdValue = computed(() => (store.price ? store.price * ethAmount.value : 0));
</script>
<template>
  <SkeletonCard v-if="store.isLoading" heightClass="h-44" />
  <DataCard v-else class="animate-enter">
    <header class="pb-3 border-b border-border">
      <p class="text-sm font-medium text-text-muted">ETH / USD</p>
      <p class="font-mono text-5xl font-bold mt-2 text-text-base">
        <span class="text-text-muted/70">$</span>
        <AnimatedNumber :value="store.price || 0" :fraction-digits="2" />
      </p>
    </header>
    <main class="mt-4">
       <p class="text-sm font-medium text-text-muted">Converter</p>
      <div class="mt-2 flex items-center gap-4">
        <!-- The 'hide-spinners' class is correctly applied here -->
        <input 
          type="number" 
          v-model.number="ethAmount" 
          class="hide-spinners w-full text-lg font-mono p-2 rounded-md bg-bg border border-border focus:outline-none focus:ring-2 focus:ring-text-accent" 
        />
        <span class="text-2xl text-text-muted">=</span>
        <div class="w-full text-lg font-mono font-bold text-right p-2 text-text-accent">$<AnimatedNumber :value="usdValue" :fraction-digits="2" /></div>
      </div>
    </main>
  </DataCard>
</template>