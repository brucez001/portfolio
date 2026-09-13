'use client';

import { useEffect, useRef } from 'react';
import { type ContactMoonScene, createContactMoonScene } from './contact-moon-scene';

export function ContactMoon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = canvas?.closest<HTMLElement>('.contact-stage');
    if (!canvas || !stage) return;

    let scene: ContactMoonScene | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible && !scene) scene = createContactMoonScene(canvas, stage);
        scene?.setVisible(visible);
      },
      { rootMargin: '480px 0px' },
    );
    observer.observe(stage);

    return () => {
      observer.disconnect();
      scene?.dispose();
    };
  }, []);

  return <canvas aria-hidden="true" className="contact-moon" ref={canvasRef} />;
}
