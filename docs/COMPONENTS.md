# Component Documentation

Detailed documentation for all Astro components in the MobilityTrailblazers site.

## 🚀 TL;DR - Quick Reference

**Component Locations**: `src/components/*.astro`

**Key Components**:
- `Hero.astro` - Main hero with countdown timer
- `NominationForm.astro` - Form with Web3Forms (needs API key config)
- `JurySection.astro` - 21 jury members with progressive disclosure
- `AboutSection.astro` - Partner cards with Fernsehturm image
- `Criteria.astro` - 5 animated selection criteria cards
- `LinkedInFeed.astro` - Social feed (needs SociableKit or manual setup)
- `Newsletter.astro` - Email signup with Web3Forms
- `Footer.astro` - Site footer with links

**Common Tasks**:
- Import component: `import ComponentName from '../components/ComponentName.astro'`
- Use component: `<ComponentName />`
- Configure forms: Update Web3Forms API key in component file
- Modify jury: Edit `juryMembers` array in JurySection.astro

**Design System**: Brand colors in `tailwind.config.mjs` - See CLAUDE.md for values

---

## 📦 Component Overview

All components are in `src/components/` and use the `.astro` file extension.

## Core Components

### 🎯 Hero.astro

The main hero section with countdown timer and call-to-action buttons.

**Features:**
- Gradient background (`gradient-bg-primary`)
- Countdown timer to October 30, 2025
- Animated text with slide-in effect
- Decorative dots and wave patterns
- Shape divider at bottom
- Two CTA buttons (primary and secondary)

**Props:** None

**Usage:**
```astro
<Hero />
```

**Customization:**
- Change countdown date: Line 68 `const targetDate = new Date('2025-10-30T18:00:00+01:00');`
- Modify gradient: Update class `gradient-bg-primary` in global.css
- Adjust animation timing: Modify `animation-delay` inline styles

---

### 📋 Criteria.astro

Displays the 5 selection criteria as animated info boxes.

**Features:**
- Info boxes with gradient borders
- Floating icon animations
- Staggered slide-in animations
- Hover effects with scale transform
- Decorative background elements

**Data Structure:**
```javascript
const criteria = [
  {
    title: "Mut & Pioniergeist",
    description: "Welche Risiken wurden eingegangen?",
    icon: "🚀"
  },
  // ... more criteria
];
```

**Usage:**
```astro
<Criteria />
```

**Customization:**
- Edit criteria array at the top of the component
- Change icons: Update emoji in the data array
- Modify animation: Adjust `animation-delay` calculation

---

### 📝 NominationForm.astro

Contact form with Web3Forms integration for nominations.

**Features:**
- Web3Forms API integration
- Client-side validation
- Honeypot spam protection
- Success/error message handling
- Responsive layout
- Brand-styled inputs

**Configuration Required:**
```astro
const WEB3FORMS_KEY = "YOUR-ACCESS-KEY-HERE"; // Line 4
```

**Form Fields:**
- Nominee name (required)
- Organization
- Your name (required)
- Your email (required)
- Project/Initiative
- Nomination reason (required)
- Links/References
- Privacy consent (required)

**Usage:**
```astro
<NominationForm />
```

**Customization:**
- Add/remove fields: Edit the form HTML
- Change validation: Modify the JavaScript at the bottom
- Style updates: Classes use Tailwind utilities

---

### 👥 JurySection.astro

Grid display of 21 jury members with progressive disclosure functionality.

**Features:**
- 21 jury members with real photos and profiles
- Random selection on each page load
- Progressive disclosure: Shows 6 members initially, expandable to all
- Responsive grid layout (6/4/2 members on desktop/tablet/mobile)
- German language UI ("Alle Jury-Mitglieder anzeigen" / "Weniger anzeigen")
- Hover effects and animations
- LinkedIn placeholder links (ready for URLs)

**Data Structure:**
```javascript
const juryMembers = [
  {
    name: "Winfried Hermann",
    role: "Schirmherr",
    title: "Verkehrsminister Baden-Württemberg",
    organization: "Ministerium für Verkehr Baden-Württemberg",
    image: "/images/jury/Winfried Hermann.webp",
    linkedIn: "#"
  },
  // ... 20 more members
];
```

**Usage:**
```astro
<JurySection />
```

**Implementation:**
- All jury data embedded in component (no external API)
- Vanilla JavaScript for maximum compatibility
- WebP images optimized for web (400x400px)
- ARIA attributes for accessibility

---

### 📱 LinkedInFeed.astro

Real LinkedIn post integration with EmbedSocial or direct embeds.

**Features:**
- EmbedSocial widget support
- Direct LinkedIn iframe embeds
- Full styling customization via CSS variables
- 2-column responsive layout
- Brand color theming

**Configuration Options:**

1. **EmbedSocial Integration:**
```html
<div class="embedsocial-hashtag" 
     data-ref="YOUR-EMBEDSOCIAL-REF-ID">
</div>
```

2. **Direct LinkedIn Embeds:**
```html
<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:YOUR-POST-ID" 
        height="450" 
        width="100%" 
        frameborder="0">
</iframe>
```

**CSS Variables:**
All LinkedIn styling is controlled through CSS variables defined in the component:
- `--column-count`: Number of columns (2)
- `--widget-bg-color`: Background color (#f8f0e3)
- `--widget-font-color`: Text color (#003c3d)
- `--widget-link-color`: Link color (#c1693c)
- Plus 30+ more variables for complete control

**Usage:**
```astro
<LinkedInFeed />
```

---


### 🆕 Header.astro

Site header with navigation and mobile menu.

**Features:**
- Responsive navigation menu
- Mobile hamburger menu
- Smooth scroll to sections
- Brand logo
- Sticky header option

**Usage:**
```astro
<Header />
```

---

### 🆕 GoogleAnalytics.astro

Google Analytics integration with tarteaucitron cookie consent.

**Features:**
- GA4 tracking integration
- GDPR-compliant cookie consent
- German language support
- Google Consent Mode v2

**Configuration:**
```astro
const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID || 'G-0C23GHZJQT';
```

**Usage:**
```astro
<GoogleAnalytics />
```

---

### 🆕 SEO.astro

SEO meta tags and structured data component.

**Features:**
- Open Graph tags
- Twitter Card meta tags
- Canonical URLs
- JSON-LD structured data
- Sitemap integration

**Props:**
```typescript
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
}
```

**Usage:**
```astro
<SEO
  title="Page Title"
  description="Page description for SEO"
  image="/images/og-image.jpg"
/>
```

---

### 🆕 Icons.astro

SVG icon components for inline use.

**Features:**
- Inline SVG icons (no external icon fonts)
- Customizable size and color
- Accessible with ARIA labels
- Lightweight and fast

**Icons Available:**
- Envelope
- LinkedIn
- Check/Exclamation circles
- Arrows

**Usage:**
```astro
import { EnvelopeIcon, LinkedInIcon } from './Icons.astro';
```

---

### 🆕 ScrollToTop.astro

Scroll to top button component.

**Features:**
- Appears when scrolling down
- Smooth scroll animation
- Accessible keyboard navigation
- Fixed positioning

**Usage:**
```astro
<ScrollToTop />
```

---

### 🆕 Newsletter.astro

Newsletter signup form with Web3Forms integration.

**Features:**
- Email input with validation
- Privacy consent checkbox
- Web3Forms API integration
- Success/error messaging
- Redirects to thank you page

**Configuration:**
```astro
const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY;
```

**Usage:**
```astro
<Newsletter />
```

---

### 🦶 Footer.astro

Site footer with links and contact information.

**Features:**
- Three-column layout
- Quick navigation links
- Contact information
- Current year auto-update
- Brand colors and styling

**Sections:**
1. About the award
2. Quick links
3. Contact information

**Usage:**
```astro
<Footer />
```

**Customization:**
- Update links: Edit the HTML directly
- Change layout: Modify grid classes
- Add social icons: Insert SVG icons in contact section

---

## 🎨 Styling System

### Global Styles (global.css)

All components use these shared styles:

**Utility Classes:**
- `.gradient-text` - Gradient text effect
- `.gradient-bg-primary` - Primary gradient background
- `.gradient-bg-accent` - Accent gradient background
- `.info-box` - Styled info boxes with gradient borders
- `.card-hover` - Hover effect with transform
- `.card-gradient-border` - Gradient border effect
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style

**Animations:**
- `@keyframes float` - Floating animation
- `@keyframes slide-in` - Slide in from bottom
- `@keyframes glow` - Glow effect
- `@keyframes pulse` - Pulsing effect (via Tailwind)

**Decorative Elements:**
- `.decoration-dots` - Dot pattern background
- `.decoration-wave` - Wave SVG decoration
- `.shape-divider` - Elementor-style shape dividers

### Responsive Breakpoints

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

All components are fully responsive using Tailwind's responsive utilities.

---

## 🔧 Component Development

### Creating New Components

1. Create file in `src/components/`
2. Use `.astro` extension
3. Follow this structure:

```astro
---
// Component logic (TypeScript/JavaScript)
export interface Props {
  title?: string;
}

const { title = "Default Title" } = Astro.props;

// Data or calculations
const data = [];
---

<!-- Component HTML -->
<section>
  <h2>{title}</h2>
  <!-- Rest of component -->
</section>

<!-- Component-specific styles (optional) -->
<style>
  /* Scoped styles */
</style>

<!-- Client-side JavaScript (optional) -->
<script>
  // Runs in browser
</script>
```

### Best Practices

1. **Keep components focused** - One component, one responsibility
2. **Use TypeScript** - Add types for props
3. **Leverage Astro features** - Use built-in optimizations
4. **Follow naming conventions** - PascalCase for components
5. **Document props** - Add comments for complex props
6. **Test responsiveness** - Check all breakpoints
7. **Optimize images** - Use Astro's Image component
8. **Minimize JavaScript** - Prefer CSS for animations

---

## 🚀 Performance Tips

1. **Use CSS animations** instead of JavaScript when possible
2. **Lazy load images** below the fold
3. **Minimize inline styles** - Use utility classes
4. **Avoid large JavaScript libraries** - Astro ships zero JS by default
5. **Use Web Fonts sparingly** - Currently using Google Fonts for brand fonts
6. **Optimize images** before adding to `public/`

---

## 🐛 Common Issues

### Component not rendering
- Check import statement in parent component
- Verify file path is correct
- Ensure component name matches file name

### Styles not applying
- Check if Tailwind classes are correct
- Verify global.css is imported in Layout.astro
- Use browser DevTools to inspect computed styles

### Form not submitting
- Verify Web3Forms API key is set
- Check browser console for errors
- Test with Web3Forms playground

### LinkedIn feed not showing
- Verify EmbedSocial ref ID
- Check if JavaScript is enabled
- Ensure correct LinkedIn post IDs

---

## 📚 Resources

- [Astro Components](https://docs.astro.build/en/core-concepts/astro-components/)
- [Astro Props](https://docs.astro.build/en/core-concepts/astro-components/#component-props)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Web3Forms Docs](https://docs.web3forms.com/)
- [EmbedSocial Docs](https://embedsocial.com/documentation/)