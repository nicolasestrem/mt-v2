import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Countdown Timer', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should display countdown timer with all elements', async () => {
    await homePage.waitForCountdownToLoad();
    
    // Check all countdown elements are visible
    await expect(homePage.countdownContainer).toBeVisible();
    await expect(homePage.countdownDays).toBeVisible();
    await expect(homePage.countdownHours).toBeVisible();
    await expect(homePage.countdownMinutes).toBeVisible();
    await expect(homePage.countdownSeconds).toBeVisible();
  });

  test('should display valid countdown values', async () => {
    await homePage.waitForCountdownToLoad();
    
    // Get countdown values
    const days = await homePage.countdownDays.textContent();
    const hours = await homePage.countdownHours.textContent();
    const minutes = await homePage.countdownMinutes.textContent();
    const seconds = await homePage.countdownSeconds.textContent();
    
    // Validate format (should be 2-digit numbers)
    expect(days).toMatch(/^\d{2,3}$/);
    expect(hours).toMatch(/^\d{2}$/);
    expect(minutes).toMatch(/^\d{2}$/);
    expect(seconds).toMatch(/^\d{2}$/);
    
    // Validate ranges
    expect(parseInt(hours || '0')).toBeLessThanOrEqual(23);
    expect(parseInt(minutes || '0')).toBeLessThanOrEqual(59);
    expect(parseInt(seconds || '0')).toBeLessThanOrEqual(59);
  });

  test('should have countdown labels', async () => {
    // Check for labels under each countdown value
    const daysLabel = homePage.page.locator('.countdown-item').filter({ has: homePage.countdownDays }).locator('.countdown-label');
    const hoursLabel = homePage.page.locator('.countdown-item').filter({ has: homePage.countdownHours }).locator('.countdown-label');
    const minutesLabel = homePage.page.locator('.countdown-item').filter({ has: homePage.countdownMinutes }).locator('.countdown-label');
    const secondsLabel = homePage.page.locator('.countdown-item').filter({ has: homePage.countdownSeconds }).locator('.countdown-label');
    
    await expect(daysLabel).toBeVisible();
    await expect(hoursLabel).toBeVisible();
    await expect(minutesLabel).toBeVisible();
    await expect(secondsLabel).toBeVisible();
    
    // Check label text
    expect(await daysLabel.textContent()).toMatch(/tag|day/i);
    expect(await hoursLabel.textContent()).toMatch(/stund|hour/i);
    expect(await minutesLabel.textContent()).toMatch(/minut/i);
    expect(await secondsLabel.textContent()).toMatch(/sekund|second/i);
  });

  test('should update countdown in real-time', async ({ page }) => {
    await homePage.waitForCountdownToLoad();
    
    // Get initial seconds value
    const initialSeconds = await homePage.countdownSeconds.textContent();
    
    // Wait for 2 seconds
    await page.waitForTimeout(2000);
    
    // Get new seconds value
    const newSeconds = await homePage.countdownSeconds.textContent();
    
    // The seconds should have changed (unless we hit exactly 00 -> 59 transition)
    if (initialSeconds !== '01' && initialSeconds !== '00') {
      expect(newSeconds).not.toBe(initialSeconds);
    }
  });

  test('should have proper countdown styling', async () => {
    const countdownItems = homePage.page.locator('.countdown-item');
    const itemCount = await countdownItems.count();
    
    // Should have 4 countdown items (days, hours, minutes, seconds)
    expect(itemCount).toBe(4);
    
    // Check each item has proper styling
    for (let i = 0; i < itemCount; i++) {
      const item = countdownItems.nth(i);
      await expect(item).toBeVisible();
      
      // Check for hover effects
      const hasHoverEffect = await item.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.transition !== 'none' || styles.transform !== 'none';
      });
      expect(hasHoverEffect).toBeTruthy();
    }
  });

  test('countdown should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.waitForCountdownToLoad();
    
    // All elements should still be visible
    await expect(homePage.countdownContainer).toBeVisible();
    await expect(homePage.countdownDays).toBeVisible();
    await expect(homePage.countdownHours).toBeVisible();
    await expect(homePage.countdownMinutes).toBeVisible();
    await expect(homePage.countdownSeconds).toBeVisible();
    
    // Check if items are properly arranged (might wrap on mobile)
    const container = homePage.countdownContainer;
    const containerStyles = await container.evaluate((el) => {
      return window.getComputedStyle(el);
    });
    
    // Should use flexbox with wrap
    expect(containerStyles.display).toBe('flex');
    expect(containerStyles.flexWrap).toMatch(/wrap/);
  });
});