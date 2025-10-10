# CHANGELOG

This file tracks major updates and enhancements to the MobilityTrailblazers.de project. Updates are organized chronologically with the most recent changes first.

## October 2025

### Documentation Cleanup
- **DELETED**: Outdated documentation files (JURY_IMPLEMENTATION_SUMMARY.md, MISSING_FEATURES.md, PERFORMANCE_TEST_REPORT.md)
- **NOTE**: Criteria component IS fully integrated and working (contrary to old MISSING_FEATURES.md)
- **UPDATED**: All test commands to match package.json scripts
- **CURRENT STATUS**: All 79 Playwright tests passing, 21 jury members implemented

## January 2025

### Playwright Workflow Optimization

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

### Shop Page SEO Enhancements

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

#### Price Updates
Shop prices were updated to sync with Spreadshirt source:
- Polo shirts: Updated from "ab 39,99 €" to "55,00 €"
- Mug: Updated from "ab 18,99 €" to "17,99 €"
- Sticker: Updated from "ab 3,49 €" to "3,49 €" (removed "ab" prefix)

### PWA Implementation
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

### Visual Enhancements

#### AboutSection Component (Added)
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

### Cookie Consent System
- Minimal tarteaucitron implementation (5 files, ~430KB)
- No persistent UI elements - access via footer link
- Google Consent Mode v2 for GDPR compliance
- German language support

### Testing Commands Optimization
```bash
# Testing (Optimized January 2025)
npm test             # Run all Playwright tests
npm run test:pr      # Run only critical tests (for PRs - Chrome only)
npm run test:full    # Run all tests on Chrome + Firefox
npm run test:ui      # Run tests with interactive UI
npm run test:chrome  # Run tests in Chrome only (faster)
npm run test:report  # Show test report
npx playwright install  # Install/update Playwright browsers
```

## Project Status Summary

### Current State (January 2025)
- **Performance**: 0.5s load time (vs 3.8s on original WordPress)
- **Testing**: 79 Playwright tests across 5 test files (all passing)
- **Features**: All major components fully implemented and working
- **Hosting**: €0/month on Cloudflare Pages
- **Tech Stack**: Astro 5.13, Tailwind CSS v4, TypeScript, Web3Forms

### Key Achievements
- Successfully migrated from WordPress to static site
- Reduced hosting costs from paid WordPress hosting to €0/month
- Improved page load performance by 86% (3.8s → 0.5s)
- Implemented comprehensive testing suite with 90%+ success rate
- Added PWA functionality for native app-like experience
- Achieved GDPR compliance with cookie consent system
- Enhanced SEO with structured data and optimized content