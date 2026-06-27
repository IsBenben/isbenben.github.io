<script setup>
import Error from '~/components/Error.vue';
import { SITENAME } from '~/config/common';

definePageMeta({
  layout: false,
});

useSeoMeta({
  title: 'Not Found 404 - ' + SITENAME,
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
