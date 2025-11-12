# Google Analytics Production Testing Guide

## Issue Summary
- **Problem**: GA stopped collecting data on November 5, 2024
- **Root Cause**: Template literal bug + CSP missing `www.googletagmanager.com` in `connect-src`
- **Fix Date**: November 12, 2024
- **Deployment**: Claimed deployed to production

## Critical Testing Steps

### Step 1: Verify Latest Build is Deployed

1. **Check Cloudflare Pages Dashboard**:
   - Go to https://dash.cloudflare.com
   - Navigate to Pages → mobilitytrailblazers.de
   - Check the latest deployment timestamp
   - Verify it's from November 12, 2024 or later
   - **If not**: Trigger a new deployment

2. **Clear Cloudflare Cache** (Important!):
   ```bash
   # In Cloudflare dashboard:
   # Caching → Configuration → Purge Everything
   ```

### Step 2: Test Production Site (CRITICAL)

Open https://mobilitytrailblazers.de and follow these steps:

#### A. Open Browser DevTools
- Press **F12** (Chrome/Firefox)
- Go to **Console** tab

#### B. Clear All Data First
```javascript
// In Console, clear everything:
localStorage.clear();
sessionStorage.clear();
document.cookie.split(";").forEach(function(c) {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
```
- Then **hard refresh**: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

#### C. Check Initial State (Before Accepting Cookies)
In Console, type:
```javascript
// Should be undefined before consent:
typeof gtag
// Expected: "undefined"

// Check if tarteaucitron loaded:
typeof tarteaucitron
// Expected: "object"

// Check GA ID is set:
tarteaucitron.user.gtagUa
// Expected: "G-0C23GHZJQT" (NOT "${gaId}" or undefined)
```

**🚨 CRITICAL CHECK**: If `tarteaucitron.user.gtagUa` returns `"${gaId}"` (literal string), the old buggy code is still deployed!

#### D. Accept Cookies
- Click "Alle akzeptieren" (Accept All) on the cookie banner
- **OR** Click "Cookies verwalten" → Enable "Google Analytics (GA4)"

#### E. Verify GA Loaded (IMMEDIATELY After Accepting)
In Console:
```javascript
// Should now be defined:
typeof gtag
// Expected: "function"

// Check gtag function:
gtag
// Expected: function gtag(){ dataLayer.push(arguments); }

// Check dataLayer:
dataLayer
// Expected: Array with GA events (not empty)

// Check consent state:
tarteaucitron.state.gtag
// Expected: true
```

#### F. Check Network Tab
1. Switch to **Network** tab
2. Filter by: `gtag` or `google`
3. Should see:
   - `gtag/js?id=G-0C23GHZJQT` (Status: 200) from `www.googletagmanager.com`
   - `g/collect?...` requests to `www.google-analytics.com`

4. **If you see CSP errors**: The headers file isn't deployed correctly

#### G. Check for Errors
1. Look for errors in Console (red text)
2. Common issues:
   - `Content Security Policy: ...` → CSP blocking GA
   - `gtag is not defined` → GA script didn't load
   - `tarteaucitron.user.gtagUa is undefined` → Variable not passed correctly

### Step 3: Verify in Google Analytics

1. **Go to GA4 Real-Time Reports**:
   - https://analytics.google.com
   - Property: mobilitytrailblazers.de
   - Reports → Real-time

2. **Within 30 seconds**, you should see:
   - 1 active user (you)
   - Page view event
   - Location data

3. **If no data appears**: Check Console/Network tabs for errors

### Step 4: Test Event Tracking

In Console, trigger a test event:
```javascript
// Test custom event:
window.trackEvent('test_event_from_console', {
  test_parameter: 'testing_ga_fix',
  timestamp: new Date().toISOString()
});

// Should see in GA Real-Time → Events within 10 seconds
```

### Step 5: Test Outbound Link Tracking

1. Click any external link (e.g., LinkedIn partner logo)
2. Check Console for event confirmation
3. Verify in GA Real-Time → Events: `outbound_click` event

## Expected Results

### ✅ Success Indicators:
1. `tarteaucitron.user.gtagUa === "G-0C23GHZJQT"` (exact string match)
2. `typeof gtag === "function"` after accepting cookies
3. `dataLayer` contains events
4. Network tab shows requests to googletagmanager.com and google-analytics.com
5. GA Real-Time shows active user within 30 seconds
6. No CSP errors in Console

### ❌ Failure Indicators:
1. `tarteaucitron.user.gtagUa === "${gaId}"` → **Old buggy code still deployed!**
2. `tarteaucitron.user.gtagUa === undefined` → **Variable not passed**
3. CSP errors in Console → **Headers file not deployed**
4. `gtag` is undefined after accepting cookies → **Script blocked or failed to load**
5. No Network requests to Google → **Complete failure**

## Debugging Common Issues

### Issue 1: `tarteaucitron.user.gtagUa` is `"${gaId}"` (literal string)

**Cause**: Old build still cached/deployed

**Solution**:
1. Check Cloudflare Pages deployment timestamp
2. Trigger new deployment from GitHub
3. Purge Cloudflare cache
4. Hard refresh browser

### Issue 2: CSP Errors in Console

**Cause**: `public/_headers` file not deployed or incorrect

**Solution**:
1. Verify `dist/_headers` exists after build
2. Check Cloudflare Pages has `_headers` file in deployment
3. Verify CSP includes:
   ```
   script-src ... https://www.googletagmanager.com ...
   connect-src ... https://www.googletagmanager.com https://www.google-analytics.com ...
   ```

### Issue 3: `gtag` is undefined after accepting cookies

**Cause**: Script blocked, failed to load, or tarteaucitron service not working

**Solution**:
```javascript
// Check if service is registered:
tarteaucitron.job
// Should include: "gtag"

// Manually trigger for testing:
tarteaucitron.userInterface.respond(document.getElementById('tarteaucitron-services_gtag'), true);

// Check if script was added:
document.querySelectorAll('script[src*="googletagmanager"]')
// Should find the gtag.js script
```

### Issue 4: Still No Data in GA After All Checks Pass

**Possible causes**:
1. **Google Analytics property issue**: Check GA4 property settings
2. **Data processing delay**: GA can take 24-48 hours to show "Data collection active"
3. **Real-Time reports only**: Check Real-Time first, standard reports lag by 24-48h
4. **Measurement ID mismatch**: Verify `G-0C23GHZJQT` is correct for your property

## Cloudflare Pages Deployment Verification

### Check Current Deployment:
1. Go to Cloudflare Pages dashboard
2. Click on project: mobilitytrailblazers.de
3. Check "Latest deployment" section
4. Look for:
   - Deployment date/time (should be Nov 12 or later)
   - Git commit hash (should match `aad2231` or later)
   - Build status: Success

### Trigger New Deployment:
If the latest deployment is outdated:

**Option A: From Cloudflare Dashboard**
1. Click "View build" on latest deployment
2. Click "Retry deployment" button

**Option B: From Git**
```bash
# Create an empty commit to trigger rebuild:
git commit --allow-empty -m "chore: trigger redeployment to fix GA"
git push origin fix/csp-violations
```

**Option C: Rebuild Locally and Upload**
```bash
# Clean build:
npm run build

# Verify _headers file exists:
ls dist/_headers

# Check _headers content:
cat dist/_headers | grep "googletagmanager"
# Should show googletagmanager.com in both script-src and connect-src

# Upload dist/ folder to Cloudflare Pages manually
```

## Final Verification Checklist

- [ ] Cloudflare deployment is from Nov 12 or later (commit `aad2231+`)
- [ ] Cloudflare cache purged
- [ ] Browser cookies/storage cleared
- [ ] Hard refresh performed (Ctrl+Shift+R)
- [ ] `tarteaucitron.user.gtagUa === "G-0C23GHZJQT"` (exact match)
- [ ] Cookie consent banner appears
- [ ] Clicked "Accept All" cookies
- [ ] `typeof gtag === "function"` after consent
- [ ] `dataLayer` has events
- [ ] Network tab shows gtag.js loaded (200 status)
- [ ] Network tab shows g/collect requests to google-analytics.com
- [ ] No CSP errors in Console
- [ ] No JavaScript errors in Console
- [ ] GA Real-Time shows active user within 30 seconds
- [ ] Test event appears in GA Real-Time → Events

## Next Steps After Verification

### If All Tests Pass But GA Still Shows "No Data":
1. **Wait 24-48 hours**: Google may take time to update "Data collection active" status
2. **Keep testing daily**: Visit site, accept cookies, verify in Real-Time
3. **Check GA property settings**: Ensure property is not paused or has filters blocking data

### If Tests Fail:
1. **Document the exact failure** (screenshot Console errors)
2. **Share the output** of the debug commands above
3. **Check Cloudflare deployment logs** for build errors
4. **Verify git commit** matches what's deployed

## Support Information

- **Expected Behavior**: GA loads ONLY after user accepts analytics cookies (GDPR compliance)
- **Cookie Lifetime**: 13 months (tarteaucitron default)
- **Re-consent Required**: If users decline cookies, they won't be tracked
- **Testing Best Practice**: Always test with fresh browser session (incognito mode)

## Contact & Documentation

- GA4 Property: https://analytics.google.com
- Cloudflare Pages: https://dash.cloudflare.com
- Bug Report: This issue was caused by template literal bug + CSP misconfiguration
- Fixed in commits: `f476d3f`, `0cfe094`, `aad2231` (November 12, 2024)
