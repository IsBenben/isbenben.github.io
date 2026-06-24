<template>
  <figure>
    <img
      :src="refinedSrc"
      :alt="props.alt"
      :width="props.width"
      :height="props.height"
    />
    <figcaption aria-hidden="true" class="img-description">
      图：{{ props.alt }}
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
.img-description::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 0.6em;
  vertical-align: top;
  border: 1px solid #fff;
  border-top: none;
  border-right: none;
  margin: 0 0.5em;
}
</style>

<script setup>
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo';
import { useRuntimeConfig, computed } from '#imports';

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: void 0,
  },
  height: {
    type: [String, Number],
    default: void 0,
  },
});
const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(
      withTrailingSlash(useRuntimeConfig().app.baseURL),
    );
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src);
    }
  }
  return props.src;
});
</script>
