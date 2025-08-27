import { test, expect } from '@playwright/test';

test.describe('Scroll to Top Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should appear when scrolling down', async ({ page }) => {
    // Initially button should not be visible
    const scrollButton = page.locator('#scroll-to-top-button, .scroll-to-top');
    await expect(scrollButton).toBeHidden();

    // Scroll down more than 300px
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300); // Wait for scroll animation

    // Button should now be visible
    await expect(scrollButton).toBeVisible();
  });

  test('should scroll to top when clicked', async ({ page }) => {
    const scrollButton = page.locator('#scroll-to-top-button, .scroll-to-top');
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    // Click the scroll to top button
    await scrollButton.click();
    await page.waitForTimeout(500); // Wait for scroll animation

    // Check that we're back at the top
    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeLessThan(100);
  });

  test('should hide when scrolling back to top', async ({ page }) => {
    const scrollButton = page.locator('#scroll-to-top-button, .scroll-to-top');
    
    // Scroll down to show button
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);
    await expect(scrollButton).toBeVisible();

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    // Button should be hidden again
    await expect(scrollButton).toBeHidden();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // Scroll down to show button
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);

    const scrollButton = page.locator('#scroll-to-top-button, .scroll-to-top');
    
    // Check for ARIA label
    const ariaLabel = await scrollButton.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel).toMatch(/scroll.*top|nach.*oben/i);

    // Check for proper button role
    const role = await scrollButton.getAttribute('role');
    if (role) {
      expect(role).toBe('button');
    }
  });

  test('should maintain proper z-index above other content', async ({ page }) => {
    // Scroll down to show button
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);

    const scrollButton = page.locator('#scroll-to-top-button, .scroll-to-top');
    
    // Check z-index is high enough
    const zIndex = await scrollButton.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });
    
    expect(parseInt(zIndex)).toBeGreaterThan(100);
  });
});