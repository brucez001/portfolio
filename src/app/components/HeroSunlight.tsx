'use client';

import { useEffect, useRef } from 'react';

export function HeroSunlight() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const hero = scene?.closest('.hero');
    if (!scene || !hero) return;

    let isVisible = false;
    const updatePlayback = () => {
      scene.dataset.running = String(isVisible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(hero);
    document.addEventListener('visibilitychange', updatePlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updatePlayback);
    };
  }, []);

  return (
    <div aria-hidden="true" className="hero-earth" ref={sceneRef}>
      <div className="hero-earth-image" />
      <div className="hero-cloud-shadow" />
      <div className="hero-sun-rays hero-sun-rays-wide" />
      <div className="hero-sun-rays hero-sun-rays-fine" />
      <div className="hero-water-light" />
      <div className="hero-earth-veil" />
    </div>
  );
}
