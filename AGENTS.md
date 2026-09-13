# AGENTS.md

This file guides AI coding agents working in this repository.

## Project

Bruce Zhu's portfolio site. The current app is a Next.js App Router project using React, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, and Vercel analytics.

The active product direction is a full UI redesign based on the provided HTML reference: editorial serif/sans typography, restrained dark/light themes, subtle dotted texture, compact glass navigation, high performance, strong SEO, and polished responsive sections.

## Design Context

Register: `brand` (a personal portfolio: design IS the product). See `PRODUCT.md` for the full strategic layer (audience, purpose, personality, anti-references) and `DESIGN.md` for the visual system.

Audience: hiring managers and recruiters, senior engineers and collaborators, freelance leads, and the general professional network, usually skimming, often on mobile, often skeptical. The job is to convey credibility and product judgement fast, then make it easy to go deeper or get in touch.

Personality: a calm senior craftsperson. Quiet confidence over spectacle; the work speaks and the design gets out of its way.

Guiding principles:

1. The site is the proof: craft, performance, and accessibility are the argument, not decoration around it.
2. Quiet confidence over spectacle: blue is a scarce, meaningful signal, never a wash.
3. Real work over decoration: actual projects, real screenshots, honest descriptions of the role played.
4. Scannable in seconds, rewarding on a second pass.
5. Fast and reachable everywhere: a skeptical visitor on a phone is the design target.

Avoid: generic SaaS landing pages (hero-metric templates, buzzword marketing, identical feature-card grids), flashy 3D or game-like portfolios, and overstuffed resume dumps.

## Repository Setup

- Branch for the redesign: `codex-ui-redesign`.
- Package manager: npm.
- Main app code: `src/app`.
- Static assets: `public`.
- Strategic source of truth (who/what/why): `PRODUCT.md`.
- Visual design source of truth (how it looks): `DESIGN.md`.
- Project-scoped agent skills: `.agents/skills`.
- Skill lockfile: `skills-lock.json`.

## Commands

- Install dependencies: `npm install`
- Start local dev server: `npm run dev`
- Production build: `npm run build`
- Lint: `npm run lint`

Run `npm run build` before claiming production readiness. Use browser verification for meaningful frontend changes.

## Skill Usage

Use the project-scoped skills before relevant work:

- `frontend-design`: before major UI redesign, component styling, layout, typography, and visual direction work.
- `web-design-guidelines`: for UI, accessibility, and UX review of changed frontend files.
- `vercel-react-best-practices`: when writing or reviewing React/Next performance-sensitive UI.
- `accelint-nextjs-best-practices`: when changing Next.js App Router structure, metadata, server/client component boundaries, routing, or performance.
- `accelint-ts-best-practices`: when adding or refactoring TypeScript types and component contracts.

Prefer project-scoped skills only. Do not install user-global skills for this repo unless the user explicitly asks.

## Engineering Rules

- Keep Next.js unless there is a concrete reason to migrate.
- Follow `DESIGN.md` for all visual design decisions.
- Default to Server Components. Add `'use client'` only for state, effects, browser APIs, animation event handling, forms, or canvas/WebGL.
- Avoid heavy client JavaScript in static content sections.
- Treat SEO and performance as first-class requirements: metadata, semantic headings, image optimization, good alt text, crawlable content, and clean Core Web Vitals.
- Keep UI changes consistent with the selected visual language instead of mixing old and new styles.
- Keep accessibility intact: keyboard navigation, focus states, labels, contrast, reduced-motion behavior, and mobile touch targets.
- Do not delete large parts of the repo just because a rewrite is possible. Remove or replace files deliberately when the new UI no longer needs them.
- Do not revert user changes unless explicitly asked.

## Verification

For UI work, verify at minimum:

- `npm run build`
- `npm run lint` if the script is available and functional
- Browser check on desktop and mobile viewport sizes
- No obvious console errors
- No text overlap or broken responsive layout

When verification cannot run, report the exact blocker.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
