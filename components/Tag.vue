<script setup>
import tagsData from '@/content/tags.json';

const props = defineProps(['type', 'text']);

const tagDescription = computed(() => {
  return tagsData[props.type]?.value?.[props.text]?.description;
});

const typeName = computed(() => {
  return tagsData[props.type]?.name;
});

const typeDescription = computed(() => {
  return tagsData[props.type]?.description;
});

const tagName = computed(() => {
  return tagsData[props.type]?.value?.[props.text]?.name;
});

const tagWidth = computed(() => {
  return (
    tagName.value.split('').reduce((accumulator, currentChar) => {
      if (currentChar.charCodeAt(0) < 256) {
        return accumulator + 0.6;
      }
      return accumulator + 1;
    }, 0) + 1
  );
});
</script>

<template>
  <a
    class="tag iconfont"
    :class="`icon-tag-${type}`"
    :style="{ '--tag-width': tagWidth }"
    :href="`/tags/${type}-${text}`"
    :title="`${typeName} - ${typeDescription}\n${tagDescription}`"
  >
    {{ tagName }}
  </a>
</template>
