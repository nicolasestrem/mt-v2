# Deployment Guide for MobilityTrailblazers Astro Site

## Quick Start

### 1. Get Your Free Web3Forms API Key
1. Go to https://web3forms.com/
2. Enter your email
3. Get your access key instantly (no signup required)
<<<<<<< HEAD
4. Copy `.env.example` to `.env` and add your Web3Forms access key
=======
4. Replace `YOUR-ACCESS-KEY-HERE` in `src/components/NominationForm.astro` (line 47)
>>>>>>> 135f43c (feat: Add Web3Forms integration to nomination form)

### 2. Build the Site
```bash
npm run build
```
This creates a `dist/` folder with your static site.

### 3. Deploy to Cloudflare Pages (FREE)

#### Option A: Direct Upload (Easiest)
1. Go to https://pages.cloudflare.com/
2. Click "Create a project" → "Upload assets"
3. Drag and drop the `dist/` folder
4. Your site is live at `[project-name].pages.dev`

#### Option B: Git Integration (Recommended)
1. Push this code to GitHub
2. Go to Cloudflare Pages Dashboard
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy!

### 4. Custom Domain Setup
1. In Cloudflare Pages → Custom domains
2. Add `mobilitytrailblazers.de`
3. Update DNS records (if not already on Cloudflare)
4. SSL certificate is automatic and free

## Environment Variables

The Web3Forms key is now properly secured using environment variables:

### Local Development
1. Copy `.env.example` to `.env`
2. Add your Web3Forms access key to `.env`
3. The `.env` file is already in `.gitignore` and won't be committed

### Production Deployment (Cloudflare Pages)
1. In Cloudflare Pages → Settings → Environment variables
2. Add: `PUBLIC_WEB3FORMS_KEY = your-key-here`
3. The form automatically uses the environment variable

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# Opens at http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

## Performance Optimization

The site is already optimized, but you can:

1. **Add image optimization**:
   ```bash
   npm install sharp
   ```
   Then use Astro's Image component for automatic optimization.

2. **Enable Cloudflare Auto Minify**:
   - Dashboard → Speed → Optimization
   - Enable JavaScript, CSS, HTML minification

3. **Set Cache Headers** (already configured in Cloudflare):
   - Static assets: 1 year
   - HTML: 1 hour

## Monitoring

### Free Analytics Options:
1. **Cloudflare Analytics** (included free)
2. **Plausible** (privacy-focused, €9/month)
3. **Fathom** (privacy-focused, $14/month)

Add to Layout.astro:
```html
<!-- Plausible -->
<script defer data-domain="mobilitytrailblazers.de" src="https://plausible.io/js/script.js"></script>
```

## Form Submissions

Web3Forms sends submissions to your email. To also store them:

1. **Google Sheets Integration**:
   - Use Web3Forms webhook feature
   - Connect to Zapier/Make (free tier)
   - Auto-add to Google Sheet

2. **Database Storage**:
   - Use Cloudflare D1 (free SQLite database)
   - Or Supabase (free tier)

## Backup & Version Control

```bash
# Always commit before deploying
git add .
git commit -m "Update content"
git push origin main
```

## Troubleshooting

**Build fails?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Forms not working?**
- Check Web3Forms API key is correct
- Test with: https://web3forms.com/playground
- Check browser console for errors

**Images not loading?**
- Put images in `public/images/`
- Reference as `/images/filename.jpg`
- Use WebP format for better performance

## Cost Summary

- **Hosting**: €0 (Cloudflare Pages)
- **CDN**: €0 (included)
- **SSL**: €0 (included)
- **Forms**: €0 (250 submissions/month)
- **Total**: €0/month

vs WordPress: €16/month = €192/year saved!

## Contact for Help

- Astro Discord: https://astro.build/chat
- Cloudflare Community: https://community.cloudflare.com/
- Web3Forms Support: support@web3forms.com