# Product

## Register

brand

## Users

The portfolio serves a few overlapping professional audiences, all arriving with a "should I work with this person?" question:

- **Hiring managers and technical recruiters** evaluating Bruce for a role. They skim first, then dig into specifics. The win is enough signal to reach out for an interview.
- **Senior engineers and potential collaborators** sizing up taste, depth, and what he actually built. They care about the real work and how it was approached.
- **Clients and freelance leads** assessing whether he can be trusted with contract or consulting work.
- **The general professional network** that follows a link from LinkedIn, GitHub, a talk, or a referral and forms a first impression in seconds.

Context of use: usually a quick, often mobile, often skeptical visit. Most visitors decide whether to keep reading within the hero and the first project. The job to be done is to convey credibility and product judgement fast, then make it effortless to go deeper or get in touch.

## Product Purpose

A personal portfolio for Bruce Zhu, a Melbourne software developer working across fintech, Web3, mobile, and supply-chain products. It exists to present his work, experience, and way of thinking with enough clarity and polish that a visitor trusts him with their next role, project, or collaboration.

Success looks like: a visitor understands within seconds who Bruce is and the calibre of his work, scans the projects and experience without friction, and leaves either convinced or in contact. The site itself is evidence: it should demonstrate the engineering discipline and product judgement it claims, on both desktop and mobile, fast and accessible.

## Brand Personality

A calm senior craftsperson. Quiet confidence over spectacle; the work speaks, the design gets out of its way.

- **Voice**: direct, specific, unembellished. States what was built and the role played, without marketing inflation.
- **Tone**: measured and assured. Editorial warmth in the typography, developer-tool precision in the spacing and structure, fintech restraint in how color is rationed.
- **Three words**: precise, grounded, considered.
- **Emotional goal**: the visitor should feel they are looking at someone with good taste and engineering discipline, someone reliable, not someone performing for attention.

## Anti-references

- **Generic SaaS landing page**: no hero-metric templates, no gradient buzzword marketing, no identical icon-heading-text feature-card grids.
- **Flashy 3D or game-like portfolio**: no WebGL spectacle, no heavy or attention-grabbing animation, no gimmicks standing in for substance. (The earlier purple / space / Three.js identity is explicitly retired.)
- **Overstuffed resume dump**: no wall of every past role, no floating tech-logo grids, no dense bullet lists. Curation and judgement over quantity.
- **Trend-chasing over-design**: not loud for the sake of looking current.

## Design Principles

1. **The site is the proof.** Craft, performance, and accessibility are the argument, not decoration around it. If the portfolio claims engineering discipline, it must visibly have it.
2. **Quiet confidence over spectacle.** Earn attention through restraint and precision, not motion or color. Blue is a scarce, meaningful signal, never a wash.
3. **Real work over decoration.** Lead with actual projects, real screenshots, and honest descriptions of the role played. No placeholders, no padding.
4. **Scannable in seconds, rewarding on a second pass.** Respect the skim: clear hierarchy and editorial pacing up top, depth available for those who keep reading.
5. **Fast and reachable everywhere.** Crawlable, semantic, mobile-first, accessible by default. A skeptical visitor on a phone is the design target, not an afterthought.

## Accessibility & Inclusion

- Target **WCAG 2.1 AA**, maintained in both the default dark theme and the complete light theme (contrast holds in both).
- **Reduced motion** is first-class: `prefers-reduced-motion` disables the hero constellation and reveal transforms while keeping all content and theme switching functional. Content is never gated behind animation.
- **Keyboard and screen reader**: navigation anchors reachable, theme toggle and carousel controls labelled, mobile menu dismissible by link and Escape, a single `h1`, real section headings, meaningful alt text. No meaningful copy hidden inside canvas or animation-only layers.
- Touch targets at least 38px (44px preferred); no tiny-dots-only controls on mobile.
