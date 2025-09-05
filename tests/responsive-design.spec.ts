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

  test.describe('Mobile Menu Functionality', () => {
    test('mobile menu button is visible on mobile and hidden on desktop', async ({ page }) => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await homePage.navigateToHome();

      // Check that mobile menu button is visible
      await expect(homePage.mobileMenuButton).toBeVisible();
      
      // Check that it has the hamburger lines
      const hamburgerLines = homePage.mobileMenuButton.locator('span');
      const lineCount = await hamburgerLines.count();
      if (lineCount > 0) {
        expect(lineCount).toBe(3);
      }
      
      // Check that desktop menu is hidden on mobile
      await expect(homePage.navMenu).not.toBeVisible();
      
      // Switch to desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // Mobile menu button should not be visible on desktop
      await expect(homePage.mobileMenuButton).not.toBeVisible();
      
      // Desktop menu should be visible
      await expect(homePage.navMenu).toBeVisible();
    });

    test('mobile menu toggles open and closed correctly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await homePage.navigateToHome();

      // Initially menu should be hidden
      await expect(homePage.navMenu).not.toBeVisible();
      
      // Click the hamburger button
      await homePage.mobileMenuButton.click();
      await page.waitForTimeout(300);
      
      // Menu should be visible
      await expect(homePage.navMenu).toBeVisible();
      
      // Button should have active state
      const buttonClass = await homePage.mobileMenuButton.getAttribute('class');
      if (buttonClass) {
        expect(buttonClass).toMatch(/active|open/);
      }
      
      // Click again to close
      await homePage.mobileMenuButton.click();
      await page.waitForTimeout(300);
      
      // Menu should be hidden again
      await expect(homePage.navMenu).not.toBeVisible();
    });

    test('mobile menu works with click events on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await homePage.navigateToHome();

      // Use click on mobile viewport (simulates mobile interaction)
      await homePage.mobileMenuButton.click();
      await page.waitForTimeout(300);
      
      // Menu should be visible
      await expect(homePage.navMenu).toBeVisible();
      
      // Click again to close
      await homePage.mobileMenuButton.click();
      await page.waitForTimeout(300);
      
      // Menu should be hidden
      await expect(homePage.navMenu).not.toBeVisible();
    });

    test('menu closes when clicking outside', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await homePage.navigateToHome();

      // Open menu
      await homePage.mobileMenuButton.click();
      await page.waitForTimeout(500);
      await expect(homePage.navMenu).toBeVisible();
      
      // Click outside the menu using mouse coordinates (click in lower part of screen)
      await page.mouse.click(200, 500);
      await page.waitForTimeout(500);
      
      // Menu should close (wait longer for the event to process)
      await expect(homePage.navMenu).not.toBeVisible({ timeout: 3000 });
    });

    test('hamburger animation works correctly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await homePage.navigateToHome();

      const hamburgerLines = homePage.mobileMenuButton.locator('span');
      const lineCount = await hamburgerLines.count();
      
      if (lineCount >= 3) {
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
      }
    });

    test('menu accessibility attributes are correct', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await homePage.navigateToHome();

      // Check aria-label or similar accessibility attribute
      const ariaLabel = await homePage.mobileMenuButton.getAttribute('aria-label');
      const title = await homePage.mobileMenuButton.getAttribute('title');
      expect(ariaLabel || title).toBeTruthy();
      
      // Menu should be properly hidden/shown
      await expect(homePage.navMenu).not.toBeVisible();
      
      // Open menu
      await homePage.mobileMenuButton.click();
      await page.waitForTimeout(300);
      
      // Check menu is accessible
      await expect(homePage.navMenu).toBeVisible();
      
      // Navigation links should be focusable when menu is open
      const linkCount = await homePage.navLinks.count();
      for (let i = 0; i < Math.min(linkCount, 3); i++) {
        const link = homePage.navLinks.nth(i);
        if (await link.isVisible()) {
          await link.focus();
          await expect(link).toBeFocused();
        }
      }
    });

    test('menu works across different mobile device sizes', async ({ page }) => {
      const mobileDevices = [
        { name: 'iPhone SE', width: 375, height: 667 },
        { name: 'iPhone 12', width: 390, height: 844 },
        { name: 'Pixel 5', width: 393, height: 851 },
        { name: 'Galaxy S20', width: 360, height: 800 }
      ];

      for (const device of mobileDevices) {
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

    test('menu transitions correctly between viewports', async ({ page }) => {
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
      
      // Resize back to mobile (and close any open menu)
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);
      
      // Close mobile menu if it's still open from the previous state
      const isMenuVisible = await homePage.navMenu.isVisible();
      if (isMenuVisible) {
        await homePage.mobileMenuButton.click();
        await page.waitForTimeout(300);
      }
      
      // Should return to mobile state with closed menu
      await expect(homePage.mobileMenuButton).toBeVisible();
      await expect(homePage.navMenu).not.toBeVisible();
    });
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

  test('mobile interactions work correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();

    // Test mobile scrolling behavior
    await page.mouse.wheel(0, 500);
    
    // Test mobile menu interactions
    await homePage.mobileMenuButton.click();
    await page.waitForTimeout(300);
    await expect(homePage.navMenu).toBeVisible();
    
    await homePage.mobileMenuButton.click();
    await page.waitForTimeout(300);
    await expect(homePage.navMenu).not.toBeVisible();
    
    // Test form interactions on mobile
    await homePage.scrollToSection(homePage.nominationForm);
    
    // Click on form fields
    await homePage.nominatorFirstName.click();
    await expect(homePage.nominatorFirstName).toBeFocused();
    
    await homePage.nominatorEmail.click();
    await expect(homePage.nominatorEmail).toBeFocused();
    
    // Test dropdown interaction on mobile
    await homePage.nominatorSalutation.click();
    await homePage.nominatorSalutation.selectOption('Herr');
    await expect(homePage.nominatorSalutation).toHaveValue('Herr');
    
    // Verify mobile functionality
    await expect(homePage.submitButton).toBeVisible();
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