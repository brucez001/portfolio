'use client';

import { useEffect, useRef } from 'react';
import { type ContactMoonScene, type ContactMoonVariant, createContactMoonScene } from './contact-moon-scene';

export function ContactMoon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = canvas?.closest<HTMLElement>('.contact-stage');
    if (!canvas || !stage) return;

    let scene: ContactMoonScene | null = null;
    let sceneVariant: ContactMoonVariant | null = null;
    let isVisible = false;
    const updateScene = () => {
      const variant: ContactMoonVariant = document.documentElement.dataset.theme === 'light' ? 'earth' : 'moon';
      if (sceneVariant !== variant) {
        scene?.dispose();
        scene = null;
        sceneVariant = variant;
        // Clear the previous planet while the new texture loads.
        canvas.width = 0;
      }
      if (isVisible && !scene) {
        scene = createContactMoonScene(canvas, stage, variant);
      }
      scene?.setVisible(isVisible);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries.some((entry) => entry.isIntersecting);
        updateScene();
      },
      { rootMargin: '480px 0px' },
    );
    observer.observe(stage);
    const themeObserver = new MutationObserver(updateScene);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      observer.disconnect();
      themeObserver.disconnect();
      scene?.dispose();
    };
  }, []);

  return <canvas aria-hidden="true" className="contact-moon" ref={canvasRef} />;
}
