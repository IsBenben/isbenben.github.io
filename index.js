const svgCode = `
<defs>
  <filter id="blend">
    <feColorMatrix
      in="SourceGraphic"
      values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 5 -1"
      result="blend"
    />
  </filter>
</defs>`;
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.innerHTML = svgCode;
svg.style.display = 'none';
document.body.appendChild(svg);

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const backgroundContainer = document.querySelector('.background');
backgroundContainer.innerHTML = Array.from(
  { length: 6 },
  () => '<p>' + Array.from({ length: 35 }, () => choice('01')).join('') + '</p>'
).join('');

const cards = document.querySelectorAll('.card');
window.addEventListener('mousemove', (e) => {
  for (const card of cards) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  }
});

const links = document.querySelectorAll('a');
for (const link of links) {
  if (!link.innerHTML) {
    link.textContent = decodeURI(link.href.split('/').pop());
  }
}

const clicks = document.createElement('div');
clicks.classList.add('clicks');
document.body.appendChild(clicks);
window.addEventListener('mousedown', (e) => {
  const click = document.createElement('span');
  click.classList.add('click');
  click.textContent = choice([
    '🌈奇迹',
    '🌈希望',
    '🌈彩虹',
    '🌈期待',
    '🌟勇气',
    '🌟卓越',
    '🌟成功',
    '🌠流星',
    '🌠激情',
    '🌠璀璨',
    '🌱成长',
    '🌱突破',
    '🌱进步',
    '👊前进',
    '👊加油',
    '👊拼搏',
    '👊无畏',
    '👌OK',
    '👍信心',
    '👍强',
    '👍成就',
    '👏赞',
    '👏鼓励',
    '💪力量',
    '💪坚强',
    '😁欢笑',
    '😃笑容',
    '😄快乐',
    '😊开心',
  ]);
  click.style.left = `${e.clientX}px`;
  click.style.top = `${e.clientY}px`;
  clicks.appendChild(click);
  click.addEventListener('animationend', () => void click.remove());
});

const codes = document.querySelectorAll('code');
for (const code of codes) {
  code.title = '点击复制';
  code.addEventListener('click', () => {
    navigator.clipboard.writeText(code.textContent);
  });
}

const carousels = document.querySelectorAll('.carousel');
for (const carousel of carousels) {
  const total = carousel.children.length;
  carousel.appendChild(carousel.children[0].cloneNode(true));
  let current = 0;
  setInterval(() => {
    current++;
    if (current <= total) {
      carousel.style.setProperty('--pos', current);
    } else {
      carousel.classList.add('finished');
      carousel.style.setProperty('--pos', 0);
      carousel.getBoundingClientRect();
      carousel.classList.remove('finished');
      current = 1;
      carousel.style.setProperty('--pos', current);
    }
  }, 2000);
}
