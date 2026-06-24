<script setup>
import ArticleAside from '~/components/ArticleAside.vue';

const route = useRoute();

const { data: article } = await useAsyncData(`article-${route.path}`, () =>
  queryCollection('pages').path(route.path).first(),
);

useSeoMeta({
  title: () =>
    (article.value?.title ? `${article.value.title} - ` : '') +
    "Benben's Website",
  description: article.value?.description.join(' ') ?? '',
});
</script>

<style scoped lang="scss">
article {
  box-shadow: 0 0 5px hsla(201, 20%, 100%, 0.4);
  border-radius: 8px;
  padding: 5px;
  overflow: hidden;
  flex: 1;
  min-width: 0; /* 防止内容溢出 */
}

.contents {
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
    <ArticleAside :article="article" />
    <article>
      <ContentRenderer :value="article" />
    </article>
  </div>
</template>
