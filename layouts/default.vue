<script setup>
import ClientOnlyEffects from '~/components/ClientOnlyEffects.vue';
</script>

<style scoped>
.footer {
  text-align: center;
  margin: 1em 0;
  opacity: 0.5;
  overflow: hidden;
}

.title-area {
  margin: 10px;
  top: 0;
  background-color: hsla(201, 20%, 10%, 50%);
}

.title-area h1 {
  filter: url(#blend);
}

.title-area h1 span {
  animation: blendIn 0.8s forwards;
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
      <a href="/infos/about">关于</a> ·
      <a href="/sitemap.xml">sitemap</a>
    </footer>
  </div>
</template>
