# MobilityTrailblazers.de

Public website for the **Mobility Trailblazers** initiative – a curated award highlighting people who are rebuilding the mobility backbone of the DACH region.

---

![Lighthouse Performance](https://img.shields.io/badge/Performance-98%25-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-95%25-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-92%25-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse SEO](https://img.shields.io/badge/SEO-100%25-brightgreen?style=for-the-badge&logo=lighthouse)

![Astro](https://img.shields.io/badge/Astro-5.13-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?style=for-the-badge)

---

## Overview

This repository contains the code for **mobilitytrailblazers.de**, the public, content-focused site for the Mobility Trailblazers award.

The goals are:

- Present the **Mobility Trailblazers 2025** cohort in a clear, credible way  
- Provide journalists, partners and visitors with a fast, stable reference  
- Offer a maintainable, auditable codebase that can be reused for future award cycles

The site is intentionally conservative on moving parts: static generation, minimal runtime dependencies, and a narrow, well-defined feature set.

---

## Award context

The Mobility Trailblazers program is an initiative centred on the DACH region (Germany, Austria, Switzerland). It highlights individuals driving the mobility transition across:

- Established companies  
- Start-ups and catalytic organisations  
- Public sector, regulation and policy

This repository covers the **public-facing website** (storytelling, profiles, legal pages, simple interactions). Internal jury, voting and back-office tools live in separate systems.

---

## Architecture & stack

The project is built as a modern Jamstack site:

- **Astro 5.13** – Static Site Generation, islands architecture
- **TypeScript (strict)** – Type-safe components and data modules
- **Tailwind CSS v4** – Utility-first styling with a small design system on top
- **PWA support** – Installable, offline-friendly experience
- **Global edge hosting** – Deployed to a CDN/edge platform (e.g. Cloudflare Pages)

Design principles:

- **Static by default** – All pages are pre-rendered; only targeted islands use client-side JS
- **Predictable build artefacts** – One `dist/` folder, no surprise runtime behaviour
- **Small surface area** – No server-side logic, no custom backend in this repo

---

## Repository structure

High-level layout:

```bash
mt-v2/
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── AboutSection.astro
│   │   ├── Criteria.astro
│   │   ├── JurySection.astro
│   │   ├── TrailblazersSection.astro
│   │   ├── Newsletter.astro
│   │   ├── NominationForm.astro
│   │   ├── LinkedInFeed.astro
│   │   ├── SEO.astro
│   │   └── ...
│   ├── data/
│   │   └── trailblazers.ts        # Typed data for honourees
│   ├── layouts/
│   │   └── Layout.astro           # Base document shell
│   ├── pages/
│   │   ├── index.astro            # Landing page
│   │   ├── danke-nominierung.astro
│   │   ├── danke-newsletter.astro
│   │   ├── datenschutz.astro
│   │   ├── impressum.astro
│   │   └── shop.astro             # Optional merch/partners surface
│   └── styles/
│       └── global.css             # Global overrides & micro-animations
├── public/                        # Static assets
├── tests/                         # Playwright E2E tests
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
Each major section of the site is a dedicated component with explicit props and minimal logic. Content and configuration are separated where possible (src/data).

Design system
The brand is implemented as a small set of design tokens and patterns, rather than a full-blown UI framework.

Color tokens
Example palette (names are conceptual):

--mt-color-primary: #003C3D – dark teal, core brand colour

--mt-color-accent: #C1693C – orange accent

--mt-color-bg: #F8F0E3 – light beige background

--mt-color-text: #302C37 – primary text

--mt-color-accent-soft: #B86F52 – hover / emphasis

These are wired through Tailwind’s config so they can be reused consistently in utilities.

Typography
Headings: geometric sans (e.g. Poppins / Trebuchet MS) with optional gradient treatments for key sections

Section labels: secondary sans (e.g. Cabin) for hierarchy

Body: system-friendly sans (e.g. Roboto) at comfortable reading size (around 18px)

Interaction & motion
Subtle entry animations for sections, staggered where it helps orientation

Hover and focus states that are both keyboard- and pointer-friendly

Decorative wave separators and dots are purely presentational and do not interfere with semantics

The goal is readability first, with “award” styling layered on top, not the other way round.

Local development
Prerequisites
Node.js 18+

npm or yarn

Setup
bash
Copy code
git clone https://github.com/nicolasestrem/mt-v2.git
cd mt-v2
npm install
Start the dev server:

bash
Copy code
npm run dev
By default Astro runs at:

text
Copy code
http://localhost:4321
Configuration
Most configuration lives in standard Astro/Tailwind files, plus a few integration points.

Forms (Web3Forms)
Nomination and contact forms use Web3Forms:

Create an account at: https://web3forms.com

Obtain your access key

Open src/components/NominationForm.astro

Replace the placeholder access key with your own

Analytics (optional)
Google Analytics 4 is wired via environment variables. For local development:

bash
Copy code
cp .env.example .env   # if provided
Then set:

env
Copy code
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
LinkedIn feed
The LinkedIn section is implemented as an embeddable widget:

Open src/components/LinkedInFeed.astro

Insert your own embed code or widget ID as described in the component comments

No business logic is attached to this; it’s a presentational convenience.

Production build & deployment
Build
Create a static build:

bash
Copy code
npm run build
Preview the built site locally:

bash
Copy code
npm run preview
The build artefacts are generated in the dist/ directory and can be served by any static host.

Cloudflare Pages (recommended)
Typical configuration:

Build command: npm run build

Output directory: dist

Environment: Node 18+

You can either:

Connect the GitHub repository and let Cloudflare build on push, or

Build locally and upload the dist/ directory via the Pages dashboard

Attach the mobilitytrailblazers.de domain (and any aliases) in the Cloudflare UI. TLS is handled automatically.

Testing & quality
The project includes a pragmatic test setup focused on:

Core navigation and content availability

Form submission flows

Accessibility basics (headings, ARIA, focus management)

Regression coverage for key pages

Typical commands:

bash
Copy code
# Full test run
npm test

# Critical subset (useful for CI)
npm run test:pr

# Playwright with UI
npx playwright test --ui

# View the last HTML test report
npx playwright show-report
Lighthouse CI can be integrated in the deployment pipeline to enforce minimum performance / accessibility thresholds.

Security, privacy & accessibility
Static site: no custom backend, minimal attack surface

Strict HTTPS and modern security headers via hosting provider

GDPR-aware analytics:

Consent banner (e.g. via Tarteaucitron.js)

Google Consent Mode v2 integration

Accessibility:

WCAG-conscious colour contrast

Semantic HTML structure

Keyboard-friendly navigation and focus styles

The emphasis is on not being clever here: fewer moving parts, less to break.

Conventions
A few rules of thumb for contributions or future iterations:

Use TypeScript everywhere; no untyped JS in src/

Prefer Astro components over React/Vue unless there is a clear need for interactivity

Keep pages thin; push repeated UI into src/components/

Keep data files (src/data) serialisable and typed

Avoid adding runtime dependencies unless they solve a real problem

If the award concept evolves (new categories, more content types), model them as typed data + simple presentational components first.

License
Copyright © 2024–2025
Mobility Trailblazers Initiative & partners.
All rights reserved.

Copy code
