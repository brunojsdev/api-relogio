function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("pt-BR");
    const dateString = now.toLocaleDateString("pt-BR", { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById("clock").innerText = timeString;
    document.getElementById("date").innerText = dateString;
}
setInterval(updateTime, 1000);
updateTime();

// --- FUNDO: ENGRENAGENS MECÂNICAS (ESTÁTICAS) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let gears = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initAnimation();
}

// Função avançada para desenhar engrenagem estilo mecânico
function drawMechanicalGear(ctx, x, y, outerRadius, innerRadius, teeth, color, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;

    // 1. Dentes da Engrenagem
    ctx.beginPath();
    const holeRadius = outerRadius * 0.85;
    for (let i = 0; i < teeth * 2; i++) {
        const angle = (Math.PI * 2 * i) / (teeth * 2);
        // Alterna entre raio externo e raio da base do dente
        const r = (i % 2 === 0) ? outerRadius : holeRadius;
        ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    ctx.closePath();
    ctx.stroke();

    // 2. Aro interno
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Furo Central
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius * 0.3, 0, Math.PI * 2);
    ctx.stroke(); // Borda do furo
    // Opcional: preencher o furo central levemente
    ctx.globalAlpha = opacity * 0.3;
    ctx.fill();
    ctx.globalAlpha = opacity;

    // 4. Raios (Spokes) - 4 barras cruzadas
    ctx.beginPath();
    for(let i=0; i<4; i++) {
        const angle = (Math.PI / 2) * i;
        ctx.moveTo(Math.cos(angle) * (innerRadius * 0.3), Math.sin(angle) * (innerRadius * 0.3));
        ctx.lineTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius);
    }
    ctx.stroke();

    ctx.restore();
}

class StaticGear {
    constructor(x, y, radius, teeth) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.innerRadius = radius * 0.7;
        this.teeth = teeth;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.pulseSpeed = Math.random() * 0.005 + 0.002;
        this.pulseDir = 1;
    }

    update() {
        this.opacity += this.pulseSpeed * this.pulseDir;
        if (this.opacity > 0.4 || this.opacity < 0.1) {
            this.pulseDir *= -1;
        }
    }

    draw() {
        drawMechanicalGear(ctx, this.x, this.y, this.radius, this.innerRadius, this.teeth, '#00ff88', this.opacity);
    }
}

function initAnimation() {
    gears = [];
    
    // GRUPO 1: Canto Superior Esquerdo
    gears.push(new StaticGear(50, 50, 80, 12));
    gears.push(new StaticGear(160, 30, 40, 8));
    gears.push(new StaticGear(40, 160, 50, 10));

    // GRUPO 2: Canto Inferior Direito
    gears.push(new StaticGear(width - 50, height - 50, 100, 16));
    gears.push(new StaticGear(width - 180, height - 80, 60, 12));
    gears.push(new StaticGear(width - 60, height - 190, 45, 9));
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    gears.forEach(g => {
        g.update();
        g.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
// Inicializa
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
initAnimation();
animate();
