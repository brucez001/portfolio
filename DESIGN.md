---
version: alpha
name: Bruce Zhu Portfolio Design System
description: A polished personal portfolio for a Melbourne software developer working across fintech, Web3, mobile, and supply-chain products. The visual language combines editorial serif typography, developer-tool precision, restrained fintech trust, and quiet interactive detail. The default experience is dark, with a complete light theme.
---

# Bruce Zhu Portfolio Design System

## 1. Visual Theme & Atmosphere

This site should feel like a senior software developer's personal operating surface: calm, precise, technical, and personal without becoming decorative. It is not a startup landing page, not a game-like 3D portfolio, and not a generic SaaS hero.

The foundation is the supplied editorial HTML reference, evolved with the September 2026 liquid-starlight hero direction:

- Dark-first canvas with a soft blue accent.
- Editorial serif display type paired with a practical sans.
- Thin borders, frosted pill controls, restrained cards, and a dotted technical texture.
- A blue-silver, flowing orbital hero inspired by DeepSeek Harness: expressive atmosphere, quiet readable copy.
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
| Hero display | Serif | `clamp(3.2rem, 5.8vw, 5.3rem)` | 400 | 1.09 | `-0.035em` | Main hero headline; smaller responsive scale on mobile |
| Section title | Serif | `clamp(2rem, 4vw, 3rem)` | 400 | 1.2 | 0 | Section headings |
| Card title | Serif | `1.3rem - 1.5rem` | 400 | 1.25 | 0 | Project/experience names |
| Body | Sans | `0.95rem - 1rem` | 400 | 1.75-1.9 | 0 | Main copy |
| Body small | Sans | `0.85rem - 0.9rem` | 400 | 1.6-1.75 | 0 | Cards and descriptions |
| UI label | Sans | `0.72rem - 0.82rem` | 500-600 | 1.4 | `0.08em - 0.18em` | Nav, section labels, buttons |
| Caption | Sans | `0.68rem - 0.75rem` | 500 | 1.4 | `0.06em - 0.12em` | Tags, metadata |

### Typography Rules

- Serif display type should be regular weight only.
- Do not bold serif headings.
- Keep letter spacing at `0` for body and section headings; the large hero uses `-0.035em`.
- Use uppercase tracking only for functional labels, nav items, and metadata. Buttons use sentence case and restrained tracking.
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
- Hero: centered editorial copy within a centered orbital light field. Desktop uses up to 900px / one small viewport height, growing with content. Mobile keeps the same layered composition, with a wider circular orbit cropped at the edges rather than a separate illustration above the copy.
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

### Hero Atmosphere — Liquid Starlight

The hero is the one expressive space-themed surface. Use a flowing blue-silver orbital light field, not generic blobs or a game scene. Keep light away from the reading plane. In light mode, translate the same form into pale blue ink on warm paper.

- Keep the original drifting particle stars and faint proximity connections behind the hero content, alongside the ring. Use the existing dark background, without added navy haze or static star patterns. The starfield shares the ring's animation clock, pause control, reduced-motion and visibility handling.
- Native WebGL: one quarter-resolution flow-map pass and one atmosphere pass. No Three.js, downloaded textures, video, or new runtime dependency; two small GPU textures retain cursor history.
- Keep the ring anchored at the center. Smooth fine-pointer position and velocity independently; stamp a swept cursor path into a persistent flow map, then use its direction and fading strength to deform and light the material. Do not substitute a point ripple, global parallax, or a detached spotlight. Touch scrolling stays native.
- Render at no more than CSS resolution, capped at 1100 × 850 pixels; flow buffers use one quarter of each dimension. Target up to 60fps during fine-pointer movement, returning to 30fps at rest. Smoothing and trail decay must be time-based, not frame-count based.
- Preserve the restored pre-background ring treatment and cursor flow: soft marbled glow, the original input smoothing, and a free-flowing cloud across the hero. Do not reapply the rejected tighter glow cutoff, capped displacement, or faster tracking without approval.
- Stop the loop offscreen, in a hidden tab, when paused, and for reduced motion. Theme/size changes may redraw a static frame.
- Provide an accessible pause/resume control; reduced motion gets a static composition.
- Static CSS orbit fallback when WebGL is unavailable or lost (until reload); all meaningful content stays in server-rendered HTML.
- Verify dark/light themes and desktop/mobile layout before accepting changes. Technical checks are not visual acceptance.

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

- Width: centered at `calc(100% - 2rem)`, transitioning smoothly from a `1280px` maximum at the top to `1180px` after scroll; mobile remains `calc(100% - 1.5rem)`.
- Height: content-driven, around 64px at top.
- Padding: `1rem 3rem`, shrinking to `0.75rem 3rem` after scroll.
- Mobile padding: `0.8rem 0.75rem`, shrinking to `0.65rem 0.75rem`.
- At the top, the navigation surface is transparent and slightly wider. After scroll, the centered frame contracts into a fully rounded glass pill.
- Background after scroll: `var(--nav-glass)` with `backdrop-filter: blur(40px) saturate(1.4)`.
- Border after scroll: `1px solid var(--nav-glass-border)` around the pill.
- Brand: `BZ.` in serif, accent dot.
- Desktop links: small uppercase sans labels.
- Mobile: hamburger opens a full-screen themed overlay.

Do not use a logo image for the primary brand mark unless it is redesigned to match this system.

### Theme Toggle

Circular icon button:

- Size: 44px by 44px, using the shared control height.
- Radius: 50%.
- Border: `1px solid var(--border-hover)`.
- Background: `var(--toggle-bg)`.
- Icon color: `var(--toggle-icon)`.
- Hover: small scale and accent border.

Persist theme to `localStorage` and initialize from saved preference, falling back to system preference.

### Buttons

Use the shared control tokens in `src/app/buttons.css`:

- `--radius-control`: full pill radius. Icon-only controls remain circular.
- `--control-height`: at least 44px. Use sentence-case sans text, medium weight, and compact icon spacing.
- Primary: pearl surface with dark ink in dark mode; dark ink surface with light text in light mode.
- Secondary: translucent theme-aware glass, thin border, subtle inset highlight, opaque fallback. Use glass on controls and navigation, not every content surface.
- Hover: no more than 1px lift, restrained surface and border change. Use explicit transition properties.
- Keyboard: visible accent outline with offset. Disabled buttons lose hover lift and preserve legibility.
- Support `.button-primary`, `.button-secondary`, social links, and circular navigation controls consistently.
- Mobile action pairs may wrap; no horizontal overflow or undersized touch targets.

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

- Icon buttons must be at least 44px by 44px.
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

- Keep the space identity in the liquid-starlight hero; do not reintroduce the heavy purple/Three.js identity.
- Keep hero copy short, concrete, and editorial; no inflated marketing claims.
- Do not use decorative gradient blobs, one-note purple palettes, or glass cards everywhere.
- Do not make every section a card.
- Do not turn the tech stack into a wall of floating logos.
- Do not use placeholder testimonials.
- Do not use animations that make content slower to read.

## 12. Agent Prompt Guide

When asking an AI coding agent to build or revise UI in this repo, use prompts like:

> Use `DESIGN.md` as the visual source of truth. Build a dark-first Next.js portfolio section with DM Serif Display headings, Instrument Sans body, subtle blue accent, pill-shaped controls, restrained card radii, thin themed borders, and a liquid-starlight hero with a quiet reading plane.

> Convert this component to follow the portfolio design system: server component by default, semantic headings, theme tokens from `DESIGN.md`, accessible controls, and responsive layout that does not overlap on mobile.

> Review this UI against `DESIGN.md`: check typography, color usage, spacing, component shape, accessibility, reduced motion, and whether it still feels like a calm developer/fintech portfolio.

## 13. Source Notes

This file is customized for Bruce Zhu's portfolio. It uses the supplied HTML template as the primary style reference, then adapts the `DESIGN.md` pattern from public design-system libraries:

- `DESIGN.md` as a root markdown design system file for AI agents.
- Sections for theme, colors, typography, components, layout, elevation, responsive behavior, and agent prompts.
- Tone influences from developer tools, productivity tools, and fintech references, customized instead of copied.
