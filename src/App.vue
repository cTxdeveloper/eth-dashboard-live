<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useEthStore } from './stores/useEthStore';
import Header from './components/Header.vue';
import EthInteractor from './components/EthInteractor.vue';
import GasFeeDisplay from './components/GasFeeDisplay.vue';
import GasInfoModal from './components/GasInfoModal.vue';
import ErrorCard from './components/ErrorCard.vue';
import type { GasTiers } from './types';

const store = useEthStore();
const isModalVisible = ref(false);
const selectedTier = ref<GasTiers | null>(null);

function showGasDetails(tier: GasTiers) {
  selectedTier.value = tier;
  isModalVisible.value = true;
}

// This function now sets global CSS variables for the mouse position
const onMouseMove = (event: MouseEvent) => {
  document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
};

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove);
  store.fetchData();
  setInterval(() => store.fetchData(), 30000);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
});
</script>

<template>
  <div class="relative min-h-screen w-full bg-bg font-sans">
    
    <!-- THE FIX: A dedicated, full-screen container for ALL background effects -->
    <div class="fixed inset-0 z-0 overflow-hidden">
      <!-- Starfield Grid -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_farthest-side,rgb(var(--color-starfield)/0.05)_1px,transparent_1px)] [background-size:2rem_2rem]"></div>
      <!-- Mouse Spotlight -->
      <div 
        class="absolute inset-0"
        :style="{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgb(var(--color-text-accent)/0.15), transparent 80%)`
        }"
      ></div>
    </div>

    <!-- The content now sits cleanly on top in its own container -->
    <div class="relative z-10 container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <Header />
      <main class="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <template v-if="store.error && !store.price && !store.gas">
            <div class="lg:col-span-5 animate-enter">
                <ErrorCard :message="store.error" @retry="store.fetchData(true)" />
            </div>
        </template>
        <template v-else>
            <div class="lg:col-span-3 space-y-8">
                <EthInteractor />
            </div>
            <div class="lg:col-span-2 space-y-8">
                <GasFeeDisplay @show-details="showGasDetails" />
            </div>
        </template>
      </main>
    </div>
    
    <GasInfoModal v-if="selectedTier" :show="isModalVisible" :tier="selectedTier" @close="isModalVisible = false" />
  </div>
</template>