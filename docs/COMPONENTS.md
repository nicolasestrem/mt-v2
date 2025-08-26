# Component Documentation

Detailed documentation for all Astro components in the MobilityTrailblazers site.

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

Grid display of jury members with gradient border cards.

**Features:**
- Gradient border cards (`card-gradient-border`)
- Circular profile images (placeholder)
- LinkedIn links for each member
- Hover glow effects
- Shape divider at top
- Responsive grid layout

**Data Structure:**
```javascript
const juryMembers = [
  {
    name: "Dr. Sarah Schmidt",
    role: "Mobilitätsforscherin",
    organization: "Fraunhofer Institut",
    image: "/images/jury/jury-1.jpg"
  },
  // ... more members
];
```

**Usage:**
```astro
<JurySection />
```

**Customization:**
- Update jury members: Edit the data array
- Add real images: Place in `public/images/jury/`
- Modify card layout: Edit the grid classes

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