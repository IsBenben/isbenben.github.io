<script setup>
const props = defineProps(['article']);
const article = props.article;

function getText(heading) {
  return heading.slice(0, heading.length - 4);
}
</script>

<template>
  <nav class="toc">
    <ul>
      <li v-for="heading in article.body.toc.links" :key="heading.id">
        <a :href="`#${heading.id}`">{{ getText(heading.text) }}</a>
        <ul v-if="heading.children?.length">
          <li v-for="subheading in heading.children" :key="subheading.id">
            <a :href="`#${subheading.id}`">{{ getText(subheading.text) }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
