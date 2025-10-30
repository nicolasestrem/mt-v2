# Trailblazers 2025 Section Documentation

## Overview
The Trailblazers 2025 section showcases 22 selected mobility innovators who are shaping the future of transportation in the DACH region. This feature was added to highlight the winners/honorees of the Mobility Trailblazers 2025 award.

## Component Location
- **Main Component**: `/src/components/TrailblazersSection.astro`
- **Data File**: `/src/data/trailblazers.ts` (all profile data, interfaces, and configuration)
- **Integration**: Added to `/src/pages/index.astro` between AboutSection and Criteria
- **Navigation**: Updated in `/src/components/Header.astro`

## Features

### 1. Category Filtering
The section includes interactive tabs to filter trailblazers by category:
- **All** (22 total)
- **Etablierte Unternehmen** (5 companies)
- **Start-ups & Katalysatoren** (14 startups)
- **Politik & Öffentliche Institutionen** (3 institutions)

### 2. Profile Cards
Each trailblazer is displayed with:
- Circular profile photo (200x200px display, 600x600px source)
- Name and title
- Organization
- Category badge with color coding
- Quick summary description
- LinkedIn profile link (when available)
- Expandable criteria section

### 3. Expandable Evaluation Criteria
Each card includes an expandable section showing 5 evaluation criteria:
- 🎯 **Mut** (Courage)
- 💡 **Innovation**
- ⚙️ **Umsetzung** (Implementation)
- 📊 **Relevanz** (Relevance)
- 🌟 **Vorbildfunktion** (Role Model)

## Data Structure

### TypeScript Interface
```typescript
interface Trailblazer {
  id: string;
  name: string;
  title?: string;
  organization: string;
  category: 'etablierte' | 'startups' | 'politik';
  quickSummary: string;
  criteria: {
    courage: string;
    innovation: string;
    implementation: string;
    relevance: string;
    roleModel: string;
  };
  image: string;
  linkedin?: string;
}
```

### Categories Distribution
- **Etablierte Unternehmen (5)**: Schwämmlein, Ruhl, Nevska, Liebelt, Prediger
- **Start-ups & Katalysatoren (14)**: Sulser, Beste, Pörnbacher, Häberli, Kreutzer, Miggiano, Stranger, Ballweg, Uhlmann, Fleischer, Meyer, Tanzer, Ouboter, Doubara
- **Politik & Öffentliche Institutionen (3)**: Reinagl, Tjarks, Knapp

## Styling

### Color Scheme
- **Background**: Gradient from `var(--color-primary)` (#003C3D) to #1a5f60
- **Accent Color**: `var(--color-accent)` (#C1693C) for titles and highlights
- **Category Colors**:
  - Etablierte: #003C3D (dark teal)
  - Start-ups: #C1693C (orange)
  - Politik: #6B46C1 (purple)

### Design Elements
- Glassmorphism effects with `backdrop-filter: blur(10px)`
- Hover animations with `translateY(-10px)` and shadow effects
- Section divider SVG matching other sections
- Responsive grid layout

## Responsive Design

### Grid Layout
- **Desktop (>1200px)**: 3 columns, 380px minimum width
- **Tablet (768px-1200px)**: 2 columns, 350px minimum width
- **Mobile (<768px)**: 1 column, full width

### Mobile Optimizations
- Smaller profile photos (150x150px on mobile)
- Reduced font sizes
- Simplified category tabs
- Touch-friendly expandable sections

## Accessibility

### ARIA Support
- `role="tablist"` and `role="tab"` for category filters
- `aria-selected` states for active tabs
- `aria-expanded` and `aria-controls` for expandable criteria
- `aria-hidden` for collapsed content
- `aria-label` for LinkedIn links

### Keyboard Navigation
- Tab navigation through all interactive elements
- Enter/Space to activate tabs and toggles
- Focus indicators on all interactive elements

## JavaScript Functionality

### Category Filtering
```javascript
// Tab click handler filters cards by data-category attribute
// Shows/hides cards based on selected category
// Updates aria-selected states
```

### Expandable Criteria
```javascript
// Toggle button controls criteria section visibility
// Updates aria-expanded and aria-hidden attributes
// Smooth height animation for expand/collapse
```

## Image Assets

### Location
`/public/images/trailblazers/`

### Naming Convention
`FirstnameLastname.jpg` (or .jpeg/.png)

### Specifications
- Source size: 600x600px
- Display size: 200x200px (300x300px actual element)
- Format: JPG/JPEG/PNG
- Border: 4px solid accent color
- Border-radius: 50% (circular)

### Image Files (22 total)
All profile photos have been extracted from the source PDFs and optimized for web display.

## Integration Points

### Navigation
- Added menu item: "Trailblazers 2025"
- Position: After "About" in main navigation
- Anchor link: `/#trailblazers`
- Mobile menu: Included in hamburger menu

### Page Structure
1. Hero
2. Mission
3. AboutSection
4. **TrailblazersSection** ← NEW
5. Criteria
6. JurySection
7. Newsletter
8. LinkedInFeed
9. NominationForm

## Performance Considerations

### Optimizations
- Lazy loading for images with `loading="lazy"`
- Client-side filtering (no server requests)
- CSS animations instead of JavaScript where possible
- Minimal JavaScript for interactivity

### Build Impact
- Adds ~1MB for 22 images
- Component size: ~35KB uncompressed
- No additional dependencies

## Testing

### Automated Tests
- Updated `/tests/pages/HomePage.ts` to match new AboutSection text
- All critical Playwright tests passing
- No regression in existing functionality

### Manual Testing Checklist
- [x] Category filtering works correctly
- [x] All 22 profiles display properly
- [x] Expandable criteria sections function
- [x] LinkedIn links open in new tabs
- [x] Responsive design on all devices
- [x] Keyboard navigation works
- [x] Screen reader compatibility

## Data Management

### Architecture (v1.1.0+)
All trailblazer data is now stored in a separate TypeScript file for better maintainability:

**Location**: `/src/data/trailblazers.ts`

**Exports**:
- `trailblazers`: Array of all 22 trailblazer profiles
- `Trailblazer`: TypeScript interface
- `categoryLabels`: Display labels for categories
- `categoryColors`: Color codes for category badges
- Helper types: `CategoryKey`, `CategoryLabels`, `CategoryColors`

**Benefits**:
- ✅ Centralized data management
- ✅ Reduced component size (1000+ → 600 lines)
- ✅ Better TypeScript support
- ✅ Easier bulk updates
- ✅ Reusable across components

## Maintenance

### Adding New Trailblazers
1. Add photo to `/public/images/trailblazers/`
2. Add data object to `trailblazers` array in `/src/data/trailblazers.ts`
3. Update category counts in tab labels (line 476-495 in component)

### Updating Content
1. Edit data in `/src/data/trailblazers.ts`
2. Criteria text is stored in the `criteria` object for each trailblazer
3. LinkedIn URLs can be updated in the `linkedin` field
4. Changes are automatically reflected in the component

### Removing Trailblazers
1. Remove data object from array in `/src/data/trailblazers.ts`
2. Delete image file from `/public/images/trailblazers/`
3. Update category counts in tab labels

## Source Documentation

### Original PDFs
- `Mobility_Trailblazers_Top25_in_2025_V2.pdf` - Main documentation
- `Mobility Booklet Candidates summary.pdf` - Candidate summaries

### Photo Source
- `/Photos of all candidates/` - Original photo collection

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Required Features
- CSS Grid
- Flexbox
- CSS Custom Properties
- backdrop-filter (graceful degradation)
- ES5 JavaScript (for compatibility)

## Future Enhancements

### Potential Improvements
1. Search functionality within trailblazers
2. Sort options (alphabetical, by organization)
3. Detail modal/page for each trailblazer
4. Social sharing for individual profiles
5. Animation on scroll reveal
6. Video introductions
7. Export to PDF functionality

## Related Documentation
- [Main README](/README.md)
- [CLAUDE.md](/CLAUDE.md) - AI assistant instructions
- [Testing Guide](/docs/TESTING.md)
- [PWA Guide](/docs/PWA_GUIDE.md)

## Support
For questions or issues related to the Trailblazers 2025 section, please:
1. Check this documentation
2. Review the component code
3. Contact the development team
4. Create an issue on GitHub

---
*Last updated: October 2024*
*Component version: 1.0.0*