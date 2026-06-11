<script setup>
import { ref } from 'vue';

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const titleBlend = ref(true);
setTimeout(() => {
  titleBlend.value = false;
}, 1300);

// #region background-canvas
let backgroundEvent = null;
let backgroundInterval = null;
let background = null;
onMounted(() => {
  if (!process.client) {
    return;
  }
  background = document.createElement('canvas');
  background.className = 'background';
  const ctx = background.getContext('2d');
  function initCanvas() {
    background.width = window.innerWidth * devicePixelRatio;
    background.height = window.innerHeight * devicePixelRatio;
  }
  initCanvas();
  backgroundEvent = window.addEventListener('resize', () => {
    initCanvas();
  });
  ctx.textBaseline = 'top';
  const charIndex = [];
  backgroundInterval = setInterval(() => {
    ctx.fillStyle = 'hsla(201, 20%, 10%, 0.1)';
    ctx.fillRect(0, 0, background.width, background.height);
    ctx.fillStyle = 'hsl(110, 50%, 60%)';
    const fontsize = 16 * devicePixelRatio;
    ctx.font = `${fontsize}px 'JetBrains Mono', sans-serif`;
    const columns = Math.ceil(background.width / fontsize);
    for (let i = 0; i < columns - charIndex.length; i++) {
      charIndex.push(1000);
    }
    for (let i = 0; i < charIndex.length; i++) {
      const char = choice('1234567890ABCDEF');
      const y = charIndex[i] * fontsize;
      ctx.fillText(char, i * fontsize, y);
      charIndex[i]++;
      if (y > background.height) {
        if (Math.random() < 0.01) {
          charIndex[i] = 0;
        }
      }
    }
  }, 50);
  document.body.insertBefore(background, document.body.firstChild);
});
onUnmounted(() => {
  backgroundEvent && window.removeEventListener(backgroundEvent);
  backgroundInterval && clearInterval(backgroundInterval);
  background && background.remove();
});
// #endregion

// #region clicks
let clicks = null;
let clicksEvent = null;
onMounted(() => {
  if (!process.client) {
    return;
  }
  clicks = document.createElement('div');
  clicks.className = 'clicks';
  document.body.appendChild(clicks);
  clicksEvent = window.addEventListener('mousedown', (e) => {
    const click = document.createElement('span');
    click.classList.add('click');
    click.textContent = choice([
      '⛵远航',
      '✨灿烂',
      '✨闪光',
      '❤️爱心',
      '❤️温暖',
      '🌈彩虹',
      '🌈期待',
      '🌈奇迹',
      '🌈希望',
      '🌞明媚',
      '🌞阳光',
      '🌟成功',
      '🌟勇气',
      '🌟卓越',
      '🌠璀璨',
      '🌠激情',
      '🌠流星',
      '🌱成长',
      '🌱进步',
      '🌱突破',
      '🌻希望',
      '🍀好运',
      '🍀幸运',
      '🎈飞扬',
      '🎈梦想',
      '🎉欢呼',
      '🎉庆祝',
      '🏆冠军',
      '🏆荣耀',
      '👊加油',
      '👊拼搏',
      '👊前进',
      '👊无畏',
      '👌OK',
      '👍成就',
      '👍强',
      '👍信心',
      '👏鼓励',
      '👏赞',
      '💎闪耀',
      '💎钻石',
      '💖甜蜜',
      '💖幸福',
      '💪坚强',
      '💪力量',
      '🔥热情',
      '🤝共赢',
      '😁欢笑',
      '😃笑容',
      '😄快乐',
      '😊开心',
      '🙏祝福',
      '🚀腾飞',
    ]);
    click.style.left = `${e.clientX}px`;
    click.style.top = `${e.clientY}px`;
    clicks.appendChild(click);
    click.addEventListener('animationend', () => void click.remove());
  });
});
onUnmounted(() => {
  clicksEvent && window.removeEventListener(clicksEvent);
  clicks && clicks.remove();
});
</script>

<style scoped></style>

<template>
  <svg v-if="titleBlend" class="visually-hidden">
    <defs>
      <filter id="blend">
        <feColorMatrix
          in="SourceGraphic"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 5 -1"
          result="blend"
        />
      </filter>
    </defs>
  </svg>
</template>
