# Image Storage Guidelines for MobilityTrailblazers Astro Site

## 📁 Where to Store Images

### Primary Location: `public/images/`

All images should be stored in the `public/images/` directory. This is the standard location for static assets in Astro projects.

**Directory Structure:**
```
public/
├── images/
│   ├── logo.webp                    # Site logo
│   ├── og-image.jpg                 # Open Graph image
│   ├── background.webp              # Background images
│   ├── jury/                        # Jury member photos
│   │   ├── andreas-herrmann.webp
│   │   ├── torsten-tomczak.webp
│   │   └── astronaut.svg            # Placeholder
│   ├── linkedin/                    # LinkedIn feed images
│   │   ├── linkedin-1.jpg
│   │   ├── linkedin-2.jpg
│   │   └── linkedin-3.jpg
│   ├── icons/                       # Icon files
│   │   └── cityscape.svg
│   └── uploads/                     # User-uploaded content
│       └── nominations/
└── favicon.svg                      # Site favicon
```

## 🎯 Image Types and Usage

### 1. **Logo Images**
- **Location**: `public/images/logo.webp`
- **Usage**: Header and footer components
- **Format**: WebP (preferred) or SVG
- **Size**: 110x110px (header), 80x80px (footer)
- **Optimization**: Compressed WebP for fast loading

### 2. **Open Graph Images**
- **Location**: `public/images/og-image.jpg`
- **Usage**: Social media sharing (Facebook, Twitter, LinkedIn)
- **Format**: JPG (better compatibility)
- **Size**: 1200x630px (16:9 aspect ratio)
- **Optimization**: High quality for social media

### 3. **Background Images**
- **Location**: `public/images/background.webp`
- **Usage**: Section backgrounds (Mission, Newsletter, NominationForm)
- **Format**: WebP (preferred) or JPG
- **Size**: 1920x1080px minimum
- **Optimization**: Compressed for fast loading

### 4. **Jury Member Photos**
- **Location**: `public/images/jury/`
- **Usage**: JurySection component
- **Format**: WebP (preferred) or JPG
- **Size**: 300x300px (square aspect ratio)
- **Optimization**: High quality for professional appearance

### 5. **LinkedIn Feed Images**
- **Location**: `public/images/linkedin/`
- **Usage**: LinkedInFeed component
- **Format**: JPG (matches LinkedIn format)
- **Size**: Various (16:9 aspect ratio preferred)
- **Optimization**: Medium compression for social media look

### 6. **Icon and Decorative Images**
- **Location**: `public/images/icons/`
- **Usage**: Decorative elements (cityscape, patterns)
- **Format**: SVG (preferred for icons) or WebP
- **Size**: Variable
- **Optimization**: SVG for scalability, WebP for complex images

### 7. **User Uploads**
- **Location**: `public/images/uploads/`
- **Usage**: User-submitted content (nominations, etc.)
- **Format**: JPG, PNG, WebP
- **Size**: Variable
- **Optimization**: Compressed for storage efficiency

## 🚀 Image Optimization Guidelines

### Format Selection
1. **WebP** - Primary format for photos and complex images
2. **SVG** - Icons, logos, and simple graphics
3. **JPG** - Social media images and when WebP isn't supported
4. **PNG** - Images requiring transparency

### Compression Settings
```bash
# WebP optimization
cwebp -q 85 -m 6 input.jpg -o output.webp

# JPG optimization
jpegoptim --strip-all --quality=85 input.jpg

# PNG optimization
pngquant --quality=85-95 input.png
```

### Size Guidelines
- **Hero images**: 1920x1080px max
- **Profile photos**: 300x300px (square)
- **Social media**: 1200x630px (16:9)
- **Icons**: 64x64px max
- **Backgrounds**: 1920x1080px min

## 📝 How to Reference Images in Code

### In Astro Components
```astro
<!-- Direct reference -->
<img src="/images/logo.webp" alt="Logo" width="110" height="110">

<!-- Background image in CSS -->
<style>
  .hero {
    background: url('/images/background.webp') center center/cover;
  }
</style>

<!-- Dynamic reference -->
<img src={imagePath} alt={altText} width={width} height={height}>
```

### In CSS Files
```css
/* Background images */
.hero-section {
  background: url('/images/background.webp') center center/cover;
}

/* Icon images */
.icon {
  background: url('/images/icons/cityscape.svg') no-repeat;
}
```

### In JavaScript/TypeScript
```typescript
// Image paths in data
const juryMembers = [
  {
    name: "Andreas Herrmann",
    image: "/images/jury/andreas-herrmann.webp"
  }
];
```

## 🔧 Image Processing Workflow

### 1. **Prepare Images**
```bash
# Create directories
mkdir -p public/images/{jury,linkedin,icons,uploads}

# Optimize existing images
npm install -g sharp-cli
sharp -i input.jpg -o public/images/output.webp --resize 1920 1920 --webp.quality 85
```

### 2. **Batch Processing Script**
Create `scripts/optimize-images.js`:
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const inputDir = './raw-images/';
  const outputDir = './public/images/';
  
  const files = fs.readdirSync(inputDir);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      await sharp(path.join(inputDir, file))
        .resize(1920, 1920, { withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(path.join(outputDir, file.replace(/\.[^/.]+$/, '.webp')));
    }
  }
}

optimizeImages();
```

### 3. **Add to package.json**
```json
{
  "scripts": {
    "optimize-images": "node scripts/optimize-images.js"
  }
}
```

## 📱 Responsive Images

### Using Astro's Image Component
```astro
---
import { Image } from 'astro:assets';
import myImage from '../images/my-image.jpg';
---

<Image 
  src={myImage} 
  alt="Description" 
  width={800} 
  height={600}
  format="webp"
/>
```

### Manual Responsive Images
```html
<picture>
  <source srcset="/images/hero.webp" type="image/webp">
  <source srcset="/images/hero.jpg" type="image/jpeg">
  <img src="/images/hero.jpg" alt="Hero image" loading="lazy">
</picture>
```

## 🎨 Brand Image Guidelines

### Logo Usage
- **Primary logo**: Use on white/light backgrounds
- **Inverted logo**: Use on dark backgrounds
- **Minimum size**: 80px width for readability
- **Clear space**: Equal to logo height on all sides

### Color Palette
- **Primary**: #003C3D (Dark Teal)
- **Accent**: #C1693C (Orange)
- **Background**: #F8F0E3 (Beige)
- **Text**: #302C37 (Dark Gray)

### Image Style
- **Photography**: Clean, professional, mobility-focused
- **Graphics**: Modern, minimalist, brand-aligned
- **Icons**: Simple, scalable, consistent stroke width

## 🔍 SEO and Accessibility

### Alt Text Guidelines
```html
<!-- Descriptive alt text -->
<img src="/images/jury/andreas-herrmann.webp" 
     alt="Andreas Herrmann, Professor of Marketing at Universität St. Gallen">

<!-- Decorative images -->
<img src="/images/icons/decoration.svg" alt="" role="presentation">

<!-- Complex images -->
<img src="/images/infographic.png" 
     alt="Infographic showing mobility trends: 60% increase in electric vehicles, 40% reduction in emissions">
```

### File Naming Convention
- **Use kebab-case**: `andreas-herrmann.webp`
- **Include dimensions**: `hero-1920x1080.webp`
- **Add version**: `logo-v2.webp`
- **Descriptive names**: `mobility-summit-2025.webp`

## 🚨 Common Mistakes to Avoid

### ❌ Don't Do This
```html
<!-- Don't use absolute URLs -->
<img src="https://example.com/images/logo.jpg">

<!-- Don't forget alt text -->
<img src="/images/logo.webp">

<!-- Don't use large images without optimization -->
<img src="/images/4mb-photo.jpg">

<!-- Don't store images in src/ -->
<img src="../assets/image.jpg">
```

### ✅ Do This Instead
```html
<!-- Use relative paths from public/ -->
<img src="/images/logo.webp" alt="Mobility Trailblazers Logo">

<!-- Always include alt text -->
<img src="/images/logo.webp" alt="Mobility Trailblazers Logo">

<!-- Optimize images before adding -->
<img src="/images/optimized-logo.webp" alt="Logo">

<!-- Store in public/images/ -->
<img src="/images/logo.webp" alt="Logo">
```

## 📊 Performance Monitoring

### Image Loading Performance
```javascript
// Monitor image loading times
window.addEventListener('load', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const loadTime = performance.now() - performance.timing.navigationStart;
    console.log(`${img.src}: ${loadTime}ms`);
  });
});
```

### Lighthouse Audit
- **Image optimization**: Target 90+ score
- **Lazy loading**: Implement for images below fold
- **WebP format**: Use for better compression
- **Proper sizing**: Don't load larger images than needed

## 🔄 Migration from WordPress

### WordPress Image Paths
```
Old: https://mobilitytrailblazers.de/wp-content/uploads/2025/08/image.jpg
New: /images/image.webp
```

### Migration Script
```javascript
// Convert WordPress image paths to Astro paths
function convertImagePath(wordpressPath) {
  return wordpressPath
    .replace(/https:\/\/mobilitytrailblazers\.de\/wp-content\/uploads\/\d{4}\/\d{2}\//, '/images/')
    .replace(/\.(jpg|jpeg|png)$/i, '.webp');
}
```

## 📚 Resources

- [Astro Assets Documentation](https://docs.astro.build/en/guides/images/)
- [WebP Optimization Guide](https://developers.google.com/speed/webp)
- [Image Optimization Tools](https://web.dev/fast/#optimize-your-images)
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

---

**Remember**: Always optimize images before adding them to the project. The goal is to maintain high visual quality while ensuring fast loading times for the best user experience.
