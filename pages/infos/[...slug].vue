<script setup>
import InfoExplorer from '~/components/InfoExplorer.vue';

const route = useRoute();

const { data: info } = await useAsyncData(`info-${route.path}`, () =>
  queryCollection('infos').path(route.path).first(),
);

useSeoMeta({
  title: () =>
    (info.value?.title ? `${info.value.title} - ` : '') + "Benben's Website",
  description: info.value?.title
    ? `${info.value.title}是Benben's Website的说明文件。`
    : '',
});
</script>

<style scoped lang="scss">
article {
  overflow: auto;
}
</style>

<template>
  <div class="contents" v-if="info">
    <InfoExplorer :article="info" />
    <article>
      <ContentRenderer :value="info" />
    </article>
  </div>
</template>
