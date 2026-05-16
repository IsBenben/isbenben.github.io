<script setup>
import ClientOnlyEffects from '~/components/ClientOnlyEffects.vue';
</script>

<style scoped>
.footer {
  text-align: center;
  margin: 1em 0;
  opacity: 0.5;
}
</style>

<template>
  <div class="container">
    <ClientOnlyEffects />
    <header class="title-area">
      <h1><span>Benben's Website</span></h1>
      <nav class="links">
        <slot name="nav">
          <a href="/" class="return">返回首页</a>
        </slot>
      </nav>
    </header>
    <slot />
    <footer class="footer">
      来自Benben's Website ·
      <a href="/sitemap.xml">sitemap</a>
    </footer>
  </div>
</template>
