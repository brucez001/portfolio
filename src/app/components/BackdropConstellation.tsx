'use client';

import { useEffect, useRef, useState } from 'react';

type Star = {
  phase: number;
  radius: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

const getAccent = (theme: string | undefined) =>
  theme === 'light' ? { r: 45, g: 91, b: 215 } : { r: 107, g: 158, b: 255 };

export function BackdropConstellation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector('.hero');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setIsPastHero(rect.bottom < window.innerHeight * 0.35);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let height = 0;
    let stars: Star[] = [];
    let time = 0;
    let width = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createStars = () => {
      const count = Math.min(Math.floor((width * height) / 16000), 80);
      stars = Array.from({ length: count }, () => ({
        phase: Math.random() * Math.PI * 2,
        radius: Math.random() * 1.3 + 0.6,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        x: Math.random() * width,
        y: Math.random() * height,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const accent = getAccent(document.documentElement.dataset.theme);
      const colorRgb = `${accent.r},${accent.g},${accent.b}`;
      const maxDistance = 150;
      const animating = !reducedMotionQuery.matches;

      if (animating) {
        time += 0.0006;
      }

      for (let index = 0; index < stars.length; index += 1) {
        const star = stars[index];

        if (animating) {
          star.vx += Math.sin(time + star.phase) * 0.0004;
          star.vy += Math.cos(time * 0.8 + star.phase) * 0.0004;
          star.vx *= 0.996;
          star.vy *= 0.996;
          star.x += star.vx;
          star.y += star.vy;

          if (star.x < 0 || star.x > width) star.vx *= -1;
          if (star.y < 0 || star.y > height) star.vy *= -1;
          star.x = Math.max(0, Math.min(width, star.x));
          star.y = Math.max(0, Math.min(height, star.y));
        }

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${colorRgb},0.38)`;
        context.fill();

        for (let next = index + 1; next < stars.length; next += 1) {
          const target = stars[next];
          const dx = star.x - target.x;
          const dy = star.y - target.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.09;
            context.beginPath();
            context.moveTo(star.x, star.y);
            context.lineTo(target.x, target.y);
            context.strokeStyle = `rgba(${colorRgb},${alpha})`;
            context.lineWidth = 0.6;
            context.stroke();
          }
        }
      }

      if (animating) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const reset = () => {
      resize();
      createStars();
    };

    reset();
    draw();

    window.addEventListener('resize', reset);
    reducedMotionQuery.addEventListener('change', reset);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', reset);
      reducedMotionQuery.removeEventListener('change', reset);
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      className="backdrop-constellation"
      data-visible={isPastHero}
      ref={canvasRef}
    />
  );
}
