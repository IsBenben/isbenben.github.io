<script setup>
import CardsGrid from './CardsGrid.vue';

const props = defineProps(['title', 'articles', 'tag', 'count']);

const { articles, title, tag, count } = props;

function anyTagMatch(article, tag) {
  const shouldInvert = tag[0] === '!';
  const matchTag = shouldInvert ? tag.slice(1) : tag;
  const matched = article.tags?.some((t) => t[1] === matchTag);
  return shouldInvert ? !matched : matched;
}

const filtered = articles.filter((article) => anyTagMatch(article, tag));

function pickRandom(n) {
  if (!filtered) return [];
  const shuffled = [...filtered];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
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

  @include useTheme using ($map) {
    background: map.get($map, codeBackground);

    &:active {
      background: map.get($map, codeActiveBackground);
    }
  }
}
</style>

<template>
  <h2 style="text-align: center" :id="`cards-${title}`">
    {{ count !== 0 ? '推荐' : '全部' }}{{ title }}
    <span v-if="count !== 0" class="buttons">
      <button @click="randomArticles = pickRandom(4)" class="button">
        <Icon icon="fa-solid fa-arrow-rotate-right" />刷新
      </button>
      <a :href="`/pages#cards-${title}`" class="button">
        <Icon icon="fa-solid fa-chevron-right" />全部{{ title }}
      </a>
    </span>
  </h2>
  <CardsGrid :articles="randomArticles" />
</template>
