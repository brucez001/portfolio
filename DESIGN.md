---
version: alpha
name: Bruce Zhu Portfolio Design System
description: A polished personal portfolio for a Melbourne software developer working across fintech, Web3, mobile, and supply-chain products. The visual language combines editorial serif typography, developer-tool precision, restrained fintech trust, and quiet interactive detail. The default experience is dark, with a complete light theme.
---

# Bruce Zhu Portfolio Design System

## 1. Visual Theme & Atmosphere

This site should feel like a senior software developer's personal operating surface: calm, precise, technical, and personal without becoming decorative. It is not a startup landing page, not a game-like 3D portfolio, and not a generic SaaS hero.

The strongest direction comes from the supplied HTML reference:

- Dark-first canvas with a soft blue accent.
- Editorial serif display type paired with a practical sans.
- Thin borders, subtle glass navigation, restrained cards, and a dotted technical texture.
- Light mode that feels warm and paper-like rather than pure white.
- Project and experience sections that are easy to scan.

Design tone blend:

- Editorial warmth from Claude-like serif display systems.
- Developer precision from Vercel-like spacing, restraint, and strict component rules.
- Operational calm from Linear-like minimalism and low visual noise.
- Trust-focused fintech clarity from Coinbase-like blue accent usage.

The final result should feel premium but not loud: a portfolio that suggests good taste, engineering discipline, and product judgement.

## 2. Brand Principles

1. Quiet confidence over spectacle.
2. Real work over decoration.
3. Serif for personality, sans for utility.
4. Blue as a precise signal, not a wash over the whole UI.
5. Motion should clarify hierarchy or interaction; it should not become the product.
6. Keep content crawlable, semantic, and fast.

## 3. Color Palette & Roles

Use CSS custom properties so theme switching is simple and consistent.

### Dark Theme

| Token | Hex / Value | Role |
| --- | --- | --- |
| `--bg` | `#0c0e12` | Page background |
| `--bg-elevated` | `#13161c` | Soft section and input background |
| `--bg-card` | `#101318` | Project cards, carousel cards |
| `--bg-nav` | `rgba(12, 14, 18, 0.88)` | Solid nav fallback |
| `--nav-glass` | `rgba(12, 14, 18, 0.30)` | Fixed glass nav |
| `--nav-glass-border` | `rgba(140, 160, 220, 0.05)` | Nav divider |
| `--bg-mobile` | `rgba(12, 14, 18, 0.97)` | Mobile menu overlay |
| `--text-primary` | `#e2e6ed` | Main text and headings |
| `--text-secondary` | `#8a92a1` | Body copy |
| `--text-muted` | `#4d5566` | Labels, metadata, placeholders |
| `--accent` | `#6b9eff` | Primary action, links, active indicators |
| `--accent-secondary` | `#4a7de0` | Hover/pressed accent |
| `--accent-dim` | `rgba(107, 158, 255, 0.10)` | Tag and wash backgrounds |
| `--accent-dim-hover` | `rgba(107, 158, 255, 0.18)` | Hover glow/wash |
| `--border` | `rgba(140, 160, 200, 0.07)` | Default hairline |
| `--border-hover` | `rgba(140, 160, 200, 0.14)` | Hover hairline |
| `--selection-bg` | `#6b9eff` | Text selection |
| `--selection-text` | `#0c0e12` | Text on selection |
| `--toggle-bg` | `#1e2330` | Theme toggle background |
| `--toggle-icon` | `#6b9eff` | Theme toggle icon |
| `--card-shadow` | `0 8px 30px rgba(0, 0, 0, 0.20)` | Hover card elevation |
| `--dot-color` | `rgba(140, 160, 200, 0.045)` | Background dot texture |

### Light Theme

| Token | Hex / Value | Role |
| --- | --- | --- |
| `--bg` | `#f8f7f4` | Warm paper canvas |
| `--bg-elevated` | `#efede8` | Soft section and input background |
| `--bg-card` | `#ffffff` | Project cards, carousel cards |
| `--bg-nav` | `rgba(248, 247, 244, 0.88)` | Solid nav fallback |
| `--nav-glass` | `rgba(248, 247, 244, 0.35)` | Fixed glass nav |
| `--nav-glass-border` | `rgba(30, 40, 80, 0.06)` | Nav divider |
| `--bg-mobile` | `rgba(248, 247, 244, 0.97)` | Mobile menu overlay |
| `--text-primary` | `#1a1a2e` | Main text and headings |
| `--text-secondary` | `#4a4e69` | Body copy |
| `--text-muted` | `#8b8fa3` | Labels, metadata, placeholders |
| `--accent` | `#2d5bd7` | Primary action, links, active indicators |
| `--accent-secondary` | `#1e45b0` | Hover/pressed accent |
| `--accent-dim` | `rgba(45, 91, 215, 0.07)` | Tag and wash backgrounds |
| `--accent-dim-hover` | `rgba(45, 91, 215, 0.13)` | Hover glow/wash |
| `--border` | `rgba(20, 20, 60, 0.09)` | Default hairline |
| `--border-hover` | `rgba(20, 20, 60, 0.16)` | Hover hairline |
| `--selection-bg` | `#2d5bd7` | Text selection |
| `--selection-text` | `#ffffff` | Text on selection |
| `--toggle-bg` | `#e8e5de` | Theme toggle background |
| `--toggle-icon` | `#2d5bd7` | Theme toggle icon |
| `--card-shadow` | `0 8px 30px rgba(20, 20, 60, 0.07)` | Hover card elevation |
| `--dot-color` | `rgba(20, 20, 60, 0.04)` | Background dot texture |

### Color Rules

- Use the blue accent for CTAs, active carousel dots, tags, links, and small highlights.
- Do not flood backgrounds with blue or blue gradients.
- Avoid purple, neon cyan, hot pink, and heavy multicolor gradients from the old design.
- Keep dark mode dominant and light mode equally complete.
- Borders should be visible only when they structure the layout.

## 4. Typography Rules

### Font Families

Use these public web fonts:

- Display: `DM Serif Display`, Georgia, serif.
- Body/UI: `Instrument Sans`, -apple-system, BlinkMacSystemFont, `Segoe UI`, sans-serif.
- Mono, when needed: `ui-monospace`, `SFMono-Regular`, `Menlo`, `Monaco`, monospace.

### Type Hierarchy

| Role | Font | Size | Weight | Line height | Letter spacing | Use |
| --- | --- | --- | --- | --- | --- | --- |
| Hero display | Serif | `clamp(3rem, 6.5vw, 5rem)` | 400 | 1.08 | 0 | Main hero headline |
| Section title | Serif | `clamp(2rem, 4vw, 3rem)` | 400 | 1.2 | 0 | Section headings |
| Card title | Serif | `1.3rem - 1.5rem` | 400 | 1.25 | 0 | Project/experience names |
| Body | Sans | `0.95rem - 1rem` | 400 | 1.75-1.9 | 0 | Main copy |
| Body small | Sans | `0.85rem - 0.9rem` | 400 | 1.6-1.75 | 0 | Cards and descriptions |
| UI label | Sans | `0.72rem - 0.82rem` | 500-600 | 1.4 | `0.08em - 0.18em` | Nav, section labels, buttons |
| Caption | Sans | `0.68rem - 0.75rem` | 500 | 1.4 | `0.06em - 0.12em` | Tags, metadata |

### Typography Rules

- Serif display type should be regular weight only.
- Do not bold serif headings.
- Keep letter spacing at `0` for readable headings and body.
- Use uppercase tracking only for functional labels, nav items, buttons, and metadata.
- Body copy should feel relaxed and editorial, not dashboard-dense.

## 5. Layout Principles

### Spacing System

Base unit: 4px.

| Token | Value | Use |
| --- | --- | --- |
| `--space-1` | 4px | Hairline offsets, tiny gaps |
| `--space-2` | 8px | Tags, compact controls |
| `--space-3` | 12px | Small internal gaps |
| `--space-4` | 16px | Standard internal spacing |
| `--space-6` | 24px | Card padding and layout gaps |
| `--space-8` | 32px | Larger card padding |
| `--space-12` | 48px | Section sub-layout gaps |
| `--space-section` | 96px / 112px | Desktop section padding |

### Grid & Container

- Global content max width: `1100px`.
- Wide media can expand only when it is the primary content.
- Section padding: `7rem 3rem` desktop, `5rem 1.5rem` mobile.
- Hero minimum height: about `88vh`, leaving a hint of following content on common viewports.
- About: `280px / 1fr` grid on desktop, stacked on mobile.
- Experience: `1fr / 1fr` grid on desktop, stacked on mobile.
- Projects: vertical list of alternating two-column rows, stacked on mobile.
- Contact: two-column content/form split, stacked on mobile.

### Whitespace Philosophy

Use generous vertical rhythm and compact controls. The site should scan as a series of well-paced editorial sections, not as a grid of floating cards.

## 6. Background, Texture & Media

### Background Texture

Use a fixed dotted radial texture:

```css
background-image: radial-gradient(var(--dot-color) 1px, transparent 1px);
background-size: 28px 28px;
```

The texture should remain subtle. It should never compete with text or project screenshots.

### Hero Canvas

The hero may use a lightweight constellation canvas:

- Dots and connecting lines only.
- Accent color changes with theme.
- Particle count capped by viewport area.
- Must respect `prefers-reduced-motion`.
- Must not block first meaningful paint or primary content rendering.

Avoid WebGL/Three.js in the hero unless there is a clear performance budget and browser verification proves it is worth the cost.

### Photography & Screenshots

- Use the existing `public/assets/photo.png` for the about image if it works with the new crop.
- Use actual project screenshots where available:
  - `public/assets/projects/itrazo/itrazo_adi.png`
  - `public/assets/projects/fc/fc_login.png`
  - `public/assets/projects/coinjar/cj_learn.png`
- Prefer real product screenshots over abstract placeholders.
- Keep image radius at 8px or less unless the component is circular.
- Add meaningful alt text.

## 7. Components

### Navigation

Fixed top navigation:

- Height: content-driven, around 64px at top.
- Padding: `1rem 3rem`, shrinking to `0.75rem 3rem` after scroll.
- Mobile padding: `0.8rem 1.5rem`, shrinking to `0.65rem 1.5rem`.
- Background: `var(--nav-glass)` with `backdrop-filter: blur(24px) saturate(1.4)`.
- Border: `1px solid var(--nav-glass-border)` on bottom.
- Brand: `BZ.` in serif, accent dot.
- Desktop links: small uppercase sans labels.
- Mobile: hamburger opens a full-screen themed overlay.

Do not use a logo image for the primary brand mark unless it is redesigned to match this system.

### Theme Toggle

Circular icon button:

- Size: 38px by 38px.
- Radius: 50%.
- Border: `1px solid var(--border-hover)`.
- Background: `var(--toggle-bg)`.
- Icon color: `var(--toggle-icon)`.
- Hover: small scale and accent border.

Persist theme to `localStorage` and initialize from saved preference, falling back to system preference.

### Buttons

Primary CTA:

- Inline flex, gap 8px.
- Font: sans, `0.82rem`, 600, uppercase, `0.06em`.
- Background: `var(--accent)`.
- Text: `var(--bg)`.
- Border: `1px solid var(--accent)`.
- Radius: 6px.
- Padding: `0.75rem 1.6rem`.
- Hover: `var(--accent-secondary)`, translateY(-1px), subtle accent shadow.

Secondary link button:

- Background: `var(--bg-nav)`.
- Border: `1px solid var(--border)`.
- Radius: 6px.
- Text: `var(--text-muted)`.
- Hover: text to `var(--text-secondary)`, border to `var(--border-hover)`.

### Cards

General card rules:

- Radius: 6px or 8px.
- Border: `1px solid var(--border)`.
- Background: `var(--bg-card)` or transparent depending on context.
- Hover: only border change and subtle shadow.
- Do not nest cards inside cards.
- Do not use large soft blobs, orbs, or decorative gradient backgrounds.

### Section Headers

Each major section should use:

- Small uppercase label, e.g. `01 - Introduction`.
- Serif title.
- Enough bottom margin to make the following content feel intentional.

### Experience Carousel

The carousel is a compact product-like control, not a flashy slider.

- Card with border and `var(--bg-card)`.
- Slide body above screenshot/media.
- Dot indicators: 6px circles, accent for active.
- Arrows: 32px circular border buttons.
- No autoplay unless explicitly requested.
- Keyboard accessible controls.

### Project Rows

Projects should be a vertical list, not a masonry grid.

- Desktop: two-column row, screenshot and content.
- Alternate image/content order on even rows.
- Mobile: image first, then content.
- Image aspect ratio: 4/3.
- Tags: small accent-dim capsules, 4px radius.

### Forms

Inputs and textareas:

- Background: `var(--bg-elevated)`.
- Border: `1px solid var(--border)`.
- Radius: 6px.
- Padding: `0.8rem 1rem`.
- Focus: accent border, `var(--bg-card)` background.
- Labels: uppercase sans labels.

The contact form must have real labels, not placeholder-only labels.

## 8. Motion & Interaction

Motion should be quiet:

- Reveal: opacity + translateY(20px) to rest.
- Duration: 0.7s.
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- Theme transitions: background, color, border-color, shadow over 0.45s.
- Hover lift: max 1px for cards/buttons.

Respect `prefers-reduced-motion`:

- Disable particle animation or reduce it to static dots.
- Disable reveal transforms.
- Keep theme switching functional.

## 9. Accessibility & SEO

- Use semantic sections with stable IDs: `home`, `about`, `experience`, `projects`, `contact`.
- One `h1` only.
- Section titles should be real headings.
- Navigation anchors must be keyboard reachable.
- Theme toggle and carousel controls need `aria-label`.
- Mobile menu must be dismissible by link click and ideally by Escape.
- Do not hide meaningful copy inside canvas, images, or animation-only layers.
- Use Next.js metadata for title, description, Open Graph, and Twitter card.
- Use optimized images and real dimensions.
- Maintain contrast in both themes.

## 10. Responsive Behavior

| Breakpoint | Width | Behavior |
| --- | --- | --- |
| Mobile | `< 768px` | Hamburger nav, stacked sections, single-column projects, form fields stacked |
| Tablet | `768px - 1024px` | Some two-column layouts may remain, reduce gaps and card padding |
| Desktop | `> 1024px` | Full nav, two-column about/experience/contact, alternating project rows |
| Wide | `> 1440px` | Keep content capped near 1100px; do not stretch text lines |

Touch targets:

- Icon buttons should be at least 38px by 38px; 44px preferred where layout allows.
- Text buttons need enough horizontal padding for reliable taps.
- Avoid tiny carousel dots as the only control on mobile; keep arrows or swipe support.

## 11. Do's and Don'ts

### Do

- Use dark mode as the primary showcase.
- Keep blue scarce and meaningful.
- Use serif headings to create personality.
- Use real screenshots and the existing headshot where possible.
- Use thin borders and low-alpha surfaces.
- Keep client components isolated to actual interactivity.
- Verify mobile text wrapping and button fit.

### Don't

- Do not keep the old purple/space/Three.js visual identity unless a specific element earns its place.
- Do not use oversized marketing hero copy.
- Do not use decorative gradient blobs, one-note purple palettes, or glass cards everywhere.
- Do not make every section a card.
- Do not turn the tech stack into a wall of floating logos.
- Do not use placeholder testimonials.
- Do not use animations that make content slower to read.

## 12. Agent Prompt Guide

When asking an AI coding agent to build or revise UI in this repo, use prompts like:

> Use `DESIGN.md` as the visual source of truth. Build a dark-first Next.js portfolio section with DM Serif Display headings, Instrument Sans body, subtle blue accent, 8px-or-less radii, thin themed borders, and no decorative gradient blobs.

> Convert this component to follow the portfolio design system: server component by default, semantic headings, theme tokens from `DESIGN.md`, accessible controls, and responsive layout that does not overlap on mobile.

> Review this UI against `DESIGN.md`: check typography, color usage, spacing, component shape, accessibility, reduced motion, and whether it still feels like a calm developer/fintech portfolio.

## 13. Source Notes

This file is customized for Bruce Zhu's portfolio. It uses the supplied HTML template as the primary style reference, then adapts the `DESIGN.md` pattern from public design-system libraries:

- `DESIGN.md` as a root markdown design system file for AI agents.
- Sections for theme, colors, typography, components, layout, elevation, responsive behavior, and agent prompts.
- Tone influences from developer tools, productivity tools, and fintech references, customized instead of copied.
