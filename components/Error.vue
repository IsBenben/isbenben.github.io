<script setup></script>

<style scoped>
.error {
  font-size: 2em;
  text-align: center;
  margin-top: 20vh;
}

.error .opps {
  font-size: 1rem;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.error :deep(.message) {
  margin-bottom: 10px;
}

.error :deep(.message samp) {
  font-family: inherit;
  font-weight: bold;
}

.error .return {
  font-size: 1rem;
  display: block;
}
</style>

<template>
  <div class="error">
        <div class="opps iconfont icon-error">出错了</div>
    <slot></slot>
        <a href="/" class="return">返回首页</a>
  </div>
</template>
