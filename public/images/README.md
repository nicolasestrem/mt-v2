# Images Directory

This directory contains all images for the MobilityTrailblazers Astro site.

## 📁 Directory Structure

```
images/
├── logo.webp                    # Site logo (110x110px)
├── og-image.jpg                 # Open Graph image (1200x630px)
├── background.webp              # Background images (1920x1080px)
├── jury/                        # Jury member photos
│   ├── andreas-herrmann.webp    # 300x300px
│   ├── torsten-tomczak.webp     # 300x300px
│   └── astronaut.svg            # Placeholder icon
├── linkedin/                    # LinkedIn feed images
│   ├── linkedin-1.jpg           # 1200x630px
│   ├── linkedin-2.jpg           # 1200x630px
│   └── linkedin-3.jpg           # 1200x630px
├── icons/                       # Icon files

└── uploads/                     # User-uploaded content
    └── nominations/             # Nomination form uploads
```

## 🎯 Image Guidelines

### Format Preferences
- **WebP** - Primary format for photos and complex images
- **SVG** - Icons, logos, and simple graphics
- **JPG** - Social media images and when WebP isn't supported
- **PNG** - Images requiring transparency

### Size Guidelines
- **Logo**: 110x110px (header), 80x80px (footer)
- **Open Graph**: 1200x630px (16:9 aspect ratio)
- **Backgrounds**: 1920x1080px minimum
- **Jury photos**: 300x300px (square)
- **LinkedIn**: 1200x630px (16:9)
- **Icons**: 64x64px maximum

### Optimization
All images should be optimized for web use:
- Compressed file sizes
- Appropriate dimensions
- Fast loading times
- Good visual quality

## 🚀 Adding New Images

### Option 1: Manual Optimization
1. Optimize your image using tools like:
   - [Squoosh](https://squoosh.app/)
   - [TinyPNG](https://tinypng.com/)
   - [ImageOptim](https://imageoptim.com/)

2. Save to the appropriate subdirectory
3. Use descriptive filenames (kebab-case)

### Option 2: Using the Optimization Script
1. Place raw images in `./raw-images/`
2. Run: `npm run optimize-images`
3. Optimized images will be automatically placed in the correct directories

## 📝 Usage in Code

### In Astro Components
```astro
<!-- Direct reference -->
<img src="/images/logo.webp" alt="Logo" width="110" height="110">

<!-- Background image -->
<style>
  .hero {
    background: url('/images/background.webp') center center/cover;
  }
</style>
```

### In CSS
```css
.icon {
  background: url('/images/icons/cityscape.svg') no-repeat;
}
```

## 🔍 SEO and Accessibility

### Alt Text
Always include descriptive alt text:
```html
<img src="/images/jury/andreas-herrmann.webp" 
     alt="Andreas Herrmann, Professor of Marketing at Universität St. Gallen">
```

### File Naming
- Use kebab-case: `andreas-herrmann.webp`
- Include dimensions: `hero-1920x1080.webp`
- Add version: `logo-v2.webp`
- Descriptive names: `mobility-summit-2025.webp`

## 📊 Performance

### Target File Sizes
- **Logo**: < 10KB
- **Background**: < 200KB
- **Jury photos**: < 50KB each
- **LinkedIn**: < 100KB each
- **Icons**: < 5KB

### Loading Optimization
- Use `loading="lazy"` for images below the fold
- Implement responsive images with `<picture>` elements
- Consider using Astro's Image component for automatic optimization

## 🚨 Common Mistakes

### ❌ Don't Do This
- Store images in `src/` directory
- Use absolute URLs
- Forget alt text
- Use unoptimized large files
- Mix different naming conventions

### ✅ Do This Instead
- Store in `public/images/`
- Use relative paths from `/images/`
- Always include alt text
- Optimize before adding
- Use consistent naming

## 🔧 Maintenance

### Regular Tasks
- Monitor file sizes
- Update outdated images
- Optimize new uploads
- Check broken image links
- Update alt text as needed

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) for performance audits
- [WebPageTest](https://www.webpagetest.org/) for loading analysis
- [GTmetrix](https://gtmetrix.com/) for optimization suggestions

---

For detailed guidelines, see: `docs/IMAGE_STORAGE_GUIDELINES.md`
