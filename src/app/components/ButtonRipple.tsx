'use client';

import { useEffect } from 'react';

export function ButtonRipple() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const spawn = (button: HTMLElement, clientX: number | null, clientY: number | null) => {
      if (reduced.matches) return;
      const rect = button.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const x = clientX === null ? rect.width / 2 : clientX - rect.left;
      const y = clientY === null ? rect.height / 2 : clientY - rect.top;
      const radius = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));

      const ripple = document.createElement('span');
      ripple.className = 'button-ripple';
      ripple.style.height = `${radius * 2}px`;
      ripple.style.left = `${x - radius}px`;
      ripple.style.top = `${y - radius}px`;
      ripple.style.width = `${radius * 2}px`;
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
      button.appendChild(ripple);
    };

    const findButton = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLElement>('.button') : null;

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const button = findButton(event.target);
      if (!button) return;
      if (event.relatedTarget instanceof Node && button.contains(event.relatedTarget)) return;
      spawn(button, event.clientX, event.clientY);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return;
      const button = findButton(event.target);
      if (button) spawn(button, event.clientX, event.clientY);
    };

    const onClick = (event: MouseEvent) => {
      if (event.detail !== 0) return;
      const button = findButton(event.target);
      if (button) spawn(button, null, null);
    };

    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return null;
}
