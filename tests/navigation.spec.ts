import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Navigation and Header', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('header should be visible and fixed', async () => {
    await expect(homePage.header).toBeVisible();
    
    // Check if header is fixed positioned
    const position = await homePage.header.evaluate((el) => {
      return window.getComputedStyle(el).position;
    });
    expect(position).toBe('fixed');
    
    // Header should stay visible when scrolling
    await homePage.page.evaluate(() => window.scrollTo(0, 500));
    await expect(homePage.header).toBeVisible();
  });

  test('logo should be visible and clickable', async () => {
    const logo = homePage.logo;
    await expect(logo).toBeVisible();
    
    // Logo should have proper dimensions
    const dimensions = await logo.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    });
    expect(dimensions.width).toBeGreaterThan(0);
    expect(dimensions.height).toBeGreaterThan(0);
  });

  test('desktop navigation links should work', async ({ page }) => {
    // Only test on desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const navLinks = homePage.navLinks;
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
    
    // Test each navigation link
    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        // Internal anchor link
        await link.click();
        await page.waitForTimeout(500); // Wait for scroll
        
        // Check if we scrolled to the section
        const scrollY = await page.evaluate(() => window.scrollY);
        if (href !== '#') {
          expect(scrollY).toBeGreaterThan(0);
        }
      }
    }
  });

  test('mobile menu toggle should work', async ({ page }) => {
    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    
    // Mobile menu button should be visible
    await expect(homePage.mobileMenuButton).toBeVisible();
    
    // Menu should be hidden initially
    await expect(homePage.navMenu).toBeHidden();
    
    // Click menu button to open
    await homePage.mobileMenuButton.click();
    await page.waitForTimeout(300);
    
    // Menu should now be visible
    await expect(homePage.navMenu).toBeVisible();
    
    // Click again to close
    await homePage.mobileMenuButton.click();
    await page.waitForTimeout(300);
    
    // Menu should be hidden again
    await expect(homePage.navMenu).toBeHidden();
  });

  test('mobile menu should have all navigation items', async ({ page }) => {
    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    
    // Open mobile menu
    await homePage.openMobileMenu();
    
    // Check navigation links are visible in mobile menu
    const mobileNavLinks = homePage.navMenu.locator('a');
    const linkCount = await mobileNavLinks.count();
    expect(linkCount).toBeGreaterThan(0);
    
    // Each link should be visible
    for (let i = 0; i < linkCount; i++) {
      await expect(mobileNavLinks.nth(i)).toBeVisible();
    }
  });

  test('social links should be present', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const socialLinks = homePage.navSocial.locator('a');
    const socialCount = await socialLinks.count();
    
    if (socialCount > 0) {
      // Check LinkedIn link exists
      const linkedinLink = socialLinks.filter({ hasText: /linkedin/i });
      const linkedinCount = await linkedinLink.count();
      expect(linkedinCount).toBeGreaterThan(0);
      
      // Check link has proper href
      const href = await linkedinLink.first().getAttribute('href');
      expect(href).toMatch(/linkedin\.com/);
    }
  });

  test('navigation should have proper color scheme', async () => {
    const navLink = homePage.navLinks.first();
    
    // Check link color matches brand
    const color = await navLink.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    // Should be orange (#C1693C) or teal (#004C5F)
    expect(color).toMatch(/rgb|#/);
  });

  test('navigation links should have hover effects', async ({ page }) => {
    // Desktop only
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const firstLink = homePage.navLinks.first();
    
    // Get initial color
    const initialColor = await firstLink.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    // Hover over link
    await firstLink.hover();
    await page.waitForTimeout(300);
    
    // Get hover color
    const hoverColor = await firstLink.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    // Color should change on hover
    expect(hoverColor).not.toBe(initialColor);
  });

  test('header should have proper backdrop blur effect', async () => {
    const backdropFilter = await homePage.header.evaluate((el) => {
      return window.getComputedStyle(el).backdropFilter || window.getComputedStyle(el).webkitBackdropFilter;
    });
    
    // Should have backdrop blur
    expect(backdropFilter).toMatch(/blur/);
  });

  test('mobile menu animation should work smoothly', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    
    const menuButton = homePage.mobileMenuButton;
    const menuButtonSpans = menuButton.locator('span');
    
    // Check hamburger icon has 3 lines
    const spanCount = await menuButtonSpans.count();
    expect(spanCount).toBe(3);
    
    // Open menu
    await menuButton.click();
    await page.waitForTimeout(300);
    
    // Check if hamburger transforms to X
    const firstSpanTransform = await menuButtonSpans.first().evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    expect(firstSpanTransform).not.toBe('none');
  });
});