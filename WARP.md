# WARP.md

**⚠️ This file provides WARP terminal-specific guidance. For complete project documentation, see CLAUDE.md and docs/ folder.**

## Quick Reference
- **Main Documentation**: See `CLAUDE.md` for full project details
- **Testing Guide**: See `docs/TESTING.md` for comprehensive test documentation
- **Project**: MobilityTrailblazers.de - Astro static site

## WARP Terminal Notes

### PowerShell Commands (Windows)
When using WARP on Windows with PowerShell, use these commands:

```powershell
# Development
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run all Playwright tests
npm run test:chrome  # Chrome only (faster)
npm run test:ui      # Interactive UI mode

# Utilities
npm run optimize-images   # Optimize images in public/images/
npm run lighthouse        # Run Lighthouse audit
```

### WARP-Specific Tips

1. **Path Handling**: Use forward slashes even on Windows
   - ✅ `cd /mnt/c/Users/nicol/Desktop/mt-v2`
   - ❌ `cd C:\Users\nicol\Desktop\mt-v2`

2. **Environment Variables**: Set in PowerShell before running commands
   ```powershell
   $env:PUBLIC_WEB3FORMS_KEY = "your-key-here"
   npm run dev
   ```

3. **Port Conflicts**: If port 4321 is busy, WARP will auto-increment
   - Check terminal output for actual port used

4. **File Watching**: WARP's integrated file watcher works with Astro's HMR

## Quick Start

```powershell
# Clone and setup
git clone <repo-url>
cd mt-v2
npm install

# Start development
npm run dev
# Open http://localhost:4321 in browser
```

## Documentation Links
- 📚 **Full Documentation**: `/CLAUDE.md`
- 🧪 **Testing Guide**: `/docs/TESTING.md`
- 🏗️ **Architecture**: See CLAUDE.md sections on Tech Stack & Component Architecture
- 🎨 **Design System**: See CLAUDE.md for colors, typography, and styling