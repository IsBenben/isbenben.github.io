<script setup lang="ts">
import type { Collections } from '@nuxt/content';

type NavArticle = Pick<Collections['pages'], 'title' | 'path'>;

const props = defineProps<{
  prevArticle?: NavArticle | null;
  nextArticle?: NavArticle | null;
}>();
</script>

<style scoped lang="scss">
.more-article {
  margin-top: 1em;
  width: fit-content;
  min-width: 25vw;
  border-radius: 4px;

  @include useTheme using ($map) {
    background: map.get($map, asideBackground);
  }
}

nav ul,
.article-line {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.article-line {
  display: block;
  padding: 8px;

  @include useTheme using ($map) {
    border-bottom: 1px dotted map.get($map, borderColor);
  }

  &:last-child {
    border-bottom: unset;
  }
}

.no-more {
  opacity: 0.76;
}
</style>

<template>
  <nav class="more-article">
    <ul>
      <li class="article-line">
        上一篇：<a v-if="props.prevArticle" :href="props.prevArticle.path">{{
          props.prevArticle.title
        }}</a>
        <span class="no-more" v-else>没有了</span>
      </li>
      <li class="article-line">
        下一篇：<a v-if="props.nextArticle" :href="props.nextArticle.path">{{
          props.nextArticle.title
        }}</a>
        <span class="no-more" v-else>没有了</span>
      </li>
    </ul>
  </nav>
</template>
