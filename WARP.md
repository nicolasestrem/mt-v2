# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

MobilityTrailblazers.de - A high-performance static website built with Astro 5.13, migrated from WordPress for €0/month hosting with dramatically improved performance (0.5s load time vs 3.8s WordPress). The site promotes a mobility initiative recognizing 25 trailblazers in 2025.

## Essential Commands

### Development
```powershell
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build for production (outputs to ./dist/)
npm run preview      # Preview production build locally
```

### Testing (Playwright)
```powershell
npm test             # Run all Playwright tests
npm run test:ui      # Run tests with interactive UI
npm run test:chrome  # Run tests in Chrome only (faster for PRs)
npm run test:report  # Show test report
npx playwright install  # Install/update Playwright browsers
```

### Utilities
```powershell
npm run optimize-images      # Optimize images in public/images/
npm run lighthouse           # Run Lighthouse CI audit
npm run lighthouse:badges    # Update README lighthouse badges
npm run lint:css             # Lint CSS with Stylelint
npm run lint:css:fix         # Fix CSS linting issues
```

## Tech Stack & Architecture

### Core Technologies
- **Astro 5.13**: Static site generator with zero JavaScript by default
- **Tailwind CSS v4**: Using Vite plugin integration (`@tailwindcss/vite`)
- **TypeScript**: Strict mode enabled
- **Forms**: Web3Forms API (250 free submissions/month)
- **Testing**: Playwright for end-to-end testing
- **Deployment**: Cloudflare Pages (static hosting)

### Component Architecture
Single-page application (`src/pages/index.astro`) composed of modular Astro components:

1. **Hero** - Countdown timer to October 30, 2025 event
2. **Mission** - Mission statement and initiative overview
3. **AboutSection** - Partner organizations (IMO, Tomczak-Gross, Handelsblatt)
4. **Criteria** - 5 selection criteria with animated cards
5. **NominationForm** - Multi-field form with Web3Forms integration
6. **JurySection** - Jury member profiles with show/hide functionality
7. **Newsletter** - Newsletter signup form
8. **LinkedInFeed** - LinkedIn integration (EmbedSocial or direct embeds)

### File Structure
```
src/
├── components/          # Reusable Astro components
│   ├── AboutSection.astro      # Partner info with Fernsehturm image
│   ├── Criteria.astro          # 5 criteria cards with animations
│   ├── Hero.astro              # Countdown timer and main heading
│   ├── JurySection.astro       # Jury profiles with show more
│   ├── NominationForm.astro    # Main nomination form
│   ├── Newsletter.astro        # Newsletter signup
│   ├── LinkedInFeed.astro      # Social media integration
│   ├── SEO.astro              # Meta tags and structured data
│   └── ...
├── layouts/
│   └── Layout.astro            # Base HTML layout with PWA support
├── pages/
│   ├── index.astro             # Main landing page
│   ├── shop.astro              # Merchandise store
│   ├── danke-nominierung.astro # Thank you page for nominations
│   └── danke-newsletter.astro  # Thank you page for newsletter
└── styles/
    ├── global.css              # Tailwind imports + custom animations
    └── shop.css                # Shop-specific styles
```

## Design System & Styling

### Brand Colors (tailwind.config.mjs)
```javascript
colors: {
  'brand': {
    'primary': '#003C3D',     // Dark teal - main brand color
    'accent': '#C1693C',      // Orange - accent color
    'beige': '#F8F0E3',       // Background beige
    'text': '#302C37',        // Body text dark gray
    'button-hover': '#B86F52', // Button hover state
    'gradient-end': '#004C5FCC' // Gradient end color
  }
}
```

### Typography Hierarchy
- **H1**: Poppins, 4em desktop/28px mobile, uppercase with gradient text effect
- **H2**: Trebuchet MS, 3.2em desktop/40px mobile, solid brand colors
- **H3**: Trebuchet MS, 2.4em, inherits from H2 styling
- **H4**: Cabin, 22px desktop/18px mobile, capitalize
- **Body**: Roboto, 18px desktop/mobile, 14px tablet

### Gradient Text Patterns
- **H1 on light backgrounds**: Orange (#C1693C) to dark teal (#004C5F)
- **H1 on dark backgrounds**: Light cream (#FFF8F0DD) to light teal (#A4DCD5)
- **H2 on light backgrounds**: Solid dark teal (#004C5F)
- **H2 on dark backgrounds**: Solid orange (#C1693C)

## Critical Configuration

### Web3Forms Setup (REQUIRED)
The forms won't work without configuring the Web3Forms key:

1. Get free key at https://web3forms.com/ (250 submissions/month)
2. Replace `YOUR-ACCESS-KEY-HERE` in both forms:
   - `src/components/NominationForm.astro` (line ~57)
   - `src/components/Newsletter.astro` (line ~43)
3. Optionally store in `.env` as `PUBLIC_WEB3FORMS_KEY`

### Build Configuration (astro.config.mjs)
```javascript
{
  site: 'https://mobilitytrailblazers.de',
  output: 'static',                    // Pure static HTML
  integrations: [sitemap()],           // Generate sitemap
  vite: { plugins: [tailwindcss()] },  // Tailwind v4 integration
  build: { 
    inlineStylesheets: 'auto',         // Inline critical CSS
    assets: '_assets'                  // Asset directory
  }
}
```

## Form Handling Pattern

All forms use client-side JavaScript with Web3Forms API:
1. Form submission prevented with `e.preventDefault()`
2. FormData collected and sent to Web3Forms endpoint
3. Success/error UI updates without page reload
4. User redirected to thank you page on success

Example implementation in `NominationForm.astro` (lines 174-227):
```javascript
const formData = new FormData(form);
const response = await fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  body: formData
});
```

## PWA Features

The site supports Progressive Web App functionality:
- **Service Worker**: Offline caching with network-first strategy
- **Manifest**: `/public/manifest.json` with app configuration
- **Install Prompts**: Auto-appearing install button for Chrome/Edge
- **iOS Support**: Safari-specific installation instructions
- **Favicons**: Multi-platform favicon support (ICO, PNG, Apple Touch)

## Performance Optimizations

### Critical Rendering Path
- Inline critical CSS in `<style>` tags
- Font preloading for Roboto (primary body font)
- Image preloading for hero section and Fernsehturm Berlin
- Resource hints (preconnect, dns-prefetch) for external services

### Image Optimization
- Use `scripts/optimize-images.js` to compress images
- Images stored in `/public/images/` with organized subdirectories
- Sharp integration for automatic image optimization during build

### Bundle Optimization
- Minimal JavaScript (only countdown timer and form handling)
- Static HTML generation with no server/database dependencies
- CDN-ready static files via Cloudflare Pages

## Testing Strategy

### Playwright Test Structure
```powershell
tests/
├── core.spec.ts              # Basic functionality and countdown
├── accessibility.spec.ts     # ARIA, keyboard navigation
├── form-functionality.spec.ts # Form submission and validation
├── responsive-design.spec.ts  # Mobile/tablet responsive behavior
├── components.spec.ts         # Component-specific tests
└── pages/HomePage.ts          # Page object model
```

### Test Configuration
- **Timeout**: 30 seconds per test (15s for expects)
- **Browsers**: Chrome + Firefox (Chrome only for PRs)
- **Workers**: 2 parallel workers in CI for stability
- **Retry**: 1 retry in CI environment
- **Headless**: Always true to avoid dev toolbar interference

### Running Specific Test Suites
```powershell
npx playwright test core.spec.ts        # Core functionality
npx playwright test --grep "countdown"   # Countdown-related tests
npx playwright test --project="Desktop Chrome"  # Chrome only
```

## Deployment

### Cloudflare Pages (FREE)
1. Build the site: `npm run build`
2. Upload `dist/` folder to pages.cloudflare.com OR
3. Connect GitHub repo with:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables: Add Web3Forms key if needed

### Custom Domain
Set up `mobilitytrailblazers.de` in Cloudflare Pages custom domains section.

## Content Management

### Jury Members
Jury data stored in `src/components/JurySection.astro` as a JavaScript array. Add/modify jury members by editing the `juryMembers` array (line ~17).

### Shop Products
Product data in `src/data/shop-products.json`. Update prices and descriptions here, then sync with Spreadshirt integration.

### Images
- Store all images in `/public/images/` with organized subdirectories
- Run `npm run optimize-images` after adding new images
- Use descriptive alt text for accessibility

## Social Media Integration

### LinkedIn Feed Options
1. **EmbedSocial** (Recommended): Set up widget at embedsocial.com and add ref ID
2. **Direct Embeds**: Copy iframe code from LinkedIn posts and add to component

Configuration in `src/components/LinkedInFeed.astro` lines 40-74.

## Common Development Tasks

### Adding a New Page
1. Create `.astro` file in `src/pages/`
2. Use kebab-case for URL-friendly naming
3. Import and use `Layout.astro` with appropriate props
4. Add sitemap entry if needed in `astro.config.mjs`

### Modifying Brand Colors
1. Update color definitions in `tailwind.config.mjs`
2. Update CSS custom properties in components if needed
3. Test across all sections for consistent appearance

### Form Modifications
1. Update form fields in component template
2. Ensure proper validation attributes
3. Update JavaScript handling if field structure changes
4. Test form submission with Web3Forms API

### Performance Monitoring
1. Run `npm run lighthouse` for performance audit
2. Update badges with `npm run lighthouse:badges`
3. Check Core Web Vitals in production deployment
4. Use browser DevTools for runtime performance analysis

## Constraints & Limitations

- **Static Only**: No server-side processing or API routes
- **External Dependencies**: Forms require Web3Forms service
- **Image Storage**: All images must be in `/public/` directory
- **Browser Support**: Modern browsers only (ES2020+)
- **Testing**: No unit tests, only end-to-end with Playwright
