# MobilityTrailblazers.de - Modern Astro Website

<!-- Lighthouse Badges -->
![Lighthouse Performance](https://img.shields.io/badge/Performance-98%25-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-95%25-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-92%25-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse SEO](https://img.shields.io/badge/SEO-100%25-brightgreen?style=for-the-badge&logo=lighthouse)

<!-- GitHub Actions Status -->
[![Lighthouse CI](https://github.com/nicolasestrem/mt-v2/actions/workflows/lighthouse-ci.yml/badge.svg)](https://github.com/nicolasestrem/mt-v2/actions/workflows/lighthouse-ci.yml)
[![Playwright Tests](https://github.com/nicolasestrem/mt-v2/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/nicolasestrem/mt-v2/actions/workflows/playwright-tests.yml)

A high-performance, modern replacement for the WordPress MobilityTrailblazers.de website, built with Astro.

## 🚀 Project Overview

This is a complete reimplementation of the MobilityTrailblazers WordPress site using modern web technologies:

- **Framework**: Astro 4.0 (Static Site Generator)
- **Styling**: Tailwind CSS with custom brand colors
- **Hosting**: Cloudflare Pages (FREE)
- **Forms**: Web3Forms (FREE up to 250 submissions/month)
- **Performance**: 10x faster than WordPress (0.5s vs 3.8s load time)
- **Cost**: €0/month vs €16/month for WordPress

## 📁 Project Structure

```
mobility-astro/
├── src/
│   ├── components/
│   │   ├── Hero.astro              # Hero section with countdown timer
│   │   ├── Mission.astro           # Mission statement section
│   │   ├── AboutSection.astro      # About the initiative with partners
│   │   ├── Criteria.astro          # Selection criteria with info boxes
│   │   ├── NominationForm.astro    # Form with Web3Forms integration
│   │   ├── JurySection.astro       # Jury members cards
│   │   ├── LinkedInFeed.astro      # LinkedIn posts integration
│   │   └── Footer.astro            # Site footer
│   ├── layouts/
│   │   └── Layout.astro            # Base HTML layout
│   ├── pages/
│   │   └── index.astro             # Main landing page
│   └── styles/
│       └── global.css              # Global styles and animations
├── public/                         # Static assets (images, favicon)
├── dist/                           # Build output (deploy this)
└── tailwind.config.mjs            # Tailwind configuration
```

## 🎨 Brand Design System

### Colors
- **Primary**: `#003C3D` (Dark Teal)
- **Accent**: `#C1693C` (Orange)
- **Background**: `#F8F0E3` (Beige)
- **Text**: `#302C37` (Dark Gray)
- **Button Hover**: `#B86F52` (Burnt Orange)

### Typography
- **H1**: Poppins (4em, uppercase)
- **H2/H3**: Trebuchet MS (3.2em/2.4em)
- **H4**: Cabin (22px, capitalize)
- **Body**: Roboto (18px)

### Visual Effects
- Gradient text effects on headings
- Animated info boxes with floating icons
- Shape dividers between sections (Elementor-style)
- Gradient borders with glow effects
- Slide-in animations with staggered delays
- Decorative dots and wave patterns

## 🛠 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/nicolasestrem/mt-v2.git
cd mt-v2
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Web3Forms**
- Go to https://web3forms.com/
- Enter your email to get a free access key
- Open `src/components/NominationForm.astro`
- Replace `YOUR-ACCESS-KEY-HERE` with your key

4. **Configure LinkedIn Feed**
- Open `src/components/LinkedInFeed.astro`
- Add your EmbedSocial ref ID or LinkedIn post IDs
- Follow the integration instructions in the component

5. **Run development server**
```bash
npm run dev
```
Open http://localhost:4321 in your browser

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📱 LinkedIn Integration

### Option 1: EmbedSocial (Recommended)
1. Get your EmbedSocial account at https://embedsocial.com/
2. Create a LinkedIn feed widget
3. Copy your widget ref ID
4. Add it to `LinkedInFeed.astro`:
```html
<div class="embedsocial-hashtag" 
     data-ref="YOUR-EMBEDSOCIAL-REF-ID">
</div>
```

### Option 2: Direct LinkedIn Embeds
1. Go to any LinkedIn post
2. Click the three dots → "Embed this post"
3. Copy the iframe code
4. Add to `LinkedInFeed.astro` in the posts grid

### Styling Variables
The LinkedIn feed uses these CSS variables (already configured):
```css
--column-count: 2;
--widget-bg-color: #f8f0e3;
--widget-font-color: #003c3d;
--widget-link-color: #c1693c;
--button-bg-color: #b86f52;
--button-hover-bg-color: #c1693c;
/* ... and many more */
```

## 🚀 Deployment

### Deploy to Cloudflare Pages (FREE)

1. **Build the site**
```bash
npm run build
```

2. **Option A: Direct Upload**
- Go to https://pages.cloudflare.com/
- Create new project → Upload assets
- Drag the `dist` folder
- Your site is live!

3. **Option B: Git Integration (Auto-deploy)**
- Push code to GitHub
- Go to Cloudflare Pages
- Create new project → Connect to Git
- Select `nicolasestrem/mt-v2`
- Build settings:
  - Build command: `npm run build`
  - Build output: `dist`
- Deploy!

### Custom Domain Setup
1. In Cloudflare Pages → Custom domains
2. Add `mobilitytrailblazers.de`
3. Update DNS settings (if not on Cloudflare)
4. SSL certificate is automatic

## 🎯 Performance Metrics

### Current WordPress Site
- Load Time: 3.8s
- Page Size: 3.2MB
- Requests: 87
- Lighthouse: 68
- Monthly Cost: €16

### New Astro Site
- Load Time: 0.5s (-87%)
- Page Size: 200KB (-94%)
- Requests: 12 (-86%)
- Lighthouse: 98
- Monthly Cost: €0

## 📚 Documentation

Comprehensive documentation is available in the `/docs/` folder:

### Setup & Deployment
- [🚀 Quick Start Guide](docs/QUICK_START.md) - Fast setup and basic configuration
- [📦 Deployment Guide](docs/DEPLOYMENT.md) - Complete deployment instructions for all platforms
- [📧 Web3Forms Setup](docs/WEB3FORM_SETUP.md) - Form configuration and security

### Development
- [🧱 Components Guide](docs/COMPONENTS.md) - Detailed component documentation
- [🧪 Testing Guide](docs/TESTING.md) - Testing setup and procedures
- [🖼️ Image Storage Guidelines](docs/IMAGE_STORAGE_GUIDELINES.md) - Image optimization and management

### Social Integration
- [📱 SociableKit Setup](docs/SOCIABLEKIT_SETUP.md) - LinkedIn feed integration

### Migration & Features
- [📋 Missing Features](docs/MISSING_FEATURES.md) - Features comparison with WordPress version
- [🔄 WordPress Migration](docs/WORDPRESS-MIGRATION.md) - Complete migration documentation
- [📊 Migration Summary](docs/MIGRATION_SUMMARY.md) - Performance improvements summary
- [🖼️ Image Storage Summary](docs/IMAGE_STORAGE_SUMMARY.md) - Image handling overview

## 👀 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Web3Forms](https://web3forms.com)
- [Cloudflare Pages](https://pages.cloudflare.com)
