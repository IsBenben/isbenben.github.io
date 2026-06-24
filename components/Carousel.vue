<template>
  <ul ref="carouselRef" class="carousel">
    <slot />
  </ul>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const carouselRef = ref(null);
let timer = null;
let current = 0;
let total = 0;

onMounted(() => {
  const ul = carouselRef.value;
  if (!ul) return;

  total = ul.children.length;
  const firstClone = ul.children[0].cloneNode(true);
  ul.appendChild(firstClone);

  timer = setInterval(() => {
    current++;
    if (current <= total) {
      ul.style.setProperty('--pos', current);
    } else {
      ul.classList.add('finished');
      ul.style.setProperty('--pos', 0);
      ul.getBoundingClientRect();
      ul.classList.remove('finished');
      current = 1;
      ul.style.setProperty('--pos', current);
    }
  }, 2000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped lang="scss">
.carousel {
  line-height: 1;
  height: 1.2em;
  --pos: 0;
  overflow: hidden;
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;

  & > * {
    margin: 0;
    height: 1.2em;
    transform: translateY(calc(var(--pos) * -1.2em));
    transition: transform 0.2s ease;
  }

  &.finished > * {
    transition: none !important;
  }
}
</style>
