<script setup>
import { SITENAME } from '~/config/common';

definePageMeta({
  layout: false,
});

onMounted(() => {
  const tools = {
    random(min, max) {
      return Math.random() * (max - min) + min;
    },
    randomColor() {
      return `hsl(${tools.random(0, 360)}deg, ${tools.random(
        50,
        100,
      )}%, ${tools.random(50, 100)}%)`;
    },
  };

  const container = document.querySelector('.contents');
  const cvs = container.querySelector('#firework');
  const dpr = window.devicePixelRatio;
  cvs.width = container.clientWidth * dpr;
  cvs.height = window.innerHeight * 0.9 * dpr;
  const ctx = cvs.getContext('2d');

  let index = 0;
  const pens = [];
  function draw() {
    ++index;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    ctx.globalCompositeOperation = 'source-over';

    if (Math.random() < 0.025) {
      pens.push({
        stage: 0,
        x: tools.random(0, cvs.width),
        y: cvs.height,
        data: {
          speed: tools.random(2, 5),
          color: tools.randomColor(),
        },
      });
    }
    for (const pen of [...pens]) {
      const { x, y } = pen;
      if (pen.stage === 0 || pen.stage === 3) {
        pen.y -= pen.data.speed;
        if (
          (pen.y < cvs.height * 0.5 && Math.random() < 0.02) ||
          pen.y < cvs.height * 0.2
        ) {
          const newStage = Math.random() < 0.05 && pen.stage === 0 ? 2 : 1;
          const count =
            pen.stage === 0 && newStage === 1
              ? Math.floor(tools.random(20, 50))
              : Math.floor(tools.random(3, 10));
          for (let i = 0; i < count; i++) {
            pens.push({
              stage: newStage,
              x: pen.x,
              y: pen.y,
              data: {
                speedX: tools.random(-3.5, 3.5),
                speedY: tools.random(0, -4),
                acceleration: tools.random(0.04, 0.1),
                color: tools.randomColor(),
              },
            });
          }
          pens.splice(pens.indexOf(pen), 1);
        }
      } else if (pen.stage === 1 || pen.stage === 2) {
        pen.x += pen.data.speedX;
        pen.y += pen.data.speedY;
        pen.data.speedY += pen.data.acceleration;
        if (
          (pen.stage === 1 &&
            (pen.x < 0 || pen.x > cvs.width || pen.y > cvs.height)) ||
          (pen.stage === 2 && Math.random() < 0.03)
        ) {
          pens.splice(pens.indexOf(pen), 1);
          if (pen.stage === 2) {
            pens.push({
              stage: 3,
              x: tools.random(0, cvs.width),
              y: pen.y,
              data: {
                speed: tools.random(2, 5),
                color: tools.randomColor(),
              },
            });
          }
        }
      }
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(pen.x, pen.y);
      ctx.strokeStyle = pen.data.color;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }
  const id = setInterval(draw, 1000 / 60);
});

useSeoMeta({
  title: '2026新年 - ' + SITENAME,
});
</script>

<style scoped lang="scss">
#firework {
  width: 100%;
  height: 90vh;
}

h1 {
  font-size: 3em;
  letter-spacing: 1em;
}

* {
  text-align: center;
}

.title-area h1 span {
  animation: 0.8s ease 0s 1 normal forwards running blendIn1;
}

@keyframes blendIn1 {
  from {
    filter: blur(30px);
    letter-spacing: 1em;
    margin-left: 1em;
  }
  to {
    filter: blur(0);
    letter-spacing: 0.5em;
    margin-left: 0.5em;
  }
}

.links {
  justify-content: center;
}

/* 新年内容样式 */
.contents {
  padding: 2rem;
  margin: 0 auto;
}

article {
  background: hsla(201, 20%, 100%, 0.1);
  border-radius: 10px;
  padding: 3rem;
  box-shadow: 0 0 20px hsla(201, 20%, 100%, 0.4);
  margin-top: 2rem;
}

section {
  margin-bottom: 3rem;

  h2 {
    color: hsl(201, 50%, 80%);
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    text-shadow: 0 0 4px hsla(0, 0%, 0%, 0.3);
  }

  h3 {
    color: hsl(201, 10%, 95%);
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    text-align: justify;
  }
}

/* 祝福网格布局 */
.wishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.wish-item {
  background: linear-gradient(
    135deg,
    hsl(340, 100%, 35%) 0%,
    hsl(340, 50%, 50%) 100%
  );
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 15px hsla(340, 100%, 70%, 0.3);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px hsla(340, 100%, 70%, 0.5);
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  p {
    font-size: 1rem;
    margin-bottom: 0;
  }
}

/* 展望列表样式 */
.new-year-resolution ul {
  list-style: none;
  padding: 0;
}

.new-year-resolution li {
  background: linear-gradient(
    90deg,
    hsl(40, 100%, 40%) 0%,
    hsl(30, 75%, 40%) 100%
  );
  margin-bottom: 1rem;
  padding: 1.5rem;
  border-radius: 10px;
  font-size: 1.1rem;
  box-shadow: 0 4px 10px hsla(40, 100%, 40%, 0.4);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(10px);
  }
}

/* 庆祝区块样式 */
.celebration-quote {
  margin-top: 2rem;
}

blockquote {
  background: linear-gradient(
    135deg,
    hsl(226, 71%, 61%) 0%,
    hsl(264, 58%, 53%) 100%
  );
  padding: 2rem;
  border-radius: 15px;
  font-size: 1.3rem;
  font-style: italic;
  box-shadow: 0 8px 20px hsla(226, 71%, 61%, 0.3);
  position: relative;

  &::before {
    content: '"';
    font-size: 4rem;
    position: absolute;
    top: -10px;
    left: 20px;
    color: hsla(0, 0%, 100%, 0.4);
  }

  &::after {
    content: '"';
    font-size: 4rem;
    position: absolute;
    bottom: -30px;
    right: 20px;
    color: hsla(0, 0%, 100%, 0.4);
  }
}

p,
ul,
li {
  margin-left: unset;
}
</style>

<template>
  <div class="container">
    <header class="title-area">
      <h1><span>新年快乐</span></h1>
      <nav class="links">
        <a href="/" class="return">返回首页</a>
      </nav>
    </header>
    <div class="contents">
      <canvas id="firework"></canvas>
      <article>
        <section class="new-year-intro">
          <h2>🎊 迎新年，贺新春 🎊</h2>
          <p>
            时光荏苒，岁月如流。伴随着冬日的温暖阳光，我们迎来了充满希望与梦想的2026年。回首过去的一年，我们收获了成长与感动；展望新的一年，我们满怀期待与憧憬。
          </p>
          <p>
            新的一年，新的开始，新的希望。让我们带着满腔热情，拥抱这个美好的时代，在人生的道路上勇敢前行，创造属于自己的精彩篇章。
          </p>
        </section>

        <section class="new-year-wishes">
          <h2>💝 新年祝福 💝</h2>
          <div class="wishes-grid">
            <div class="wish-item">
              <h3>🎯 事业篇</h3>
              <p>
                愿你在新的一年里，工作顺利，事业蒸蒸日上。每一个目标都能如期实现，每一份努力都能收获满满。勇敢追逐梦想，在职业道路上勇攀高峰！
              </p>
            </div>
            <div class="wish-item">
              <h3>❤️ 家庭篇</h3>
              <p>
                愿你的家庭和睦幸福，家人身体健康，平安快乐。珍惜与亲人相聚的每一刻，让爱与温暖在家庭中流淌，编织最美好的回忆。
              </p>
            </div>
            <div class="wish-item">
              <h3>🌟 友谊篇</h3>
              <p>
                愿你的友谊天长地久，身边常有知心朋友相伴。一起分享快乐，分担忧愁，让真挚的友谊成为人生路上最珍贵的财富。
              </p>
            </div>
            <div class="wish-item">
              <h3>🌈 健康篇</h3>
              <p>
                愿你在新的一年里，身体健康，精力充沛。以强健的体魄迎接每一个挑战，用饱满的精神拥抱生活的美好。
              </p>
            </div>
          </div>
        </section>

        <section class="new-year-resolution">
          <h2>🎯 新年展望</h2>
          <p>
            新年不仅是时间的更替，更是心灵的洗礼与重生。在这个特殊的时刻，让我们为自己设定新的目标，规划美好的人生蓝图。
          </p>
          <ul>
            <li>
              💪 <strong>提升自我</strong> - 不断学习，持续成长，成为更好的自己
            </li>
            <li>
              🌱 <strong>拥抱变化</strong> -
              以开放的心态面对挑战，在变化中寻找机遇
            </li>
            <li>🤝 <strong>珍惜当下</strong> - 感恩生活中的每一个美好瞬间</li>
            <li>
              🚀 <strong>追求卓越</strong> -
              在自己的道路上发光发热，成就非凡人生
            </li>
          </ul>
        </section>

        <section class="new-year-celebration">
          <h2>🎉 共庆新年</h2>
          <p>
            在这个充满喜悦的日子里，让我们共同举杯，为过去一年的收获而庆祝，为新一年的美好而期待。愿璀璨的烟花照亮我们的前程，愿温馨的祝福温暖我们的心房。
          </p>
          <div class="celebration-quote">
            <blockquote>
              新年快乐！愿你的每一天都像今天一样，充满希望、快乐和无限可能！
            </blockquote>
          </div>
        </section>
      </article>
    </div>
  </div>
</template>
