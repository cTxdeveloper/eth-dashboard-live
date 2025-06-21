<script setup lang="ts">
import type { GasTiers } from '../types';
import Icon from './Icon.vue';
defineProps<{ tier: GasTiers | null, show: boolean }>();
const emit = defineEmits(['close']);
</script>
<template>
  <Transition name="fade">
    <div v-if="show" @click.self="emit('close')" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div v-if="tier" class="w-full max-w-md bg-surface rounded-2xl shadow-2xl p-6 border border-border animate-enter">
        <div class="flex items-start justify-between">
          <div>
            <Icon :name="tier.icon" class="h-10 w-10 text-text-accent" />
            <h2 class="text-xl font-bold mt-2 text-text-base">{{ tier.name }} Tier</h2>
            <p class="font-mono text-3xl font-bold mt-1 text-text-accent">{{ tier.gwei }} <span class="text-xl text-text-muted">Gwei</span></p>
          </div>
          <button @click="emit('close')" class="text-text-muted text-3xl leading-none hover:text-text-base">×</button>
        </div>
        <p class="mt-4 text-text-muted">{{ tier.description }}</p>
        <button @click="emit('close')" class="btn-primary mt-6 w-full">Got it</button>
      </div>
    </div>
  </Transition>
</template>
<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>