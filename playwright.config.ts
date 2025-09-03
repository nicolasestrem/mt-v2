import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Timeout for each test */
  timeout: 30000, // Increased from 15s to 30s
  /* Expect timeout for assertions */
  expect: {
    timeout: 10000, // Increased from 5s to 10s
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Enable parallel workers on CI for faster execution */
  workers: process.env.CI ? 2 : undefined, // Reduced from 4 to 2 for stability
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4321',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    /* Disable video recording to save resources */
    video: 'off',
    /* Ignore HTTPS errors */
    ignoreHTTPSErrors: true,
    /* Run in headless mode to avoid dev toolbar issues */
    headless: true,
    /* Slower operations for stability */
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  /* Configure projects for essential browsers and devices only */
  projects: [
    // Core Desktop Browsers (run on all tests)
    {
      name: 'Desktop Chrome',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
    },
    {
      name: 'Desktop Firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 }
      },
    },

    // Core Mobile Devices (run on all tests)
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // Extended browser testing (only for main branch or scheduled runs)
    ...(process.env.EXTENDED_TESTS ? [
      {
        name: 'Desktop Safari',
        use: { 
          ...devices['Desktop Safari'],
          viewport: { width: 1920, height: 1080 }
        },
      },
      {
        name: 'Desktop Edge',
        use: { 
          ...devices['Desktop Edge'], 
          channel: 'msedge',
          viewport: { width: 1920, height: 1080 }
        },
      },
      {
        name: 'iPad',
        use: { ...devices['iPad Pro'] },
      },
    ] : []),
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: process.env.CI ? 'npm run build && npm run preview' : 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
