# Content Editing Guide - TinaCMS Integration

## Overview

The MobilityTrailblazers.de website now uses TinaCMS for content management. This guide explains how content editors can update the website content.

## Quick Start

### Method 1: Editing JSON Files Directly (Simple)

All website content is stored in JSON files in the `content/` directory. You can edit these files directly:

1. **Navigate to the content directory**
2. **Edit the appropriate JSON file** for the section you want to change
3. **Commit and push changes** to update the live site

### Method 2: TinaCMS Visual Editor (Advanced - Requires Setup)

The TinaCMS visual editor provides a user-friendly interface, but requires additional setup.

## Content Structure

### 📄 Hero Section (`content/hero/hero.json`)

Controls the main banner with countdown timer:

```json
{
  "title": "25 Mobility Trailblazers in 25",
  "subtitle": "Weil mobiler Wandel Mut braucht.",
  "eventDate": "2025-10-30T18:00:00Z",
  "buttonText": "Jetzt nominieren",
  "buttonLink": "#nominate"
}
```

**What each field controls:**
- `title`: Main heading text
- `subtitle`: Subtitle below the main title
- `eventDate`: Date for countdown timer (ISO format)
- `buttonText`: Text on the main action button
- `buttonLink`: Where the button links to

### 📄 Mission Section (`content/mission/mission.json`)

Controls the mission statement and criteria preview:

```json
{
  "prefix": "Unsere Mission",
  "title": "Warum «25 Mobility Trailblazers In 25»?",
  "description": "Description text here...",
  "criteriaTitle": "Was zeichnet Mobility Trailblazers aus?",
  "criteria": [
    { "text": "Menschen, die mit **Mut und Wirkung** den Mobilitätswandel gestalten" }
  ]
}
```

**What each field controls:**
- `prefix`: Small text above the main title
- `title`: Section heading
- `description`: Main paragraph text
- `criteriaTitle`: Heading for criteria list
- `criteria`: Array of bullet points (supports **bold** text)

### 👥 Jury Members (`content/jury/`)

Each jury member has their own JSON file (jury-member-1.json, jury-member-2.json, etc.):

```json
{
  "name": "Andreas Herrmann",
  "title": "Präsident",
  "organization": "Institut für Mobilität der Universität St. Gallen",
  "image": "/images/jury/andreas-herrmann.webp",
  "bio": "Prof. Dr. Andreas Herrmann...",
  "linkedin": "https://www.linkedin.com/in/andreas-herrmann-4053541/"
}
```

**To add a new jury member:**
1. Create a new file: `jury-member-X.json` (replace X with next number)
2. Update the `JurySection.astro` component to load the new file
3. Add the jury member's photo to `/public/images/jury/`

### 🎯 Selection Criteria (`content/criteria/`)

Each criterion has its own JSON file (criteria-1.json through criteria-5.json):

```json
{
  "title": "Mut & Pioniergeist",
  "icon": "🚀",
  "description": "Welche Risiken wurden eingegangen? Welche Konventionen hinterfragt?",
  "order": 1
}
```

**What each field controls:**
- `title`: Criterion heading
- `icon`: Emoji or icon (displayed large)
- `description`: Explanation text
- `order`: Display order (1-5)

### 🏢 About Section (`content/about/about.json`)

Controls the "About the Initiative" section:

```json
{
  "intro": "Wer steht hinter den «25 Mobility Trailblazers in 25»?",
  "description": [
    "Der Award «25 Mobility Trailblazers in 25» ist eine Initiative...",
    "Ziel ist es, den mutigsten..."
  ],
  "heroImage": {
    "src": "/images/about/fernsehturm-berlin.jpg",
    "alt": "Description of image"
  },
  "partners": [
    {
      "name": "Institut für Mobilität der Universität St. Gallen",
      "logo": "/images/about/imo-logo.webp",
      "url": "https://imo.unisg.ch/de/home/",
      "description": "Forschungsinstitut für die Zukunft der Mobilität"
    }
  ]
}
```

**What each field controls:**
- `intro`: Introduction question
- `description`: Array of paragraph texts
- `heroImage`: Main image with alt text
- `partners`: Array of partner organizations

### 📧 Newsletter Section (`content/newsletter/newsletter.json`)

Controls the newsletter signup section:

```json
{
  "title": "Bleiben Sie informiert",
  "subtitle": "Erhalten Sie Updates zum Award und zur Mobilitätswende",
  "description": "Newsletter description text...",
  "buttonText": "Newsletter abonnieren",
  "placeholderText": "Ihre E-Mail-Adresse"
}
```

### ⚙️ Site Settings (`content/settings.json`)

Controls global site settings:

```json
{
  "web3formsKey": "YOUR-ACCESS-KEY-HERE",
  "linkedinFeedUrl": "",
  "footer": {
    "copyright": "© 2025 Mobility Trailblazers. All rights reserved.",
    "links": [
      {
        "label": "Impressum",
        "url": "/impressum"
      }
    ]
  }
}
```

## Editing Instructions

### For Non-Technical Users

#### Method 1: GitHub Web Interface (Recommended)

1. **Go to GitHub.com** and navigate to the repository
2. **Click on the `content/` folder**
3. **Find the file you want to edit** (e.g., `hero/hero.json`)
4. **Click the pencil icon** (Edit this file)
5. **Make your changes** in the text editor
6. **Scroll down to "Commit changes"**
7. **Add a commit message** describing what you changed
8. **Click "Commit changes"**

The website will automatically rebuild and deploy your changes in 2-3 minutes.

#### Method 2: Local Editing

1. **Download/clone the repository** to your computer
2. **Open the JSON files** in any text editor (like Notepad++ or VS Code)
3. **Make your changes** and save the files
4. **Commit and push** the changes using GitHub Desktop or git commands

### For Technical Users

#### Using TinaCMS Visual Editor (Currently Limited)

1. **Install dependencies**: `npm install`
2. **Try to start TinaCMS**: `npm run dev:cms`
3. **Note**: There are currently compatibility issues with Node.js v22

#### Direct File Editing

1. **Edit JSON files** in the `content/` directory
2. **Test locally**: `npm run dev`
3. **Build and test**: `npm run build`
4. **Commit changes** when satisfied

## Common Tasks

### Updating the Countdown Timer

Edit `content/hero/hero.json`:
```json
{
  "eventDate": "2025-10-30T18:00:00Z"
}
```

The date format is ISO 8601: `YYYY-MM-DDTHH:MM:SSZ`

### Adding a New Jury Member

1. **Add photo** to `/public/images/jury/firstname-lastname.webp`
2. **Create JSON file**: `content/jury/jury-member-X.json`
3. **Update component** to load the new member (requires technical knowledge)

### Updating Partner Information

Edit `content/about/about.json` and modify the `partners` array:
```json
{
  "partners": [
    {
      "name": "New Partner Name",
      "logo": "/images/about/new-partner-logo.webp",
      "url": "https://newpartner.com",
      "description": "Partner description"
    }
  ]
}
```

### Changing Form Settings

Edit `content/settings.json`:
```json
{
  "web3formsKey": "your-new-key-here"
}
```

## Important Notes

### ⚠️ Data Format Rules

1. **Always use valid JSON syntax**
   - Wrap strings in double quotes: `"text"`
   - No trailing commas: `{"a": 1, "b": 2}` ✓, `{"a": 1, "b": 2,}` ✗
   
2. **Image paths must start with `/`**
   - Correct: `"/images/jury/photo.webp"`
   - Wrong: `"images/jury/photo.webp"`

3. **URLs must be complete**
   - Correct: `"https://example.com"`
   - Wrong: `"example.com"`

### 🚀 Deployment

- Changes to `main` branch automatically deploy
- Build takes 2-3 minutes
- Check the Actions tab in GitHub for build status

### 📞 Getting Help

1. **JSON syntax errors**: Use a JSON validator online
2. **Missing images**: Ensure files are in the correct `/public/images/` folder
3. **Build failures**: Check the GitHub Actions tab for error details
4. **Content not appearing**: Verify file names and paths match exactly

## Troubleshooting

### Common Issues

1. **Website not updating after changes**
   - Check GitHub Actions for build status
   - Verify changes were committed to `main` branch
   - Wait 3-5 minutes for deployment

2. **JSON syntax errors**
   - Use JSONLint.com to validate your JSON
   - Common issues: missing quotes, extra commas, incorrect brackets

3. **Images not displaying**
   - Check image file exists in `/public/images/` folder
   - Verify path in JSON starts with `/`
   - Ensure image format is supported (webp, jpg, png)

4. **TinaCMS visual editor not working**
   - Node.js compatibility issues with v22
   - Try Node.js v18 or v20
   - Alternative: Edit JSON files directly

## Next Steps

### Planned Improvements

1. **Fix TinaCMS visual editor** compatibility issues
2. **Add more content types** as needed
3. **Improve documentation** based on user feedback
4. **Consider alternative CMS** solutions (Builder.io testing in progress)

This guide will be updated as the system evolves and based on user feedback.