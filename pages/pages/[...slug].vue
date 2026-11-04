<script setup lang="ts">
import ArticleAside from '~/components/ArticleAside.vue';
import ArticleTools from '~/components/ArticleTools.vue';
import LastModified from '~/components/LastModified.vue';
import MoreArticle from '~/components/MoreArticle.vue';
import { SITENAME, BASE_URL } from '~/config/common';

const route = useRoute();

const { data } = await useAsyncData(`article-${route.path}`, async () => {
  const current = await queryCollection('pages').path(route.path).first();

  if (!current) {
    return { current: null, prev: null, next: null };
  }

  const prev = await queryCollection('pages')
    .where('hide', '<>', true)
    .where('date', '<', current.date)
    .order('date', 'DESC')
    .select('title', 'path')
    .first();

  const next = await queryCollection('pages')
    .where('hide', '<>', true)
    .where('date', '>', current.date)
    .order('date', 'ASC')
    .select('title', 'path')
    .first();

  return { current, prev, next };
});

const article = computed(() => data.value?.current);
const prevArticle = computed(() => data.value?.prev);
const nextArticle = computed(() => data.value?.next);

const absoluteUrl = (path?: string) =>
  path ? new URL(path, BASE_URL).href : undefined;

const imageUrl = computed(() => {
  const sitemapImage = article.value?.sitemap?.images?.[0]?.loc;
  return absoluteUrl(sitemapImage);
});

const description = computed(() => article.value?.description?.join('') ?? '');

useSeoMeta({
  title: () =>
    (article.value?.title ? `${article.value.title} - ` : '') + SITENAME,
  description: () => description.value,

  ogTitle: () => article.value?.title,
  ogDescription: () => description.value,
  ogImage: () => imageUrl.value,
  ogType: 'article',
  ogUrl: () => `${BASE_URL}${route.path}`,
  ogSiteName: SITENAME,

  twitterCard: 'summary_large_image',
  twitterTitle: () => article.value?.title,
  twitterDescription: () => description.value,
  twitterImage: () => imageUrl.value,
});

if (article.value) {
  useSchemaOrg([
    defineArticle({
      '@type': 'BlogPosting',
      headline: article.value.title,
      description: description.value,
      image: imageUrl.value,
      datePublished: article.value.date,
      dateModified: article.value.updatedAt,
      author: {
        name: 'IsBenben',
        url: BASE_URL,
      },
    }),
  ]);
}
</script>

<style scoped lang="scss">
article {
  border-radius: 8px;
  padding: 5px;
  overflow: hidden;
  flex: 1;
  min-width: 0;

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
    <ArticleTools :article="article" />
    <LastModified :date="article.updatedAt" />
    <MoreArticle :prevArticle="prevArticle" :nextArticle="nextArticle" />
  </div>
</template>
