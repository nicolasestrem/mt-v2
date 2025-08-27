import { Page, expect, Locator } from '@playwright/test';

/**
 * Test utility functions for Playwright tests
 */

export class TestHelpers {
  
  /**
   * Wait for an element to be stable (not moving/changing)
   */
  static async waitForElementStable(locator: Locator, timeout: number = 5000): Promise<void> {
    let lastPosition: { x: number; y: number } | null = null;
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const boundingBox = await locator.boundingBox();
      
      if (boundingBox) {
        const currentPosition = { x: boundingBox.x, y: boundingBox.y };
        
        if (lastPosition && 
            Math.abs(currentPosition.x - lastPosition.x) < 1 &&
            Math.abs(currentPosition.y - lastPosition.y) < 1) {
          return; // Element is stable
        }
        
        lastPosition = currentPosition;
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    throw new Error(`Element did not stabilize within ${timeout}ms`);
  }

  /**
   * Check if an element is in the viewport
   */
  static async isInViewport(locator: Locator): Promise<boolean> {
    return await locator.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      );
    });
  }

  /**
   * Get computed style property for an element
   */
  static async getComputedStyle(locator: Locator, property: string): Promise<string> {
    return await locator.evaluate((el, prop) => {
      return window.getComputedStyle(el).getPropertyValue(prop);
    }, property);
  }

  /**
   * Check if text is readable (has sufficient contrast)
   */
  static async checkTextContrast(textLocator: Locator): Promise<{
    textColor: string;
    backgroundColor: string;
    contrast: number;
  }> {
    return await textLocator.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      const textColor = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Simple contrast calculation (simplified version)
      const parseRGB = (color: string) => {
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [0, 0, 0];
      };
      
      const [tr, tg, tb] = parseRGB(textColor);
      const [br, bg, bb] = parseRGB(backgroundColor);
      
      const textLuminance = (0.299 * tr + 0.587 * tg + 0.114 * tb) / 255;
      const bgLuminance = (0.299 * br + 0.587 * bg + 0.114 * bb) / 255;
      
      const contrast = Math.abs(textLuminance - bgLuminance);
      
      return {
        textColor,
        backgroundColor,
        contrast
      };
    });
  }

  /**
   * Simulate slow network conditions
   */
  static async simulateSlowNetwork(page: Page): Promise<void> {
    await page.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
      return route.continue();
    });
  }

  /**
   * Take screenshot with timestamp
   */
  static async takeTimestampedScreenshot(page: Page, name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({
      path: `test-results/screenshots/${name}-${timestamp}.png`,
      fullPage: true
    });
  }

  /**
   * Check for console errors and warnings
   */
  static async monitorConsoleErrors(page: Page): Promise<{
    errors: string[];
    warnings: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      } else if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });
    
    return { errors, warnings };
  }

  /**
   * Wait for all images to load
   */
  static async waitForImagesLoaded(page: Page): Promise<void> {
    await page.evaluate(() => {
      const images = Array.from(document.images);
      return Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      );
    });
  }

  /**
   * Mock Web3Forms API for testing
   */
  static async mockWeb3FormsAPI(page: Page, success: boolean = true): Promise<void> {
    await page.route('https://api.web3forms.com/submit', route => {
      const response = success 
        ? { success: true, message: 'Form submitted successfully' }
        : { success: false, message: 'Form submission failed' };
      
      route.fulfill({
        status: success ? 200 : 400,
        contentType: 'application/json',
        body: JSON.stringify(response)
      });
    });
  }

  /**
   * Check if element has loading state
   */
  static async hasLoadingState(locator: Locator): Promise<boolean> {
    const element = await locator.elementHandle();
    if (!element) return false;
    
    return await element.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.cursor === 'wait' || 
             el.classList.contains('loading') ||
             el.classList.contains('disabled') ||
             (el as HTMLButtonElement).disabled ||
             el.getAttribute('aria-busy') === 'true';
    });
  }

  /**
   * Generate test data for forms
   */
  static generateTestData() {
    const timestamp = Date.now();
    return {
      firstName: `Test${timestamp}`,
      lastName: `User${timestamp}`,
      email: `test${timestamp}@example.com`,
      message: `This is a test message generated at ${new Date().toISOString()}`,
      salutations: ['Herr', 'Frau', 'Keine Angabe']
    };
  }

  /**
   * Check if page has performance issues
   */
  static async checkPerformanceMetrics(page: Page): Promise<{
    loadTime: number;
    domContentLoaded: number;
    firstContentfulPaint?: number;
    largestContentfulPaint?: number;
  }> {
    return await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');
      
      return {
        loadTime: perfData.loadEventEnd - perfData.navigationStart,
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime,
        largestContentfulPaint: paintEntries.find(entry => entry.name === 'largest-contentful-paint')?.startTime
      };
    });
  }

  /**
   * Test keyboard navigation flow
   */
  static async testKeyboardNavigation(page: Page, expectedOrder: string[]): Promise<boolean> {
    let currentIndex = 0;
    
    for (const expectedSelector of expectedOrder) {
      await page.keyboard.press('Tab');
      
      const focused = await page.locator(':focus');
      const matches = await focused.evaluate((el, selector) => {
        return el.matches(selector) || el.id === selector.replace('#', '');
      }, expectedSelector);
      
      if (!matches) {
        console.log(`Expected ${expectedSelector} but got different element at index ${currentIndex}`);
        return false;
      }
      
      currentIndex++;
    }
    
    return true;
  }

  /**
   * Check responsive breakpoints
   */
  static async testResponsiveBreakpoints(page: Page, breakpoints: { [key: string]: number }): Promise<{
    [key: string]: {
      width: number;
      hasHorizontalScroll: boolean;
      bodyWidth: number;
    }
  }> {
    const results: any = {};
    
    for (const [name, width] of Object.entries(breakpoints)) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(100); // Allow layout to settle
      
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const hasHorizontalScroll = bodyWidth > width;
      
      results[name] = {
        width,
        hasHorizontalScroll,
        bodyWidth
      };
    }
    
    return results;
  }

  /**
   * Validate form field attributes
   */
  static async validateFormField(locator: Locator, expectedAttributes: {
    required?: boolean;
    type?: string;
    maxLength?: number;
    pattern?: string;
  }): Promise<boolean> {
    const element = await locator.elementHandle();
    if (!element) return false;
    
    return await element.evaluate((el: HTMLInputElement, attrs) => {
      if (attrs.required !== undefined && el.required !== attrs.required) return false;
      if (attrs.type && el.type !== attrs.type) return false;
      if (attrs.maxLength && el.maxLength !== attrs.maxLength) return false;
      if (attrs.pattern && el.pattern !== attrs.pattern) return false;
      
      return true;
    }, expectedAttributes);
  }

  /**
   * Wait for countdown to update (for testing countdown functionality)
   */
  static async waitForCountdownUpdate(
    daysLocator: Locator, 
    hoursLocator: Locator, 
    minutesLocator: Locator, 
    secondsLocator: Locator,
    timeout: number = 2000
  ): Promise<boolean> {
    const initialValues = {
      days: await daysLocator.textContent(),
      hours: await hoursLocator.textContent(),
      minutes: await minutesLocator.textContent(),
      seconds: await secondsLocator.textContent()
    };
    
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const currentValues = {
        days: await daysLocator.textContent(),
        hours: await hoursLocator.textContent(),
        minutes: await minutesLocator.textContent(),
        seconds: await secondsLocator.textContent()
      };
      
      // Check if any value changed (most likely seconds)
      if (currentValues.seconds !== initialValues.seconds ||
          currentValues.minutes !== initialValues.minutes ||
          currentValues.hours !== initialValues.hours ||
          currentValues.days !== initialValues.days) {
        return true;
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return false; // No update detected
  }

  /**
   * Check brand color usage
   */
  static async validateBrandColors(page: Page): Promise<{
    primary: boolean;
    accent: boolean;
    beige: boolean;
    text: boolean;
  }> {
    return await page.evaluate(() => {
      const brandColors = {
        primary: '#003C3D',
        accent: '#C1693C', 
        beige: '#F8F0E3',
        text: '#302C37'
      };
      
      const results = {
        primary: false,
        accent: false,
        beige: false,
        text: false
      };
      
      // Check if brand colors are used in CSS custom properties
      const styles = getComputedStyle(document.documentElement);
      
      // This is a simplified check - in real implementation, you'd need more sophisticated color matching
      Object.keys(brandColors).forEach(key => {
        const cssVar = `--color-${key}`;
        const value = styles.getPropertyValue(cssVar);
        results[key as keyof typeof results] = value.includes(brandColors[key as keyof typeof brandColors].replace('#', ''));
      });
      
      return results;
    });
  }
}