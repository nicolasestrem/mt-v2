import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Responsive Design Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  const viewports = [
    { name: 'Mobile Portrait', width: 375, height: 667 },
    { name: 'Mobile Landscape', width: 667, height: 375 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Small Desktop', width: 1366, height: 768 },
    { name: 'Large Desktop', width: 1920, height: 1080 },
    { name: 'Ultrawide', width: 3440, height: 1440 }
  ];

  viewports.forEach(viewport => {
    test(`layout displays correctly on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await homePage.navigateToHome();

      // Check that main sections are visible and properly laid out
      await expect(homePage.heroSection).toBeVisible();
      await expect(homePage.heroTitle).toBeVisible();
      
      // Check countdown container adapts to viewport
      await expect(homePage.countdownContainer).toBeVisible();
      
      // Scroll through sections and verify visibility
      await homePage.scrollToSection(homePage.missionSection);
      await expect(homePage.missionSection).toBeVisible();
      
      await homePage.scrollToSection(homePage.aboutSection);
      await expect(homePage.aboutSection).toBeVisible();
      
      await homePage.scrollToSection(homePage.criteriaSection);
      await expect(homePage.criteriaSection).toBeVisible();
      
      await homePage.scrollToSection(homePage.nominationForm);
      await expect(homePage.nominationForm).toBeVisible();
      
      // Take screenshot for visual regression
      await homePage.takeScreenshot(`${viewport.name.replace(/\s+/g, '_')}_layout`, { fullPage: true });
    });
  });

  test('mobile navigation works correctly', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();

    // Look for mobile menu trigger (hamburger menu)
    const mobileMenuTrigger = page.locator('button[aria-label*="menu"], .hamburger, [class*="mobile-menu"]').first();
    
    if (await mobileMenuTrigger.count() > 0) {
      await expect(mobileMenuTrigger).toBeVisible();
      
      // Test menu interaction
      await mobileMenuTrigger.click();
      await page.waitForTimeout(300); // Wait for animation
      
      // Check if menu opens
      const mobileMenu = page.locator('nav[class*="open"], .mobile-menu[class*="open"], [aria-expanded="true"]').first();
      if (await mobileMenu.count() > 0) {
        await expect(mobileMenu).toBeVisible();
      }
    }
  });

  test('form layout adapts to mobile screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();
    await homePage.scrollToSection(homePage.nominationForm);

    // Check that form is properly stacked on mobile
    await expect(homePage.nominationForm).toBeVisible();
    await expect(homePage.nominatorFirstName).toBeVisible();
    await expect(homePage.nominatorLastName).toBeVisible();
    
    // Check that form fields are accessible (not overlapping)
    const firstNameBox = await homePage.nominatorFirstName.boundingBox();
    const lastNameBox = await homePage.nominatorLastName.boundingBox();
    
    if (firstNameBox && lastNameBox) {
      // On mobile, fields should be stacked (first name should be above last name)
      expect(firstNameBox.y).toBeLessThan(lastNameBox.y);
    }

    // Test form filling on mobile
    await homePage.fillNominationForm({
      firstName: 'Mobile',
      lastName: 'User',
      email: 'mobile@test.com',
      salutation: 'Herr'
    });

    // Verify values were entered
    await expect(homePage.nominatorFirstName).toHaveValue('Mobile');
    await expect(homePage.nominatorLastName).toHaveValue('User');
    await expect(homePage.nominatorEmail).toHaveValue('mobile@test.com');
  });

  test('countdown timer layout adapts to different screen sizes', async ({ page }) => {
    const testViewports = [
      { width: 320, height: 568 }, // iPhone SE
      { width: 768, height: 1024 }, // iPad Portrait
      { width: 1920, height: 1080 } // Desktop
    ];

    for (const viewport of testViewports) {
      await page.setViewportSize(viewport);
      await homePage.navigateToHome();
      
      await homePage.waitForCountdownToLoad();
      
      // Check that countdown is visible and readable
      await expect(homePage.countdownContainer).toBeVisible();
      
      const countdownItems = page.locator('.countdown-item');
      const itemCount = await countdownItems.count();
      expect(itemCount).toBe(4); // Should have 4 items (days, hours, minutes, seconds)
      
      // Check that all items are visible
      for (let i = 0; i < itemCount; i++) {
        await expect(countdownItems.nth(i)).toBeVisible();
      }
      
      // Take screenshot of countdown at different sizes
      const viewportName = `${viewport.width}x${viewport.height}`;
      await homePage.countdownContainer.screenshot({ path: `test-results/countdown-${viewportName}.png` });
    }
  });

  test('text remains readable at different sizes', async ({ page }) => {
    const textElements = [
      { selector: homePage.heroTitle, name: 'Hero Title' },
      { selector: homePage.heroSubtitle, name: 'Hero Subtitle' },
      { selector: homePage.nominationTitle, name: 'Nomination Title' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await homePage.navigateToHome();

      for (const element of textElements) {
        if (await element.selector.count() > 0) {
          await element.selector.scrollIntoViewIfNeeded();
          await expect(element.selector).toBeVisible();
          
          // Check font size is reasonable (not too small)
          const fontSize = await element.selector.evaluate((el) => {
            return window.getComputedStyle(el).fontSize;
          });
          
          const fontSizeValue = parseFloat(fontSize);
          expect(fontSizeValue).toBeGreaterThan(12); // Should be at least 12px
        }
      }
    }
  });

  test('images scale properly on different devices', async ({ page }) => {
    if (await homePage.berlinImage.count() > 0) {
      const testSizes = [
        { width: 375, height: 667 }, // Mobile
        { width: 1024, height: 768 }, // Tablet
        { width: 1920, height: 1080 } // Desktop
      ];

      for (const size of testSizes) {
        await page.setViewportSize(size);
        await homePage.navigateToHome();
        await homePage.scrollToSection(homePage.aboutSection);

        await expect(homePage.berlinImage.first()).toBeVisible();
        
        const imageBox = await homePage.berlinImage.first().boundingBox();
        if (imageBox) {
          // Image should not overflow the container
          expect(imageBox.width).toBeLessThanOrEqual(size.width);
          
          // Image should have reasonable size (not too small)
          expect(imageBox.width).toBeGreaterThan(100);
        }
      }
    }
  });

  test('touch interactions work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();

    // Test touch scrolling
    await page.touchscreen.tap(200, 300);
    await page.mouse.wheel(0, 500);
    
    // Test form interactions with touch
    await homePage.scrollToSection(homePage.nominationForm);
    
    // Tap on form fields
    await homePage.nominatorFirstName.tap();
    await expect(homePage.nominatorFirstName).toBeFocused();
    
    await homePage.nominatorEmail.tap();
    await expect(homePage.nominatorEmail).toBeFocused();
    
    // Test dropdown interaction
    await homePage.nominatorSalutation.tap();
    // On mobile, this should open the dropdown
  });

  test('content does not overflow containers on any screen size', async ({ page }) => {
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await homePage.navigateToHome();

      // Check for horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = viewport.width;
      
      // Allow for small differences due to scrollbars
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
      
      // Check main sections don't overflow
      const sections = [
        homePage.heroSection,
        homePage.missionSection,
        homePage.aboutSection,
        homePage.criteriaSection,
        homePage.nominationSection
      ];

      for (const section of sections) {
        if (await section.count() > 0) {
          await section.scrollIntoViewIfNeeded();
          const sectionBox = await section.boundingBox();
          if (sectionBox) {
            expect(sectionBox.width).toBeLessThanOrEqual(viewportWidth + 20);
          }
        }
      }
    }
  });
});