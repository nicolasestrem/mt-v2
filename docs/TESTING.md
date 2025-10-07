# Testing Setup

This project uses Playwright for end-to-end testing with a comprehensive test suite covering accessibility, components, forms, and responsive design.

## Playwright Testing

### Installation

The project includes Playwright as a dev dependency. To install:

```bash
npm install
npx playwright install
```

### Running Tests

- **Run all tests**: `npm test` (Chrome + Firefox)
- **Run PR tests**: `npm run test:pr` (Critical tests, Chrome only)
- **Run full suite**: `npm run test:full` (All tests, all browsers)
- **Run tests with UI**: `npm run test:ui` (Interactive mode)
- **Run Chrome only**: `npm run test:chrome` (Faster execution)
- **Show test report**: `npm run test:report` (HTML report)

### Test Structure

Tests are located in the `tests/` directory (79 tests total):
- `tests/accessibility.spec.ts` - WCAG compliance, heading hierarchy, keyboard navigation (15 tests)
- `tests/components.spec.ts` - Component rendering, animations, hover effects (16 tests)
- `tests/core.spec.ts` - Page structure, countdown timer, navigation (14 tests)
- `tests/form-functionality.spec.ts` - Form validation, submission, mobile interactions (12 tests)
- `tests/responsive-design.spec.ts` - Mobile/tablet/desktop responsive behavior (22 tests)
- `tests/pages/HomePage.ts` - Page object model for home page

### Configuration

Playwright is configured in `playwright.config.ts` with:
- Support for Chromium, Firefox, and WebKit browsers
- Automatic dev server startup
- HTML reporter
- CI-friendly settings

## Test Configuration

The test suite is configured for optimal CI/CD performance:
- **Timeout**: 30 seconds per test (10s for expects)
- **Browsers**: Chrome + Firefox (Chrome only for PRs)
- **Workers**: 2 parallel workers in CI for stability
- **Retry**: 1 retry in CI environment
- **Headless**: Always true to avoid dev toolbar issues

See `playwright.config.ts` for full configuration details.

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

### Best Practices

1. **Use descriptive test names** that explain what is being tested
2. **Group related tests** using `test.describe()`
3. **Test responsive design** with different viewport sizes
4. **Use page objects** for complex applications
5. **Add visual regression tests** for UI components

### Common Assertions

- `expect(page).toHaveTitle(/pattern/)` - Check page title
- `expect(locator).toBeVisible()` - Check element visibility
- `expect(locator).toHaveText('text')` - Check element text
- `expect(locator).toHaveAttribute('attr', 'value')` - Check attributes

## CI/CD Integration

The Playwright configuration includes CI-friendly settings:
- Automatic retries on CI
- Single worker in CI environments
- Trace collection for failed tests
- HTML report generation

## Troubleshooting

### Common Issues

1. **Tests fail on CI but pass locally**: Check viewport sizes and timing
2. **MCP server not loading**: Verify API key and restart Cursor
3. **Browser installation issues**: Run `npx playwright install` manually

### Debug Mode

Use `npm run test:ui` to run tests in interactive mode with:
- Visual feedback and step-by-step execution
- Time travel debugging
- Watch mode for development
- Full test trace viewing
