<script setup>
import ArticleAside from '~/components/ArticleAside.vue';

const route = useRoute();
const slug = route.params.slug;

const { data: article } = await useAsyncData(`article-${slug}`, () =>
  queryCollection('articles').where('slug', '=', slug).first(),
);

useSeoMeta({
  title: () =>
    (article.value?.title ? `${article.value.title} - ` : '') +
    "Benben's Website",
  description: article.value?.description.join(' ') ?? '',
});
</script>

<style scoped>
article {
  box-shadow: 0 0 5px hsla(201, 20%, 100%, 0.4);
  border-radius: 8px;
  padding: 5px;
  overflow: hidden;
  line-height: 1.5;
}
</style>

<template>
  <div class="contents clearfix" v-if="article">
    <ArticleAside :article="article" />
    <article>
      <h1>{{ article.title }}</h1>
      <ContentRenderer :value="article" />
    </article>
  </div>
</template>
