const tools = { random(min, max) { return Math.random() * (max - min) + min; }, randomColor() { return `hsl(${tools.random(0, 360)}deg, ${tools.random( 50, 100 )}%, ${tools.random(50, 100)}%)`; },
}; const container = document.querySelector('.contents');
const cvs = container.querySelector('#firework');
const dpr = window.devicePixelRatio;
cvs.width = container.clientWidth * dpr;
cvs.height = window.innerHeight * 0.9 * dpr;
const ctx = cvs.getContext('2d'); let index = 0;
const pens = [];
function draw() { ++index; ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'; ctx.fillRect(0, 0, cvs.width, cvs.height); ctx.globalCompositeOperation = 'source-over'; if (Math.random() < 0.025) { pens.push({ stage: 0, x: tools.random(0, cvs.width), y: cvs.height, data: { speed: tools.random(2, 5), color: tools.randomColor(), }, }); } for (const pen of [...pens]) { const { x, y } = pen; if (pen.stage === 0 || pen.stage === 3) { pen.y -= pen.data.speed; if ( (pen.y < cvs.height * 0.5 && Math.random() < 0.02) || pen.y < cvs.height * 0.2 ) { const newStage = Math.random() < 0.05 && pen.stage === 0 ? 2 : 1; const count = pen.stage === 0 && newStage === 1 ? Math.floor(tools.random(20, 50)) : Math.floor(tools.random(3, 10)); for (let i = 0; i < count; i++) { pens.push({ stage: newStage, x: pen.x, y: pen.y, data: { speedX: tools.random(-3.5, 3.5), speedY: tools.random(0, -4), acceleration: tools.random(0.04, 0.1), color: tools.randomColor(), }, }); } pens.splice(pens.indexOf(pen), 1); } } else if (pen.stage === 1 || pen.stage === 2) { pen.x += pen.data.speedX; pen.y += pen.data.speedY; pen.data.speedY += pen.data.acceleration; if ( (pen.stage === 1 && (pen.x < 0 || pen.x > cvs.width || pen.y > cvs.height)) || (pen.stage === 2 && Math.random() < 0.03) ) { pens.splice(pens.indexOf(pen), 1); if (pen.stage === 2) { pens.push({ stage: 3, x: tools.random(0, cvs.width), y: pen.y, data: { speed: tools.random(2, 5), color: tools.randomColor(), }, }); } } } ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(pen.x, pen.y); ctx.strokeStyle = pen.data.color; ctx.lineWidth = 3; ctx.stroke(); }
}
const id = setInterval(draw, 1000 / 60);
