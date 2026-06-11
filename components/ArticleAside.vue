<script setup>
import TableOfContents from './TableOfContents.vue';

const props = defineProps(['article']);
const article = props.article;
</script>

<style scoped>
aside {
  float: right;
  width: 300px;
  margin-left: 10px;
  flex-shrink: 0;
}

@media screen and (max-width: 768px) {
  aside {
    float: unset;
    width: unset;
    margin: 10px 0;
    flex-shrink: 1;
  }
}

.aside-item {
  background-color: hsla(201, 20%, 100%, 0.1);
  border-radius: 8px;
  padding: 5px;
  margin-bottom: 10px;
}

.metadata-line {
  margin-left: 1em;
  opacity: 0.9;
}

.aside-item.sticky {
  position: sticky;
  top: 10px;
  max-height: calc(100vh - 20px);
  overflow: auto;
}
</style>

<template>
  <aside>
    <div class="aside-item">
      <h2>文章信息</h2>
      <div class="metadata-line">
        <Icon icon="far fa-calendar-days" />发布日期：{{ article.date }}
      </div>
      <div class="metadata-line">
        <template v-for="(tag, idx) in article.tags" :key="idx"
          ><Tag :type="tag[0]" :text="tag[1]" />&nbsp;</template
        >
      </div>
    </div>
    <div class="aside-item" v-if="article.links.length > 0">
      <h2>相关链接</h2>
      <ul>
        <li v-for="link in article.links">
          <a :href="link[0]">{{ link[1] }}</a>
        </li>
      </ul>
    </div>
    <div class="aside-item" v-if="article.downloads.length > 0">
      <h2>快捷下载</h2>
      <ul>
        <li v-for="download in article.downloads">
          <a
            download
            :href="download[0]"
            :title="`将下载为：${download[0].split('/').pop()}`"
            >{{ download[1] }}</a
          >
        </li>
      </ul>
    </div>
    <div class="aside-item sticky" v-if="article.body?.toc?.links.length">
      <h2>目录</h2>
      <TableOfContents :article="article" />
    </div>
  </aside>
</template>
