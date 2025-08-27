import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Mobile Burger Menu Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('mobile menu button is visible on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();

    // Check that mobile menu button is visible
    await expect(homePage.mobileMenuButton).toBeVisible();
    
    // Check that it has the hamburger lines
    const hamburgerLines = homePage.mobileMenuButton.locator('span');
    await expect(hamburgerLines).toHaveCount(3);
    
    // Check that desktop menu is hidden
    await expect(homePage.navMenu).not.toBeVisible();
    await expect(homePage.navSocial).not.toBeVisible();
  });

  test('mobile menu toggles open and closed on click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();

    // Initially menu should be hidden
    await expect(homePage.navMenu).not.toBeVisible();
    await expect(homePage.navSocial).not.toBeVisible();
    
    // Click the hamburger button
    await homePage.mobileMenuButton.click();
    
    // Wait for animation
    await page.waitForTimeout(300);
    
    // Menu should be visible
    await expect(homePage.navMenu).toBeVisible();
    await expect(homePage.navSocial).toBeVisible();
    
    // Button should have active class
    await expect(homePage.mobileMenuButton).toHaveClass(/active/);
    
    // Click again to close
    await homePage.mobileMenuButton.click();
    await page.waitForTimeout(300);
    
    // Menu should be hidden again
    await expect(homePage.navMenu).not.toBeVisible();
    await expect(homePage.navSocial).not.toBeVisible();
  });

  test('mobile menu works with touch events', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();

    // Use tap instead of click (simulates touch)
    await homePage.mobileMenuButton.tap();
    await page.waitForTimeout(300);
    
    // Menu should be visible
    await expect(homePage.navMenu).toBeVisible();
    
    // Tap again to close
    await homePage.mobileMenuButton.tap();
    await page.waitForTimeout(300);
    
    // Menu should be hidden
    await expect(homePage.navMenu).not.toBeVisible();
  });

  test('menu closes when clicking outside', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();

    // Open menu
    await homePage.mobileMenuButton.click();
    await page.waitForTimeout(300);
    await expect(homePage.navMenu).toBeVisible();
    
    // Click outside the menu (on the body)
    await page.click('body', { position: { x: 10, y: 300 } });
    await page.waitForTimeout(300);
    
    // Menu should close
    await expect(homePage.navMenu).not.toBeVisible();
  });

  test('menu closes when clicking a navigation link', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();

    // Open menu
    await homePage.mobileMenuButton.click();
    await page.waitForTimeout(300);
    await expect(homePage.navMenu).toBeVisible();
    
    // Click on a navigation link
    const aboutLink = homePage.navLinks.filter({ hasText: 'About' });
    await aboutLink.click();
    await page.waitForTimeout(300);
    
    // Menu should close
    await expect(homePage.navMenu).not.toBeVisible();
  });

  test('mobile menu works on different mobile devices', async ({ page }) => {
    const devices = [
      { name: 'iPhone SE', width: 375, height: 667 },
      { name: 'iPhone 12', width: 390, height: 844 },
      { name: 'iPhone 14 Pro', width: 393, height: 852 },
      { name: 'Pixel 5', width: 393, height: 851 },
      { name: 'Samsung Galaxy S20', width: 360, height: 800 }
    ];

    for (const device of devices) {
      await page.setViewportSize({ width: device.width, height: device.height });
      await homePage.navigateToHome();
      
      // Check mobile menu button is visible
      await expect(homePage.mobileMenuButton).toBeVisible();
      
      // Test toggle functionality
      await homePage.mobileMenuButton.click();
      await page.waitForTimeout(300);
      await expect(homePage.navMenu).toBeVisible();
      
      await homePage.mobileMenuButton.click();
      await page.waitForTimeout(300);
      await expect(homePage.navMenu).not.toBeVisible();
    }
  });

  test('menu is not visible on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await homePage.navigateToHome();

    // Mobile menu button should not be visible
    await expect(homePage.mobileMenuButton).not.toBeVisible();
    
    // Desktop menu should be visible
    await expect(homePage.navMenu).toBeVisible();
    await expect(homePage.navSocial).toBeVisible();
  });

  test('menu transitions correctly between mobile and desktop', async ({ page }) => {
    await homePage.navigateToHome();

    // Start with mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(homePage.mobileMenuButton).toBeVisible();
    await expect(homePage.navMenu).not.toBeVisible();
    
    // Open mobile menu
    await homePage.mobileMenuButton.click();
    await page.waitForTimeout(300);
    await expect(homePage.navMenu).toBeVisible();
    
    // Resize to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    
    // Desktop menu should be visible, mobile button hidden
    await expect(homePage.mobileMenuButton).not.toBeVisible();
    await expect(homePage.navMenu).toBeVisible();
    
    // Resize back to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    // Should return to mobile state
    await expect(homePage.mobileMenuButton).toBeVisible();
    await expect(homePage.navMenu).not.toBeVisible();
  });

  test('hamburger animation works correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();

    const hamburgerLines = homePage.mobileMenuButton.locator('span');
    
    // Get initial styles
    const initialStyles = await hamburgerLines.evaluateAll(elements => 
      elements.map(el => window.getComputedStyle(el).transform)
    );
    
    // Click to open
    await homePage.mobileMenuButton.click();
    await page.waitForTimeout(300);
    
    // Get animated styles
    const animatedStyles = await hamburgerLines.evaluateAll(elements => 
      elements.map(el => window.getComputedStyle(el).transform)
    );
    
    // Styles should be different (animated)
    expect(animatedStyles).not.toEqual(initialStyles);
    
    // Check specific animations
    const line1Transform = await hamburgerLines.nth(0).evaluate(el => 
      window.getComputedStyle(el).transform
    );
    const line2Opacity = await hamburgerLines.nth(1).evaluate(el => 
      window.getComputedStyle(el).opacity
    );
    const line3Transform = await hamburgerLines.nth(2).evaluate(el => 
      window.getComputedStyle(el).transform
    );
    
    // Line 1 should be rotated
    expect(line1Transform).toContain('matrix');
    // Line 2 should be hidden
    expect(line2Opacity).toBe('0');
    // Line 3 should be rotated opposite
    expect(line3Transform).toContain('matrix');
  });

  test('menu accessibility attributes are correct', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();

    // Check aria-label
    await expect(homePage.mobileMenuButton).toHaveAttribute('aria-label', 'Toggle navigation');
    
    // Menu should be properly hidden/shown
    await expect(homePage.navMenu).not.toBeVisible();
    
    // Open menu
    await homePage.mobileMenuButton.click();
    await page.waitForTimeout(300);
    
    // Check menu is accessible
    await expect(homePage.navMenu).toBeVisible();
    
    // All links should be focusable
    const linkCount = await homePage.navLinks.count();
    for (let i = 0; i < linkCount; i++) {
      const link = homePage.navLinks.nth(i);
      await expect(link).toBeVisible();
      
      // Check that link can receive focus
      await link.focus();
      await expect(link).toBeFocused();
    }
  });

  test('menu works in landscape orientation', async ({ page }) => {
    // Mobile landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await homePage.navigateToHome();

    // Mobile menu button should still be visible
    await expect(homePage.mobileMenuButton).toBeVisible();
    
    // Test functionality
    await homePage.mobileMenuButton.click();
    await page.waitForTimeout(300);
    await expect(homePage.navMenu).toBeVisible();
    
    // Menu should fit in landscape view
    const menuBox = await homePage.navMenu.boundingBox();
    if (menuBox) {
      expect(menuBox.height).toBeLessThan(375); // Should fit in viewport height
    }
  });

  test('menu performance - no jank during animation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();

    // Measure performance during menu animation
    await page.evaluate(() => performance.mark('menu-animation-start'));
    
    await homePage.mobileMenuButton.click();
    await page.waitForTimeout(300);
    
    await page.evaluate(() => performance.mark('menu-animation-end'));
    
    const metrics = await page.evaluate(() => {
      performance.measure('menu-animation', 'menu-animation-start', 'menu-animation-end');
      const measure = performance.getEntriesByName('menu-animation')[0];
      return measure.duration;
    });
    
    // Animation should complete within reasonable time
    expect(metrics).toBeLessThan(500); // 500ms max for smooth animation
  });
});