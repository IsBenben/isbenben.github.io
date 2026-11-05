<script setup lang="ts">
import { ref } from 'vue';
import { defaultTheme, themes } from '~/config/themes';

function choice<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)]!;
}

const HEX_CHARACTERS = '1234567890ABCDEF'.split('');

const titleBlend = ref(true);
const titleTimer = setTimeout(() => {
  titleBlend.value = false;
}, 1300);
onUnmounted(() => clearTimeout(titleTimer));

// #region background-canvas
let backgroundResizeHandler: (() => void) | null = null;
let backgroundInterval: ReturnType<typeof setInterval> | null = null;
let background: HTMLCanvasElement | null = null;
onMounted(() => {
  if (!import.meta.client) {
    return;
  }
  const colorMode = useColorMode();
  const canvas = document.createElement('canvas');
  background = canvas;
  canvas.className = 'background';
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function initCanvas(): void {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
  }
  initCanvas();
  backgroundResizeHandler = () => {
    initCanvas();
  };
  window.addEventListener('resize', backgroundResizeHandler);

  ctx.textBaseline = 'top';
  const charIndex: number[] = [];
  backgroundInterval = setInterval(() => {
    const theme = themes[colorMode.value] || themes[defaultTheme]!;
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = theme.background || '';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 1;
    ctx.fillStyle = theme.backgroundCanvasColor || '';
    const fontsize = 16 * devicePixelRatio;
    ctx.font = `${fontsize}px 'JetBrains Mono', sans-serif`;
    const columns = Math.ceil(canvas.width / fontsize);
    for (let i = 0; i < columns - charIndex.length; i++) {
      charIndex.push(1000);
    }
    for (let i = 0; i < charIndex.length; i++) {
      const char = choice(HEX_CHARACTERS);
      const y = charIndex[i]! * fontsize;
      ctx.fillText(char, i * fontsize, y);
      charIndex[i]!++;
      if (y > canvas.height) {
        if (Math.random() < 0.01) {
          charIndex[i] = 0;
        }
      }
    }
  }, 50);
  document.body.insertBefore(background, document.body.firstChild);
});
onUnmounted(() => {
  backgroundResizeHandler &&
    window.removeEventListener('resize', backgroundResizeHandler);
  backgroundInterval && clearInterval(backgroundInterval);
  background && background.remove();
});
// #endregion

// #region clicks
let clicks: HTMLDivElement | null = null;
let clicksMousedownHandler: ((e: MouseEvent) => void) | null = null;
onMounted(() => {
  if (!import.meta.client) {
    return;
  }
  const container = document.createElement('div');
  clicks = container;
  container.className = 'clicks';
  document.body.appendChild(container);
  clicksMousedownHandler = (e: MouseEvent) => {
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
    container.appendChild(click);
    click.addEventListener('animationend', () => void click.remove());
  };
  window.addEventListener('mousedown', clicksMousedownHandler);
});
onUnmounted(() => {
  clicksMousedownHandler &&
    window.removeEventListener('mousedown', clicksMousedownHandler);
  clicks && clicks.remove();
});
</script>

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
