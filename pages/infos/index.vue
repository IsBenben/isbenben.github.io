<script setup>
import InfoExplorer from '~/components/InfoExplorer.vue';
import { SITENAME } from '~/config/common';

const route = useRoute();

useSeoMeta({
  title: () => '网站说明 -' + SITENAME,
  description: `该页面列出了${SITENAME}的说明文件。`
});
</script>

<style scoped lang="scss">
article {
  overflow: auto;
}
</style>

<template>
  <div class="contents">
    <InfoExplorer  />
    <article>
      <p class="search-description">欢迎来到本站，您可点击左侧链接直接进入说明页面。</p>
    </article>
  </div>
</template>
