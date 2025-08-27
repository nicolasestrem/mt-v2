import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Home Page - Quick Smoke Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should load the home page successfully', async ({ page }) => {
    // Check that the page loads successfully
    await expect(page).toHaveTitle(/25 Mobility Trailblazers|Mobility/i);
    
    // Check for main content
    await expect(page.locator('main')).toBeVisible();
    
    // Verify hero section is visible
    await expect(homePage.heroSection).toBeVisible();
    await expect(homePage.heroTitle).toContainText('25 Mobility Trailblazers');
  });

  test('should have functional countdown timer', async ({ page }) => {
    // Check countdown elements are present and functional
    await homePage.waitForCountdownToLoad();
    
    await expect(homePage.countdownContainer).toBeVisible();
    
    // Verify countdown displays valid numbers
    const days = await homePage.countdownDays.textContent();
    const hours = await homePage.countdownHours.textContent();
    const minutes = await homePage.countdownMinutes.textContent();
    const seconds = await homePage.countdownSeconds.textContent();
    
    expect(days).toMatch(/^\d{2}$/);
    expect(hours).toMatch(/^\d{2}$/);
    expect(minutes).toMatch(/^\d{2}$/);
    expect(seconds).toMatch(/^\d{2}$/);
  });

  test('should have accessible nomination form', async ({ page }) => {
    await homePage.scrollToSection(homePage.nominationForm);
    
    // Check form is visible and accessible
    await expect(homePage.nominationForm).toBeVisible();
    await expect(homePage.nominationTitle).toBeVisible();
    
    // Verify required form fields
    await expect(homePage.nominatorFirstName).toBeVisible();
    await expect(homePage.nominatorLastName).toBeVisible();
    await expect(homePage.nominatorEmail).toBeVisible();
    await expect(homePage.nominatorSalutation).toBeVisible();
    await expect(homePage.submitButton).toBeVisible();
    
    // Test basic form interaction
    await homePage.nominatorFirstName.fill('Test');
    await expect(homePage.nominatorFirstName).toHaveValue('Test');
  });

  test('should be responsive across devices', async ({ page }) => {
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

  test('should have all main sections visible', async ({ page }) => {
    // Quick check that all major sections load
    const sections = [
      { section: homePage.heroSection, name: 'Hero' },
      { section: homePage.missionSection, name: 'Mission' },
      { section: homePage.aboutSection, name: 'About' },
      { section: homePage.criteriaSection, name: 'Criteria' },
      { section: homePage.jurySection, name: 'Jury' },
      { section: homePage.nominationSection, name: 'Nomination' }
    ];

    for (const { section, name } of sections) {
      await homePage.scrollToSection(section);
      await expect(section).toBeVisible({ timeout: 5000 });
    }
  });
});
