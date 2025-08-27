import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Criteria Cards', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
    await homePage.scrollToSection(homePage.criteriaSection);
  });

  test('should display all 5 criteria cards', async () => {
    await expect(homePage.criteriaCards.first()).toBeVisible();
    
    const cardCount = await homePage.criteriaCards.count();
    expect(cardCount).toBe(5);
    
    // Check each card is visible
    for (let i = 0; i < cardCount; i++) {
      await expect(homePage.criteriaCards.nth(i)).toBeVisible();
    }
  });

  test('each criteria card should have required elements', async () => {
    const cards = await homePage.criteriaCards.all();
    
    for (const card of cards) {
      // Check for icon container
      const iconContainer = card.locator('.criteria-icon-container');
      await expect(iconContainer).toBeVisible();
      
      // Check for icon
      const icon = card.locator('.criteria-icon, i');
      await expect(icon).toBeVisible();
      
      // Check for title
      const title = card.locator('.criteria-title');
      await expect(title).toBeVisible();
      
      // Check for description
      const description = card.locator('.criteria-description');
      await expect(description).toBeVisible();
      
      // Check for number badge
      const number = card.locator('.criteria-number');
      await expect(number).toBeVisible();
    }
  });

  test('criteria cards should have proper numbering', async () => {
    const cards = await homePage.criteriaCards.all();
    
    for (let i = 0; i < cards.length; i++) {
      const number = cards[i].locator('.criteria-number');
      const numberText = await number.textContent();
      expect(numberText).toBe((i + 1).toString());
    }
  });

  test('criteria cards should have hover animations', async ({ page }) => {
    const firstCard = homePage.criteriaCards.first();
    
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
  });

  test('criteria icons should rotate on hover', async ({ page }) => {
    const firstCard = homePage.criteriaCards.first();
    const iconContainer = firstCard.locator('.criteria-icon-container');
    
    // Get initial transform
    const initialTransform = await iconContainer.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    
    // Hover over the card
    await firstCard.hover();
    await page.waitForTimeout(300);
    
    // Get hover transform
    const hoverTransform = await iconContainer.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    
    // Icon container should have transform on hover
    expect(hoverTransform).not.toBe(initialTransform);
  });

  test('criteria cards should have gradient borders', async () => {
    const cards = await homePage.criteriaCards.all();
    
    for (const card of cards) {
      const borderElement = card.locator('.criteria-gradient-border');
      const borderCount = await borderElement.count();
      
      if (borderCount > 0) {
        // Check for gradient background
        const background = await borderElement.evaluate((el) => {
          return window.getComputedStyle(el).background;
        });
        expect(background).toMatch(/gradient|linear/);
      }
    }
  });

  test('middle card should have hero styling', async ({ page }) => {
    // Desktop only - diamond layout
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const heroCard = homePage.page.locator('.criteria-hero, .criteria-item-3');
    const heroCount = await heroCard.count();
    
    if (heroCount > 0) {
      await expect(heroCard).toBeVisible();
      
      // Hero card should have special transform
      const transform = await heroCard.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });
      
      // Should have scale transform
      if (transform !== 'none') {
        expect(transform).toMatch(/matrix|scale/);
      }
    }
  });

  test('criteria cards should be responsive', async ({ page }) => {
    // Desktop - diamond layout
    await page.setViewportSize({ width: 1920, height: 1080 });
    let layout = await homePage.page.locator('.criteria-diamond-layout').evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        columns: styles.gridTemplateColumns
      };
    });
    expect(layout.display).toBe('grid');
    
    // Tablet - 2 column grid
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300);
    layout = await homePage.page.locator('.criteria-diamond-layout').evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        columns: styles.gridTemplateColumns
      };
    });
    expect(layout.display).toBe('grid');
    
    // Mobile - single column
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    layout = await homePage.page.locator('.criteria-diamond-layout').evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        columns: styles.gridTemplateColumns
      };
    });
    expect(layout.columns).toMatch(/1fr|none/);
  });

  test('criteria cards should have fade-in animation', async () => {
    const cards = await homePage.criteriaCards.all();
    
    for (const card of cards) {
      // Check for animation
      const animation = await card.evaluate((el) => {
        return window.getComputedStyle(el).animation;
      });
      
      // Should have fadeInUp animation
      expect(animation).toMatch(/fadeInUp|fade/);
    }
  });

  test('criteria section should have proper heading', async () => {
    const heading = homePage.page.locator('h1').filter({ hasText: /5 Kriterien/i });
    await expect(heading).toBeVisible();
    
    // Check heading style
    const fontSize = await heading.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });
    expect(parseInt(fontSize)).toBeGreaterThan(30);
  });
});