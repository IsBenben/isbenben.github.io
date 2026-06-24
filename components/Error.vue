<script setup></script>

<style scoped lang="scss">
.error {
  font-size: 2em;
  text-align: center;
  margin-top: 20vh;

  .oops {
    font-size: 1rem;
    margin-bottom: 10px;
    letter-spacing: 2px;
  }

  :deep(.message) {
    margin-bottom: 10px;
  }

  :deep(.message samp) {
    font-family: inherit;
    font-weight: bold;
  }

  .return {
    font-size: 1rem;
    display: block;
  }
}

.circled {
  border-radius: 50%;
  padding: 2px;
  border: 2px solid;
}
</style>

<template>
  <div class="error">
    <div class="oops">
      <Icon icon="fa-solid fa-exclamation" class="circled" />
      出错了
    </div>
    <slot></slot>
    <a href="/" class="return">返回首页</a>
  </div>
</template>
