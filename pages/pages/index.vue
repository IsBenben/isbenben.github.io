<script setup>
import CardsGrid from '~/components/CardsGrid.vue';
import { SITENAME } from '~/config/common';

definePageMeta({
  layout: false,
});

const { data: articles } = await useAsyncData('pages-all', () =>
  queryCollection('pages')
    .where('hide', '<>', true)
    .order('date', 'DESC')
    .select('title', 'description', 'date', 'tags', 'path')
    .all(),
);

useSeoMeta({
  title: '全部页面列表 - ' + SITENAME,
  description:
    '展示Benben的个人技术分享网站全部页面，包含游戏开发、实用工具、学习经验等内容和Scratch、Python、Minecraft的技术干货。',
});
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <h1 style="text-align: center">全部页面列表</h1>
      <RandomCards
        :articles="articles"
        title="项目"
        tag="!snippet"
        :count="0"
      />
      <RandomCards
        :articles="articles"
        title="代码片段"
        tag="snippet"
        :count="0"
      />
      <p class="search-description">
        此页面展示的网站的全部页面，包括项目与代码片段，你可在上方找到需要的页面。
      </p>
    </NuxtLayout>
  </div>
</template>
