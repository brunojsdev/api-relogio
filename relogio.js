function updateTime() {
    const now = new Date();
    document.getElementById("clock").innerText = now.toLocaleTimeString("pt-BR");
    document.getElementById("date").innerText = now.toLocaleDateString("pt-BR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
setInterval(updateTime, 1000);
updateTime();

// --- FUNDO: ENGRENAGENS COMPLEXAS (BASEADAS NA IMAGEM) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height, gears = [];

function drawComplexGear(x, y, radius, teeth, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;

    // 1. Dentes externos (Retos e precisos)
    ctx.beginPath();
    const toothDepth = radius * 0.15;
    const innerR = radius - toothDepth;
    for (let i = 0; i < teeth * 2; i++) {
        const angle = (Math.PI * i) / teeth;
        const r = (i % 2 === 0) ? radius : innerR;
        ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    ctx.closePath();
    ctx.stroke();

    // 2. Anéis internos decorativos
    ctx.beginPath();
    ctx.arc(0, 0, innerR * 0.8, 0, Math.PI * 2);
    ctx.stroke();
    
    // 3. Furos circulares internos (Estilo mecânico industrial)
    const holeCount = 5;
    const holeRadius = innerR * 0.2;
    const dist = innerR * 0.5;
    for(let i=0; i<holeCount; i++){
        const a = (Math.PI * 2 * i) / holeCount;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * dist, Math.sin(a) * dist, holeRadius, 0, Math.PI * 2);
        ctx.stroke();
    }

    // 4. Eixo central
    ctx.beginPath();
    ctx.arc(0, 0, innerR * 0.15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    gears = [
        // Canto Superior Esquerdo
        {x: 80, y: 80, r: 100, t: 14, op: 0.1, p: 0},
        {x: 200, y: 60, r: 50, t: 10, op: 0.08, p: 1},
        {x: 60, y: 220, r: 70, t: 12, op: 0.05, p: 2},
        // Canto Inferior Direito
        {x: width-100, y: height-100, r: 120, t: 18, op: 0.12, p: 3},
        {x: width-240, y: height-80, r: 60, t: 12, op: 0.07, p: 4},
        {x: width-80, y: height-240, r: 80, t: 14, op: 0.09, p: 5}
    ];
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    gears.forEach(g => {
        g.p += 0.01;
        let currentOp = g.op + (Math.sin(g.p) * 0.05);
        drawComplexGear(g.x, g.y, g.r, g.t, Math.max(0.02, currentOp));
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
animate();
