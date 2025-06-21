<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps<{
  value: number;
  fractionDigits?: number;
}>();

const displayValue = ref(props.value);
let animationFrameId: number | null = null;

const animate = () => {
  const diff = props.value - displayValue.value;
  if (Math.abs(diff) < 0.01) {
    displayValue.value = props.value;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    return;
  }
  displayValue.value += diff * 0.1; // Tweening
  animationFrameId = requestAnimationFrame(animate);
};

watch(() => props.value, () => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  animate();
});

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
});
</script>

<template>
  <span>{{ displayValue.toLocaleString('en-US', { minimumFractionDigits: props.fractionDigits, maximumFractionDigits: props.fractionDigits }) }}</span>
</template>