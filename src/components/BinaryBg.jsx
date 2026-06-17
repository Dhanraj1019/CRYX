import { useRef, useEffect, useState } from 'react';

function BinaryBg() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const cols = 40, rows = 25;
    const chars = Array.from({ length: cols * rows }, () => ({
      val: Math.random() > 0.5 ? '1' : '0',
      flipTimer: Math.random() * 100
    }));

    const handleMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove);

    let raf;
    const draw = () => {
      const cellW = w / cols, cellH = h / rows;
      ctx.clearRect(0, 0, w, h);

      chars.forEach((c, idx) => {
        const i = Math.floor(idx / rows);
        const j = idx % rows;
        const x = i * cellW + cellW / 2;
        const y = j * cellH + cellH / 2;

        c.flipTimer--;
        if (c.flipTimer <= 0) {
          c.val = Math.random() > 0.5 ? '1' : '0';
          c.flipTimer = 60 + Math.random() * 120;
        }

        const dx = mouseRef.current.x - x, dy = mouseRef.current.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 130;
        let alpha = 0.15, size = 14, color = '#1d4a3a';

        if (dist < radius) {
          const t = 1 - dist / radius;
          alpha = 0.15 + t * 0.85;
          size = 14 + t * 10;
          color = `rgb(${Math.round(29 + t * 70)},${Math.round(158 + t * 97)},${Math.round(117 + t * 138)})`;
        }

        ctx.font = `${size}px monospace`;
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(c.val, x, y);
      });
      ctx.globalAlpha = 1;
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
      style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#000' }}
    />
  );
}

export default BinaryBg;

