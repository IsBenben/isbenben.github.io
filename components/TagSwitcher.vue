<script setup>
import tagsData from '@/content/tags.json';

const props = defineProps({
  activeTag: { type: Object, default: null }, // { type, value }
});

function isActive(type, text) {
  return props.activeTag?.type === type && props.activeTag?.text === text;
}
</script>

<style scoped lang="scss">
.tags-switcher {
  padding: 5px;
  border-radius: 5px;
  width: 70%;
  min-width: fit-content;

  & > div {
    margin-bottom: 5px;
    display: flex;
    gap: 1em;
    padding: 5px;

    @media screen and (max-width: 700px) {
      display: block;
      gap: unset;
    }

    @include useTheme using ($map) {
      border-bottom: 1px dotted map.get($map, borderColor);
    }

    &:last-child {
      margin-bottom: 0;
      border-bottom: unset;
    }
  }

  .tag-values {
    display: flex;
    gap: 1em;

    @media screen and (max-width: 700px) {
      margin-top: 0.5em;
    }
  }

  @include useTheme using ($map) {
    box-shadow: 0 0 5px map.get($map, boxShadow);
  }

  h2 {
    font-size: 1.2em;
  }

  h2,
  p {
    display: inline-block;
    margin: 0;
  }

  .tag-values a {
    opacity: 0.76;
  }

  .tag-values a:hover {
    opacity: 0.608;
  }

  .tag-values em {
    font-style: normal;
    font-weight: bold;
    opacity: 0.855;
  }
}
</style>

<template>
  <div class="tags-switcher">
    <div v-for="(tagGroup, type) in tagsData" :key="type">
      <h2>{{ tagGroup.name }}</h2>
      <p>{{ tagGroup.description }}</p>
      <div class="tag-values">
        <template v-for="(val, key) in tagGroup.value">
          <em v-if="isActive(type, key)" :title="val.description">
            {{ val.name }}
          </em>
          <a v-else :href="`/tags/${type}-${key}`" :title="val.description">
            {{ val.name }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
