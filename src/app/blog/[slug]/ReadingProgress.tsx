'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector('.blog-article');
    if (!article) return undefined;

    let frame = 0;

    const update = () => {
      const rect = article.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const total = rect.height - viewport;
      const passed = -rect.top;
      const ratio = total > 0 ? Math.min(1, Math.max(0, passed / total)) : 0;
      setProgress(ratio);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="blog-progress">
      <div className="blog-progress-fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
