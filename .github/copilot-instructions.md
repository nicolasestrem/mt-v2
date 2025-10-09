# Copilot Instructions for MobilityTrailblazers.de

This guide enables AI coding agents to work productively in this Astro/Tailwind/Playwright codebase. Follow these conventions and workflows for best results.

## Architecture & Structure
- **Astro 5.13** static site, migrated from WordPress for speed and free hosting.
- **src/pages/**: Route files (kebab-case, e.g., `index.astro`, `danke-nominierung.astro`).
- **src/components/**: Reusable UI (PascalCase, e.g., `Hero.astro`, `NominationForm.astro`).
- **src/layouts/**: Layout shells (usually one main `Layout.astro`).
- **src/styles/global.css**: Tailwind v4 utility-first styling; avoid custom CSS unless necessary.
- **public/**: Static assets, images in `public/images/`.
- **tests/**: Playwright tests (see `tests/README.md` for reporting and coverage details).
- **scripts/**: Maintenance utilities (image optimization, Lighthouse badges).
- **docs/**: Setup, deployment, forms, secrets, and operational notes.

## Developer Workflows
- **Install**: `npm install`
- **Dev server**: `npm run dev` (HMR, port 4321)
- **Build**: `npm run build` (outputs to `dist/`)
- **Preview**: `npm run preview`
- **Test**: `npm test` (all Playwright tests)
  - Focused: `npm run test:smoke`, `test:responsive`, `test:accessibility`, `test:e2e`
  - Visual: `npm run test:visual`, update with `test:update-snapshots`
  - Reports: `npm run test:report` (see `playwright-report/`)
- **Utilities**: `npm run optimize-images`, `npm run lighthouse`, `npm run lighthouse:badges`

## Coding Conventions
- **Indentation**: 2 spaces; concise, self-documenting lines.
- **Naming**: Components PascalCase, variables camelCase, constants UPPER_SNAKE_CASE, pages kebab-case.
- **No repo-wide linter**; match patterns in `src/` and `tests/`.
- **Tailwind v4**: Use utility classes in `.astro` and `global.css`.

## Testing Patterns
- **Playwright**: All tests in `tests/*.spec.ts`; descriptive filenames (`feature-behavior.spec.ts`).
- **Page Object Model**: See `tests/pages/HomePage.ts` and `tests/utils/test-helpers.ts`.
- **Visual regression**: Validate diffs locally, update snapshots only when intentional.
- **Test reports**: HTML in `playwright-report/`, JSON/JUnit in `test-results/`.

## Integration & Configuration
- **Web3Forms**: API key required for forms (`src/components/NominationForm.astro`, `Newsletter.astro`). Key in `.env` as `PUBLIC_WEB3FORMS_KEY`.
- **Google Analytics**: Measurement ID via `PUBLIC_GA_MEASUREMENT_ID` env var. Cookie consent (GDPR) via tarteaucitron (see `public/tarteaucitron/`).
- **Cloudflare Pages**: Deploy `dist/` folder; see `docs/DEPLOYMENT.md`.

## Security & Secrets
- Never commit secrets. Use environment/CI variables. See `docs/GITHUB_SECRETS_SETUP.md` and `docs/WEB3FORM_SETUP.md`.

## Commit & PRs
- Use imperative, concise commit messages (e.g., `feat(components): add SEO component`).
- PRs: clear description, link issues, add screenshots/GIFs for UI, short test plan.
- Optimize images, ensure builds/tests pass before review.

## Examples
- **Component**: `src/components/JurySection.astro` (progressive disclosure for 21 jury members)
- **Form**: `src/components/NominationForm.astro` (Web3Forms integration)
- **Test**: `tests/form-functionality.spec.ts` (form validation and submission)

---
For unclear or missing conventions, ask for clarification or check `AGENTS.md`, `README.md`, and `docs/` for project-specific details.
