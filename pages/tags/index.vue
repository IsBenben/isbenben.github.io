<script setup>
useSeoMeta({
  title: "标签搜索 - Benben's Website",
  description:
    '标签搜索页面，展示所有标签。细致搜索Benben的个人技术博客，游戏开发、实用工具、学习经验等内容和Scratch、Python、Minecraft的技术干货。',
});
</script>

<template>
  <div>
    <TagSwitcher :active-tag="null" />
    <p class="search-description">请在上方选择欲搜索的标签。</p>
  </div>
</template>
