const backgroundContainer = document.querySelector('.background');
backgroundContainer.innerHTML = Array.from(
  { length: 6 },
  () =>
    '<p>' +
    Array.from({ length: 35 }, () => '01'[Math.floor(Math.random() * 2)]).join(
      ''
    ) +
    '</p>'
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
    link.textContent = link.href.split('/').pop();
  }
}
