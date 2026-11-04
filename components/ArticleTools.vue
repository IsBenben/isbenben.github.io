<script setup>
import { computed } from 'vue';
import Icon from './Icon.vue';

const props = defineProps(['article']);

const GITHUB_REPO_URL = 'https://github.com/IsBenben/isbenben.github.io';

const githubUrl = computed(() => {
  if (!props.article?.stem) return '#';
  return `${GITHUB_REPO_URL}/blob/main/content/${props.article.stem}.md`;
});

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
};
</script>

<style scoped lang="scss">
.article-tools {
  display: flex;
  gap: 8px;
  margin-top: 1em;
  flex-wrap: wrap;

  .tool-button {
    font: inherit;
    padding: 4px 8px;
    outline: none;
    border: none;
    line-height: inherit;
    display: inline-block;
    height: auto;
    font-weight: normal;
    text-decoration: none;
    cursor: pointer;
    color: inherit;
    border-radius: 4px;
    transition: background-color 0.1s;

    @include useTheme using ($map) {
      background: map.get($map, codeBackground);

      &:hover {
        background: map.get($map, codeHoverBackground);
        opacity: 1;
      }

      &:active {
        background: map.get($map, codeActiveBackground);
      }
    }
  }
}
</style>

<template>
  <div class="article-tools" v-if="article">
    <a
      :href="githubUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="tool-button"
    >
      <Icon icon="fa-solid fa-link" /> 查看Markdown源代码
    </a>
    <button class="tool-button" @click="copyLink">
      <Icon icon="fa-regular fa-copy" /> 复制文章链接
    </button>
  </div>
</template>
