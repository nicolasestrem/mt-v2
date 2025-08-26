# SociableKit LinkedIn Feed Setup Guide

## Overview
This guide explains how to set up and configure the SociableKit LinkedIn feed widget for the Mobility Trailblazers website.

## Current Implementation
The site currently uses SociableKit's free LinkedIn Page Posts widget to display the latest posts from the Mobility Trailblazers LinkedIn showcase page.

**Widget Location**: `src/components/LinkedInFeed.astro`

## Setup Instructions

### Step 1: Create SociableKit Account
1. Visit [SociableKit.com](https://www.sociablekit.com)
2. Click "Sign Up" or "Create a Widget"
3. Register with email (no credit card required for free tier)

### Step 2: Create LinkedIn Widget
1. From dashboard, click "Create Widget"
2. Select "LinkedIn Page Posts" from the widget options
3. Click "Create Widget"

### Step 3: Connect LinkedIn Page
1. Click "Connect LinkedIn Account"
2. Log in to LinkedIn with account that manages the Mobility Trailblazers showcase
3. Authorize SociableKit to access the page
4. Select the "Mobility Trailblazers" showcase page
   - URL: https://www.linkedin.com/showcase/mobility-trailblazers/

### Step 4: Customize Widget (Optional)
Available customization options on free tier:
- Number of posts to display (max 5)
- Layout style (grid or list)
- Color scheme (limited options)
- Font size
- Post spacing

### Step 5: Get Embed Code
1. After customization, click "Get Code"
2. Copy the iframe embed code
3. Note the widget ID from the URL (format: `https://widgets.sociablekit.com/linkedin-page-posts/iframe/YOUR_ID`)

### Step 6: Update Website
1. Open `src/components/LinkedInFeed.astro`
2. Find the iframe element (around line 30)
3. Replace the widget ID in the src URL:
   ```html
   <iframe 
     src="https://widgets.sociablekit.com/linkedin-page-posts/iframe/YOUR_NEW_ID_HERE"
     ...
   >
   ```

## Free Tier Limitations

### Features Included
- ✅ Up to 5 posts displayed
- ✅ Automatic sync every 24 hours
- ✅ Mobile responsive
- ✅ Basic customization
- ✅ No account expiry

### Limitations
- ❌ SociableKit branding shown at bottom
- ❌ Limited to 5 posts maximum
- ❌ Updates only once per day
- ❌ Limited style customization
- ❌ No real-time updates
- ❌ Cannot remove "Powered by SociableKit" footer

## Upgrade Options
If you need more features, SociableKit offers paid plans with:
- More posts displayed (10, 25, or unlimited)
- Real-time updates
- Remove branding
- Advanced customization
- Priority support
- Multiple widgets

## Troubleshooting

### Widget Not Displaying
1. Check if widget ID is correct in the iframe src
2. Ensure LinkedIn page is still connected in SociableKit dashboard
3. Clear browser cache and reload

### Posts Not Updating
- Free tier updates every 24 hours
- Manual refresh available in SociableKit dashboard (limited)
- Check if LinkedIn page has new posts

### Authentication Issues
1. Re-authorize LinkedIn connection in SociableKit
2. Ensure you're using correct LinkedIn account
3. Check if showcase page permissions are correct

## Current Production Widget
The production site (mobilitytrailblazers.de) uses widget ID: `25576730`

To use the same feed:
1. This ID is already configured in the component
2. Posts will display from the official LinkedIn showcase

To create your own widget:
1. Follow steps above to create new widget
2. Replace the ID in the component

## Support
- SociableKit Documentation: https://www.sociablekit.com/docs/
- Email Support: support@sociablekit.com (limited for free tier)
- LinkedIn Showcase: https://www.linkedin.com/showcase/mobility-trailblazers/

## Notes
- Widget performance depends on SociableKit's servers
- Free tier is suitable for basic needs
- Consider upgrading if you need more than 5 posts or real-time updates
- The widget is GDPR compliant as it doesn't store visitor data