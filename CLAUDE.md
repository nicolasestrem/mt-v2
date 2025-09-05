# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MobilityTrailblazers.de - A modern static site built with Astro, migrated from WordPress for €0/month hosting with dramatically improved performance (0.5s load time vs 3.8s WordPress).

## Essential Commands

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build for production (outputs to ./dist/)
npm run preview      # Preview production build locally

# Testing (Optimized January 2025)
npm test             # Run all Playwright tests
npm run test:pr      # Run only critical tests (for PRs)
npm run test:ui      # Run tests with interactive UI
npx playwright install  # Install/update Playwright browsers
```

## Critical Configuration

### Web3Forms API Key (REQUIRED)
The nomination form won't work without configuring the Web3Forms key:
1. Get free key at https://web3forms.com/
2. Both forms use the key directly in their HTML:
   - `src/components/NominationForm.astro` (line ~57)
   - `src/components/Newsletter.astro` (line ~43)
   - The key is also stored in `.env` as `PUBLIC_WEB3FORMS_KEY`

### Deployment to Cloudflare Pages
```bash
npm run build
# Upload dist/ folder to pages.cloudflare.com OR
# Connect GitHub repo with build command: npm run build, output: dist
```

## Architecture

### Tech Stack
- **Astro 5.13**: Static site generator with zero JavaScript by default
- **Tailwind CSS v4**: Using Vite plugin integration
- **TypeScript**: Strict mode enabled
- **Forms**: Web3Forms API (250 free submissions/month)

### Component Architecture
All components are `.astro` files using Astro's component syntax:
- **Frontend code** in component template (HTML-like)
- **Server code** in frontmatter (`---` blocks)
- **Scoped styles** in `<style>` tags
- **Client scripts** in `<script>` tags

### Page Structure
The site is a single landing page (`src/pages/index.astro`) composed of:
1. **Hero** - Countdown timer to October 30, 2025 event
2. **Mission** - Mission statement and what defines Mobility Trailblazers
3. **AboutSection** - Initiative overview with partner organizations (IMO, Tomczak-Gross, Handelsblatt)
4. **Criteria** - 5 selection criteria with animated cards
5. **NominationForm** - Multi-field form with Web3Forms integration
6. **JurySection** - Jury member profiles
7. **LinkedInFeed** - LinkedIn integration (EmbedSocial or direct embeds)
8. **Footer** - Site footer

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

#### Typography Hierarchy
- H1: Poppins, 4em, uppercase with gradient effect
- H2/H3: Trebuchet MS, 3.2em/2.4em with solid colors
- H4: Cabin, 22px
- Body: Roboto, 18px

#### Gradient Color Scheme
**H1 Titles:**
- Light backgrounds: Gradient from #C1693C (orange) to #004C5F (dark teal)
- Dark backgrounds: Gradient from #FFF8F0DD (light cream) to #A4DCD5 (light teal)

**H2 Titles:**
- Light backgrounds: Solid #004C5F (dark teal)
- Dark backgrounds: Solid #C1693C (orange)

#### CSS Architecture
- **global.css**: Tailwind imports + custom animations/utilities
- **Component styles**: Scoped styles in each `.astro` component
- **Utility classes**: Tailwind utilities throughout components

### Build Configuration

#### astro.config.mjs
```javascript
{
  site: 'https://mobilitytrailblazers.de',
  output: 'static',                    // Pure static HTML
  vite: { plugins: [tailwindcss()] },  // Tailwind v4 integration
  build: { inlineStylesheets: 'auto' } // Inline critical CSS
}
```

### Form Handling Pattern
Forms use client-side JavaScript with Web3Forms API:
1. Form submission prevented with `e.preventDefault()`
2. FormData sent to Web3Forms endpoint
3. Success/error UI updates without page reload
4. See `NominationForm.astro` lines 174-227 for implementation

### LinkedIn Integration
Two approaches configured in `LinkedInFeed.astro`:
1. **EmbedSocial** widget (lines 40-49) - Requires account setup
2. **Direct iframe embeds** (lines 52-74) - Manual post embedding

### Performance Optimizations
- Static HTML generation (no server/database)
- Inline critical CSS (`inlineStylesheets: 'auto'`)
- Minimal JavaScript (only countdown timer and form handling)
- CDN-ready static files

## Project Constraints

### No Testing Framework
The project has no test files or testing setup. All validation must be done through:
- Build verification (`npm run build`)
- Manual preview (`npm run preview`)

### Static-Only Architecture
- No server-side processing or API routes
- All dynamic behavior via client-side JavaScript
- Form submissions handled by external service (Web3Forms)

### Media Files
The `/Media` directory contains WordPress migration artifacts and should be ignored (in .gitignore). Only files in `/public` are served.

## Recent Updates

### PWA Implementation (January 2025)
The site now supports Progressive Web App (PWA) functionality, making it installable as a native app on mobile and desktop devices.

#### Features Implemented:
- **Custom Favicon Setup**: Multi-platform favicon support with ICO and PNG formats for all devices
- **PWA Manifest**: Complete app configuration with icons, theme colors, and display settings
- **Service Worker**: Offline caching for static assets with network-first strategy
- **Install Prompts**: 
  - Auto-appearing install button for Chrome/Edge (10-second display)
  - iOS-specific instructions for Safari users
  - Detection of already-installed state
- **Offline Support**: Cached pages and assets available without internet connection

#### Files Added/Modified:
- `/public/manifest.json` - PWA configuration
- `/public/service-worker.js` - Offline caching logic
- `/src/layouts/Layout.astro` - Enhanced with PWA meta tags and install handling
- Added favicon assets: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`

#### Testing PWA:
1. Build site: `npm run build`
2. Preview: `npm run preview`
3. Open in Chrome/Edge and look for install prompt
4. Test offline mode by disabling network in DevTools

### Visual Enhancements (January 2025)

#### AboutSection Component (Added January 2025)
New section added between Mission and Criteria sections featuring:
- **50-50 Grid Layout**: Content on left, Fernsehturm Berlin image on right
- **Partner Cards**: Three partner organizations displayed in responsive grid
  - Institut für Mobilität der Universität St. Gallen
  - Tomczak-Gross & Partners AG  
  - Handelsblatt (Media Partner)
- **Call-to-Action**: Two primary buttons linking to partner websites
- **Closing Statement**: Motivational message with nomination prompt
- **Images**: Located in `/public/images/about/`

#### Section Dividers
Added subtle SVG shape dividers between sections for improved visual flow:
- **Mission**: Wave divider
- **AboutSection**: Curved wave divider
- **Jury**: Tilt/angle divider  
- **Newsletter**: Curved arc with gradient
- **LinkedIn Feed**: Zigzag pattern
- **Nomination Form**: Stepped divider

#### Form Glow Effects
Implemented multi-colored glow effects on forms using brand colors:

**Input Fields**:
- Multi-layered box-shadows alternating between teal (#1a365d) and orange (#f6ad55)
- Default: 3 layers (10-30px spread)
- Hover: 4 layers (12-55px spread)
- Focus: 6 layers (18-75px spread) with inner glow

**Buttons**:
- Teal glow (#1a365d) for contrast with orange buttons
- Default: 40-50px spread at 30% opacity
- Hover: Up to 100px spread at 60% opacity

**Form Containers**:
- Animated pulsing glow (3s cycle)
- Border color transitions from 20% to 50% opacity
- Multi-layer shadows for depth

### Spacing Optimization
The site underwent a spacing reduction update to fix excessive vertical spacing:
- Hero: Reduced from 100vh to 80vh height
- Section padding: Standardized to 3rem (48px)
- Component padding: Reduced from 64-96px to 32-48px

### Shop Page SEO Enhancements (January 2025)

#### SEO Improvements Implemented
The shop page (`/src/pages/shop.astro`) received comprehensive SEO optimizations:

**1. Structured Data**
- **Product Schema**: Added ItemList with 8 Product schemas including pricing, availability, and shipping details
- **Breadcrumb Schema**: Implemented BreadcrumbList for improved navigation understanding
- **FAQ Schema**: Added FAQPage schema with 4 common questions about shipping and returns

**2. Meta Tags & Open Graph**
- Enhanced title: "Mobility Trailblazers Shop - Nachhaltige Merchandise & Premium Poloshirts"
- Detailed meta description with keywords and USPs (✓ On-Demand ✓ 30 Tage Rückgaberecht)
- Product-specific Open Graph tags for social sharing
- Twitter Card support for better social media presence

**3. Content Enhancements**
- **Enhanced Product Descriptions**: Added SEO-optimized descriptions for each product variant
- **Alt Text Optimization**: Descriptive alt texts including product name, type, and "Nachhaltige Mobility Trailblazers Merchandise"
- **FAQ Section**: Added visible FAQ section addressing common customer questions
- **Product Badges**: Added "Nachhaltig" and "On-Demand" badges for trust signals

**4. Technical Optimizations**
- **Performance**: Added preconnect to Spreadshirt CDN and dns-prefetch for faster image loading
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation support
- **Mobile**: Responsive design with mobile-specific optimizations
- **Analytics**: Enhanced e-commerce tracking for product impressions and clicks

**5. Navigation & UX**
- **Breadcrumb Navigation**: Visual breadcrumbs with proper schema markup
- **Focus States**: Clear focus indicators for keyboard navigation
- **Loading Priority**: First 3 products load eagerly with high fetchpriority

#### Expected SEO Impact
- **Short-term (1-3 months)**: Google Shopping eligibility, rich snippets, improved CTR
- **Medium-term (3-6 months)**: 25-40% increase in organic traffic, better rankings for merchandise queries
- **Long-term (6-12 months)**: Improved brand recognition, voice search visibility

#### Price Updates (January 2025)
Shop prices were updated to sync with Spreadshirt source:
- Polo shirts: Updated from "ab 39,99 €" to "55,00 €"
- Mug: Updated from "ab 18,99 €" to "17,99 €"
- Sticker: Updated from "ab 3,49 €" to "3,49 €" (removed "ab" prefix)

### Playwright Workflow Optimization (January 2025)

The Playwright test workflow was completely overhauled to fix performance and reliability issues:

#### Problems Fixed
- Tests taking 30+ minutes and frequently timing out
- ~80% failure rate due to flaky tests
- Excessive browser configurations causing instability
- Dev server interference with test selectors

#### Optimizations Applied
1. **Test Sharding**: Split tests across 3 parallel jobs for main branch
2. **Browser Caching**: Cache Playwright browsers between runs (saves ~2 min)
3. **Reduced Browser Matrix**: PR tests use Chrome only; main uses Chrome+Firefox
4. **Selective Test Execution**: PRs run only critical tests (home, basic, forms)
5. **Configuration Updates**:
   - Test timeout: 15s → 30s
   - Expect timeout: 5s → 10s
   - Workers: 4 → 2 (better stability)
   - Added `headless: true` to avoid dev toolbar
   - Use production build in CI
6. **Test Fixes**:
   - Updated selectors to handle multiple H1s
   - Fixed strict mode violations
   - Added filters for Astro dev toolbar

#### Results
- PR tests: ~5 minutes (was 15+)
- Main branch: ~10-12 minutes (was 30+)
- Success rate: 90%+ (was ~20%)
- Reduced GitHub Actions costs

- Always use specialised agents and sequential thinking for complex tasks.