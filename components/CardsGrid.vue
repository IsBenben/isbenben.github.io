<script setup lang="ts">
import type { ArticleCard } from '~/config/types';

const props = defineProps<{ articles: ArticleCard[] }>();
</script>

<style scoped lang="scss">
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 20px;
  margin-top: 1rem;
}
</style>

<template>
  <div class="cards-grid">
    <Card
      v-for="article in props.articles"
      :key="article.path"
      :article="article"
    />
  </div>
</template>
