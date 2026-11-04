<script setup>
import InfoExplorer from '~/components/InfoExplorer.vue';
import LastModified from '~/components/LastModified.vue';
import { SITENAME } from '~/config/common';

const route = useRoute();

const { data: info } = await useAsyncData(`info-${route.path}`, () =>
  queryCollection('infos').path(route.path).first(),
);

useSeoMeta({
  title: () => (info.value?.title ? `${info.value.title} - ` : '') + SITENAME,
  description: info.value?.title
    ? `${info.value.title}是${SITENAME}的说明文件。`
    : '',
});
</script>

<style scoped lang="scss">
.main {
  overflow: auto;
}
</style>

<template>
  <div class="contents" v-if="info">
    <InfoExplorer :article="info" />
    <div class="main">
      <article>
        <ContentRenderer :value="info" />
      </article>
      <LastModified :date="info.updatedAt" />
    </div>
  </div>
</template>
