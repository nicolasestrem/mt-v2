# CSS Style Guide for MobilityTrailblazers.de

## Overview

This document outlines the CSS coding conventions and best practices for the MobilityTrailblazers.de project. All styles are automatically validated using Stylelint.

## Automated Testing with Stylelint

### Running Tests

```bash
# Check all styles
npm run lint:css

# Auto-fix issues
npm run lint:css:fix

# Run as part of all tests
npm run test:all
```

### CI/CD Integration

- Stylelint runs automatically on all PRs
- Checks CSS files and Astro component styles
- Execution time: ~30 seconds
- Fails fast on style violations

## Color System

### Brand Colors

Always use CSS variables or Tailwind classes for colors:

```css
/* ✅ Good - Using CSS variables */
.element {
  color: var(--color-primary);
  background-color: var(--color-accent);
}

/* ✅ Good - Using Tailwind classes */
<div class="text-brand-primary bg-brand-accent">

/* ❌ Bad - Hard-coded colors */
.element {
  color: #003C3D;
  background: rgb(193, 105, 60);
}
```

### Color Variables

- `--color-primary`: #003C3D (Dark teal)
- `--color-accent`: #C1693C (Orange)
- `--color-background`: #F8F0E3 (Beige)
- `--color-text`: #302C37 (Dark gray)

## Typography

### Font Families

```css
/* Primary headings (H1) */
font-family: var(--font-heading-primary); /* Poppins */

/* Secondary headings (H2, H3) */
font-family: var(--font-heading-secondary); /* Trebuchet MS */

/* Small headings (H4, H5, H6) */
font-family: var(--font-heading-small); /* Cabin */

/* Body text */
font-family: var(--font-body); /* Roboto */
```

### Font Sizes

Use rem units for typography:

```css
/* ✅ Good */
.text {
  font-size: 1.125rem; /* 18px */
  line-height: 1.6;
}

/* ❌ Bad */
.text {
  font-size: 18px;
}
```

## Units

### Preferred Units

- **Typography**: `rem`, `em`
- **Borders**: `px`
- **Spacing**: `rem`, `px`
- **Layout**: `%`, `vw`, `vh`, `fr`
- **Animations**: `ms`, `s`

### Examples

```css
/* ✅ Good unit usage */
.card {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  transition: transform 300ms ease;
}

/* ❌ Bad - Inconsistent units */
.card {
  padding: 24;
  border: 1rem solid #ccc;
  font-size: 16px;
}
```

## Property Ordering

Properties must be ordered by category:

1. **Positioning** (position, top, right, bottom, left, z-index)
2. **Display & Box Model** (display, flex, grid properties)
3. **Box Model** (width, height, margin, padding)
4. **Typography** (font, line-height, text properties)
5. **Visual** (color, background, border, shadow)
6. **Animation** (transition, animation, transform)
7. **Other** (cursor, user-select)

```css
/* ✅ Good - Properly ordered */
.element {
  /* Positioning */
  position: relative;
  top: 0;
  
  /* Display */
  display: flex;
  justify-content: center;
  
  /* Box Model */
  width: 100%;
  padding: 1rem;
  
  /* Typography */
  font-size: 1rem;
  text-align: center;
  
  /* Visual */
  color: var(--color-text);
  background-color: var(--color-background);
  border-radius: 8px;
  
  /* Animation */
  transition: all 0.3s ease;
}
```

## Selectors

### Naming Conventions

- **Classes**: Lowercase with hyphens (`kebab-case`)
- **IDs**: Camelcase starting lowercase (`camelCase`)
- **Custom properties**: Lowercase with hyphens

```css
/* ✅ Good */
.hero-title { }
#newsletterForm { }
--color-primary: #003C3D;

/* ❌ Bad */
.HeroTitle { }
#newsletter-form { }
--ColorPrimary: #003C3D;
```

### Specificity Guidelines

- Maximum specificity: `0,4,1` (4 classes, 1 type)
- Maximum nesting depth: 3 levels
- Maximum compound selectors: 4

```css
/* ✅ Good - Low specificity */
.card { }
.card .title { }

/* ❌ Bad - Too specific */
body main section.hero div.container h1.title { }
```

## Important Usage

Avoid `!important` except for utility classes:

```css
/* ✅ OK for utilities */
.hidden {
  display: none !important;
}

/* ❌ Bad - Regular styles */
.button {
  background: var(--color-accent) !important;
}
```

## Media Queries

Use mobile-first approach:

```css
/* ✅ Good - Mobile first */
.element {
  font-size: 1rem;
}

@media (min-width: 768px) {
  .element {
    font-size: 1.125rem;
  }
}

/* ❌ Bad - Desktop first */
.element {
  font-size: 1.125rem;
}

@media (max-width: 767px) {
  .element {
    font-size: 1rem;
  }
}
```

## Astro Component Styles

In Astro components, use scoped styles:

```astro
<style>
  /* Styles are automatically scoped to this component */
  .hero {
    background: var(--color-background);
  }
  
  /* Global styles need :global() */
  :global(body) {
    margin: 0;
  }
</style>
```

## Tailwind Integration

Tailwind utilities can be used alongside custom CSS:

```html
<!-- ✅ Good - Combining Tailwind and custom styles -->
<div class="flex items-center custom-gradient">
  <h1 class="text-4xl font-bold hero-title">
</div>
```

## Common Patterns

### Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, #C1693C, #003C3D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Card Shadow

```css
.card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Button Styles

```css
.button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: var(--color-accent);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: var(--color-accent-hover);
}
```

## Linting Rules Summary

Key Stylelint rules enforced:

- ✅ Colors must be hex uppercase (#FFFFFF)
- ✅ No vendor prefixes (autoprefixer handles this)
- ✅ Properties must be ordered logically
- ✅ Maximum nesting depth of 3
- ✅ No duplicate selectors or properties
- ✅ Zero values don't need units
- ✅ Quotes required for font names and URLs
- ✅ Maximum 4 classes per selector
- ✅ Custom properties must use kebab-case

## VS Code Integration

Install the Stylelint extension for real-time feedback:

1. Install "Stylelint" extension by Stylelint
2. Settings are pre-configured in `.vscode/settings.json`
3. Errors appear inline as you type
4. Auto-fix on save is enabled

## Troubleshooting

### Common Issues

1. **"Unknown at-rule @tailwind"**
   - This is expected and configured to be ignored

2. **"Unexpected unknown function theme()"**
   - Tailwind functions are allowed in config

3. **"Expected selector to be nested"**
   - Use `&` for nested selectors in Astro

### Running Fixes

```bash
# Fix all auto-fixable issues
npm run lint:css:fix

# Check specific file
npx stylelint src/styles/global.css

# Ignore cache for fresh check
npx stylelint src/**/*.css --cache=false
```

## Resources

- [Stylelint Documentation](https://stylelint.io/)
- [CSS Guidelines](https://cssguidelin.es/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Astro Styling](https://docs.astro.build/en/guides/styling/)