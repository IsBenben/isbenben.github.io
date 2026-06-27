<script setup>
import ArticleAside from '~/components/ArticleAside.vue';
import MoreArticle from '~/components/MoreArticle.vue';
import { SITENAME } from '~/config/common';

const route = useRoute();

const { data } = await useAsyncData(`article-${route.path}`, async () => {
  const current = await queryCollection('pages').path(route.path).first();

  if (!current) {
    return { current: null, prev: null, next: null };
  }

  const prev = await queryCollection('pages')
    .where('date', '<', current.date)
    .order('date', 'DESC')
    .first();

  const next = await queryCollection('pages')
    .where('date', '>', current.date)
    .order('date', 'ASC')
    .first();

  return { current, prev, next };
});

const article = computed(() => data.value?.current);
const prevArticle = computed(() => data.value?.prev);
const nextArticle = computed(() => data.value?.next);

useSeoMeta({
  title: () =>
    (article.value?.title ? `${article.value.title} - ` : '') + SITENAME,
  description: article.value?.description.join(' ') ?? '',
});
</script>

<style scoped lang="scss">
article {
  border-radius: 8px;
  padding: 5px;
  overflow: hidden;
  flex: 1;
  min-width: 0; /* 防止内容溢出 */

  @include useTheme using ($map) {
    box-shadow: 0 0 5px map.get($map, boxShadow);
  }
}

.main-content {
  display: flex;
  flex-direction: row-reverse;
  align-items: stretch;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}
</style>

<template>
  <div class="contents clearfix" v-if="article">
    <div class="main-content">
      <ArticleAside :article="article" />
      <article>
        <ContentRenderer :value="article" />
      </article>
    </div>
    <MoreArticle :prevArticle="prevArticle" :nextArticle="nextArticle" />
  </div>
</template>
