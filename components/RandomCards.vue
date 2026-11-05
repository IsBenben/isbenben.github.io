<script setup lang="ts">
import type { ArticleCard } from '~/config/types.ts';
import CardsGrid from './CardsGrid.vue';

const props = defineProps<{
  title: string;
  articles: ArticleCard[];
  tag: string;
  count: number;
}>();

const { articles, title, tag, count } = props;

function anyTagMatch(article: ArticleCard, tag: string): boolean {
  const matchTag = tag.split(',');
  const matched = article.tags.some((t) => matchTag.some((t2) => t[1] === t2));
  return matched;
}

const filtered = articles.filter((article) => anyTagMatch(article, tag));

function pickRandom(count: number) {
  if (!filtered) return [];
  const shuffled = [...filtered];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = tmp;
  }
  return shuffled.slice(0, count);
}

const randomArticles = useState('random-articles-' + title, () =>
  count === 0 ? filtered : filtered.slice(0, 4),
);
</script>

<style scoped lang="scss">
.buttons {
  font-size: 1rem;
}

.button {
  font: inherit;
  padding: 2px 4px;
  outline: none;
  border: 1px solid;
  line-height: inherit;
  display: inline-block;
  height: auto;
  font-weight: normal;
  text-decoration: none;
  cursor: pointer;
  color: inherit;

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

  .icon {
    margin-right: 4px;
  }
}
</style>

<template>
  <h2 style="text-align: center" :id="`cards-${title}`">
    {{ count !== 0 ? '推荐' : '全部' }}{{ title }}
    <span v-if="count !== 0" class="buttons">
      <button @click="randomArticles = pickRandom(4)" class="button">
        <Icon icon="fa-solid fa-arrow-rotate-right" class="icon" />刷新
      </button>
      <a :href="`/pages#cards-${title}`" class="button">
        <Icon icon="fa-solid fa-chevron-right" class="icon" />全部{{ title }}
      </a>
    </span>
  </h2>
  <CardsGrid :articles="randomArticles" />
</template>
