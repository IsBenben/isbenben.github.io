<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{ icon: string }>();
</script>

<template>
  <span>
    <ClientOnly>
      <FontAwesomeIcon :icon="props.icon" />
    </ClientOnly>
  </span>
</template>
