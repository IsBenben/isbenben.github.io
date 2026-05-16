<script setup>
import Carousel from '~/components/Carousel.vue';
import CopyableCode from '~/components/CopyableCode.vue';

definePageMeta({
  layout: false,
});

const { data: articles } = await useAsyncData('home', () =>
  queryCollection('articles')
    .where('hide', '<>', true)
    .order('date', 'DESC')
    .select('slug', 'title', 'description', 'date', 'tags')
    .all(),
);

useSeoMeta({
  title: "Benben's Website - 原创编程与游戏开发分享网站",
  description:
    'Benben的个人技术分享网站，包含游戏开发、实用工具、学习经验等内容。分享Scratch编程、Python项目、Minecraft包等技术干货。',
});
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <template #nav>
        <Carousel>
          <li>
            欢迎来到我的个人网站
            <strong><CopyableCode>isbenben.github.io</CopyableCode></strong
            >（
            <a href="https://github.com/IsBenben/isbenben.github.io">
              查看源代码
            </a>
            ）。
          </li>
          <li>
            <strong>Bilibili: </strong>
            <a href="https://space.bilibili.com/3493138995874499">
              bili_wangac
            </a>
          </li>
        </Carousel>
      </template>
      <p class="search-description">
        显示所有内容。建议使用<a href="/tags">标签搜索</a>。
      </p>
      <div class="cards">
        <Card
          v-for="article in articles"
          :key="article._path"
          :article="article"
        />
      </div>
    </NuxtLayout>
  </div>
</template>
