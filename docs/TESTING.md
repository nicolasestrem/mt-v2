# Testing Setup

This project uses Playwright for end-to-end testing and includes MCP (Model Context Protocol) configuration for enhanced development capabilities.

## Playwright Testing

### Installation

The project includes Playwright as a dev dependency. To install:

```bash
npm install
npx playwright install
```

### Running Tests

- **Run all tests**: `npm test`
- **Run tests with UI**: `npm run test:ui`
- **Run tests in headed mode**: `npm run test:headed`
- **Run tests in debug mode**: `npm run test:debug`

### Test Structure

Tests are located in the `tests/` directory:
- `tests/home.spec.ts` - Basic home page tests

### Configuration

Playwright is configured in `playwright.config.ts` with:
- Support for Chromium, Firefox, and WebKit browsers
- Automatic dev server startup
- HTML reporter
- CI-friendly settings

## MCP (Model Context Protocol) Configuration

### Kapture MCP Server

The project includes Kapture MCP server configuration in `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "kapture": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-kapture"],
      "env": {
        "KAPTURE_API_KEY": "your-kapture-api-key-here"
      }
    }
  }
}
```

### Setup

1. Replace `"your-kapture-api-key-here"` with your actual Kapture API key
2. Restart Cursor to load the MCP configuration
3. The Kapture server will be available for enhanced development capabilities

### Features

- **Knowledge Graph**: Access to a memory system for storing and retrieving project-related information
- **Enhanced Context**: Better understanding of codebase structure and relationships
- **Documentation Integration**: Automatic documentation updates and tracking

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

Use `npm run test:debug` to run tests in debug mode with:
- Slower execution
- Visual feedback
- Step-by-step debugging capabilities
