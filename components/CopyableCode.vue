<script setup>
const slots = defineSlots();

const slotText = computed(() => {
  const defaultSlot = slots.default?.();

  const extractText = (vnode) => {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
      return vnode.toString();
    }
    if (Array.isArray(vnode)) {
      return vnode.map(extractText).join('');
    }
    if (vnode?.children) {
      return extractText(vnode.children);
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
    background-color: hsla(201, 20%, 100%, 0.2);
  }
}
</style>

<template>
  <code @click="copy" title="点击复制"><slot /></code>
</template>
