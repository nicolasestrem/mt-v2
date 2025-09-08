# Jury Section Documentation

## Overview
The jury section displays the distinguished jury members of the Mobility Trailblazers initiative with a progressive disclosure pattern for optimal user experience.

## Features

### Progressive Disclosure
- **Desktop**: Shows 6 random jury members initially
- **Tablet**: Shows 4 random jury members initially  
- **Mobile**: Shows 2 random jury members initially
- **Expand Button**: "Alle Jury-Mitglieder anzeigen" reveals all 21 members
- **Random Selection**: Different members shown on each page load

### Data Structure
```typescript
interface JuryMember {
  id: string;
  name: string;
  title: string;
  role: string;
  organization: string;
  bio: string;
  image: string;
  linkedin?: string;
}
```

## Jury Members (21 Total)

### Leadership
1. **Winfried Hermann** - Schirmherr, Verkehrsminister Baden-Württemberg
2. **Prof. Dr. Andreas Herrmann** - Präsident, Institut für Mobilität
3. **Torsten Tomczak** - Vize-Präsident, Institut für Mobilität

### Industry Leaders
- **Dr. Astrid Fontaine** - Schaeffler Gruppe
- **Dr. Kjell Gruner** - Volkswagen Group of America
- **Dr. Philipp Rösler** - Consessor AG
- **Katja Busch** - DHL Group
- **Dr. Sabine Stock** - ÖBB-Personenverkehr AG
- **Jürgen Stackmann** - Automobil-Experte
- **Eberhard Weiblen** - Porsche Consulting
- **Hans-Peter Kleebinder** - Independent Expert
- **Helmut Ruhl** - AMAG Group AG
- **Johann Jungwirth** - Mobileye
- **Laura Meyer** - Hotelplan Gruppe
- **Susann Schramm** - Motel One

### Academic Experts
- **Prof. Dr. Nikolaus Lang** - BCG Center for Mobility Innovation
- **Prof. Dr. Oliver Gassmann** - Institut für Technologiemanagement
- **Prof. Dr. Wolfgang Jenewein** - Jenewein AG
- **Prof. Dr. Zheng Han** - Tongji University Shanghai

### Special Advisors
- **Peter Grünenfelder** - Auto-Schweiz
- **Felix Neureuther** - Unternehmer & Nachhaltigkeits-Experte

## Technical Implementation

### Component Location
`src/components/JurySection.astro`

### Image Assets
- **Location**: `/public/images/jury/`
- **Format**: WebP
- **Dimensions**: 400x400px
- **Optimization**: 85% quality

### JavaScript Features
- Vanilla JavaScript (ES5 compatible)
- No external dependencies
- Random shuffling algorithm
- Responsive breakpoint detection
- Smooth animations via CSS transitions

### Styling
- CSS Grid layout
- Glass morphism effects
- Brand colors: #003C3D (primary), #C1693C (accent)
- Mobile-first responsive design

## Usage

The component is included in the main page:
```astro
import JurySection from '../components/JurySection.astro';

<JurySection />
```

## Maintenance

### Adding New Jury Members
1. Add member data to `juryMembers` array
2. Add WebP image to `/public/images/jury/`
3. Update LinkedIn URL if available

### Updating Member Information
1. Locate member in `juryMembers` array by ID
2. Update organization, bio, or LinkedIn fields
3. Test responsive display

## Performance
- Lazy loading for images
- CSS animations use GPU acceleration
- Minimal JavaScript footprint
- No localStorage usage