'use client';

import { Menu, Moon, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { NavLink } from '@/app/data';

type NavigationProps = {
  links: NavLink[];
};

type Theme = 'dark' | 'light';

const REVEAL_DURATION = 500;
const REVEAL_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const THEME_BACKGROUND: Record<Theme, string> = { dark: '#0c0e12', light: '#f8f7f4' };

const applyTheme = (nextTheme: Theme) => {
  document.documentElement.dataset.theme = nextTheme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', nextTheme === 'light' ? '#f8f7f4' : '#0c0e12');
  try {
    localStorage.setItem('portfolio-theme', nextTheme);
  } catch {
    // Storage may be unavailable; the theme still applies for this visit.
  }
};

// Engines without the View Transitions API get the same top-right sweep from a
// throwaway overlay painted in the incoming background colour.
const revealWithOverlay = (nextTheme: Theme, x: number, y: number, radius: number) => {
  const overlay = document.createElement('div');
  overlay.className = 'theme-reveal-overlay';
  overlay.style.background = THEME_BACKGROUND[nextTheme];
  overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
  document.body.append(overlay);

  const grow = overlay.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
    { duration: REVEAL_DURATION, easing: REVEAL_EASING, fill: 'forwards' },
  );

  grow.finished
    .then(() => {
      // Swap underneath the fully covered screen, then dissolve the flat colour.
      applyTheme(nextTheme);
      return overlay.animate({ opacity: [1, 0] }, { duration: 200, fill: 'forwards' }).finished;
    })
    .catch(() => applyTheme(nextTheme))
    .finally(() => overlay.remove());
};

// Reveals the new theme as a circle growing out of the toggle in the top-right
// corner. The clip-path is animated from script on `transition.ready` so the
// sweep always begins at radius 0, however long the snapshots take.
const switchTheme = (nextTheme: Theme, toggle: HTMLElement | null) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyTheme(nextTheme);
    return;
  }

  const bounds = toggle?.getBoundingClientRect();
  // Fall back to the top-right corner when the toggle cannot be measured.
  const x = bounds && bounds.width > 0 ? bounds.left + bounds.width / 2 : window.innerWidth - 32;
  const y = bounds && bounds.height > 0 ? bounds.top + bounds.height / 2 : 32;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  if (typeof document.startViewTransition !== 'function') {
    revealWithOverlay(nextTheme, x, y, radius);
    return;
  }

  const root = document.documentElement;
  // Resolve against the snapshot itself: some browser zoom/rendering paths scale
  // pixel clip coordinates differently from the toggle's viewport coordinates.
  const origin = `${(x / window.innerWidth) * 100}% ${(y / window.innerHeight) * 100}%`;
  // A circle's percentage radius uses the reference box's normalized diagonal.
  const radiusPercent = ((radius + 1) / (Math.hypot(window.innerWidth, window.innerHeight) / Math.SQRT2)) * 100;

  root.dataset.themeSwitching = '';

  const transition = document.startViewTransition(() => applyTheme(nextTheme));

  transition.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0% at ${origin})`, `circle(${radiusPercent}% at ${origin})`] },
      {
        duration: REVEAL_DURATION,
        easing: REVEAL_EASING,
        fill: 'forwards',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  }).catch(() => {
    // A newer switch can skip this snapshot; its update still applies.
  });

  transition.finished.then(() => {
    delete root.dataset.themeSwitching;
  }, () => {
    delete root.dataset.themeSwitching;
  });
};

export function Navigation({ links }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const themeToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    const animationFrame = window.requestAnimationFrame(() => {
      setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
      setIsScrolled(window.scrollY > 60);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  // The brand acts as "back to top" without leaving a `#home` hash behind, and
  // clears any section hash the nav links added so the URL returns to its base.
  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    closeMenu();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  };

  const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
  const toggleTheme = () => {
    switchTheme(nextTheme, themeToggleRef.current);
    setTheme(nextTheme);
  };

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={`site-nav${isScrolled ? ' is-scrolled' : ''}${isMenuOpen ? ' is-menu-open' : ''}`}
      >
        <Link className="nav-brand" href="/" onClick={handleBrandClick}>
          BZ<span>.</span>
        </Link>

        <div className="nav-actions">
          <div className="nav-links" aria-label="Page sections">
            {links.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <button
            aria-label={`Switch to ${nextTheme} theme`}
            className="theme-toggle"
            onClick={toggleTheme}
            ref={themeToggleRef}
            title={`Switch to ${nextTheme} theme`}
            type="button"
          >
            {/* Both icons stay mounted; CSS picks one from `data-theme`, so there is no first-paint flash. */}
            <span className="theme-toggle-icons" aria-hidden="true">
              <Moon className="theme-toggle-icon-moon" />
              <Sun className="theme-toggle-icon-sun" />
            </span>
          </button>

          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="menu-toggle"
            onClick={() => setIsMenuOpen((value) => !value)}
            type="button"
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${isMenuOpen ? ' is-open' : ''}`} aria-hidden={!isMenuOpen}>
        {links.map((link) => (
          <a href={link.href} key={link.href} onClick={closeMenu} tabIndex={isMenuOpen ? 0 : -1}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
