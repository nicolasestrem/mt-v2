import { test, expect } from '@playwright/test';

test.describe('Jury Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#jury');
  });

  test('should display jury section', async ({ page }) => {
    const jurySection = await page.locator('#jury');
    await expect(jurySection).toBeVisible();
  });

  test('should show initial jury members', async ({ page }) => {
    const visibleMembers = await page.locator('.jury-members-visible .jury-member');
    const count = await visibleMembers.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(6);
  });

  test('should have show more button', async ({ page }) => {
    const toggleBtn = await page.locator('#jury-toggle-btn');
    await expect(toggleBtn).toBeVisible();
    await expect(toggleBtn).toContainText('Alle Jury-Mitglieder anzeigen');
  });

  test('should expand to show all members on click', async ({ page }) => {
    const toggleBtn = await page.locator('#jury-toggle-btn');
    const hiddenSection = await page.locator('#jury-members-hidden');
    
    // Initially hidden
    await expect(hiddenSection).toHaveAttribute('aria-hidden', 'true');
    
    // Click to expand
    await toggleBtn.click();
    await page.waitForTimeout(500); // Wait for animation
    
    // Should be visible
    await expect(hiddenSection).toHaveAttribute('aria-hidden', 'false');
    await expect(toggleBtn).toContainText('Weniger anzeigen');
  });

  test('should display jury member information', async ({ page }) => {
    const firstMember = await page.locator('.jury-member').first();
    
    // Check for required elements
    await expect(firstMember.locator('.member-name')).toBeVisible();
    await expect(firstMember.locator('.member-role')).toBeVisible();
    await expect(firstMember.locator('.member-bio')).toBeVisible();
    await expect(firstMember.locator('.member-image img')).toBeVisible();
  });

  test('should have LinkedIn links where available', async ({ page }) => {
    const linkedinLinks = await page.locator('.social-link[href*="linkedin.com"]');
    const count = await linkedinLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const visibleMembers = await page.locator('.jury-members-visible .jury-member:visible');
    const count = await visibleMembers.count();
    
    // Should show fewer members on mobile
    expect(count).toBeLessThanOrEqual(2);
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    const toggleBtn = await page.locator('#jury-toggle-btn');
    
    // Check ARIA attributes
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(toggleBtn).toHaveAttribute('aria-controls', 'jury-members-hidden');
    
    // Check after expansion
    await toggleBtn.click();
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
  });

  test('should handle keyboard navigation', async ({ page }) => {
    const toggleBtn = await page.locator('#jury-toggle-btn');
    
    // Focus the button
    await toggleBtn.focus();
    
    // Press Enter to expand
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    
    // Press Space to collapse
    await page.keyboard.press('Space');
    await page.waitForTimeout(500);
    
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });

  test('should load jury images', async ({ page }) => {
    const images = await page.locator('.member-image img');
    const count = await images.count();
    
    for (let i = 0; i < Math.min(count, 3); i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('src', /\.webp$/);
      await expect(img).toBeVisible();
    }
  });
});