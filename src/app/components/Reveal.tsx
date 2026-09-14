'use client';

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

type RevealProps = {
  ariaLabelledby?: string;
  as?: 'article' | 'div';
  children: ReactNode;
  className?: string;
  glow?: boolean;
  style?: CSSProperties;
};

export function Reveal({
  ariaLabelledby,
  as: Component = 'div',
  children,
  className = '',
  glow = false,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const setRef = (element: HTMLElement | null) => {
    ref.current = element;
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      aria-labelledby={ariaLabelledby}
      className={`reveal${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      data-glow={glow ? '' : undefined}
      ref={setRef}
      style={style}
    >
      {children}
    </Component>
  );
}
