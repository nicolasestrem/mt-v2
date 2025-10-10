# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

MobilityTrailblazers.de - Static site built with Astro, migrated from WordPress. €0/month hosting, 0.5s load time (vs 3.8s WordPress).

## Essential Commands

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build for production (outputs to ./dist/)
npm run preview      # Preview production build locally

# Testing
npm test             # Run all Playwright tests
npm run test:pr      # Run critical tests only (Chrome, for PRs)
npm run test:full    # Run all tests on Chrome + Firefox
npx playwright install  # Install/update Playwright browsers
```

## Critical Configuration

### Web3Forms API Key (REQUIRED)
- Get free key at https://web3forms.com/
- Configure in: `NominationForm.astro` (line ~57), `Newsletter.astro` (line ~43)
- Environment variable: `PUBLIC_WEB3FORMS_KEY` in `.env`

### Google Analytics
- Environment variable: `PUBLIC_GA_MEASUREMENT_ID` (default: `G-0C23GHZJQT`)
- Cookie consent required (GDPR compliance via tarteaucitron)

### Deployment to Cloudflare Pages
```bash
npm run build
# Upload dist/ folder to pages.cloudflare.com
# OR connect GitHub repo with build command: npm run build, output: dist
```

## Architecture

### Tech Stack
- **Astro 5.13**: Static site generator, zero JS by default
- **Tailwind CSS v4**: Via Vite plugin
- **TypeScript**: Strict mode
- **Forms**: Web3Forms API (250 free submissions/month)

### Component Architecture
`.astro` files with:
- Frontend code in template
- Server code in frontmatter (`---` blocks)
- Scoped `<style>` tags
- Client `<script>` tags

### Page Structure
Main page (`src/pages/index.astro`):
1. Hero - Countdown to October 30, 2025
2. Mission - Mission statement
3. AboutSection - Partners (IMO, Tomczak-Gross, Handelsblatt)
4. Criteria - 5 selection criteria
5. JurySection - 21 jury member profiles
6. Newsletter - Signup form
7. LinkedInFeed - SociableKit widget
8. NominationForm - Multi-field form
9. Footer

Additional pages:
- `/shop` - Merchandise store (Spreadshirt)
- `/danke-nominierung` - Nomination thank you
- `/danke-newsletter` - Newsletter thank you
- `/datenschutz` - Privacy policy (German)
- `/impressum` - Legal notice (German)

### Styling System

#### Design Tokens (tailwind.config.mjs)
```javascript
colors: {
  'brand-primary': '#003C3D',     // Dark teal
  'brand-accent': '#C1693C',      // Orange
  'brand-beige': '#F8F0E3',       // Background
  'brand-text': '#302C37'         // Body text
}
```

#### Typography
- H1: Poppins, 4em, uppercase, gradient
- H2/H3: Trebuchet MS, 3.2em/2.4em
- H4: Cabin, 22px
- Body: Roboto, 18px

### Build Configuration

```javascript
// astro.config.mjs
{
  site: 'https://mobilitytrailblazers.de',
  output: 'static',
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'auto' }
}
```

### Form Handling
- Client-side JS with Web3Forms API
- `e.preventDefault()` → FormData to Web3Forms → UI update
- Implementation: `NominationForm.astro` lines 174-227

## Legal Compliance Requirements

### ⚠️ IMPORTANT: Replace Placeholder Text
**MUST replace before production deployment:**
- `/src/pages/datenschutz.astro` - Placeholder addresses
- `/src/pages/impressum.astro` - Placeholder contact details

**WARNING**: Non-compliance with German TMG law and GDPR can result in legal penalties.

### LinkedIn Widget Security
- Currently using production widget ID from another site
- **TODO**: Create dedicated SociableKit widget
- See `/src/components/LinkedInFeed.astro` for setup

## Project Constraints

### Static-Only Architecture
- No server-side processing or API routes
- All dynamic behavior via client-side JavaScript
- Form submissions via Web3Forms

### Testing
- 79 Playwright tests across 5 test files
- Optimized CI/CD with browser caching and parallel execution
- See `docs/TESTING.md` for details

### Media Files
- `/Media` directory contains WordPress migration artifacts (ignored)
- Only `/public` files are served

## Additional Documentation

- **Recent Updates & Changes**: See `CHANGELOG.md`
- **PWA Implementation**: See `docs/PWA_GUIDE.md`
- **Shop SEO Details**: See `docs/SHOP_SEO.md`
- **Testing Guide**: See `docs/TESTING.md`

## Notes

- Site includes PWA support with offline caching
- Visual enhancements: Section dividers, form glow effects
- Optimized Playwright tests (90%+ success rate, ~5 min PR tests)
- Always use specialized agents and sequential thinking for complex tasks