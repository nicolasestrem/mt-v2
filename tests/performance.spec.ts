import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Performance Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('page load performance metrics', async ({ page }) => {
    // Start performance measurement
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    // Based on project description, load time should be around 0.5s (much better than previous 3.8s WordPress)
    expect(loadTime).toBeLessThan(2000); // Should load in under 2 seconds
    
    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
        domInteractive: perfData.domInteractive - perfData.navigationStart,
        totalSize: perfData.transferSize || 0
      };
    });
    
    console.log('Performance Metrics:', performanceMetrics);
    
    // First Contentful Paint should be fast for good user experience
    expect(performanceMetrics.firstContentfulPaint).toBeLessThan(1500);
    
    // DOM Interactive should be quick
    expect(performanceMetrics.domInteractive).toBeLessThan(1000);
  });

  test('core web vitals', async ({ page }) => {
    await page.goto('/');
    
    // Measure Core Web Vitals
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals: any = {};
        
        // Largest Contentful Paint (LCP)
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcpEntry = entries[entries.length - 1] as any;
          vitals.lcp = lcpEntry.startTime;
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay would require actual user interaction
        // Cumulative Layout Shift
        let cumulativeLayoutShift = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              cumulativeLayoutShift += entry.value;
            }
          }
          vitals.cls = cumulativeLayoutShift;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        
        // Wait a bit for measurements
        setTimeout(() => {
          observer.disconnect();
          clsObserver.disconnect();
          resolve(vitals);
        }, 3000);
      });
    });
    
    console.log('Core Web Vitals:', webVitals);
    
    // Google's thresholds for good Core Web Vitals:
    // LCP should be less than 2.5s
    if ((webVitals as any).lcp) {
      expect((webVitals as any).lcp).toBeLessThan(2500);
    }
    
    // CLS should be less than 0.1
    if ((webVitals as any).cls !== undefined) {
      expect((webVitals as any).cls).toBeLessThan(0.1);
    }
  });

  test('resource loading efficiency', async ({ page }) => {
    const resourceSizes: { [key: string]: number } = {};
    const resourceCount: { [key: string]: number } = {};
    
    // Monitor network requests
    page.on('response', async (response) => {
      const url = response.url();
      const resourceType = response.request().resourceType();
      
      if (!resourceCount[resourceType]) {
        resourceCount[resourceType] = 0;
        resourceSizes[resourceType] = 0;
      }
      
      resourceCount[resourceType]++;
      
      try {
        const body = await response.body();
        resourceSizes[resourceType] += body.length;
      } catch (error) {
        // Some responses might not have body
      }
    });
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    console.log('Resource Count:', resourceCount);
    console.log('Resource Sizes (bytes):', resourceSizes);
    
    // Ensure reasonable resource usage
    // As a static site, there shouldn't be too many requests
    const totalRequests = Object.values(resourceCount).reduce((sum, count) => sum + count, 0);
    expect(totalRequests).toBeLessThan(50); // Static sites should have fewer requests
    
    // Check JavaScript size is reasonable (minimal JS as per project description)
    if (resourceSizes.script) {
      expect(resourceSizes.script).toBeLessThan(100000); // Less than 100KB of JS
    }
    
    // Check CSS size is reasonable
    if (resourceSizes.stylesheet) {
      expect(resourceSizes.stylesheet).toBeLessThan(200000); // Less than 200KB of CSS
    }
    
    // Check image optimization
    if (resourceSizes.image) {
      console.log('Total image size:', resourceSizes.image);
      // Should be optimized but allow reasonable size for the Berlin image and other assets
    }
  });

  test('countdown timer performance', async ({ page }) => {
    await homePage.navigateToHome();
    await homePage.waitForCountdownToLoad();
    
    // Measure how long it takes for countdown to update
    const startTime = performance.now();
    
    // Wait for countdown to change
    const initialSeconds = await homePage.countdownSeconds.textContent();
    
    await page.waitForFunction(
      (initialSecs) => {
        const currentSecs = document.getElementById('seconds')?.textContent;
        return currentSecs !== initialSecs;
      },
      initialSeconds,
      { timeout: 2000 }
    );
    
    const endTime = performance.now();
    const updateTime = endTime - startTime;
    
    // Countdown should update within reasonable time (around 1 second)
    expect(updateTime).toBeLessThan(1500);
    expect(updateTime).toBeGreaterThan(900); // Should be close to 1 second
  });

  test('form interaction performance', async ({ page }) => {
    await homePage.navigateToHome();
    await homePage.scrollToSection(homePage.nominationForm);
    
    // Measure form field response time
    const startTime = performance.now();
    
    await homePage.nominatorFirstName.click();
    await homePage.nominatorFirstName.fill('Performance Test');
    
    const endTime = performance.now();
    const interactionTime = endTime - startTime;
    
    // Form interaction should be fast
    expect(interactionTime).toBeLessThan(100); // Should respond in under 100ms
    
    // Test form validation performance
    const validationStart = performance.now();
    
    await homePage.nominatorEmail.fill('invalid-email');
    await homePage.nominatorEmail.blur();
    
    const validationEnd = performance.now();
    const validationTime = validationEnd - validationStart;
    
    // Validation should be instant
    expect(validationTime).toBeLessThan(50);
  });

  test('scroll performance', async ({ page }) => {
    await homePage.navigateToHome();
    
    // Measure scroll performance
    const scrollStart = performance.now();
    
    // Scroll through all sections
    await homePage.scrollToSection(homePage.missionSection);
    await homePage.scrollToSection(homePage.aboutSection);
    await homePage.scrollToSection(homePage.criteriaSection);
    await homePage.scrollToSection(homePage.jurySection);
    await homePage.scrollToSection(homePage.nominationSection);
    
    const scrollEnd = performance.now();
    const scrollTime = scrollEnd - scrollStart;
    
    // Scrolling should be smooth and fast
    expect(scrollTime).toBeLessThan(2000);
    
    // Test smooth scrolling behavior
    const smoothScrollTest = await page.evaluate(() => {
      const testElement = document.querySelector('section.nomination') as HTMLElement;
      if (testElement) {
        const startTime = performance.now();
        testElement.scrollIntoView({ behavior: 'smooth' });
        const endTime = performance.now();
        return endTime - startTime;
      }
      return 0;
    });
    
    // Smooth scroll should initiate quickly
    expect(smoothScrollTest).toBeLessThan(50);
  });

  test('memory usage is reasonable', async ({ page }) => {
    await homePage.navigateToHome();
    
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory ? {
        used: (performance as any).memory.usedJSHeapSize,
        total: (performance as any).memory.totalJSHeapSize,
        limit: (performance as any).memory.jsHeapSizeLimit
      } : null;
    });
    
    if (initialMemory) {
      console.log('Memory usage:', initialMemory);
      
      // Memory usage should be reasonable for a static site
      expect(initialMemory.used).toBeLessThan(50 * 1024 * 1024); // Less than 50MB
      
      // Test for memory leaks by interacting with the page
      for (let i = 0; i < 10; i++) {
        await homePage.scrollToSection(homePage.heroSection);
        await homePage.scrollToSection(homePage.nominationSection);
        await page.waitForTimeout(100);
      }
      
      const finalMemory = await page.evaluate(() => {
        return (performance as any).memory ? {
          used: (performance as any).memory.usedJSHeapSize,
          total: (performance as any).memory.totalJSHeapSize,
          limit: (performance as any).memory.jsHeapSizeLimit
        } : null;
      });
      
      if (finalMemory) {
        // Memory shouldn't increase significantly after interactions
        const memoryIncrease = finalMemory.used - initialMemory.used;
        expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // Less than 10MB increase
      }
    }
  });

  test('image loading performance', async ({ page }) => {
    const imageLoadTimes: number[] = [];
    
    page.on('response', async (response) => {
      if (response.request().resourceType() === 'image') {
        const timing = response.timing();
        const loadTime = timing.responseEnd - timing.requestStart;
        imageLoadTimes.push(loadTime);
      }
    });
    
    await homePage.navigateToHome();
    await homePage.scrollToSection(homePage.aboutSection); // Berlin image
    
    // Wait for images to load
    await page.waitForLoadState('networkidle');
    
    if (imageLoadTimes.length > 0) {
      console.log('Image load times:', imageLoadTimes);
      
      // Each image should load reasonably fast
      const averageLoadTime = imageLoadTimes.reduce((sum, time) => sum + time, 0) / imageLoadTimes.length;
      expect(averageLoadTime).toBeLessThan(2000); // Average under 2 seconds
      
      // No single image should take too long
      const maxLoadTime = Math.max(...imageLoadTimes);
      expect(maxLoadTime).toBeLessThan(5000); // Max 5 seconds per image
    }
  });

  test('CSS and font loading performance', async ({ page }) => {
    const resourceLoadTimes: { [key: string]: number } = {};
    
    page.on('response', async (response) => {
      const resourceType = response.request().resourceType();
      if (resourceType === 'stylesheet' || resourceType === 'font') {
        const timing = response.timing();
        const loadTime = timing.responseEnd - timing.requestStart;
        resourceLoadTimes[response.url()] = loadTime;
      }
    });
    
    await homePage.navigateToHome();
    
    console.log('CSS and Font load times:', resourceLoadTimes);
    
    // CSS and fonts should load quickly
    Object.values(resourceLoadTimes).forEach(loadTime => {
      expect(loadTime).toBeLessThan(3000); // Under 3 seconds each
    });
  });

  test('lighthouse performance metrics', async ({ page }) => {
    // This would require additional setup for Lighthouse integration
    // For now, we'll do a basic performance audit
    
    await homePage.navigateToHome();
    
    const performanceScore = await page.evaluate(() => {
      // Basic performance indicators
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const metrics = {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        loadComplete: perfData.loadEventEnd - perfData.navigationStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
      };
      
      // Simple scoring based on timing
      let score = 100;
      if (metrics.domContentLoaded > 1000) score -= 20;
      if (metrics.loadComplete > 2000) score -= 30;
      if (metrics.firstPaint > 800) score -= 25;
      
      return { score, metrics };
    });
    
    console.log('Performance Score:', performanceScore);
    
    // Should achieve good performance score
    expect(performanceScore.score).toBeGreaterThan(70);
  });
});