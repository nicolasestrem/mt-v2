# Test Reports Location Guide

## Where to Find Test Reports

When you run Playwright tests for the Mobility Trailblazers website, reports are generated in several locations:

### 1. HTML Report (Primary Report)
- **Location**: `playwright-report/` directory
- **View Report**: Run `npm run test:report` after tests complete
- **Features**: 
  - Interactive HTML interface
  - Screenshots of failures
  - Video recordings of failures
  - Detailed error traces
  - Test execution timeline

### 2. Test Results Directory
- **Location**: `test-results/` directory
- **Contents**:
  - Individual test failure artifacts
  - Screenshots (`.png` files)
  - Videos (`.webm` files)
  - Error context files (`error-context.md`)
  - Each failed test gets its own subdirectory

### 3. JSON Report
- **Location**: `test-results/results.json`
- **Purpose**: Machine-readable test results for CI/CD integration

### 4. JUnit XML Report
- **Location**: `test-results/results.xml`
- **Purpose**: Integration with CI/CD systems that support JUnit format

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Mobile Menu Tests
```bash
npm run test:mobile-menu
```

### Run Tests with UI Mode (Interactive)
```bash
npm run test:ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```

### Run Mobile-Specific Tests
```bash
npm run test:mobile
```

## Viewing Test Reports

### After Running Tests:

1. **View HTML Report**:
   ```bash
   npm run test:report
   ```
   This opens an interactive browser-based report showing:
   - Pass/fail status for each test
   - Execution time
   - Screenshots at point of failure
   - Full error traces
   - Video recordings (if enabled)

2. **Check Test Results Directory**:
   - Navigate to `test-results/` folder
   - Each failed test has its own folder with:
     - Screenshot of the failure
     - Video recording (if test failed)
     - Error context markdown file

## Understanding Test Failures

When a test fails, you'll find:

1. **In HTML Report**:
   - Red indicator showing which test failed
   - Click on the test to see:
     - Error message
     - Stack trace
     - Screenshot at failure point
     - Step-by-step execution trace

2. **In test-results/ folder**:
   - Folder name indicates: `test-suite-name-test-name-browser-project`
   - Example: `mobile-menu-Mobile-Burger-Menu-Tests-mobile-menu-button-is-visible-Desktop-Chrome`
   - Contains:
     - `test-failed-1.png`: Screenshot at failure
     - `video.webm`: Recording of the entire test
     - `error-context.md`: Detailed error information

## Mobile Burger Menu Tests

The mobile burger menu is specifically tested in:
- `tests/mobile-menu.spec.ts`: Dedicated mobile menu test suite
- `tests/responsive-design.spec.ts`: General responsive tests including menu

### Test Coverage:
- ✅ Menu visibility on mobile devices
- ✅ Toggle open/close functionality
- ✅ Touch event handling
- ✅ Click outside to close
- ✅ Navigation link click closes menu
- ✅ Multiple device viewport testing
- ✅ Desktop vs mobile behavior
- ✅ Hamburger animation
- ✅ Accessibility attributes
- ✅ Landscape orientation
- ✅ Performance metrics

## Configuration

Test report settings are configured in `playwright.config.ts`:

```typescript
reporter: [
  ['html'],                                    // HTML report
  ['json', { outputFile: 'test-results/results.json' }],  // JSON report
  ['junit', { outputFile: 'test-results/results.xml' }]   // JUnit XML report
]
```

## Tips

1. **Clean old reports**: Delete `test-results/` and `playwright-report/` before running new tests for clean results
2. **Debug specific test**: Use `npm run test:debug` for step-by-step debugging
3. **Update screenshots**: Use `npm run test:update-snapshots` to update visual regression baselines
4. **CI/CD Integration**: Use the JSON or JUnit XML reports for automated pipeline integration