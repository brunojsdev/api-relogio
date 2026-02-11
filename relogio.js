// ... (Lógica anterior do Relógio) ...
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


// --- ANIMAÇÃO DE FUNDO (ENGRENAGENS) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let gears = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

// Função para desenhar engrenagem
function drawGear(x, y, teeth, radius, holeRadius, rotation, color, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    
    // Desenha dentes
    const outerRadius = radius + 5;
    for (let i = 0; i < teeth * 2; i++) {
        const angle = (Math.PI * 2 * i) / (teeth * 2);
        const r = (i % 2 === 0) ? outerRadius : radius;
        ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();

    // Desenha furo central
    ctx.beginPath();
    ctx.arc(0, 0, holeRadius, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.stroke();
    
    ctx.restore();
}

class Gear {
    constructor() {
        this.init();
    }
    
    init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.teeth = Math.floor(Math.random() * 8) + 8; // 8 a 16 dentes
        this.radius = Math.random() * 20 + 15;
        this.speed = (Math.random() - 0.5) * 0.02; // Velocidade de rotação
        this.rotation = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.2 + 0.05;
    }
    
    update() {
        this.rotation += this.speed;
        // Engrenagens também flutuam levemente
        this.y += 0.2;
        if(this.y > height + 50) this.y = -50;
    }
    
    draw() {
        drawGear(this.x, this.y, this.teeth, this.radius, 5, this.rotation, '#00ff88', this.opacity);
    }
}

function initAnimation() {
    resize();
    gears = [];
    const count = 15;
    for(let i=0; i<count; i++) gears.push(new Gear());
    animate();
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
initAnimation();
