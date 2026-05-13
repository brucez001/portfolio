'use client';

import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { NavLink } from '@/app/data';

type NavigationProps = {
  links: NavLink[];
};

export function Navigation({ links }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

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

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className={`site-nav${isScrolled ? ' is-scrolled' : ''}`} aria-label="Primary navigation">
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
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="theme-toggle"
            onClick={toggleTheme}
            type="button"
          >
            {theme === 'dark' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
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
