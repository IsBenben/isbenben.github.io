<script setup>
import Error from '~/components/Error.vue';

definePageMeta({
  layout: false,
});

useSeoMeta({
  title: "Not Found 404 - Benben's Website",
  robots: 'noindex, follow',
});
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <template #nav></template>
      <Error>
        <p class="message">Error <samp>404</samp>: Not found</p>
      </Error>
    </NuxtLayout>
  </div>
</template>
