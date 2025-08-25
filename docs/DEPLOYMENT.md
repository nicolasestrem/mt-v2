# Deployment Guide

Complete guide for deploying the MobilityTrailblazers Astro site to production.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Web3Forms API key configured
- [ ] LinkedIn integration configured
- [ ] All content updated (text, images, dates)
- [ ] Tested locally with `npm run build`
- [ ] Verified responsive design
- [ ] Checked form submissions work

## 🚀 Deployment Options

### Option 1: Cloudflare Pages (Recommended - FREE)

#### A. Direct Upload Method (Quickest)

1. **Build the site locally:**
```bash
npm run build
```

2. **Upload to Cloudflare:**
- Go to https://pages.cloudflare.com/
- Click "Create a project"
- Select "Upload assets"
- Name your project (e.g., `mobility-trailblazers`)
- Drag and drop the `dist` folder
- Click "Deploy site"

3. **Your site is live at:**
```
https://[project-name].pages.dev
```

#### B. Git Integration (Auto-Deploy)

1. **Connect GitHub repository:**
- Go to https://pages.cloudflare.com/
- Click "Create a project"
- Select "Connect to Git"
- Authorize Cloudflare to access GitHub
- Select repository: `nicolasestrem/mt-v2`

2. **Configure build settings:**
```yaml
Build command: npm run build
Build output directory: dist
Root directory: /
Environment variables: (none required)
Node version: 18 (or latest)
```

3. **Deploy:**
- Click "Save and Deploy"
- Wait 2-3 minutes for build
- Site auto-deploys on every push to main

#### C. Custom Domain Setup

1. **Add custom domain:**
- In Cloudflare Pages → Settings → Custom domains
- Click "Set up a custom domain"
- Enter: `mobilitytrailblazers.de`

2. **DNS Configuration:**

**If domain is on Cloudflare:**
- DNS records will be added automatically
- SSL certificate provisioned automatically

**If domain is elsewhere:**
Add these DNS records:
```
Type: CNAME
Name: @ (or root)
Value: [project-name].pages.dev

Type: CNAME
Name: www
Value: [project-name].pages.dev
```

3. **SSL Certificate:**
- Automatic and free
- Usually active within minutes

---

### Option 2: Netlify (Alternative - FREE)

1. **Deploy with Git:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

2. **Or use Netlify Dashboard:**
- Go to https://app.netlify.com/
- Drag `dist` folder to dashboard
- Site deploys instantly

3. **Build Settings for Git integration:**
```yaml
Build command: npm run build
Publish directory: dist
```

---

### Option 3: Vercel (Alternative - FREE)

1. **Deploy with CLI:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

2. **Build Settings:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

---

### Option 4: Traditional Hosting

If you need to deploy to traditional hosting (Apache/Nginx):

1. **Build the site:**
```bash
npm run build
```

2. **Upload files:**
- Upload entire contents of `dist/` folder
- Use FTP/SFTP/SSH
- Place in web root (public_html, www, htdocs)

3. **Configure .htaccess (Apache):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Cache Control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

4. **Configure nginx:**
```nginx
server {
    listen 80;
    server_name mobilitytrailblazers.de;
    root /var/www/mobilitytrailblazers;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/javascript;
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🔐 Environment Variables

For production, you may want to use environment variables:

### Cloudflare Pages

1. Go to Settings → Environment variables
2. Add variables:
```
PUBLIC_WEB3FORMS_KEY=your-key-here
PUBLIC_LINKEDIN_REF_ID=your-ref-id
```

3. Update code to use them:
```astro
const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY;
```

### Local Development

Create `.env` file:
```bash
PUBLIC_WEB3FORMS_KEY=your-key-here
PUBLIC_LINKEDIN_REF_ID=your-ref-id
```

---

## 📊 Post-Deployment

### 1. Verify Deployment

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Images loading
- [ ] Forms submitting
- [ ] LinkedIn feed displaying
- [ ] Mobile responsive
- [ ] HTTPS working

### 2. Performance Testing

Run Lighthouse audit:
- Open Chrome DevTools
- Go to Lighthouse tab
- Run audit
- Target scores: 95+ across all metrics

### 3. Monitoring Setup

#### Cloudflare Analytics (Free)
- Automatically included with Cloudflare Pages
- View in Cloudflare dashboard

#### Google Analytics (Optional)
Add to `Layout.astro`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Plausible Analytics (Privacy-friendly)
Add to `Layout.astro`:
```html
<script defer data-domain="mobilitytrailblazers.de" src="https://plausible.io/js/script.js"></script>
```

### 4. Form Submission Tracking

#### Web3Forms Dashboard
- Login to Web3Forms
- View submissions
- Export as CSV

#### Email Notifications
- Configure in Web3Forms settings
- Add multiple recipients
- Set up auto-responders

#### Database Storage (Optional)
Use Cloudflare D1:
```javascript
// workers/form-handler.js
export default {
  async fetch(request, env) {
    const formData = await request.formData();
    
    // Store in D1 database
    await env.DB.prepare(
      "INSERT INTO submissions (name, email, reason) VALUES (?, ?, ?)"
    ).bind(
      formData.get('nominee_name'),
      formData.get('email'),
      formData.get('reason')
    ).run();
    
    return new Response('Success');
  }
};
```

---

## 🔄 Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build site
        run: npm run build
        
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: mobility-trailblazers
          directory: dist
```

### Setting up Secrets

1. Get Cloudflare API Token:
- Go to Cloudflare → My Profile → API Tokens
- Create token with "Cloudflare Pages:Edit" permission

2. Get Account ID:
- Find in Cloudflare dashboard URL or Right sidebar

3. Add to GitHub:
- Repository → Settings → Secrets → Actions
- Add `CLOUDFLARE_API_TOKEN`
- Add `CLOUDFLARE_ACCOUNT_ID`

---

## 🚨 Rollback Procedure

If something goes wrong:

### Cloudflare Pages
1. Go to Deployments tab
2. Find previous working deployment
3. Click "..." → "Rollback to this deployment"
4. Instant rollback

### Git Revert
```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard [commit-hash]
git push origin main --force
```

---

## 📈 Scaling Considerations

### Traffic Spikes
- Cloudflare Pages: Unlimited bandwidth
- Automatic global CDN distribution
- DDoS protection included

### Content Updates
For non-technical users:
1. Use Forestry.io or NetlifyCMS
2. Connect to GitHub repository
3. Edit content through web interface
4. Auto-deploys on save

### Multi-language Support
```astro
// src/pages/de/index.astro
// src/pages/en/index.astro
```

---

## 🆘 Troubleshooting

### Build Fails on Cloudflare
- Check Node version (use 18+)
- Verify all dependencies in package.json
- Check build logs for errors

### Domain Not Working
- Verify DNS propagation (can take 24-48 hours)
- Check SSL certificate status
- Ensure CNAME records are correct

### Forms Not Working
- Verify Web3Forms key is correct
- Check browser console for errors
- Test with Web3Forms playground

### LinkedIn Feed Not Showing
- Check if JavaScript is enabled
- Verify embed codes are correct
- Check browser console for errors

---

## 📞 Support Resources

- **Cloudflare Pages**: https://developers.cloudflare.com/pages/
- **Astro Discord**: https://astro.build/chat
- **Web3Forms**: support@web3forms.com
- **GitHub Issues**: https://github.com/nicolasestrem/mt-v2/issues

---

## ✅ Deployment Complete!

Once deployed, your site will be:
- ⚡ Lightning fast (0.5s load time)
- 🔒 Secure with HTTPS
- 🌍 Globally distributed via CDN
- 💰 Free to host
- 🔄 Auto-deploying on git push
- 📊 Monitored with analytics

Congratulations on migrating from WordPress to modern JAMstack! 🎉