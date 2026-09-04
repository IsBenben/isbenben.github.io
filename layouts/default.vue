<script setup>
import ClientOnlyEffects from '~/components/ClientOnlyEffects.vue';
import ThemeSwitcher from '~/components/ThemeSwitcher.vue';
import { SITENAME } from '~/config/common';

const route = useRoute();
const pathReplaced = computed(() => Object.keys(route.params).length > 0);
</script>

<style scoped lang="scss">
.footer {
  text-align: center;
  margin: 1em 0;
  opacity: 0.5;
  overflow: hidden;
}

.header {
  margin: 10px;
  top: 0;

  h1 {
    font-size: 2em;
    filter: url(#blend);

    @media screen and (max-width: 500px) {
      font-size: 1.5em;
    }

    span {
      animation: blendIn 0.8s forwards;
    }
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

<template>
  <div class="container">
    <ClientOnlyEffects />
    <header class="header">
      <div class="title">
        <h1>
          <span>{{ SITENAME }}</span>
        </h1>
        <ThemeSwitcher />
      </div>
      <slot name="nav">
        <nav class="links">
          <a href="/" class="return">返回首页</a>
          <span v-if="route.path.startsWith('/pages') && pathReplaced">
            /<a href="/pages">全部页面</a>
          </span>
          <span v-if="route.path.startsWith('/tags') && pathReplaced">
            /<a href="/tags">标签搜索</a>
          </span>
          <span v-if="route.path.startsWith('/infos') && pathReplaced">
            /<a href="/infos">网站说明</a>
          </span>
        </nav>
      </slot>
    </header>
    <slot />
    <footer class="footer">
      来自{{ SITENAME }} · <a href="/infos">网站说明</a> ·
      <a href="/sitemap.xml">sitemap</a>
    </footer>
  </div>
</template>
