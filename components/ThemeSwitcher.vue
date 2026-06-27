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
  display: inline-block;
  font-size: 2em;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    font-size: 1.5em;
  }
}
</style>

<template>
  <ClientOnly>
    <div @click="toggleTheme" class="theme-switcher">
      <Icon v-show="colorMode.value === 'light'" icon="fa-regular fa-sun" />
      <Icon v-show="colorMode.value === 'dark'" icon="fa-regular fa-moon" />
    </div>
  </ClientOnly>
</template>
