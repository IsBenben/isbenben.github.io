<script setup lang="ts">
import type { VNode } from 'vue';

const slots = defineSlots();

type SlotNode = string | number | VNode | SlotNode[] | null;

const slotText = computed(() => {
  const defaultSlot = slots.default?.();

  const extractText = (vnode: SlotNode): string => {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
      return vnode.toString();
    }
    if (Array.isArray(vnode)) {
      return vnode.map(extractText).join('');
    }
    if (vnode?.children) {
      return extractText(vnode.children as any);
    }
    return '';
  };
  return extractText(defaultSlot).trim();
});

function copy() {
  navigator.clipboard.writeText(slotText.value);
}
</script>

<style scoped lang="scss">
code {
  cursor: pointer;

  &:active {
    @include useTheme using ($map) {
      background: map.get($map, codeActiveBackground);
    }
  }
}
</style>

<template>
  <code @click="copy" title="点击复制"><slot /></code>
</template>
