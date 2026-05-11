'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  bright: boolean;
  phase: number;
  radius: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type Color = {
  b: number;
  g: number;
  r: number;
};

const getColor = (theme: string | undefined, type: 'accent' | 'muted'): Color => {
  if (type === 'accent') {
    return theme === 'light' ? { r: 45, g: 91, b: 215 } : { r: 107, g: 158, b: 255 };
  }

  return theme === 'light' ? { r: 139, g: 143, b: 163 } : { r: 77, g: 85, b: 102 };
};

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mouse = { x: -999, y: -999 };
    let animationFrame = 0;
    let height = 0;
    let particles: Particle[] = [];
    let time = 0;
    let width = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      const count = reducedMotionQuery.matches ? 36 : Math.min(Math.floor((width * height) / 7500), 72);
      particles = Array.from({ length: count }, () => ({
        bright: Math.random() > 0.74,
        phase: Math.random() * Math.PI * 2,
        radius: Math.random() * 1.6 + 0.7,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        x: Math.random() * width,
        y: Math.random() * height,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const theme = document.documentElement.dataset.theme;
      const accent = getColor(theme, 'accent');
      const muted = getColor(theme, 'muted');
      const maxDistance = 130;

      if (!reducedMotionQuery.matches) {
        time += 0.001;
      }

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];

        if (!reducedMotionQuery.matches) {
          particle.vx += Math.sin(time + particle.phase) * 0.001;
          particle.vy += Math.cos(time * 0.8 + particle.phase) * 0.001;
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > height) particle.vy *= -1;

          particle.x = Math.max(0, Math.min(width, particle.x));
          particle.y = Math.max(0, Math.min(height, particle.y));

          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 180 && distance > 1) {
            particle.vx += (dx / distance) * 0.007;
            particle.vy += (dy / distance) * 0.007;
          }

          particle.vx *= 0.997;
          particle.vy *= 0.997;
        }

        const color = particle.bright ? accent : muted;
        const alpha = particle.bright ? 0.8 : 0.35;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
        context.fill();

        for (let connectionIndex = index + 1; connectionIndex < particles.length; connectionIndex += 1) {
          const target = particles[connectionIndex];
          const dx = particle.x - target.x;
          const dy = particle.y - target.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const alphaLine = (1 - distance / maxDistance) * 0.12;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(target.x, target.y);
            context.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${alphaLine})`;
            context.lineWidth = 0.6;
            context.stroke();
          }
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const resetMouse = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    const reset = () => {
      resize();
      createParticles();
    };

    reset();
    draw();

    window.addEventListener('resize', reset);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', resetMouse);
    reducedMotionQuery.addEventListener('change', reset);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', reset);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', resetMouse);
      reducedMotionQuery.removeEventListener('change', reset);
    };
  }, []);

  return <canvas aria-hidden="true" className="hero-canvas" ref={canvasRef} />;
}
