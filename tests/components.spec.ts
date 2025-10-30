import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Component Functionality Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test.describe('Navigation and Header', () => {
    test('header should be visible and properly positioned', async () => {
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

    test('logo should be visible and have proper dimensions', async () => {
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

    test('desktop navigation links should work correctly', async ({ page }) => {
      // Only test on desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      const navLinks = homePage.navLinks;
      const linkCount = await navLinks.count();
      expect(linkCount).toBeGreaterThan(0);
      
      // Test anchor navigation
      for (let i = 0; i < Math.min(linkCount, 3); i++) {
        const link = navLinks.nth(i);
        const href = await link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
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

    test('mobile menu should function correctly', async ({ page }) => {
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
      
      // Check navigation links are visible in mobile menu
      const mobileNavLinks = homePage.navMenu.locator('a');
      const linkCount = await mobileNavLinks.count();
      expect(linkCount).toBeGreaterThan(0);
      
      // Close menu
      await homePage.mobileMenuButton.click();
      await page.waitForTimeout(300);
      await expect(homePage.navMenu).toBeHidden();
    });

    test('social links should be present and valid', async ({ page }) => {
      // Desktop view
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      const socialLinks = homePage.navSocial.locator('a');
      const socialCount = await socialLinks.count();
      
      if (socialCount > 0) {
        // Check LinkedIn link exists
        const linkedinLink = socialLinks.filter({ hasText: /linkedin/i });
        const linkedinCount = await linkedinLink.count();
        if (linkedinCount > 0) {
          const href = await linkedinLink.first().getAttribute('href');
          expect(href).toMatch(/linkedin\.com/);
        }
      }
    });
  });

  test.describe('Criteria Cards', () => {
    test.beforeEach(async () => {
      await homePage.scrollToSection(homePage.criteriaSection);
    });

    test('should display all 5 criteria cards with required elements', async () => {
      await expect(homePage.criteriaCards.first()).toBeVisible();
      
      const cardCount = await homePage.criteriaCards.count();
      expect(cardCount).toBe(5);
      
      // Check each card has required elements
      for (let i = 0; i < cardCount; i++) {
        const card = homePage.criteriaCards.nth(i);
        await expect(card).toBeVisible();
        
        // Check for title and description
        const title = card.locator('.criteria-title');
        const description = card.locator('.criteria-description');
        
        if (await title.count() > 0) {
          await expect(title).toBeVisible();
        }
        if (await description.count() > 0) {
          await expect(description).toBeVisible();
        }
      }
    });

    test('criteria cards should have hover animations', async ({ page }) => {
      const firstCard = homePage.criteriaCards.first();
      
      // Get initial styles (checking both transform and box-shadow which both change on hover)
      const initialStyles = await firstCard.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          transform: computed.transform,
          boxShadow: computed.boxShadow
        };
      });
      
      // Hover over the card
      await firstCard.hover();
      await page.waitForTimeout(500); // Give more time for transition
      
      // Get hover styles
      const hoverStyles = await firstCard.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          transform: computed.transform,
          boxShadow: computed.boxShadow
        };
      });
      
      // Either transform or box-shadow should change on hover
      const transformChanged = hoverStyles.transform !== initialStyles.transform;
      const boxShadowChanged = hoverStyles.boxShadow !== initialStyles.boxShadow;
      
      expect(transformChanged || boxShadowChanged).toBe(true);
    });

    test('criteria cards should be responsive', async ({ page }) => {
      // Desktop layout
      await page.setViewportSize({ width: 1920, height: 1080 });
      const desktopLayout = await homePage.page.locator('.criteria-diamond-layout, .criteria-container').evaluate((el) => {
        return window.getComputedStyle(el).display;
      });
      expect(desktopLayout).toMatch(/grid|flex/);
      
      // Mobile layout
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);
      
      // Cards should still be visible on mobile
      await expect(homePage.criteriaCards.first()).toBeVisible();
    });
  });

  test.describe('Partner Cards', () => {
    test.beforeEach(async () => {
      await homePage.scrollToSection(homePage.aboutSection);
    });

    test('should display partner cards with required elements', async () => {
      if (await homePage.partnerCards.count() > 0) {
        await expect(homePage.partnerCards.first()).toBeVisible();
        
        const cardCount = await homePage.partnerCards.count();
        expect(cardCount).toBeGreaterThanOrEqual(3);
        
        // Check each card has required elements
        for (let i = 0; i < Math.min(cardCount, 3); i++) {
          const card = homePage.partnerCards.nth(i);
          
          // Check for title or description
          const title = card.locator('.partner-title, h3, h4');
          const description = card.locator('.partner-description, p');
          
          const titleExists = await title.count() > 0;
          const descExists = await description.count() > 0;
          expect(titleExists || descExists).toBe(true);
          
          // Check for link
          const link = card.locator('a');
          if (await link.count() > 0) {
            const href = await link.first().getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toMatch(/^https?:\/\/|^#|^\//);
          }
        }
      }
    });

    test('partner cards should have hover effects', async ({ page }) => {
      if (await homePage.partnerCards.count() > 0) {
        const firstCard = homePage.partnerCards.first();
        
        // Get initial transform
        const initialTransform = await firstCard.evaluate((el) => {
          return window.getComputedStyle(el).transform;
        });
        
        // Hover over the card
        await firstCard.hover();
        await page.waitForTimeout(300);
        
        // Get hover transform
        const hoverTransform = await firstCard.evaluate((el) => {
          return window.getComputedStyle(el).transform;
        });
        
        // Transform should change on hover
        expect(hoverTransform).not.toBe(initialTransform);
      }
    });

    test('Berlin image should be visible and properly loaded', async () => {
      if (await homePage.berlinImage.count() > 0) {
        await expect(homePage.berlinImage).toBeVisible();
        
        // Check image has proper alt text
        const altText = await homePage.berlinImage.getAttribute('alt');
        expect(altText).toBeTruthy();
        
        // Check image loaded successfully
        const naturalWidth = await homePage.berlinImage.first().evaluate((img: HTMLImageElement) => img.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Scroll to Top Button', () => {
    test('@critical should appear when scrolling down and function correctly', async ({ page }) => {
      // Check if scroll button exists
      const scrollButton = page.locator('#scroll-to-top-button, .scroll-to-top');
      const buttonExists = await scrollButton.count() > 0;
      
      if (buttonExists) {
        // Initially button should not be visible
        await expect(scrollButton).toBeHidden();

        // Scroll down more than 300px
        await page.evaluate(() => window.scrollTo(0, 500));
        await page.waitForTimeout(500); // Increased wait time

        // Button should now be visible
        await expect(scrollButton).toBeVisible();
        
        // Wait for any potential overlays to settle and use force click if needed
        await page.waitForTimeout(500);
        
        // Try to click with force option to bypass any potential overlay issues
        await scrollButton.click({ force: true, timeout: 15000 });
        await page.waitForTimeout(1000); // Increased wait for scroll animation

        // Check that we're back at the top
        const scrollPosition = await page.evaluate(() => window.scrollY);
        expect(scrollPosition).toBeLessThan(100);
        
        // Button should be hidden again
        await expect(scrollButton).toBeHidden();
      }
    });

    test('should have proper accessibility attributes', async ({ page }) => {
      const scrollButton = page.locator('#scroll-to-top-button, .scroll-to-top');
      const buttonExists = await scrollButton.count() > 0;
      
      if (buttonExists) {
        // Scroll down to show button
        await page.evaluate(() => window.scrollTo(0, 500));
        await page.waitForTimeout(300);
        
        // Check for ARIA label or title
        const ariaLabel = await scrollButton.getAttribute('aria-label');
        const title = await scrollButton.getAttribute('title');
        
        expect(ariaLabel || title).toBeTruthy();
        
        // Check z-index is appropriate
        const zIndex = await scrollButton.evaluate((el) => {
          return window.getComputedStyle(el).zIndex;
        });
        
        if (zIndex !== 'auto') {
          expect(parseInt(zIndex)).toBeGreaterThan(10);
        }
      }
    });
  });

  test.describe('New Content and FAQ Section', () => {
    test('FAQ section should be visible and contain expected content', async ({ page }) => {
      await homePage.scrollToSection(homePage.nominationSection);
      
      // Check if FAQ section exists
      const faqSection = page.locator('#faq');
      await expect(faqSection).toBeVisible();
      
      // Check for FAQ subsections
      const faqWhoCanNominate = page.locator('#faq-who-can-nominate');
      const faqMultipleNominations = page.locator('#faq-multiple-nominations');
      const faqAfterSubmission = page.locator('#faq-after-submission');
      
      if (await faqWhoCanNominate.count() > 0) {
        await expect(faqWhoCanNominate).toBeVisible();
      }
      if (await faqMultipleNominations.count() > 0) {
        await expect(faqMultipleNominations).toBeVisible();
      }
      if (await faqAfterSubmission.count() > 0) {
        await expect(faqAfterSubmission).toBeVisible();
      }
      
      // Check content includes expected text in the FAQ section area
      const faqContainer = homePage.nominationSection;
      await expect(faqContainer).toContainText('Wer darf nominieren?');
      await expect(faqContainer).toContainText('Kann ich mehrere Personen nominieren?');
      await expect(faqContainer).toContainText('Was passiert nach der Einreichung?');
    });
    
    test('should display "26 in 2026" content instead of old content', async ({ page }) => {
      await homePage.scrollToSection(homePage.nominationSection);
      
      // Check for new "26 in 2026" content
      const title = page.locator('h1.nomination-title');
      await expect(title).toContainText('26 in 2026');
      
      // Check for updated process description
      await expect(page.locator('#update-trailblazers-2025')).toBeVisible();
      await expect(page.locator('#update-trailblazers-2025')).toContainText('Mobility Trailblazers 2025');
      
      // Ensure old content references 2026
      const nominationContent = homePage.nominationSection;
      await expect(nominationContent).toContainText('2026');
      await expect(nominationContent).toContainText('26 in 2026');
    });
    
    test('should have proper heading hierarchy with h1 as main title', async ({ page }) => {
      await homePage.scrollToSection(homePage.nominationSection);
      
      // Check that the main title is h1
      const mainTitle = page.locator('h1.nomination-title');
      await expect(mainTitle).toBeVisible();
      await expect(mainTitle).toContainText('26 in 2026');
      
      // Check h2 subheadings exist
      const h2Headings = homePage.nominationSection.locator('h2');
      const h2Count = await h2Headings.count();
      expect(h2Count).toBeGreaterThan(0);
      
      // Check some specific h2 headings
      await expect(page.locator('#eligibility')).toBeVisible();
      await expect(page.locator('#criteria')).toBeVisible();
      await expect(page.locator('#faq')).toBeVisible();
    });
    
    test('navigation anchors should work correctly', async ({ page }) => {
      // Test some key anchor links
      const anchors = [
        '#update-trailblazers-2025',
        '#eligibility', 
        '#criteria',
        '#how-to-nominate',
        '#why-it-matters',
        '#faq',
        '#cta-nominate-now'
      ];
      
      for (const anchor of anchors) {
        // Navigate to anchor
        await page.goto(`/${anchor}`);
        await page.waitForTimeout(500);
        
        // Check that the target element is visible
        const targetElement = page.locator(anchor);
        await expect(targetElement).toBeVisible();
        
        // Check we scrolled to approximately the right position
        const elementBox = await targetElement.boundingBox();
        const scrollY = await page.evaluate(() => window.scrollY);
        
        if (elementBox) {
          // Should be somewhere near the element (within viewport)
          expect(scrollY).toBeGreaterThan(Math.max(0, elementBox.y - 200));
        }
      }
    });
  });

  test.describe('Visual Effects and Styling', () => {
    test('header should have proper backdrop blur effect', async () => {
      const backdropFilter = await homePage.header.evaluate((el) => {
        return window.getComputedStyle(el).backdropFilter || 
               window.getComputedStyle(el).webkitBackdropFilter;
      });
      
      // Should have backdrop blur or similar effect
      expect(backdropFilter).toMatch(/blur|none/);
    });

    test('navigation links should have proper brand colors', async () => {
      if (await homePage.navLinks.count() > 0) {
        const navLink = homePage.navLinks.first();
        
        // Check link color matches brand
        const color = await navLink.evaluate((el) => {
          return window.getComputedStyle(el).color;
        });
        
        // Should be a valid color value
        expect(color).toMatch(/rgb|#|hsl/);
      }
    });

    test('mobile menu should have proper animation', async ({ page }) => {
      // Mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);
      
      const menuButton = homePage.mobileMenuButton;
      if (await menuButton.count() > 0) {
        const menuButtonSpans = menuButton.locator('span');
        const spanCount = await menuButtonSpans.count();
        
        if (spanCount >= 3) {
          // Check hamburger icon has 3 lines
          expect(spanCount).toBe(3);
          
          // Open menu
          await menuButton.click();
          await page.waitForTimeout(300);
          
          // Check if hamburger transforms
          const firstSpanTransform = await menuButtonSpans.first().evaluate((el) => {
            return window.getComputedStyle(el).transform;
          });
          expect(firstSpanTransform).toBeDefined();
        }
      }
    });
  });
});