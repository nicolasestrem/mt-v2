# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/`: Astro routes (kebab-case, e.g., `index.astro`, `danke-nominierung.astro`).
- `src/components/` and `src/layouts/`: Reusable UI and layout shells.
- `src/styles/global.css`: Global Tailwind styles.
- `public/`: Static assets (served as-is), images under `public/images/`.
- `tests/`: Playwright tests, snapshots in `tests/visual-regression.spec.ts-snapshots/`.
- `scripts/`: Maintenance utilities (image optimization, Lighthouse badges).
- `docs/`: Operations and setup notes (testing, deployment, forms, secrets).

## Build, Test, and Development Commands
- `npm run dev`: Start Astro dev server with HMR.
- `npm run build`: Production build to `dist/`.
- `npm run preview`: Serve the production build locally.
- `npm test`: Run all Playwright tests.
- Focused tests: `npm run test:smoke`, `test:responsive`, `test:accessibility`, `test:e2e`.
- Visual tests: `npm run test:visual` (update via `test:update-snapshots`).
- Utilities: `npm run optimize-images`, `npm run lighthouse`, `npm run lighthouse:badges`.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; keep lines concise and self-documenting.
- Components: PascalCase (`src/components/FooBar.astro`).
- Variables/props: camelCase; constants UPPER_SNAKE_CASE.
- Pages/routes: kebab-case filenames in `src/pages/`.
- Tailwind CSS v4 is used; prefer utility-first styling in `.astro` templates and `global.css`.
- No repo-wide linter is enforced; match existing patterns in `src/` and `tests/`.

## Testing Guidelines
- Framework: Playwright (`playwright.config.ts`).
- Add scenarios under `tests/*.spec.ts`; keep names descriptive (`feature-behavior.spec.ts`).
- Visual regression: validate diffs locally; only update snapshots when intentional.
- Run targeted suites before PRs: `test:smoke` and `test:responsive`; include `test:accessibility` for UI changes.
- Attach or reference `playwright-report/` output in PRs when relevant.

## Commit & Pull Request Guidelines
- Commits: imperative mood, concise subject, optional scope (e.g., "feat(components): add SEO component").
- PRs: clear description, linked issues, screenshots/GIFs for UI updates, and a short test plan (commands run + results).
- Ensure images are optimized (`optimize-images`), builds pass, and key tests are green before request for review.

## Security & Configuration Tips
- Review `docs/GITHUB_SECRETS_SETUP.md`, `docs/WEB3FORM_SETUP.md`, and `lighthouserc.json` before enabling CI and forms.
- Do not commit secrets; prefer environment/CI variables.
