<script setup>
import Icon from './Icon.vue';

const props = defineProps(['date']);

const daysAgo = ref(null);
onMounted(() => {
  const timestamp = new Date(props.date).getTime();
  if (Number.isNaN(timestamp)) {
    return;
  }
  const days = Math.floor((Date.now() - timestamp) / 86400000);
  if (days >= 30) {
    daysAgo.value = days;
  }
});
</script>

<style scoped lang="scss">
.last-modified {
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 1em;

  @include useTheme using ($map) {
    background: map.get($map, codeBackground);
  }
}
</style>

<template>
  <div class="last-modified">
    <p>
      <Icon icon="fa-solid fa-circle-info" /> 此页面最后编辑于{{ props.date
      }}<template v-if="daysAgo !== null">（{{ daysAgo }}天前）</template
      >，部分内容可能已经过时。
    </p>
  </div>
</template>
