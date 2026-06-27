<script setup>
import ClientOnlyEffects from '~/components/ClientOnlyEffects.vue';
import ThemeSwitcher from '~/components/ThemeSwitcher.vue';
import { SITENAME } from '~/config/common';
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
      <nav class="links">
        <slot name="nav">
          <a href="/" class="return">返回首页</a>
        </slot>
      </nav>
    </header>
    <slot />
    <footer class="footer">
      来自{{ SITENAME }} · <a href="/infos/about">关于</a> ·
      <a href="/sitemap.xml">sitemap</a>
    </footer>
  </div>
</template>
