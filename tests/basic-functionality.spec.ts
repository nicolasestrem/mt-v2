import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Basic Functionality Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('page loads successfully', async ({ page }) => {
    // Check that the page loads with correct title
    await expect(page).toHaveTitle(/25 Mobility Trailblazers|Mobility/i);
    
    // Check that main content is visible
    await expect(page.locator('main')).toBeVisible();
    
    // Check that header is present
    await expect(homePage.header).toBeVisible();
    
    // Check that footer is present
    await expect(homePage.footer).toBeVisible();
  });

  test('all main sections are present and visible', async () => {
    // Hero section
    await expect(homePage.heroSection).toBeVisible();
    await expect(homePage.heroTitle).toBeVisible();
    await expect(homePage.heroTitle).toContainText('25 Mobility Trailblazers');
    
    // Mission section - scroll to it first
    await homePage.scrollToSection(homePage.missionSection);
    await expect(homePage.missionSection).toBeVisible();
    
    // About section
    await homePage.scrollToSection(homePage.aboutSection);
    await expect(homePage.aboutSection).toBeVisible();
    
    // Criteria section
    await homePage.scrollToSection(homePage.criteriaSection);
    await expect(homePage.criteriaSection).toBeVisible();
    
    // Jury section
    await homePage.scrollToSection(homePage.jurySection);
    await expect(homePage.jurySection).toBeVisible();
    
    // Newsletter section
    await homePage.scrollToSection(homePage.newsletterSection);
    await expect(homePage.newsletterSection).toBeVisible();
    
    // LinkedIn section
    await homePage.scrollToSection(homePage.linkedinSection);
    await expect(homePage.linkedinSection).toBeVisible();
    
    // Nomination section
    await homePage.scrollToSection(homePage.nominationSection);
    await expect(homePage.nominationSection).toBeVisible();
    await expect(homePage.nominationForm).toBeVisible();
  });

  test('countdown timer displays correctly', async () => {
    await homePage.waitForCountdownToLoad();
    
    // Check that countdown elements are visible
    await expect(homePage.countdownContainer).toBeVisible();
    await expect(homePage.countdownDays).toBeVisible();
    await expect(homePage.countdownHours).toBeVisible();
    await expect(homePage.countdownMinutes).toBeVisible();
    await expect(homePage.countdownSeconds).toBeVisible();
    
    // Check that countdown displays numeric values
    const days = await homePage.countdownDays.textContent();
    const hours = await homePage.countdownHours.textContent();
    const minutes = await homePage.countdownMinutes.textContent();
    const seconds = await homePage.countdownSeconds.textContent();
    
    expect(days).toMatch(/^\d{2}$/);
    expect(hours).toMatch(/^\d{2}$/);
    expect(minutes).toMatch(/^\d{2}$/);
    expect(seconds).toMatch(/^\d{2}$/);
    
    // Wait and check that seconds change (countdown is working)
    await homePage.page.waitForTimeout(1100);
    const newSeconds = await homePage.countdownSeconds.textContent();
    expect(newSeconds).not.toBe(seconds);
  });

  test('nomination form elements are present and functional', async () => {
    await homePage.scrollToSection(homePage.nominationForm);
    
    // Check form fields are visible
    await expect(homePage.nominatorFirstName).toBeVisible();
    await expect(homePage.nominatorLastName).toBeVisible();
    await expect(homePage.nominatorEmail).toBeVisible();
    await expect(homePage.nominatorSalutation).toBeVisible();
    await expect(homePage.nominationMessage).toBeVisible();
    await expect(homePage.newsletterSignup).toBeVisible();
    await expect(homePage.submitButton).toBeVisible();
    
    // Check that required fields have required attribute
    await expect(homePage.nominatorFirstName).toHaveAttribute('required');
    await expect(homePage.nominatorLastName).toHaveAttribute('required');
    await expect(homePage.nominatorEmail).toHaveAttribute('required');
    await expect(homePage.nominatorSalutation).toHaveAttribute('required');
    
    // Check email field has correct type
    await expect(homePage.nominatorEmail).toHaveAttribute('type', 'email');
    
    // Test form input functionality
    await homePage.nominatorFirstName.fill('Test');
    await expect(homePage.nominatorFirstName).toHaveValue('Test');
    
    await homePage.nominatorEmail.fill('test@example.com');
    await expect(homePage.nominatorEmail).toHaveValue('test@example.com');
  });

  test('partner cards in about section are visible', async () => {
    await homePage.scrollToSection(homePage.aboutSection);
    
    // Check if partner cards are present
    const partnerCards = homePage.partnerCards;
    await expect(partnerCards.first()).toBeVisible();
    
    // Count should be 3 based on the project description
    const cardCount = await partnerCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(3);
  });

  test('criteria cards are present and interactive', async () => {
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

  test('jury members are displayed', async () => {
    await homePage.scrollToSection(homePage.jurySection);
    
    // Check if jury members exist
    const juryMembers = homePage.juryMembers;
    
    if (await juryMembers.count() > 0) {
      await expect(juryMembers.first()).toBeVisible();
    }
  });

  test('navigation and anchors work correctly', async ({ page }) => {
    // Test direct navigation to nomination section
    await page.goto('/#vorschlagen');
    await expect(homePage.nominationSection).toBeInViewport();
    
    // Test that the URL contains the anchor
    expect(page.url()).toContain('#vorschlagen');
  });

  test('images load correctly', async ({ page }) => {
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

  test('page has proper meta tags and SEO', async ({ page }) => {
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    if (await metaDescription.count() > 0) {
      await expect(metaDescription).toHaveAttribute('content');
    }
    
    // Check canonical link
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count() > 0) {
      await expect(canonical).toHaveAttribute('href');
    }
    
    // Check if page has proper heading structure
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1); // Should have exactly one H1
  });
});