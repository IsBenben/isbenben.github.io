<script setup lang="ts">
import { SITENAME } from '~/config/common';
import type { ArticleCard, TagsData } from '~/config/types';
import tagsDataRaw from '~/content/tags.json';

const tagsData = tagsDataRaw as TagsData;

const routeToString = (value: string | string[] | undefined): string =>
  value === undefined
    ? ''
    : Array.isArray(value)
      ? value[0] === undefined
        ? ''
        : value[0]
      : value;
const params = useRoute().params;
const type: string = routeToString(params.type);
const text: string = routeToString(params.text);

const { data: articles } = await useAsyncData<ArticleCard[]>(
  `tag-${type}-${text}`,
  () =>
    queryCollection('pages')
      .where('hide', '<>', true)
      .where('tags', 'LIKE', `%["${type}","${text}"]%`)
      .order('date', 'DESC')
      .select('title', 'description', 'date', 'tags', 'path')
      .all(),
  { default: () => [] },
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
    (tagName.value ? `搜索${tagName.value}${typeName.value} - ` : '') +
    SITENAME,
  description: `标签搜索页面，展示${typeName.value}包含${tagName.value}的所有内容。${tagDescription.value}细致搜索Benben的个人技术博客。`,
});
</script>

<template>
  <div>
    <TagSwitcher :active-tag="{ type, text }" />
    <p class="search-description">
      显示{{ typeName }}包含{{ tagName }}的所有内容。{{ tagDescription }}
    </p>
    <CardsGrid :articles="articles" />
  </div>
</template>
