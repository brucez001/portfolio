# AGENTS.md

This file guides AI coding agents working in this repository.

## Project

Bruce Zhu's portfolio site. The current app is a Next.js App Router project using React, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, and Vercel analytics.

The active product direction is a full UI redesign based on the provided HTML reference: editorial serif/sans typography, restrained dark/light themes, subtle dotted texture, compact glass navigation, high performance, strong SEO, and polished responsive sections.

## AI-Driven Development

This repository is maintained through AI-assisted development. When planning implementation work, assume an LLM coding agent will do the execution unless the user explicitly says otherwise.

- Write plans as agent-executable work, with clear file areas, expected behavior, verification steps, and acceptance criteria.
- Prefer concrete implementation steps over human handoff language like "the developer should".
- Ask the user only for product decisions, credentials, external access, or tradeoffs that cannot be resolved from repository context.
- Keep tasks scoped so an agent can implement, verify, and report the result without requiring manual follow-up.
- Do not lower engineering standards because the work is AI-executed; keep build, lint, browser verification, accessibility, SEO, and performance requirements intact.

## Repository Setup

- Branch for the redesign: `codex-ui-redesign`.
- Package manager: npm.
- Main app code: `src/app`.
- Static assets: `public`.
- Visual design source of truth: `DESIGN.md`.
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
