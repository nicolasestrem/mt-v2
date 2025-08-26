# Image Storage Answer Summary

## 🎯 Where to Store Images in This Project

**Primary Location: `public/images/`**

All images for the MobilityTrailblazers Astro site should be stored in the `public/images/` directory. This is the standard location for static assets in Astro projects.

## 📁 Directory Structure Created

```
public/images/
├── logo.webp                    # Site logo (110x110px)
├── og-image.jpg                 # Open Graph image (1200x630px)
├── background.webp              # Background images (1920x1080px)
├── jury/                        # Jury member photos
│   ├── andreas-herrmann.webp    # 300x300px
│   ├── torsten-tomczak.webp     # 300x300px
│   └── astronaut.svg            # Placeholder
├── linkedin/                    # LinkedIn feed images
│   ├── linkedin-1.jpg           # 1200x630px
│   ├── linkedin-2.jpg           # 1200x630px
│   └── linkedin-3.jpg           # 1200x630px
├── icons/                       # Icon files
│   └── cityscape.svg            # Decorative elements
└── uploads/                     # User-uploaded content
    └── nominations/             # Nomination form uploads
```

## 🚀 How to Add Images

### Option 1: Manual Process
1. Optimize your image (WebP preferred, JPG for social media)
2. Save to the appropriate subdirectory in `public/images/`
3. Reference in code as `/images/filename.webp`

### Option 2: Automated Process
1. Place raw images in `./raw-images/`
2. Run: `npm run optimize-images`
3. Images will be automatically optimized and placed in correct directories

## 📝 Usage in Code

```astro
<!-- In Astro components -->
<img src="/images/logo.webp" alt="Logo" width="110" height="110">

<!-- Background images in CSS -->
<style>
  .hero {
    background: url('/images/background.webp') center center/cover;
  }
</style>
```

## 🎨 Image Guidelines

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

## 📚 Documentation Created

1. **`docs/IMAGE_STORAGE_GUIDELINES.md`** - Comprehensive guide with all details
2. **`public/images/README.md`** - Quick reference for the images directory
3. **`scripts/optimize-images.js`** - Automated image optimization script
4. **Updated `package.json`** - Added `npm run optimize-images` command

## ✅ What's Ready to Use

- ✅ Image directory structure created
- ✅ Optimization script ready
- ✅ Documentation complete
- ✅ Placeholder images added
- ✅ NPM script configured

## 🚨 Important Notes

- **Never store images in `src/`** - only in `public/images/`
- **Always optimize images** before adding to the project
- **Use relative paths** starting with `/images/`
- **Include alt text** for accessibility
- **Follow naming conventions** (kebab-case)

---

**Quick Start**: Place your images in `public/images/` and reference them as `/images/filename.webp` in your code!
