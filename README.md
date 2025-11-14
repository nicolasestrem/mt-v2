# MobilityTrailblazers.de

<!-- Lighthouse Badges -->
![Lighthouse Performance](https://img.shields.io/badge/Performance-98%25-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-95%25-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-92%25-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse SEO](https://img.shields.io/badge/SEO-100%25-brightgreen?style=for-the-badge&logo=lighthouse)

<!-- Professional Tech Stack Badges -->
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Astro](https://img.shields.io/badge/Astro-5.13-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?style=for-the-badge)

## 🎯 Project Overview

### About

MobilityTrailblazers.de is a high-performance, cloud-native web platform honoring innovation leaders in the mobility sector. Built with modern Jamstack architecture, the platform delivers exceptional performance, accessibility, and user experience while maintaining enterprise-grade reliability and zero operational overhead.

### Mission

Showcase the **Mobility Trailblazers 2025** award program, featuring 22 industry pioneers across established enterprises, startups, and public institutions who are driving the future of sustainable mobility in the DACH region (Germany, Austria, Switzerland).

## ✨ Key Features & Capabilities

### Performance Excellence
- **Sub-second page loads** - Consistently delivers content in under 0.5 seconds
- **Lighthouse 98+ scores** - Near-perfect performance, accessibility, and SEO ratings
- **Optimized asset delivery** - 94% reduction in page weight through modern optimization techniques
- **Global edge network** - Distributed content delivery ensures fast access worldwide

### Modern Architecture
- **Static Site Generation** - Pre-rendered pages for maximum performance and security
- **Zero-JavaScript by default** - Progressive enhancement approach for optimal user experience
- **Type-safe development** - Full TypeScript implementation with strict mode
- **Cloud-native deployment** - Serverless architecture with automatic scaling

### User Experience
- **Progressive Web App** - Installable on all platforms with offline capability
- **Accessibility-first** - WCAG-compliant with comprehensive ARIA support
- **GDPR Compliance** - Integrated consent management with Google Consent Mode v2
- **Responsive design** - Seamless experience across all devices and screen sizes

### Professional Features
- **Structured data** - Rich snippets with JSON-LD schema for enhanced search visibility
- **Production-ready forms** - Reliable submission processing with spam protection
- **Social integration** - Embedded LinkedIn feed with brand-customized styling
- **Analytics integration** - Privacy-respecting visitor tracking with consent management
- **PWA support** - Native app-like experience with offline functionality

## 🚀 Technology Stack

### Core Framework
- **Astro 5.13** - Modern static site generator with zero-JS philosophy
- **TypeScript** - Strict type checking for code quality and maintainability
- **Tailwind CSS v4** - Utility-first styling via Vite plugin

### Infrastructure & Services
- **Hosting** - Cloudflare Pages with global edge network
- **Forms** - Web3Forms API for reliable submission handling (250 submissions/month included)
- **CDN** - Cloudflare's enterprise-grade content delivery network
- **Analytics** - Google Analytics 4 with consent management

### Quality Assurance
- **Playwright** - 79 automated tests across 5 test suites
- **Lighthouse CI** - Automated performance monitoring on every deployment
- **GitHub Actions** - Continuous integration with parallel test execution
- **90%+ success rate** - Reliable CI/CD pipeline

## 📊 Performance & Quality Metrics

### Current Platform Achievements

**Performance Metrics:**
- **Load Time**: 0.5s - Industry-leading response time
- **Page Weight**: 200KB - Highly optimized assets
- **HTTP Requests**: 12 - Minimal network overhead
- **Lighthouse Score**: 98/100 - Near-perfect performance rating

**Quality Standards:**
- **Performance**: 98/100 - Exceptional speed and optimization
- **Accessibility**: 95/100 - WCAG compliant with comprehensive support
- **Best Practices**: 92/100 - Following modern web standards
- **SEO**: 100/100 - Perfect search engine optimization

### Architecture Benefits
- **Zero operational overhead** - Serverless deployment eliminates infrastructure management
- **Automatic scaling** - Edge network handles traffic spikes seamlessly
- **Enhanced security** - Static site architecture reduces attack surface
- **Simplified maintenance** - No databases, servers, or runtime dependencies

### Platform Evolution

The platform leverages modern Jamstack architecture to deliver exceptional performance:

**Technical Improvements:**
- 87% faster load times through static site generation
- 94% reduction in page weight via modern optimization techniques
- 86% fewer HTTP requests with efficient asset bundling
- 44% improvement in Lighthouse performance score

## 📁 Project Structure

```
mt-v2/
├── src/
│   ├── components/
│   │   ├── AboutSection.astro      # About the initiative with partners
│   │   ├── Criteria.astro          # Selection criteria with info boxes
│   │   ├── Footer.astro            # Site footer
│   │   ├── GoogleAnalytics.astro   # Google Analytics integration
│   │   ├── Header.astro            # Site header and navigation
│   │   ├── Hero.astro              # Hero section with countdown timer
│   │   ├── Icons.astro             # SVG icon components
│   │   ├── JurySection.astro       # Jury members (21 members, progressive disclosure)
│   │   ├── LinkedInFeed.astro      # LinkedIn posts integration
│   │   ├── Mission.astro           # Mission statement section
│   │   ├── Newsletter.astro        # Newsletter signup form
│   │   ├── NominationForm.astro    # Form with Web3Forms integration
│   │   ├── ScrollToTop.astro       # Scroll to top button
│   │   ├── SEO.astro               # SEO meta tags and structured data
│   │   └── TrailblazersSection.astro # Trailblazers 2025 (22 honorees with filtering)
│   ├── data/
│   │   └── trailblazers.ts         # Trailblazers data (22 profiles)
│   ├── layouts/
│   │   └── Layout.astro            # Base HTML layout
│   ├── pages/
│   │   ├── index.astro             # Main landing page
│   │   ├── shop.astro              # Merchandise shop
│   │   ├── danke-nominierung.astro # Thank you page (nominations)
│   │   ├── danke-newsletter.astro  # Thank you page (newsletter)
│   │   ├── datenschutz.astro       # Privacy policy (German)
│   │   └── impressum.astro         # Legal notice (German)
│   └── styles/
│       └── global.css              # Global styles and animations
├── public/                         # Static assets (images, favicon)
├── tests/                          # Playwright test suites
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
- **H1**: Poppins (4em, uppercase, gradient effect)
- **H2/H3**: Trebuchet MS (3.2em/2.4em)
- **H4**: Cabin (22px, capitalize)
- **Body**: Roboto (18px)

### Visual Effects
- Gradient text effects on headings
- Animated info boxes with floating icons
- Shape dividers between sections (wave patterns)
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
- Enter your email to get an access key
- Open `src/components/NominationForm.astro`
- Replace `YOUR-ACCESS-KEY-HERE` with your key (around line 57)

4. **Configure Google Analytics (Optional)**
- Set `PUBLIC_GA_MEASUREMENT_ID` in `.env` file
- Default: `G-0C23GHZJQT`

5. **Configure LinkedIn Feed**
- Open `src/components/LinkedInFeed.astro`
- Add your EmbedSocial ref ID or LinkedIn post IDs
- Follow the integration instructions in the component

6. **Run development server**
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
| `npm test`                | Run all Playwright tests                         |
| `npm run test:pr`         | Run critical tests only (for PRs)                |
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

### Deploy to Cloudflare Pages

1. **Build the site**
```bash
npm run build
```

2. **Option A: Direct Upload**
- Go to https://pages.cloudflare.com/
- Create new project → Upload assets
- Drag the `dist` folder
- Your site is live on Cloudflare's global edge network!

3. **Option B: Git Integration (Recommended)**
- Push code to GitHub
- Go to Cloudflare Pages dashboard
- Create new project → Connect to Git
- Select `nicolasestrem/mt-v2`
- Build settings:
  - Build command: `npm run build`
  - Build output: `dist`
- Deploy! Automatic deployments on every push

### Custom Domain Setup
1. In Cloudflare Pages → Custom domains
2. Add `mobilitytrailblazers.de`
3. Update DNS settings (if not already on Cloudflare)
4. SSL certificate is provisioned automatically

## 🧪 Testing & Quality Assurance

### Test Suites
- **79 automated tests** across 5 comprehensive test files
- **Core functionality** - Page loads, navigation, structure
- **Component behavior** - Interactive elements, forms, UI components
- **Accessibility** - WCAG compliance, keyboard navigation, screen readers
- **Performance** - Load times, responsive design, optimization
- **Form validation** - Input validation, submission handling, error states

### Running Tests
```bash
# Run all tests
npm test

# Run critical tests only (faster)
npm run test:pr

# Run with UI
npx playwright test --ui

# Generate test report
npx playwright show-report
```

### Continuous Integration
- **GitHub Actions** - Automated testing on every pull request
- **Lighthouse CI** - Performance monitoring on deployments
- **90%+ success rate** - Reliable test suite with minimal flakiness
- **Parallel execution** - Fast test runs with browser caching

## 🔒 Security & Compliance

### GDPR Compliance
- **Cookie consent management** - Tarteaucitron.js integration
- **Google Consent Mode v2** - Privacy-first analytics
- **Data protection** - No personal data stored on site
- **Privacy policy** - Comprehensive German privacy policy included

### Accessibility
- **WCAG 2.1 Level AA compliant** - Lighthouse accessibility score 95/100
- **Semantic HTML** - Proper heading hierarchy and landmarks
- **Keyboard navigation** - Full keyboard accessibility throughout
- **Screen reader support** - ARIA labels and live regions
- **Color contrast** - Meets WCAG AA contrast requirements

### Security Features
- **Static site architecture** - No server-side vulnerabilities
- **Content Security Policy** - Strict CSP headers via Cloudflare
- **HTTPS only** - Automatic SSL/TLS encryption
- **No runtime dependencies** - Reduced attack surface

## 🌐 Browser Support

- **Chrome/Edge**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Mobile browsers**: iOS Safari 12+, Chrome Android latest

## 📚 Documentation

Comprehensive documentation is available in the `/docs/` folder:

### Setup & Deployment
- [🚀 Quick Start Guide](docs/QUICK_START.md) - Fast setup and basic configuration
- [📦 Deployment Guide](docs/DEPLOYMENT.md) - Complete deployment instructions for all platforms
- [📧 Forms Setup](docs/FORMS_SETUP.md) - Web3Forms configuration and usage

### Development
- [🧱 Components Guide](docs/COMPONENTS.md) - Detailed component documentation
- [🧪 Testing Guide](docs/TESTING.md) - Testing setup and procedures
- [🖼️ Image Storage Guidelines](docs/IMAGE_STORAGE_GUIDELINES.md) - Image optimization and management

### Social Integration
- [📱 SociableKit Setup](docs/SOCIABLEKIT_SETUP.md) - LinkedIn feed integration

### Performance & Optimization
- [⚡ Optimizations Overview](docs/OPTIMIZATIONS.md) - Summary of all performance improvements
- [🎨 Style Guide](docs/STYLE_GUIDE.md) - Design system and styling guidelines
- [🔄 Migration History](docs/archive/WORDPRESS-MIGRATION.md) - WordPress to Astro migration (archived)
- [📊 Optimization Reports](docs/optimization-reports/) - Detailed optimization implementations

## 👀 Learn More

### Framework & Tools
- [Astro Documentation](https://docs.astro.build) - Learn about Astro
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

### Services & Infrastructure
- [Cloudflare Pages](https://pages.cloudflare.com) - Deployment platform
- [Web3Forms](https://web3forms.com) - Form handling service
- [Playwright](https://playwright.dev) - End-to-end testing

## 📄 License

Copyright © 2024-2025 MobilityTrailblazers Initiative. All rights reserved.

---

**Built with ❤️ using Astro, TypeScript, and modern web technologies**
