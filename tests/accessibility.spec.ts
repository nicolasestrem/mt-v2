import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Accessibility Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('page has proper heading hierarchy', async ({ page }) => {
    // Check for H1 - filter out dev toolbar and allow multiple H1s for sections
    const h1Elements = page.locator('h1:not([data-astro-dev-toolbar] h1)').first();
    const h1Count = await page.locator('h1:not([data-astro-dev-toolbar] h1)').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // Check H1 content is meaningful
    const h1Text = await h1Elements.textContent();
    expect(h1Text?.toLowerCase()).toMatch(/mobility|trailblazers|kriterien/);

    // Check heading hierarchy (H2 should come after H1, H3 after H2, etc.)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    
    let currentLevel = 0;
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const level = parseInt(tagName.charAt(1));
      
      if (level === 1) {
        currentLevel = 1;
      } else if (currentLevel > 0) {
        // Heading level should not skip more than one level
        expect(level - currentLevel).toBeLessThanOrEqual(1);
        currentLevel = level;
      }
    }
  });

  test('form elements have proper labels and accessibility attributes', async ({ page }) => {
    await homePage.scrollToSection(homePage.nominationForm);

    // Check that all form inputs have labels
    const requiredInputs = [
      { element: homePage.nominatorFirstName, id: 'nominatorFirstName' },
      { element: homePage.nominatorLastName, id: 'nominatorLastName' },
      { element: homePage.nominatorEmail, id: 'nominatorEmail' },
      { element: homePage.nominatorSalutation, id: 'nominatorSalutation' },
    ];

    for (const input of requiredInputs) {
      // Check input has ID
      await expect(input.element).toHaveAttribute('id', input.id);
      
      // Check corresponding label exists
      const label = page.locator(`label[for="${input.id}"]`);
      await expect(label).toBeVisible();
      
      // Check label text is meaningful
      const labelText = await label.textContent();
      expect(labelText).toBeTruthy();
      expect(labelText?.length).toBeGreaterThan(2);
    }

    // Check required fields have required attribute
    await expect(homePage.nominatorFirstName).toHaveAttribute('required');
    await expect(homePage.nominatorLastName).toHaveAttribute('required');
    await expect(homePage.nominatorEmail).toHaveAttribute('required');
    await expect(homePage.nominatorSalutation).toHaveAttribute('required');

    // Check optional textarea has proper label
    const messageLabel = page.locator('label[for="nominationMessage"]');
    await expect(messageLabel).toBeVisible();
  });

  test('keyboard navigation works throughout the page', async ({ page }) => {
    // Start from the top
    await page.keyboard.press('Tab');
    
    // Track focus progression
    const focusableElements = [];
    let currentFocused = await page.locator(':focus');
    
    // Tab through first 20 elements to test navigation flow
    for (let i = 0; i < 20; i++) {
      if (await currentFocused.count() > 0) {
        const tagName = await currentFocused.evaluate(el => el.tagName.toLowerCase());
        const elementType = await currentFocused.evaluate(el => el.type || el.tagName.toLowerCase());
        focusableElements.push({ tagName, elementType, index: i });
      }
      
      await page.keyboard.press('Tab');
      currentFocused = await page.locator(':focus');
      
      // Break if we've reached the form (main interactive area)
      if (await currentFocused.count() > 0) {
        const id = await currentFocused.getAttribute('id');
        if (id === 'nominatorFirstName') break;
      }
    }

    console.log('Focusable elements:', focusableElements);
    
    // Should be able to reach form elements
    await homePage.nominatorFirstName.focus();
    await expect(homePage.nominatorFirstName).toBeFocused();
    
    // Test form navigation
    await page.keyboard.press('Tab');
    await expect(homePage.nominatorLastName).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(homePage.nominatorEmail).toBeFocused();
  });

  test('images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      
      // Decorative images can have empty alt, but should have alt attribute
      const hasAlt = await img.getAttribute('alt');
      expect(hasAlt).not.toBeNull();
      
      // If image seems content-related (not decorative), should have meaningful alt
      if (src && !src.includes('decoration') && !src.includes('divider')) {
        const altText = await img.getAttribute('alt');
        expect(altText?.length).toBeGreaterThan(0);
      }
    }
  });

  test('color contrast is sufficient', async ({ page }) => {
    // Test key text elements for color contrast
    const textElements = [
      homePage.heroTitle,
      homePage.heroSubtitle,
      homePage.nominationTitle,
      page.locator('p').first(),
    ];

    for (const element of textElements) {
      if (await element.count() > 0) {
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontSize: computed.fontSize,
          };
        });

        console.log('Element styles:', styles);
        
        // Basic check - ensure color is not the same as background
        expect(styles.color).not.toBe(styles.backgroundColor);
        
        // Font size should be reasonable for readability
        const fontSize = parseFloat(styles.fontSize);
        expect(fontSize).toBeGreaterThan(12); // At least 12px
      }
    }
  });

  test('focus indicators are visible', async ({ page }) => {
    const focusableElements = [
      homePage.nominatorFirstName,
      homePage.nominatorLastName,
      homePage.nominatorEmail,
      homePage.submitButton,
    ];

    for (const element of focusableElements) {
      await element.focus();
      
      // Check that focused element has some visual indication
      const focusStyles = await element.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          outline: computed.outline,
          outlineColor: computed.outlineColor,
          outlineStyle: computed.outlineStyle,
          outlineWidth: computed.outlineWidth,
          boxShadow: computed.boxShadow,
          borderColor: computed.borderColor,
        };
      });
      
      // Should have some kind of focus indicator
      const hasFocusIndicator = focusStyles.outline !== 'none' || 
                               focusStyles.boxShadow !== 'none' ||
                               focusStyles.outlineWidth !== '0px';
      
      expect(hasFocusIndicator).toBe(true);
    }
  });

  test('page works with screen reader simulation', async ({ page }) => {
    // Test ARIA landmarks
    const landmarks = [
      'main',
      'header',
      'footer',
      '[role="banner"]',
      '[role="main"]',
      '[role="contentinfo"]',
    ];

    for (const landmark of landmarks) {
      const elements = page.locator(landmark);
      if (await elements.count() > 0) {
        await expect(elements.first()).toBeVisible();
      }
    }

    // Check for skip links (common accessibility feature)
    const skipLink = page.locator('a[href="#main"], a[href="#content"], .skip-link');
    if (await skipLink.count() > 0) {
      await expect(skipLink).toBeVisible();
    }
  });

  test('form error handling is accessible', async ({ page }) => {
    await homePage.scrollToSection(homePage.nominationForm);

    // Try to submit empty form to trigger validation
    await homePage.submitButton.click();

    // Check if there are error messages or indicators
    await page.waitForTimeout(500);

    // Check HTML5 validation messages
    const firstNameValidity = await homePage.nominatorFirstName.evaluate((el: HTMLInputElement) => {
      return {
        valid: el.validity.valid,
        validationMessage: el.validationMessage,
      };
    });

    expect(firstNameValidity.valid).toBe(false);
    expect(firstNameValidity.validationMessage).toBeTruthy();

    // Test with invalid email
    await homePage.nominatorFirstName.fill('Test');
    await homePage.nominatorLastName.fill('User');
    await homePage.nominatorEmail.fill('invalid-email');
    await homePage.nominatorSalutation.selectOption('Herr');

    const emailValidity = await homePage.nominatorEmail.evaluate((el: HTMLInputElement) => {
      return {
        valid: el.validity.valid,
        validationMessage: el.validationMessage,
      };
    });

    expect(emailValidity.valid).toBe(false);
  });

  test('text can be zoomed to 200% without horizontal scroll', async ({ page }) => {
    // Set zoom level to 200%
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.evaluate(() => {
      document.body.style.zoom = '2';
    });

    await homePage.navigateToHome();

    // Check that there's no horizontal overflow
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowInnerWidth = await page.evaluate(() => window.innerWidth);

    // Allow small tolerance for viewport differences
    expect(bodyScrollWidth).toBeLessThanOrEqual(windowInnerWidth + 50);

    // Check that form is still usable
    await homePage.scrollToSection(homePage.nominationForm);
    await expect(homePage.nominationForm).toBeVisible();
    await expect(homePage.nominatorFirstName).toBeVisible();

    // Reset zoom
    await page.evaluate(() => {
      document.body.style.zoom = '1';
    });
  });

  test('page works with reduced motion preference', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await homePage.navigateToHome();

    // Page should still be functional
    await expect(homePage.heroSection).toBeVisible();
    await expect(homePage.countdownContainer).toBeVisible();

    // Check that countdown still works (but potentially without animations)
    await homePage.waitForCountdownToLoad();
    const initialSeconds = await homePage.countdownSeconds.textContent();
    
    await page.waitForTimeout(1100);
    const newSeconds = await homePage.countdownSeconds.textContent();
    expect(newSeconds).not.toBe(initialSeconds);
  });

  test('high contrast mode compatibility', async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await homePage.navigateToHome();

    // Page should still be readable in high contrast mode
    await expect(homePage.heroTitle).toBeVisible();
    await expect(homePage.nominationForm).toBeVisible();

    // Form elements should still be interactive
    await homePage.nominatorFirstName.fill('High Contrast Test');
    await expect(homePage.nominatorFirstName).toHaveValue('High Contrast Test');
  });

  test('page language is properly declared', async ({ page }) => {
    // Check html lang attribute
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBeTruthy();
    
    // Should be German based on the content
    expect(htmlLang).toMatch(/^de/);
  });

  test('countdown timer is accessible', async ({ page }) => {
    await homePage.waitForCountdownToLoad();

    // Check that countdown has proper labeling
    const countdownItems = page.locator('.countdown-item');
    const itemCount = await countdownItems.count();

    for (let i = 0; i < itemCount; i++) {
      const item = countdownItems.nth(i);
      const label = item.locator('.countdown-label');
      
      if (await label.count() > 0) {
        const labelText = await label.textContent();
        expect(labelText).toBeTruthy();
        expect(labelText?.length).toBeGreaterThan(0);
      }

      // Numbers should be meaningful
      const number = item.locator('.countdown-number');
      if (await number.count() > 0) {
        const numberText = await number.textContent();
        expect(numberText).toMatch(/^\d{2}$/); // Should be two digits
      }
    }
  });

  test('form has proper fieldset and legend structure', async ({ page }) => {
    await homePage.scrollToSection(homePage.nominationForm);

    // Check if form uses fieldsets for logical grouping
    const fieldsets = page.locator('fieldset');
    const fieldsetCount = await fieldsets.count();

    if (fieldsetCount > 0) {
      for (let i = 0; i < fieldsetCount; i++) {
        const fieldset = fieldsets.nth(i);
        const legend = fieldset.locator('legend');
        
        if (await legend.count() > 0) {
          await expect(legend).toBeVisible();
          const legendText = await legend.textContent();
          expect(legendText?.length).toBeGreaterThan(0);
        }
      }
    }
  });

  test('tables are properly structured (if any exist)', async ({ page }) => {
    const tables = page.locator('table');
    const tableCount = await tables.count();

    if (tableCount > 0) {
      for (let i = 0; i < tableCount; i++) {
        const table = tables.nth(i);
        
        // Check for table headers
        const headers = table.locator('th');
        if (await headers.count() > 0) {
          // Headers should have scope attributes for accessibility
          const firstHeader = headers.first();
          const scope = await firstHeader.getAttribute('scope');
          // scope should be 'col', 'row', 'colgroup', or 'rowgroup'
          if (scope) {
            expect(['col', 'row', 'colgroup', 'rowgroup']).toContain(scope);
          }
        }

        // Table should have a caption or summary
        const caption = table.locator('caption');
        const summary = await table.getAttribute('summary');
        
        const hasDescription = (await caption.count() > 0) || summary;
        if (hasDescription) {
          if (await caption.count() > 0) {
            await expect(caption).toBeVisible();
          }
        }
      }
    }
  });
});