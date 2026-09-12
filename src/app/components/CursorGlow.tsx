'use client';

import { useEffect } from 'react';

export function CursorGlow() {
  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reducedMotion) return;

    const cards = document.querySelectorAll<HTMLElement>('[data-glow]');
    if (cards.length === 0) return;

    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const layer = card.querySelector<HTMLElement>('.glow-layer');
      if (!layer) return;

      let rect: DOMRect | null = null;
      let frameId: number | null = null;
      let latest: { x: number; y: number } | null = null;

      const writeGlow = () => {
        frameId = null;
        if (!latest || !rect) return;
        const x = latest.x - rect.left;
        const y = latest.y - rect.top;
        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };

      const handlePointerMove = (event: PointerEvent) => {
        latest = { x: event.clientX, y: event.clientY };
        if (rect === null) {
          rect = card.getBoundingClientRect();
          writeGlow();
          layer.style.opacity = '1';
          return;
        }
        if (frameId === null) {
          frameId = requestAnimationFrame(writeGlow);
        }
      };

      const handlePointerLeave = () => {
        layer.style.opacity = '0';
        rect = null;
      };

      card.addEventListener('pointermove', handlePointerMove);
      card.addEventListener('pointerleave', handlePointerLeave);

      cleanups.push(() => {
        card.removeEventListener('pointermove', handlePointerMove);
        card.removeEventListener('pointerleave', handlePointerLeave);
        if (frameId !== null) {
          cancelAnimationFrame(frameId);
        }
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
