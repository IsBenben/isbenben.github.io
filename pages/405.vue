<script setup>
import Error from '~/components/Error.vue';
import { SITENAME } from '~/config/common';

definePageMeta({
  layout: false,
});

useSeoMeta({
  title: 'Method Not Allowed 405 - ' + SITENAME,
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
