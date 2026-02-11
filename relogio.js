// --- Lógica do Relógio ---
function updateClock() {
    const now = new Date();
    document.getElementById("clock").innerText = now.toLocaleTimeString();
    document.getElementById("date").innerText = now.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
setInterval(updateClock, 1000);
updateClock();

// --- ANIMAÇÃO DE FUNDO (SQUARES / NEON) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Paleta: Verde Neon (Principal) e tons do background
const colors = ['#00ff88', '#020617', '#004d29', '#ccffdd'];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

class Square {
  constructor() {
    this.init();
  }

  init() {
    this.x = Math.random() * width;
    this.y = Math.random() * height - height;
    this.size = Math.random() * 15 + 5;
    this.speed = Math.random() * 2 + 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.init();
      this.y = -20;
    }
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(this.x, this.y, this.size, this.size);
    
    if (Math.random() > 0.98) {
       ctx.fillStyle = this.color;
       ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    ctx.globalAlpha = 1;
  }
}

function initParticles() {
  particles = [];
  const particleCount = Math.floor(width / 10);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Square());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resize();
  initParticles();
});

resize();
initParticles();
animate();
