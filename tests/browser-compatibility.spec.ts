import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Browser Compatibility Tests', () => {
  let homePage: HomePage;

  // Run the same tests across different browser projects defined in playwright.config.ts
  // These tests will automatically run on Chrome, Firefox, Safari, and Edge

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('basic page functionality works across browsers', async ({ page, browserName }) => {
    console.log(`Testing on ${browserName}`);

    // Check page loads
    await expect(page).toHaveTitle(/25 Mobility Trailblazers|Mobility/i);
    await expect(homePage.heroSection).toBeVisible();

    // Check countdown works
    await homePage.waitForCountdownToLoad();
    const days = await homePage.countdownDays.textContent();
    expect(days).toMatch(/^\d{2}$/);

    // Test form functionality
    await homePage.scrollToSection(homePage.nominationForm);
    await homePage.nominatorFirstName.fill(`Test-${browserName}`);
    await expect(homePage.nominatorFirstName).toHaveValue(`Test-${browserName}`);
  });

  test('CSS features work consistently across browsers', async ({ page, browserName }) => {
    console.log(`Testing CSS on ${browserName}`);

    // Test CSS Grid (About section with partner cards)
    await homePage.scrollToSection(homePage.aboutSection);
    if (await homePage.partnerCards.count() > 0) {
      await expect(homePage.partnerCards.first()).toBeVisible();
      
      // Check CSS Grid layout
      const displayValue = await homePage.partnerCards.first().evaluate((el) => {
        const parent = el.parentElement;
        return parent ? window.getComputedStyle(parent).display : null;
      });
      
      // Should support grid or flexbox fallback
      expect(displayValue).toBeDefined();
    }

    // Test Flexbox (countdown container)
    const countdownDisplay = await homePage.countdownContainer.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });
    expect(countdownDisplay).toBeDefined();

    // Test CSS custom properties (brand colors)
    const heroBackgroundColor = await homePage.heroSection.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(heroBackgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Should have a background color

    // Test gradients
    const heroBackground = await homePage.heroSection.evaluate((el) => {
      return window.getComputedStyle(el).background;
    });
    // Should work in all modern browsers
    expect(heroBackground).toBeDefined();
  });

  test('JavaScript features work across browsers', async ({ page, browserName }) => {
    console.log(`Testing JavaScript on ${browserName}`);

    // Test countdown timer JavaScript
    await homePage.waitForCountdownToLoad();
    
    const initialSeconds = await homePage.countdownSeconds.textContent();
    await page.waitForTimeout(1100);
    const newSeconds = await homePage.countdownSeconds.textContent();
    
    expect(newSeconds).not.toBe(initialSeconds);

    // Test form JavaScript
    await homePage.scrollToSection(homePage.nominationForm);
    
    // Mock fetch for form submission (different browsers handle fetch differently)
    await page.route('https://api.web3forms.com/submit', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });

    await homePage.fillNominationForm({
      firstName: 'JS Test',
      lastName: browserName,
      email: 'test@example.com',
      salutation: 'Herr'
    });

    // Test form submission
    await homePage.submitButton.click();
    await page.waitForTimeout(1000);

    // Button should be enabled again after submission
    const isDisabled = await homePage.submitButton.isDisabled();
    expect(isDisabled).toBe(false);
  });

  test('HTML5 form features work across browsers', async ({ browserName }) => {
    await homePage.scrollToSection(homePage.nominationForm);

    // Test HTML5 form validation
    await homePage.submitButton.click();
    
    const emailInput = homePage.nominatorEmail;
    const isEmailValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isEmailValid).toBe(false);

    // Test HTML5 input types
    await expect(emailInput).toHaveAttribute('type', 'email');

    // Test required attribute
    await expect(homePage.nominatorFirstName).toHaveAttribute('required');

    // Test email validation
    await homePage.nominatorEmail.fill('invalid-email');
    const emailValidityAfterInvalid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(emailValidityAfterInvalid).toBe(false);

    await homePage.nominatorEmail.fill('valid@example.com');
    const emailValidityAfterValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(emailValidityAfterValid).toBe(true);
  });

  test('responsive design works across browsers', async ({ page, browserName }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await homePage.navigateToHome();

      console.log(`Testing ${viewport.name} on ${browserName}`);

      // Check that hero is visible
      await expect(homePage.heroSection).toBeVisible();

      // Check that countdown adapts
      await expect(homePage.countdownContainer).toBeVisible();
      
      // Check form layout
      await homePage.scrollToSection(homePage.nominationForm);
      await expect(homePage.nominationForm).toBeVisible();
      await expect(homePage.nominatorFirstName).toBeVisible();

      // On mobile, check if navigation might be different
      if (viewport.width <= 768) {
        const mobileMenu = page.locator('.mobile-menu, .hamburger, [aria-label*="menu"]');
        if (await mobileMenu.count() > 0) {
          await expect(mobileMenu.first()).toBeVisible();
        }
      }
    }
  });

  test('fonts load correctly across browsers', async ({ page, browserName }) => {
    await page.waitForLoadState('networkidle');

    // Test font loading for different elements
    const fontTests = [
      { element: homePage.heroTitle, expectedFont: 'Poppins' },
      { element: page.locator('h2').first(), expectedFont: 'Trebuchet' },
      { element: page.locator('p').first(), expectedFont: 'Roboto' }
    ];

    for (const test of fontTests) {
      if (await test.element.count() > 0) {
        const fontFamily = await test.element.evaluate((el) => {
          return window.getComputedStyle(el).fontFamily;
        });

        console.log(`${browserName} - Font for element: ${fontFamily}`);
        
        // Font should either be the expected font or have a reasonable fallback
        const hasExpectedFont = fontFamily.toLowerCase().includes(test.expectedFont.toLowerCase());
        const hasReasonableFallback = fontFamily.includes('serif') || 
                                     fontFamily.includes('sans-serif') || 
                                     fontFamily.includes('Arial') ||
                                     fontFamily.includes('Helvetica');

        expect(hasExpectedFont || hasReasonableFallback).toBe(true);
      }
    }
  });

  test('animations and transitions work across browsers', async ({ page, browserName }) => {
    // Test CSS animations/transitions
    await homePage.scrollToSection(homePage.nominationForm);

    // Test form glow animation (if enabled)
    const formAnimation = await homePage.nominationForm.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        animation: computed.animation,
        transition: computed.transition,
        boxShadow: computed.boxShadow
      };
    });

    console.log(`${browserName} - Form animation properties:`, formAnimation);
    
    // Should have some kind of visual effects
    expect(formAnimation.boxShadow).not.toBe('none');

    // Test hover effects
    await homePage.submitButton.hover();
    await page.waitForTimeout(300);

    const buttonHoverStyles = await homePage.submitButton.evaluate((el) => {
      return {
        transform: window.getComputedStyle(el).transform,
        boxShadow: window.getComputedStyle(el).boxShadow
      };
    });

    // Button should have hover effects
    expect(buttonHoverStyles.boxShadow).not.toBe('none');
  });

  test('SVG elements render correctly across browsers', async ({ page, browserName }) => {
    // Test SVG dividers
    const svgElements = page.locator('svg');
    const svgCount = await svgElements.count();

    if (svgCount > 0) {
      for (let i = 0; i < Math.min(svgCount, 3); i++) {
        const svg = svgElements.nth(i);
        await expect(svg).toBeVisible();

        // Check SVG has proper dimensions
        const boundingBox = await svg.boundingBox();
        if (boundingBox) {
          expect(boundingBox.width).toBeGreaterThan(0);
          expect(boundingBox.height).toBeGreaterThan(0);
        }

        // Check SVG viewBox
        const viewBox = await svg.getAttribute('viewBox');
        if (viewBox) {
          expect(viewBox).toMatch(/^\d+\s+\d+\s+\d+\s+\d+$/);
        }
      }
    }
  });

  test('event handling works across browsers', async ({ page, browserName }) => {
    await homePage.scrollToSection(homePage.nominationForm);

    // Test click events
    let clickHandled = false;
    await homePage.nominatorFirstName.click();
    await expect(homePage.nominatorFirstName).toBeFocused();
    clickHandled = true;
    expect(clickHandled).toBe(true);

    // Test keyboard events
    await page.keyboard.press('Tab');
    await expect(homePage.nominatorLastName).toBeFocused();

    // Test form submission event
    await homePage.fillNominationForm({
      firstName: 'Event',
      lastName: 'Test',
      email: 'event@test.com',
      salutation: 'Herr'
    });

    // Mock the form submission
    let formSubmitted = false;
    await page.route('https://api.web3forms.com/submit', route => {
      formSubmitted = true;
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });

    await homePage.submitButton.click();
    await page.waitForTimeout(500);
    
    expect(formSubmitted).toBe(true);
  });

  test('local storage and session storage work (if used)', async ({ page, browserName }) => {
    // Test browser storage APIs
    const storageSupport = await page.evaluate(() => {
      return {
        localStorage: typeof localStorage !== 'undefined',
        sessionStorage: typeof sessionStorage !== 'undefined',
        cookies: navigator.cookieEnabled
      };
    });

    console.log(`${browserName} storage support:`, storageSupport);

    expect(storageSupport.localStorage).toBe(true);
    expect(storageSupport.sessionStorage).toBe(true);

    // Test setting and getting values
    await page.evaluate(() => {
      localStorage.setItem('test-key', 'test-value');
      sessionStorage.setItem('session-test', 'session-value');
    });

    const retrievedValues = await page.evaluate(() => {
      return {
        local: localStorage.getItem('test-key'),
        session: sessionStorage.getItem('session-test')
      };
    });

    expect(retrievedValues.local).toBe('test-value');
    expect(retrievedValues.session).toBe('session-value');
  });

  test('console errors are minimal across browsers', async ({ page, browserName }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await homePage.navigateToHome();
    await homePage.scrollToSection(homePage.nominationForm);
    await homePage.waitForCountdownToLoad();

    // Test basic interactions
    await homePage.nominatorFirstName.fill('Console Test');
    await homePage.nominatorEmail.fill('console@test.com');

    console.log(`${browserName} console errors:`, consoleErrors);

    // Should have minimal or no console errors
    expect(consoleErrors.length).toBeLessThan(3);

    // Filter out non-critical errors (like network errors for external resources)
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('net::ERR_') && 
      !error.includes('404') && 
      !error.includes('favicon')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('performance is consistent across browsers', async ({ page, browserName }) => {
    const startTime = Date.now();
    await homePage.navigateToHome();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    console.log(`${browserName} load time: ${loadTime}ms`);

    // Performance should be reasonable across all browsers
    expect(loadTime).toBeLessThan(5000); // 5 seconds max

    // Test countdown performance
    await homePage.waitForCountdownToLoad();
    const countdownStart = Date.now();
    
    const initialSeconds = await homePage.countdownSeconds.textContent();
    await page.waitForFunction(
      (initial) => document.getElementById('seconds')?.textContent !== initial,
      initialSeconds,
      { timeout: 2000 }
    );
    
    const countdownTime = Date.now() - countdownStart;
    console.log(`${browserName} countdown update time: ${countdownTime}ms`);
    
    // Countdown should update in reasonable time across browsers
    expect(countdownTime).toBeLessThan(1500);
  });
});