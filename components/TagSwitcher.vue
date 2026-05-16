<script setup>
import tagsData from '@/content/tags.json'

const props = defineProps({
  activeTag: { type: Object, default: null } // { type, value }
})

function isActive(type, text) {
  return props.activeTag?.type === type && props.activeTag?.text === text
}
</script>


<style scoped>

.tags-switcher {
  box-shadow: 0 0 5px hsla(201, 20%, 100%, 0.4);
  padding: 5px;
  border-radius: 5px;
  width: 70%;
  min-width: fit-content;
}

.tags-switcher>div{
  margin-bottom: 5px;
  border-bottom: 1px dotted hsla(201, 20%, 100%, 0.6);
  display: flex;
  gap: 1em;
  padding: 5px;
}

.tags-switcher>div:last-child {
  margin-bottom: 0;
  border-bottom: unset;
}

.tags-switcher .tag-values {
  display: flex;
  gap: 1em;
  color: hsl(0, 0%, 100%, 0.76);
}

.tags-switcher h2 {
  font-size: 1.2em;
}

.tags-switcher h2,
.tags-switcher p {
  display: inline-block;
  margin: 0;
}

.tags-switcher em {
  font-style: normal;
  font-weight: bold;
  color: hsl(0, 0%, 100%, 0.855);
}

@media screen and (max-width: 700px) {
  .tags-switcher>div{
    display: block;
    gap: unset;
  }

  .tags-switcher .tag-values {
    margin-top: 0.5em;
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
