# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the MobilityTrailblazers.de website built with Astro, a modern static site generator. It's a replacement for the WordPress site, offering €0/month hosting with Cloudflare Pages and dramatically improved performance (0.5s load time vs 3.8s WordPress).

## Essential Commands

### Development
```bash
# Install dependencies
npm install

# Start dev server at http://localhost:4321
npm run dev

# Build for production (outputs to ./dist/)
npm run build

# Preview production build locally
npm run preview
```

## Architecture

### Tech Stack
- **Framework**: Astro 5.13 (static site generator)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Forms**: Web3Forms API integration (250 free submissions/month)
- **Deployment**: Cloudflare Pages (free hosting with CDN)

### Directory Structure
- `src/components/` - Astro components for page sections
  - `Hero.astro` - Hero section with countdown timer
  - `Criteria.astro` - 5 selection criteria cards
  - `NominationForm.astro` - Web3Forms integrated nomination form
  - `JurySection.astro` - Jury member profiles
  - `LinkedInFeed.astro` / `LinkedInPosts.astro` - Social media integration
  - `Footer.astro` - Site footer
- `src/pages/` - Page routes (file-based routing)
  - `index.astro` - Main landing page
- `src/layouts/` - Page templates
  - `Layout.astro` - Base HTML wrapper
- `src/styles/` - Global styles
  - `global.css` - Tailwind imports and custom styles
- `src/content/jury/` - Content collections for jury members
- `public/` - Static assets served as-is
- `dist/` - Production build output (upload this to Cloudflare)

### Key Configuration Files
- `astro.config.mjs` - Astro configuration with Tailwind Vite plugin
- `tailwind.config.mjs` - Custom design system with brand colors and typography
- `tsconfig.json` - TypeScript configuration (strict mode)

## Critical Setup Requirements

### Web3Forms API Key
**REQUIRED**: Replace `YOUR-ACCESS-KEY-HERE` in `src/components/NominationForm.astro:4`
1. Get free key at https://web3forms.com/
2. Update the WEB3FORMS_KEY constant
3. Form submissions will be emailed to the configured address

### Deployment to Cloudflare Pages

#### Quick Deploy (Manual Upload)
1. Run `npm run build`
2. Go to https://pages.cloudflare.com/
3. Drag and drop the `dist/` folder
4. Site is live at `[project-name].pages.dev`

#### Git Integration (Auto-deploy)
1. Push to GitHub
2. Connect repo in Cloudflare Pages
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Auto-deploys on every push

## Design System

### Brand Colors (defined in tailwind.config.mjs)
- Primary: `#003C3D` (dark teal)
- Accent: `#C1693C` (orange)
- Background: `#F8F0E3` (beige)
- Text: `#302C37` (dark gray)

### Typography
- Headings: Poppins, Trebuchet MS, Cabin
- Body: Roboto
- Responsive font sizes configured for desktop/tablet/mobile

### Component Patterns
- All components use Astro's `.astro` format
- Tailwind utility classes for styling
- Responsive design with mobile-first approach
- Form handling with client-side JavaScript for better UX

## Performance Optimizations
- Static HTML generation (no server required)
- Inline styles for critical CSS (`inlineStylesheets: 'auto'`)
- No database queries or dynamic content
- CDN-ready static files

## Development Tips
- The site is fully static - no server-side processing
- All dynamic behavior uses client-side JavaScript
- Form submissions go directly to Web3Forms API
- Images should be placed in `public/images/`
- The countdown timer in Hero.astro calculates days until October 30, 2025

## Testing Checklist
- [ ] Form submission works (check Web3Forms dashboard)
- [ ] All links are functional
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Build completes without errors
- [ ] Preview shows correct styling