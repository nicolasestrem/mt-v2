import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Partner Cards', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
    await homePage.scrollToSection(homePage.aboutSection);
  });

  test('should display all partner cards', async () => {
    await expect(homePage.partnerCards.first()).toBeVisible();
    
    const cardCount = await homePage.partnerCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(3); // At least 3 partners
    
    // Check each card is visible
    for (let i = 0; i < cardCount; i++) {
      await expect(homePage.partnerCards.nth(i)).toBeVisible();
    }
  });

  test('each partner card should have required elements', async () => {
    const cardCount = await homePage.partnerCards.count();
    
    for (let i = 0; i < cardCount; i++) {
      const card = homePage.partnerCards.nth(i);
      
      // Check for logo/image
      const logo = card.locator('.partner-logo, img');
      await expect(logo).toBeVisible();
      
      // Check for title
      const title = card.locator('.partner-title, h3, h4');
      await expect(title).toBeVisible();
      
      // Check for description
      const description = card.locator('.partner-description, p');
      await expect(description).toBeVisible();
      
      // Check for link
      const link = card.locator('a');
      const linkCount = await link.count();
      expect(linkCount).toBeGreaterThanOrEqual(1);
    }
  });

  test('partner links should have valid hrefs', async () => {
    const cards = await homePage.partnerCards.all();
    
    for (const card of cards) {
      const links = await card.locator('a').all();
      for (const link of links) {
        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toMatch(/^https?:\/\/|^#|^\//);
      }
    }
  });

  test('partner cards should have hover effects', async ({ page }) => {
    const firstCard = homePage.partnerCards.first();
    
    // Get initial transform
    const initialTransform = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    
    // Hover over the card
    await firstCard.hover();
    await page.waitForTimeout(300); // Wait for transition
    
    // Get hover transform
    const hoverTransform = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    
    // Transform should change on hover (elevation effect)
    expect(hoverTransform).not.toBe(initialTransform);
  });

  test('partner section should have Berlin image', async () => {
    await expect(homePage.berlinImage).toBeVisible();
    
    // Check image has proper alt text
    const altText = await homePage.berlinImage.getAttribute('alt');
    expect(altText).toBeTruthy();
    expect(altText).toMatch(/berlin|fernsehturm/i);
  });

  test('partner cards should be responsive', async ({ page }) => {
    // Desktop view - cards should be in a row
    await page.setViewportSize({ width: 1920, height: 1080 });
    const desktopGrid = await homePage.page.locator('.partners-section, .partner-cards').evaluate((el) => {
      return window.getComputedStyle(el).display;
    });
    expect(desktopGrid).toMatch(/grid|flex/);
    
    // Mobile view - cards should stack
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    
    const mobileGrid = await homePage.page.locator('.partners-section, .partner-cards').evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.gridTemplateColumns || styles.flexDirection;
    });
    expect(mobileGrid).toMatch(/1fr|column/);
  });

  test('partner logos should load properly', async () => {
    const cards = await homePage.partnerCards.all();
    
    for (const card of cards) {
      const logo = card.locator('.partner-logo img, img');
      const logoCount = await logo.count();
      
      if (logoCount > 0) {
        const img = logo.first();
        await expect(img).toBeVisible();
        
        // Check image loaded successfully
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }
  });
});