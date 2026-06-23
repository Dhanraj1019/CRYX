import { useRef, useEffect } from 'react';

class Particle {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.val = Math.random() > 0.5 ? '1' : '0';
    this.size = 10 + Math.random() * 5;
    this.life = 1.0;
    this.decay = 0.008 + Math.random() * 0.006;
    this.flipT = 20 + Math.floor(Math.random() * 30);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.97;
    this.vy *= 0.97;
    this.life -= this.decay;
    this.flipT--;
    if (this.flipT <= 0) {
      this.val = Math.random() > 0.5 ? '1' : '0';
      this.flipT = 20 + Math.floor(Math.random() * 30);
    }
    return this.life > 0;
  }

  draw(ctx) {
    const t = this.life;
    ctx.globalAlpha = t * 0.9;
    ctx.fillStyle =
      t > 0.4
        ? `rgb(29,${Math.round(140 + t * 90)},${Math.round(80 + t * 50)})`
        : `rgb(20,100,60)`;
    ctx.font = `${this.size}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.val, this.x, this.y);
  }
}

function BinaryBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    let mx = -500, my = -500, pmx = -500, pmy = -500;
    let spawnDebt = 0;

    const spawnBurst = (x, y, dx, dy) => {
      spawnDebt++;
      if (spawnDebt < 3) return;
      spawnDebt = 0;

      const angle = Math.atan2(dy, dx);
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const spread = (Math.random() - 0.5) * Math.PI * 0.9;
        const a = angle + spread;
        const s = 0.4 + Math.random() * 0.8;
        particles.push(
          new Particle(
            x + (Math.random() - 0.5) * 10,
            y + (Math.random() - 0.5) * 10,
            Math.cos(a) * s,
            Math.sin(a) * s
          )
        );
      }
    };

    const handleMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (pmx > -400) {
        const dx = mx - pmx, dy = my - pmy;
        if (Math.sqrt(dx * dx + dy * dy) > 0.5) spawnBurst(mx, my, dx, dy);
      }
      pmx = mx;
      pmy = my;
    };
    window.addEventListener('mousemove', handleMove);

    const drawCursor = () => {
      if (mx < 0) return;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(mx, my, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(180,255,200,0.95)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(mx, my, 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100,220,160,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    let raf;
    const draw = () => {
      // clear fully transparent — no black fill, page shows through
      ctx.clearRect(0, 0, W, H);

      for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].update()) { particles.splice(i, 1); continue; }
        particles[i].draw(ctx);
      }

      ctx.globalAlpha = 1;
      drawCursor();
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  );
}

export default BinaryBg;