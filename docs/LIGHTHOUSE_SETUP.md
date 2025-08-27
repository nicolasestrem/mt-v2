# Lighthouse CI Setup Guide

This guide explains how to set up Lighthouse CI with GitHub Actions to automatically test your site's performance and display badges in the README.

## 🚦 What is Lighthouse CI?

Lighthouse CI runs Google Lighthouse performance tests automatically on every push and pull request, tracking:
- **Performance** - Loading speed and responsiveness
- **Accessibility** - WCAG compliance and usability
- **Best Practices** - Web standards and security
- **SEO** - Search engine optimization

## 📊 Current Setup

The project includes:
1. **GitHub Actions Workflow** (`.github/workflows/lighthouse-ci.yml`) - Runs tests automatically
2. **Configuration** (`lighthouserc.json`) - Defines test parameters
3. **Badge Generation** - Creates dynamic badges for README
4. **PR Comments** - Posts scores on pull requests

## 🔑 Required GitHub Secrets

To enable all features, add these secrets to your GitHub repository:

### 1. Basic Setup (Required)
No secrets needed - Lighthouse will run and show results in Actions logs.

### 2. Badge Updates (Optional)
To automatically update badge data in a GitHub Gist:

1. **Create a GitHub Gist**:
   - Go to https://gist.github.com
   - Create a new secret gist with 4 files:
     - `lighthouse-performance.json`
     - `lighthouse-accessibility.json`
     - `lighthouse-best-practices.json`
     - `lighthouse-seo.json`
   - Note the Gist ID from the URL

2. **Create a Personal Access Token**:
   - Go to Settings → Developer settings → Personal access tokens
   - Generate new token with `gist` scope
   - Copy the token

3. **Add GitHub Secrets**:
   ```
   LIGHTHOUSE_GIST_ID = your-gist-id
   GIST_TOKEN = your-personal-access-token
   ```

### 3. Lighthouse CI App Integration (Optional)
For advanced features like trend tracking:

1. Install the Lighthouse CI GitHub App
2. Add the app token as a secret:
   ```
   LHCI_GITHUB_APP_TOKEN = your-app-token
   ```

## 📈 How It Works

### On Every Push to Main
1. Builds the Astro site
2. Runs Lighthouse tests (3 times for accuracy)
3. Extracts scores from results
4. Updates badge URLs in README
5. Uploads reports as artifacts

### On Pull Requests
1. Runs the same tests
2. Comments on the PR with scores
3. Shows pass/fail status

## 🏆 Score Thresholds

Current thresholds set in `lighthouserc.json`:
- **Performance**: 70% minimum (warning)
- **Accessibility**: 80% minimum (warning)
- **Best Practices**: 70% minimum (warning)
- **SEO**: 80% minimum (warning)

Badges show colors based on scores:
- 🟢 **Green**: 90-100%
- 🟠 **Orange**: 50-89%
- 🔴 **Red**: Below 50%

## 🎯 Running Locally

### Install Lighthouse CI
```bash
npm install -g @lhci/cli
```

### Run Tests
```bash
npm run lighthouse
```

### Update README Badges
```bash
npm run lighthouse:badges
```

Or with custom scores:
```bash
node scripts/update-lighthouse-badges.js 95 98 92 100
# Args: performance accessibility best-practices seo
```

## 📝 Customizing Tests

### Edit Test Configuration
Modify `lighthouserc.json`:
```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.90 }],
        "first-contentful-paint": ["warn", { "maxNumericValue": 2000 }]
      }
    }
  }
}
```

### Test Different Pages
Add URLs to test in `lighthouserc.json`:
```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:4321",
        "http://localhost:4321/about",
        "http://localhost:4321/contact"
      ]
    }
  }
}
```

## 🔧 Troubleshooting

### Tests Failing in CI
1. Check if the site builds correctly
2. Verify the preview server starts
3. Check for console errors in Lighthouse output

### Badges Not Updating
1. Ensure GitHub secrets are set correctly
2. Check workflow has write permissions
3. Verify the main branch protection rules

### Scores Lower Than Expected
1. Run tests locally for debugging
2. Check for blocking resources
3. Optimize images and fonts
4. Enable text compression
5. Minimize JavaScript bundles

## 📚 Resources

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Lighthouse Performance Scoring](https://web.dev/performance-scoring/)
- [Web Vitals](https://web.dev/vitals/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🤝 Support

For issues with:
- **Lighthouse tests**: Check the GitHub Actions logs
- **Badge updates**: Verify GitHub secrets
- **Score improvements**: Run local audits with Chrome DevTools