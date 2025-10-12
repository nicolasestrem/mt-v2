# MobilityTrailblazers.de - Modern Astro Website

<!-- Lighthouse Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/Performance-98%25-brightgreen?style=for-the-badge&logo=lighthouse" alt="Lighthouse Performance">
  <img src="https://img.shields.io/badge/Accessibility-95%25-brightgreen?style=for-the-badge&logo=lighthouse" alt="Lighthouse Accessibility">
  <img src="https://img.shields.io/badge/Best%20Practices-92%25-brightgreen?style=for-the-badge&logo=lighthouse" alt="Lighthouse Best Practices">
  <img src="https://img.shields.io/badge/SEO-100%25-brightgreen?style=for-the-badge&logo=lighthouse" alt="Lighthouse SEO">
</p>

<!-- GitHub Actions Status -->
<p align="center">
  <a href="https://github.com/nicolasestrem/mt-v2/actions/workflows/lighthouse-ci.yml">
    <img src="https://github.com/nicolasestrem/mt-v2/actions/workflows/lighthouse-ci.yml/badge.svg" alt="Lighthouse CI Status">
  </a>
  <a href="https://github.com/nicolasestrem/mt-v2/actions/workflows/playwright-tests.yml">
    <img src="https://github.com/nicolasestrem/mt-v2/actions/workflows/playwright-tests.yml/badge.svg" alt="Playwright Tests Status">
  </a>
</p>

## About The Project

This repository contains the source code for the [MobilityTrailblazers.de](https://mobilitytrailblazers.de) website, a high-performance, modern replacement for the original WordPress site. Built with Astro, this project aims to deliver a significantly faster, more secure, and cost-effective solution while maintaining a rich user experience.

The new Astro-based site achieves a **10x performance improvement** over the WordPress version, with load times reduced from 3.8 seconds to just 0.5 seconds.

### Key Features

*   **Blazing Fast Performance**: Optimized for speed with a 98% Lighthouse performance score.
*   **Modern Tech Stack**: Built with Astro, Tailwind CSS, and deployed on Cloudflare Pages.
*   **Dynamic Components**: Features like a countdown timer, interactive jury section, and a live LinkedIn feed.
*   **Cost-Efficient**: Zero hosting costs thanks to Cloudflare Pages and Web3Forms.
*   **SEO Optimized**: 100% Lighthouse SEO score with structured data and sitemap generation.
*   **Comprehensive Documentation**: Extensive guides for development, deployment, and maintenance.

## Technology Stack

This project utilizes a range of modern web technologies to achieve its performance and design goals:

*   **Framework**: [Astro](https://astro.build/) (v5.13)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
*   **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/) (Free Tier)
*   **Forms**: [Web3Forms](https://web3forms.com/) (Free Tier)
*   **Testing**: [Playwright](https://playwright.dev/) for end-to-end and visual regression testing.
*   **Image Optimization**: [Sharp](https://sharp.pixelplumbing.com/) for automated image processing.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js v18 or later
*   npm (or yarn/pnpm)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/nicolasestrem/mt-v2.git
    cd mt-v2
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root of the project and add your Web3Forms access key. You can get a free key from [web3forms.com](https://web3forms.com/).
    ```env
    PUBLIC_WEB3FORMS_KEY=YOUR_ACCESS_KEY_HERE
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:4321](http://localhost:4321) to view the site.

## Available Commands

This project includes several scripts to help with development and maintenance:

| Command                   | Description                                                              |
| :------------------------ | :----------------------------------------------------------------------- |
| `npm run dev`             | Starts the local development server with HMR.                            |
| `npm run build`           | Builds the production-ready site to the `./dist/` directory.             |
| `npm run preview`         | Serves the production build locally for previewing.                      |
| `npm test`                | Runs all Playwright tests.                                               |
| `npm run test:ui`         | Opens the Playwright UI for interactive test debugging.                  |
| `npm run test:report`     | Shows the last Playwright test report.                                   |
| `npm run optimize-images` | Optimizes all images in the `public/images` directory.                   |
| `npm run lighthouse`      | Runs Lighthouse CI performance checks via the bundled `@lhci/cli`.        |
| `npm run lint`            | Lints CSS and Astro files using Stylelint.                               |
| `npm run lint:fix`        | Automatically fixes linting issues.                                      |

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please read our [**Contribution Guidelines**](AGENTS.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

*   **Original Creator**: [Nicolas Estremadoyro](https://github.com/nicolasestrem)
*   **Astro Framework**: [astro.build](https://astro.build)
*   **Icons and Assets**: Various open-source resources.