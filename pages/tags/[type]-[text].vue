<script setup>
import tagsData from '~/content/tags.json';

const route = useRoute();
const { type, text } = route.params;

const { data: articles } = await useAsyncData(`tag-${type}-${text}`, () =>
  queryCollection('articles')
    .where('hide', '<>', true)
    .where('tags', 'LIKE', `%["${type}","${text}"]%`)
    .order('date', 'DESC')
    .select('slug', 'title', 'description', 'date', 'tags')
    .all(),
);

const tagDescription = computed(() => {
  return tagsData[type]?.value?.[text]?.description;
});

const typeName = computed(() => {
  return tagsData[type]?.name;
});

const tagName = computed(() => {
  return tagsData[type]?.value?.[text]?.name;
});

useSeoMeta({
  title: () =>
    (tagName.value ? `搜索${typeName.value}${tagName.value}标签 - ` : '') +
    "Benben's Website",
  description: `标签搜索页面，展示${typeName.value}标签包含${tagName.value}的所有内容。${tagDescription.value}细致搜索Benben的个人技术博客。`,
});
</script>

<template>
  <div>
    <TagSwitcher :active-tag="{ type, text }" />
    <p class="search-description">
      显示{{ typeName }}包含{{ tagName }}的所有内容。
    </p>
    <div class="cards">
      <Card
        v-for="article in articles"
        :key="article._path"
        :article="article"
      />
    </div>
  </div>
</template>
