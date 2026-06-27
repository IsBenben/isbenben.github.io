<script setup>
import Icon from './Icon.vue';

const colorMode = useColorMode();

colorMode.preference;

function toggleTheme() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light';
}
</script>

<style lang="scss">
.theme-switcher {
  background: none;
  border: none;
  display: inline-block;
  font: inherit;
  color: inherit;
  font-size: 2em;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    font-size: 1.5em;
  }
}
</style>

<template>
  <ClientOnly>
    <button @click="toggleTheme" class="theme-switcher" aria-label="主题切换">
      <Icon v-show="colorMode.value === 'light'" icon="fa-regular fa-sun" />
      <Icon v-show="colorMode.value === 'dark'" icon="fa-regular fa-moon" />
    </button>
  </ClientOnly>
</template>
