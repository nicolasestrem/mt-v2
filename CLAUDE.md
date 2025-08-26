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
```

## Critical Configuration

### Web3Forms API Key (REQUIRED)
The nomination form won't work without configuring the Web3Forms key:
1. Get free key at https://web3forms.com/
2. Update in `src/components/NominationForm.astro:4`
   ```astro
   const WEB3FORMS_KEY = "YOUR-ACCESS-KEY-HERE"; // Replace with actual key
   ```

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
2. **Inline sections** - "Who can be nominated" and "How it works" (directly in index.astro)
3. **Criteria** - 5 selection criteria with animated cards
4. **NominationForm** - Multi-field form with Web3Forms integration
5. **JurySection** - Jury member profiles
6. **LinkedInFeed** - LinkedIn integration (EmbedSocial or direct embeds)
7. **Footer** - Site footer

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

### Visual Enhancements (January 2025)

#### Section Dividers
Added subtle SVG shape dividers between sections for improved visual flow:
- **Mission**: Wave divider
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
- Always use specialised agents and sequential thinking for complex tasks.