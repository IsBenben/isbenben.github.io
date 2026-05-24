<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps(['icon']);
</script>

<template>
  <span>
    <ClientOnly>
      <FontAwesomeIcon :icon="props.icon" />
    </ClientOnly>
  </span>
</template>
