<script setup>
import Error from '~/components/Error.vue';

definePageMeta({
  layout: false,
});

useSeoMeta({
  title: "Method Not Allowed 405 - Benben's Website",
  robots: 'noindex, follow',
});
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <template #nav></template>
      <Error>
        <p class="message">Error <samp>405</samp>: Method not allowed</p>
      </Error>
    </NuxtLayout>
  </div>
</template>
