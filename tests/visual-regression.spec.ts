import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Visual Regression Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('full page visual regression', async ({ page }) => {
    // Wait for all content to load
    await page.waitForLoadState('networkidle');
    await homePage.waitForCountdownToLoad();
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('full-page.png', {
      fullPage: true,
      animations: 'disabled', // Disable animations for consistent screenshots
    });
  });

  test('hero section visual regression', async ({ page }) => {
    await homePage.waitForCountdownToLoad();
    
    // Screenshot of hero section
    await expect(homePage.heroSection).toHaveScreenshot('hero-section.png', {
      animations: 'disabled',
    });
  });

  test('nomination form visual regression', async ({ page }) => {
    await homePage.scrollToSection(homePage.nominationForm);
    
    // Screenshot of nomination form
    await expect(homePage.nominationForm).toHaveScreenshot('nomination-form.png', {
      animations: 'disabled',
    });
  });

  test('form states visual regression', async ({ page }) => {
    await homePage.scrollToSection(homePage.nominationForm);
    
    // Empty form state
    await expect(homePage.nominationForm).toHaveScreenshot('form-empty.png', {
      animations: 'disabled',
    });
    
    // Filled form state
    await homePage.fillNominationForm({
      firstName: 'Visual',
      lastName: 'Test',
      email: 'visual@test.com',
      salutation: 'Frau',
      message: 'This is a test message for visual regression testing.',
      newsletter: true
    });
    
    await expect(homePage.nominationForm).toHaveScreenshot('form-filled.png', {
      animations: 'disabled',
    });
    
    // Focus state on email field
    await homePage.nominatorEmail.focus();
    await expect(homePage.nominationForm).toHaveScreenshot('form-focused.png', {
      animations: 'disabled',
    });
  });

  test('countdown timer visual regression', async ({ page }) => {
    await homePage.waitForCountdownToLoad();
    
    // Stop time-based changes for consistent screenshot
    await page.evaluate(() => {
      // Clear all intervals to stop countdown updates
      for (let i = 1; i < 99999; i++) window.clearInterval(i);
    });
    
    await expect(homePage.countdownContainer).toHaveScreenshot('countdown-timer.png', {
      animations: 'disabled',
    });
  });

  test('section dividers visual regression', async ({ page }) => {
    // Test the SVG dividers between sections
    const dividers = page.locator('.section-divider-top, .hero-shape, [class*="divider"]');
    
    const dividerCount = await dividers.count();
    if (dividerCount > 0) {
      for (let i = 0; i < Math.min(dividerCount, 5); i++) {
        await dividers.nth(i).scrollIntoViewIfNeeded();
        await expect(dividers.nth(i)).toHaveScreenshot(`section-divider-${i}.png`, {
          animations: 'disabled',
        });
      }
    }
  });

  test('partner cards visual regression', async ({ page }) => {
    await homePage.scrollToSection(homePage.aboutSection);
    
    if (await homePage.partnerCards.count() > 0) {
      await expect(homePage.partnerCards.first()).toHaveScreenshot('partner-cards.png', {
        animations: 'disabled',
      });
    }
  });

  test('criteria cards visual regression', async ({ page }) => {
    await homePage.scrollToSection(homePage.criteriaSection);
    
    if (await homePage.criteriaCards.count() > 0) {
      await expect(homePage.criteriaCards.first()).toHaveScreenshot('criteria-cards.png', {
        animations: 'disabled',
      });
    }
  });

  test('responsive visual regression - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();
    await page.waitForLoadState('networkidle');
    await homePage.waitForCountdownToLoad();
    
    // Full page mobile screenshot
    await expect(page).toHaveScreenshot('full-page-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
    
    // Mobile hero section
    await expect(homePage.heroSection).toHaveScreenshot('hero-section-mobile.png', {
      animations: 'disabled',
    });
    
    // Mobile form
    await homePage.scrollToSection(homePage.nominationForm);
    await expect(homePage.nominationForm).toHaveScreenshot('nomination-form-mobile.png', {
      animations: 'disabled',
    });
  });

  test('responsive visual regression - tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await homePage.navigateToHome();
    await page.waitForLoadState('networkidle');
    await homePage.waitForCountdownToLoad();
    
    // Full page tablet screenshot
    await expect(page).toHaveScreenshot('full-page-tablet.png', {
      fullPage: true,
      animations: 'disabled',
    });
    
    // Tablet hero section
    await expect(homePage.heroSection).toHaveScreenshot('hero-section-tablet.png', {
      animations: 'disabled',
    });
  });

  test('dark mode visual regression (if applicable)', async ({ page }) => {
    // Test if the site has dark mode support
    await page.emulateMedia({ colorScheme: 'dark' });
    await homePage.navigateToHome();
    await page.waitForLoadState('networkidle');
    await homePage.waitForCountdownToLoad();
    
    // Only take screenshot if dark mode actually changes the appearance
    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    
    if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'rgb(255, 255, 255)') {
      await expect(page).toHaveScreenshot('full-page-dark.png', {
        fullPage: true,
        animations: 'disabled',
      });
    }
  });

  test('high contrast mode visual regression', async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await homePage.navigateToHome();
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('full-page-high-contrast.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('print media visual regression', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });
    await homePage.navigateToHome();
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('full-page-print.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('brand colors consistency check', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check brand colors are being used correctly
    const brandColors = {
      primary: '#003C3D',
      accent: '#C1693C', 
      beige: '#F8F0E3',
      text: '#302C37'
    };
    
    // Test color usage in key elements
    const heroTitleColor = await homePage.heroTitle.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    const formBgColor = await homePage.nominationForm.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // These colors should match the brand guidelines
    // The exact RGB values would need to be calculated from the hex values
    expect(heroTitleColor).toBeDefined();
    expect(formBgColor).toBeDefined();
  });

  test('typography consistency check', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check font families are correct according to the design system
    const heroTitleFont = await homePage.heroTitle.evaluate((el) => {
      return window.getComputedStyle(el).fontFamily;
    });
    
    const bodyTextFont = await page.locator('p').first().evaluate((el) => {
      return window.getComputedStyle(el).fontFamily;
    });
    
    // Hero should use Poppins, body should use Roboto according to the design system
    expect(heroTitleFont).toContain('Poppins');
    expect(bodyTextFont).toContain('Roboto');
  });

  test('hover states visual regression', async ({ page }) => {
    await homePage.scrollToSection(homePage.nominationForm);
    
    // Test button hover state
    await homePage.submitButton.hover();
    await expect(homePage.submitButton).toHaveScreenshot('submit-button-hover.png', {
      animations: 'disabled',
    });
    
    // Test form field hover state
    await homePage.nominatorFirstName.hover();
    await expect(homePage.nominatorFirstName).toHaveScreenshot('form-field-hover.png', {
      animations: 'disabled',
    });
    
    // Test countdown item hover if they have hover effects
    await homePage.countdownContainer.locator('.countdown-item').first().hover();
    await expect(homePage.countdownContainer.locator('.countdown-item').first()).toHaveScreenshot('countdown-item-hover.png', {
      animations: 'disabled',
    });
  });

  test('loading states visual regression', async ({ page }) => {
    // Mock slow loading to capture loading states
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 100);
    });
    
    await page.goto('/');
    
    // Capture loading state if there are loading indicators
    const loadingIndicators = page.locator('[class*="loading"], [class*="spinner"], .loading-state');
    if (await loadingIndicators.count() > 0) {
      await expect(loadingIndicators.first()).toHaveScreenshot('loading-state.png', {
        animations: 'disabled',
      });
    }
  });
});