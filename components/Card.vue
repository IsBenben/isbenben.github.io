<script setup>
import Tag from './Tag.vue';

const props = defineProps(['article']);
const article = props.article;

const cardRef = ref(null);
if (process.client) {
  window.addEventListener('mousemove', (e) => {
    const card = cardRef.value;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
}
</script>

<style scoped>
.card-container .card {
  background-color: hsla(201, 20%, 100%, 0.1);
  position: relative;
  border-radius: 8px;
  height: 270px;
  overflow: hidden;
  transition: 0.2s;
}

.card-container .card::before {
  content: '';
  background-image: radial-gradient(
    closest-side circle,
    hsla(201, 20%, 100%, 0.4),
    transparent
  );
  position: absolute;
  inset: 0;
  transform: translate(var(--x, -1000px), var(--y, -1000px));
}

.card-container .card:hover:before {
  background: hsla(201, 20%, 100%, 0.6);
  transform: none;
}

.card-container .card .inner {
  background-color: hsla(201, 20%, 15%, 0.95);
  position: absolute;
  padding: 3px;
  inset: 2px;
  border-radius: inherit;
}

.card-container:hover .card {
  transform: translateY(-10px);
}
</style>

<template>
  <div class="card-container">
    <div class="card" ref="cardRef">
      <div class="inner">
        <h2>
          <NuxtLink :to="`${article.path}`">{{ article.title }}</NuxtLink>
        </h2>
        <p>
          <template v-for="(item, index) in article.description" :key="index">
            {{ item }}
            <br v-if="index !== article.description.length - 1" />
          </template>
        </p>
        <div class="information">
          <span
            ><Icon icon="fa-regular fa-calendar-days" />日期：{{
              article.date
            }}</span
          >
          <template v-for="(tag, idx) in article.tags" :key="idx"
            >&nbsp;<Tag :type="tag[0]" :text="tag[1]"
          /></template>
        </div>
      </div>
    </div>
  </div>
</template>
