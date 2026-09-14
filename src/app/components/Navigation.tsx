'use client';

import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { NavLink } from '@/app/data';

type NavigationProps = {
  links: NavLink[];
};

type Theme = 'dark' | 'light';

const applyTheme = (nextTheme: Theme) => {
  document.documentElement.dataset.theme = nextTheme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', nextTheme === 'light' ? '#f8f7f4' : '#0c0e12');
  try {
    localStorage.setItem('portfolio-theme', nextTheme);
  } catch {
    // Storage may be unavailable; the theme still applies for this visit.
  }
};

// Reveals the new theme as a circle growing out of the toggle. Browsers without
// view transitions fall back to the CSS colour transitions.
const switchTheme = (nextTheme: Theme, toggle: HTMLElement | null) => {
  const canReveal =
    typeof document.startViewTransition === 'function' &&
    toggle !== null &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!canReveal) {
    applyTheme(nextTheme);
    return;
  }

  const bounds = toggle.getBoundingClientRect();
  const x = bounds.left + bounds.width / 2;
  const y = bounds.top + bounds.height / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const root = document.documentElement;

  root.dataset.themeSwitching = '';
  const transition = document.startViewTransition(() => applyTheme(nextTheme));

  transition.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      {
        duration: 500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  });
  transition.finished.finally(() => {
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
        <a className="nav-brand" href="#home" onClick={closeMenu}>
          BZ<span>.</span>
        </a>

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
