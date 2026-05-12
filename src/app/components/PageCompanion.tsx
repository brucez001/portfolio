'use client';

import { useEffect, useState } from 'react';

type Companion = {
  alt: string;
  className: string;
};

const companions = [
  { alt: 'Tiny astronaut standing on the moon', className: 'is-astronaut' },
  { alt: 'Tiny developer standing on the moon', className: 'is-developer' },
  { alt: 'Tiny shadow character standing on the moon', className: 'is-shadow' },
] as const satisfies readonly Companion[];

const pickCompanion = () => companions[Math.floor(Math.random() * companions.length)] ?? companions[0];

export function PageCompanion() {
  const [companion, setCompanion] = useState<Companion | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setCompanion(pickCompanion()), 0);
    return () => window.clearTimeout(id);
  }, []);

  if (!companion) return null;

  return (
    <div aria-hidden="true" className={`page-companion ${companion.className}`} data-motion="idle">
      <div aria-label={companion.alt} className="companion-sprite" role="img" />
    </div>
  );
}
