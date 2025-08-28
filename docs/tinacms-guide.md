# TinaCMS Setup Guide for Mobility Trailblazers

## Overview
TinaCMS has been integrated to allow non-technical users to edit website content without coding knowledge. The integration is on the `feature/tinacms-integration` branch and requires approval before merging to main.

## How It Works

### For Content Editors

1. **Access the Admin Panel**
   - Navigate to `http://localhost:4321/admin` (local development)
   - Or `https://mobilitytrailblazers.de/admin` (production, after setup)

2. **Editable Content Sections**
   - **Hero Section**: Event title, subtitle, countdown date
   - **Mission**: Mission statement and criteria
   - **Jury Members**: Add/edit jury profiles with photos
   - **Selection Criteria**: Edit the 5 criteria cards
   - **Partner Organizations**: Manage partner logos and descriptions
   - **Site Settings**: Web3Forms key, footer links, etc.

3. **Making Changes**
   - Changes are saved as JSON files in the `content/` directory
   - These files are committed to Git like any other code change
   - Changes are visible immediately in development
   - Production requires deployment after committing changes

### For Developers

## Setup Instructions

### Local Development

1. **Clone and switch to TinaCMS branch**
   ```bash
   git checkout feature/tinacms-integration
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file:
   ```env
   # For local development only
   TINA_PUBLIC_IS_LOCAL=true
   
   # Optional: For TinaCMS Cloud (production)
   TINA_CLIENT_ID=your-client-id
   TINA_TOKEN=your-token
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   - Site: http://localhost:4321
   - Admin: http://localhost:4321/admin

### Production Setup (TinaCMS Cloud)

1. **Create TinaCMS Cloud Account**
   - Go to https://app.tina.io
   - Create a new project
   - Connect your GitHub repository

2. **Get API Keys**
   - In TinaCMS dashboard, go to "Tokens"
   - Create a read-only token
   - Copy Client ID and Token

3. **Configure Cloudflare Pages**
   Add environment variables:
   - `TINA_CLIENT_ID`: Your client ID
   - `TINA_TOKEN`: Your read-only token
   - `NODE_VERSION`: 18

4. **Update Build Command**
   ```bash
   npm run build
   ```

## Content Structure

```
content/
├── hero/
│   └── hero.json           # Hero section content
├── mission/
│   └── mission.json        # Mission statement
├── jury/
│   ├── jury-member-1.json # Individual jury members
│   └── ...
├── criteria/
│   ├── criteria-1.json     # Selection criteria
│   └── ...
├── partners/
│   └── ...                 # Partner organizations
└── settings.json           # Global site settings
```

## Editing Workflow

### For Non-Technical Users

1. **Access Admin Panel**
   - Use provided login credentials
   - Navigate to the section you want to edit

2. **Make Changes**
   - Use the visual editor to update text
   - Upload images through the media manager
   - Preview changes in real-time

3. **Save Changes**
   - Click "Save" to persist changes
   - Changes are automatically committed to Git

4. **Request Deployment**
   - Notify the technical team for production deployment
   - Or use automated deployment if configured

### For Technical Users

1. **Pull Latest Changes**
   ```bash
   git pull origin feature/tinacms-integration
   ```

2. **Test Locally**
   ```bash
   npm run dev
   ```

3. **Commit and Push**
   ```bash
   git add content/
   git commit -m "Update content via TinaCMS"
   git push origin feature/tinacms-integration
   ```

4. **Create Pull Request**
   - Never merge directly to main
   - Create PR for review
   - Deploy after approval

## Troubleshooting

### Common Issues

1. **Admin panel not loading**
   - Check if `npm run dev` is running
   - Verify `.env` configuration
   - Clear browser cache

2. **Changes not appearing**
   - Ensure content files exist in `content/` directory
   - Check browser console for errors
   - Verify Astro components are importing content correctly

3. **Build failures**
   - Run `npm run build` locally first
   - Check for TypeScript errors
   - Ensure all required content files exist

### Support

For technical issues:
- Check TinaCMS documentation: https://tina.io/docs
- Review Astro integration: https://tina.io/docs/frameworks/astro

## Security Notes

- Never commit `.env` files with real tokens
- Use read-only tokens for production
- Restrict admin access to authorized users only
- Regular backup content files

## Benefits

1. **No coding required** for content updates
2. **Visual editing** with live preview
3. **Version control** through Git
4. **No database** - content stored as files
5. **Free for small projects** (self-hosted option)
6. **Maintains €0/month hosting** on Cloudflare Pages

## Next Steps

1. Test the admin interface locally
2. Train content editors on the system
3. Set up TinaCMS Cloud for production (optional)
4. Configure automated deployments
5. Create user accounts for editors