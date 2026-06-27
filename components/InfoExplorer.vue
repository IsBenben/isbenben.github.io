<script setup>
const props = defineProps(['article']);
const article = props.article;

const { data: infos } = await useAsyncData('infos-all', () =>
  queryCollection('infos').select('title', 'path').all(),
);
</script>

<style scoped lang="scss">
aside {
  float: left;
  width: 200px;
  margin-right: 10px;

  @media screen and (max-width: 768px) {
    float: unset;
    width: unset;
    margin: 10px 0;
  }

  @include useTheme using ($map) {
    background: map.get($map, asideBackground);
  }
}

nav ul,
.info-link {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

h2,
.info-link :is(a, em) {
  display: block;
  padding: 8px;
  text-decoration: none;
  font-style: normal;
}

.info-link :is(a:hover, em) {
  opacity: unset;
  @include useTheme using ($map) {
    background: map.get($map, asideBackground);
  }
}
</style>

<template>
  <aside>
    <nav>
      <h2>网站说明</h2>
      <ul>
        <li class="info-link" v-for="info in infos">
          <a :href="info.path" v-if="info.title !== article.title">{{
            info.title
          }}</a>
          <em v-else>{{ info.title }}</em>
        </li>
      </ul>
    </nav>
  </aside>
</template>
