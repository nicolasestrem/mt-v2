import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Core Functionality Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test.describe('Page Load and Basic Structure', () => {
    test('should load successfully with correct title and structure', async ({ page }) => {
      // Check that the page loads with correct title
      await expect(page).toHaveTitle(/25 Mobility Trailblazers|Mobility/i);
      
      // Check that main structural elements are visible
      await expect(page.locator('main')).toBeVisible();
      await expect(homePage.header).toBeVisible();
      await expect(homePage.footer).toBeVisible();
    });

    test('should have all main sections present and visible', async () => {
      // Test each section by scrolling to it
      const sections = [
        { section: homePage.heroSection, name: 'Hero' },
        { section: homePage.missionSection, name: 'Mission' },
        { section: homePage.aboutSection, name: 'About' },
        { section: homePage.criteriaSection, name: 'Criteria' },
        { section: homePage.jurySection, name: 'Jury' },
        { section: homePage.newsletterSection, name: 'Newsletter' },
        { section: homePage.linkedinSection, name: 'LinkedIn' },
        { section: homePage.nominationSection, name: 'Nomination' }
      ];

      for (const { section, name } of sections) {
        await homePage.scrollToSection(section);
        await expect(section).toBeVisible({ timeout: 5000 });
      }
    });

    test('should have proper meta tags and SEO structure', async ({ page }) => {
      // Check meta description exists
      const metaDescription = page.locator('meta[name="description"]');
      if (await metaDescription.count() > 0) {
        await expect(metaDescription).toHaveAttribute('content');
      }
      
      // Check canonical link exists
      const canonical = page.locator('link[rel="canonical"]');
      if (await canonical.count() > 0) {
        await expect(canonical).toHaveAttribute('href');
      }
      
      // Check proper heading structure - filter out dev toolbar
      const h1 = page.locator('h1:not([data-astro-dev-toolbar] h1)');
      const h1Count = await h1.count();
      expect(h1Count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Countdown Timer', () => {
    test('should display countdown timer with all elements', async () => {
      await homePage.waitForCountdownToLoad();
      
      // Check all countdown elements are visible
      await expect(homePage.countdownContainer).toBeVisible();
      await expect(homePage.countdownDays).toBeVisible();
      await expect(homePage.countdownHours).toBeVisible();
      await expect(homePage.countdownMinutes).toBeVisible();
      await expect(homePage.countdownSeconds).toBeVisible();
    });

    test('should display valid countdown values and update in real-time', async ({ page }) => {
      await homePage.waitForCountdownToLoad();
      
      // Get initial countdown values
      const days = await homePage.countdownDays.textContent();
      const hours = await homePage.countdownHours.textContent();
      const minutes = await homePage.countdownMinutes.textContent();
      const initialSeconds = await homePage.countdownSeconds.textContent();
      
      // Validate format (should be 2-digit numbers, days can be 3-digit)
      expect(days).toMatch(/^\d{2,3}$/);
      expect(hours).toMatch(/^\d{2}$/);
      expect(minutes).toMatch(/^\d{2}$/);
      expect(initialSeconds).toMatch(/^\d{2}$/);
      
      // Validate ranges
      expect(parseInt(hours || '0')).toBeLessThanOrEqual(23);
      expect(parseInt(minutes || '0')).toBeLessThanOrEqual(59);
      expect(parseInt(initialSeconds || '0')).toBeLessThanOrEqual(59);

      // Wait and check that seconds change (countdown is working)
      await page.waitForTimeout(2000);
      const newSeconds = await homePage.countdownSeconds.textContent();
      
      // The seconds should have changed (unless we hit exactly 00 -> 59 transition)
      if (initialSeconds !== '01' && initialSeconds !== '00') {
        expect(newSeconds).not.toBe(initialSeconds);
      }
    });

    test('should have proper countdown labels and styling', async () => {
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

      // Check countdown has proper styling
      const countdownItems = homePage.page.locator('.countdown-item');
      const itemCount = await countdownItems.count();
      expect(itemCount).toBe(4); // Should have 4 countdown items
    });
  });

  test.describe('Navigation and Anchors', () => {
    test('should handle anchor navigation correctly', async ({ page }) => {
      // Test direct navigation to nomination section
      await page.goto('/#vorschlagen');
      await expect(homePage.nominationSection).toBeInViewport();
      
      // Test that the URL contains the anchor
      expect(page.url()).toContain('#vorschlagen');
    });
  });

  test.describe('Content Sections', () => {
    test('should display partner cards in about section', async () => {
      await homePage.scrollToSection(homePage.aboutSection);
      
      // Check if partner cards are present
      const partnerCards = homePage.partnerCards;
      if (await partnerCards.count() > 0) {
        await expect(partnerCards.first()).toBeVisible();
        
        // Count should be 3 based on the project description
        const cardCount = await partnerCards.count();
        expect(cardCount).toBeGreaterThanOrEqual(3);
      }
    });

    test('should display criteria cards with interactivity', async () => {
      await homePage.scrollToSection(homePage.criteriaSection);
      
      // Check if criteria cards exist
      const criteriaCards = homePage.criteriaCards;
      
      if (await criteriaCards.count() > 0) {
        await expect(criteriaCards.first()).toBeVisible();
        
        // Test hover interaction if possible
        await criteriaCards.first().hover();
        await homePage.page.waitForTimeout(500);
      }
    });

    test('should display jury members', async () => {
      await homePage.scrollToSection(homePage.jurySection);
      
      // Check if jury members exist
      const juryMembers = homePage.juryMembers;
      
      if (await juryMembers.count() > 0) {
        await expect(juryMembers.first()).toBeVisible();
      }
    });

    test('should load images correctly', async ({ page }) => {
      await homePage.scrollToSection(homePage.aboutSection);
      
      // Check if Berlin image loads in about section
      if (await homePage.berlinImage.count() > 0) {
        await expect(homePage.berlinImage).toBeVisible();
        
        // Check if image actually loaded (not broken)
        const imageElement = await homePage.berlinImage.first().elementHandle();
        if (imageElement) {
          const naturalWidth = await imageElement.evaluate((img: HTMLImageElement) => img.naturalWidth);
          expect(naturalWidth).toBeGreaterThan(0);
        }
      }
    });
  });

  test.describe('Form Accessibility', () => {
    test('should have accessible nomination form with basic functionality', async () => {
      await homePage.scrollToSection(homePage.nominationForm);
      
      // Check form is visible and accessible
      await expect(homePage.nominationForm).toBeVisible();
      await expect(homePage.nominationTitle).toBeVisible();
      
      // Verify required form fields are present and functional
      await expect(homePage.nominatorFirstName).toBeVisible();
      await expect(homePage.nominatorLastName).toBeVisible();
      await expect(homePage.nominatorEmail).toBeVisible();
      await expect(homePage.nominatorSalutation).toBeVisible();
      await expect(homePage.submitButton).toBeVisible();
      
      // Test basic form interaction
      await homePage.nominatorFirstName.fill('Test');
      await expect(homePage.nominatorFirstName).toHaveValue('Test');

      // Check required fields have required attribute
      await expect(homePage.nominatorFirstName).toHaveAttribute('required');
      await expect(homePage.nominatorLastName).toHaveAttribute('required');
      await expect(homePage.nominatorEmail).toHaveAttribute('required');
      await expect(homePage.nominatorSalutation).toHaveAttribute('required');
      
      // Check email field has correct type
      await expect(homePage.nominatorEmail).toHaveAttribute('type', 'email');
    });
  });

  test.describe('Responsive Design', () => {
    test('should be responsive across different viewports', async ({ page }) => {
      const viewports = [
        { width: 375, height: 667, name: 'Mobile' },
        { width: 768, height: 1024, name: 'Tablet' },
        { width: 1920, height: 1080, name: 'Desktop' }
      ];

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await homePage.navigateToHome();
        
        // Core elements should be visible on all devices
        await expect(page.locator('main')).toBeVisible();
        await expect(homePage.heroSection).toBeVisible();
        await expect(homePage.countdownContainer).toBeVisible();
        
        // Form should be accessible on all devices
        await homePage.scrollToSection(homePage.nominationForm);
        await expect(homePage.nominationForm).toBeVisible();
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
});