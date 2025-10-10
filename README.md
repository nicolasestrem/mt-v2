# MobilityTrailblazers.de - Modern Astro Website

<!-- Lighthouse Badges -->
![Lighthouse Performance](https://img.shields.io/badge/Performance-98%25-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-95%25-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-92%25-brightgreen?style=for-the-badge&logo=lighthouse)
![Lighthouse SEO](https://img.shields.io/badge/SEO-100%25-brightgreen?style=for-the-badge&logo=lighthouse)

<!-- GitHub Actions Status -->
[![Lighthouse CI](https://github.com/nicolasestrem/mt-v2/actions/workflows/lighthouse-ci.yml/badge.svg)](https://github.com/nicolasestrem/mt-v2/actions/workflows/lighthouse-ci.yml)
[![Playwright Tests](https://github.com/nicolasestrem/mt-v2/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/nicolasestrem/mt-v2/actions/workflows/playwright-tests.yml)

A high-performance, modern replacement for the WordPress MobilityTrailblazers.de website, built with Astro.

## 🚀 Project Overview

This is a complete reimplementation of the MobilityTrailblazers WordPress site using modern web technologies, focused on performance, accessibility, and best practices.

- **Framework**: [Astro](https://astro.build/) (Static Site Generator)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Forms**: [Web3Forms](https://web3forms.com/)
- **Testing**: [Playwright](https://playwright.dev/) for end-to-end tests.

## 🛠 Installation

### Prerequisites
- Node.js 18+
- npm (or yarn/pnpm)

### Setup Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/nicolasestrem/mt-v2.git
    cd mt-v2
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:4321`.

## 🧞 Project Scripts

| Command | Action |
| :--- | :--- |
| `npm install` | Installs all project dependencies. |
| `npm run dev` | Starts the local development server with hot-reloading. |
| `npm run build` | Builds the production-ready site to the `./dist/` directory. |
| `npm run preview` | Serves the production build locally for previewing. |
| `npm run test` | Runs the Playwright end-to-end tests. |
| `npm run lint` | Lints CSS and Astro files using Stylelint. |
| `npm run optimize-images` | Optimizes images located in the `./raw-images/` directory. |

## 📁 Project Structure

The project follows a standard Astro project structure.

```
.
├── public/              # Static assets (images, fonts, favicon)
├── src/
│   ├── components/      # Reusable Astro components (.astro)
│   ├── data/            # JSON data files (e.g., shop products)
│   ├── layouts/         # Base page layouts (.astro)
│   ├── pages/           # Site pages (.astro)
│   └── styles/          # Global CSS and styles
├── tests/               # Playwright tests
├── scripts/             # Node.js scripts for build tasks
├── astro.config.mjs     # Astro configuration
└── package.json         # Project dependencies and scripts
```

## ⚙️ Configuration

### Environment Variables

The project uses environment variables for configuration. Create a `.env` file in the root of the project and add the following:

-   `PUBLIC_GA_MEASUREMENT_ID`: The Google Analytics 4 measurement ID.
-   `WEB3FORMS_ACCESS_KEY`: Your access key from [Web3Forms](https://web3forms.com/) for form submissions.

The access key is pre-configured in the form components, but it is best practice to use an environment variable.

### Forms

The nomination and newsletter forms are configured to use [Web3Forms](https://web3forms.com/). The access key is hardcoded in the respective components (`NominationForm.astro` and `Newsletter.astro`) but can be replaced with an environment variable for better security.

### LinkedIn Feed

The LinkedIn feed is embedded using an iframe from [SociableKit](https://sociablekit.com/). The widget ID is hardcoded in `src/components/LinkedInFeed.astro`.

## 🚀 Deployment

The site is configured for easy deployment to [Cloudflare Pages](https://pages.cloudflare.com/).

1.  **Connect to Git**: Connect your GitHub repository to Cloudflare Pages.
2.  **Build Settings**:
    -   **Build command**: `npm run build`
    -   **Build output directory**: `dist`
3.  **Deploy**: Cloudflare will automatically build and deploy the site when you push to the main branch.