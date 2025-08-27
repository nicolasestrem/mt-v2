# GitHub Secrets Setup Guide

This guide provides step-by-step instructions for obtaining and configuring all GitHub secrets needed for the project.

## 📋 Required Secrets Overview

| Secret Name | Required | Purpose |
|------------|----------|---------|
| `WEB3FORMS_KEY` | Yes | Form submissions |
| `LIGHTHOUSE_GIST_ID` | Optional | Dynamic badge updates |
| `GIST_TOKEN` | Optional | Update Gist with scores |
| `LHCI_GITHUB_APP_TOKEN` | Optional | Advanced Lighthouse features |

## 1️⃣ WEB3FORMS_KEY (Required)

This key enables the contact form to send emails.

### How to Get It:
1. Go to **https://web3forms.com/**
2. Click **"Get Access Key"**
3. Enter your email address
4. Check your email for the access key
5. Copy the key (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Add to GitHub:
1. Go to your repository: `https://github.com/nicolasestrem/mt-v2`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `WEB3FORMS_KEY`
5. Value: Your Web3Forms access key
6. Click **"Add secret"**

### Usage in Code:
The workflow uses it as: `PUBLIC_WEB3FORMS_KEY: ${{ secrets.WEB3FORMS_KEY }}`

---

## 2️⃣ LIGHTHOUSE_GIST_ID (Optional)

This allows dynamic badge updates by storing Lighthouse scores in a GitHub Gist.

### How to Create:
1. Go to **https://gist.github.com/**
2. Create a new **secret** gist with these 4 files:

**File 1: lighthouse-performance.json**
```json
{
  "schemaVersion": 1,
  "label": "Lighthouse Performance",
  "message": "98%",
  "color": "brightgreen"
}
```

**File 2: lighthouse-accessibility.json**
```json
{
  "schemaVersion": 1,
  "label": "Lighthouse Accessibility",
  "message": "95%",
  "color": "brightgreen"
}
```

**File 3: lighthouse-best-practices.json**
```json
{
  "schemaVersion": 1,
  "label": "Lighthouse Best Practices",
  "message": "92%",
  "color": "brightgreen"
}
```

**File 4: lighthouse-seo.json**
```json
{
  "schemaVersion": 1,
  "label": "Lighthouse SEO",
  "message": "100%",
  "color": "brightgreen"
}
```

3. Click **"Create secret gist"**
4. Copy the Gist ID from the URL:
   - URL will be: `https://gist.github.com/yourusername/GIST_ID_HERE`
   - Copy just the ID part (32 characters)

### Add to GitHub:
1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `LIGHTHOUSE_GIST_ID`
4. Value: Your Gist ID
5. Click **"Add secret"**

---

## 3️⃣ GIST_TOKEN (Optional)

Personal Access Token to update the Gist with new scores.

### How to Create:
1. Go to GitHub **Settings** (your profile, not the repo)
   - Direct link: **https://github.com/settings/tokens**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Lighthouse Badge Updater`
4. Set expiration (90 days or no expiration)
5. Select scope: ✅ **`gist`** (only this one)
6. Click **"Generate token"**
7. **COPY THE TOKEN NOW** (you won't see it again!)

### Add to GitHub:
1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `GIST_TOKEN`
4. Value: Your personal access token
5. Click **"Add secret"**

---

## 4️⃣ LHCI_GITHUB_APP_TOKEN (Optional)

For advanced Lighthouse CI features like historical tracking and PR status checks.

### How to Get It:

#### Option A: Use Lighthouse CI Server (Recommended)
1. Go to **https://github.com/apps/lighthouse-ci**
2. Click **"Install"**
3. Select your repository
4. After installation, you'll receive an app token
5. Copy the token

#### Option B: Self-host Lighthouse CI Server
1. Follow guide at: https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/server.md
2. Deploy your own server (Heroku, Docker, etc.)
3. Configure the server
4. Generate a build token
5. Use the build token

### Add to GitHub:
1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `LHCI_GITHUB_APP_TOKEN`
4. Value: Your Lighthouse CI token
5. Click **"Add secret"**

---

## ✅ Verification

### Check Secrets Are Set:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. You should see your secrets listed (values hidden)

### Test the Workflows:
1. **Test Web3Forms**:
   - Push a commit or manually run the Playwright workflow
   - Check if form tests pass

2. **Test Lighthouse**:
   - Push to main branch or run manually:
   ```bash
   gh workflow run lighthouse-ci.yml
   ```
   - Check Actions tab for results

3. **Test Badge Updates**:
   - After Lighthouse runs, check if Gist updates
   - Go to your Gist URL to see updated JSON files

---

## 🔧 Troubleshooting

### "Bad credentials" Error
- Regenerate your personal access token
- Make sure it has `gist` scope
- Update the `GIST_TOKEN` secret

### Lighthouse Not Running
- Check if workflow file exists: `.github/workflows/lighthouse-ci.yml`
- Verify branch name matches trigger (main)
- Check Actions tab for error logs

### Badges Not Updating
- Verify `LIGHTHOUSE_GIST_ID` is correct
- Check `GIST_TOKEN` has not expired
- Ensure Gist files have correct names

### Form Not Working
- Verify `WEB3FORMS_KEY` is set
- Test key at https://web3forms.com/
- Check if key has reached submission limit

---

## 🚀 Using Shields.io with Gist

Once your Gist is updating, you can use dynamic badges:

```markdown
![Performance](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/YOUR_USERNAME/YOUR_GIST_ID/raw/lighthouse-performance.json)
![Accessibility](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/YOUR_USERNAME/YOUR_GIST_ID/raw/lighthouse-accessibility.json)
![Best Practices](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/YOUR_USERNAME/YOUR_GIST_ID/raw/lighthouse-best-practices.json)
![SEO](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/YOUR_USERNAME/YOUR_GIST_ID/raw/lighthouse-seo.json)
```

Replace `YOUR_USERNAME` and `YOUR_GIST_ID` with your actual values.

---

## 📚 Additional Resources

- [GitHub Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Web3Forms Documentation](https://docs.web3forms.com/)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Shields.io Endpoint Badges](https://shields.io/endpoint)