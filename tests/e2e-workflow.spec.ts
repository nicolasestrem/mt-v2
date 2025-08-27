import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { TestHelpers } from './utils/test-helpers';

test.describe('End-to-End User Workflow Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('complete user journey - first time visitor to successful nomination', async ({ page }) => {
    // Mock Web3Forms API for testing
    await TestHelpers.mockWeb3FormsAPI(page, true);
    
    // Step 1: User lands on the page
    await homePage.navigateToHome();
    await expect(page).toHaveTitle(/25 Mobility Trailblazers|Mobility/i);
    
    // Step 2: User reads hero section and sees countdown
    await expect(homePage.heroTitle).toBeVisible();
    await expect(homePage.heroTitle).toContainText('25 Mobility Trailblazers');
    await homePage.waitForCountdownToLoad();
    
    // Step 3: User scrolls through content sections
    await homePage.scrollToSection(homePage.missionSection);
    await expect(homePage.missionSection).toBeVisible();
    
    await homePage.scrollToSection(homePage.aboutSection);
    await expect(homePage.aboutSection).toBeVisible();
    
    // Check partner cards are visible
    if (await homePage.partnerCards.count() > 0) {
      await expect(homePage.partnerCards.first()).toBeVisible();
    }
    
    // Step 4: User reviews criteria section
    await homePage.scrollToSection(homePage.criteriaSection);
    await expect(homePage.criteriaSection).toBeVisible();
    
    // Step 5: User checks jury information
    await homePage.scrollToSection(homePage.jurySection);
    await expect(homePage.jurySection).toBeVisible();
    
    // Step 6: User decides to nominate someone and scrolls to form
    await homePage.scrollToSection(homePage.nominationSection);
    await expect(homePage.nominationForm).toBeVisible();
    await expect(homePage.nominationTitle).toContainText('Schlagen Sie');
    
    // Step 7: User fills out the nomination form
    const testData = TestHelpers.generateTestData();
    await homePage.fillNominationForm({
      firstName: testData.firstName,
      lastName: testData.lastName,
      email: testData.email,
      salutation: 'Herr',
      message: 'Ich möchte Dr. Maria Müller vorschlagen, die als Verkehrsplanerin innovative Mobilitätslösungen für nachhaltige Städte entwickelt hat.',
      newsletter: true
    });
    
    // Step 8: User submits the form
    await homePage.submitButton.click();
    
    // Step 9: Wait for form submission to complete
    await page.waitForTimeout(1500);
    
    // Step 10: Verify form submission was successful
    // (In a real scenario, this might show a success message or redirect)
    const buttonText = await homePage.submitButton.textContent();
    expect(buttonText).not.toContain('Wird gesendet'); // Should not be in loading state
  });

  test('user journey with form validation errors', async ({ page }) => {
    await homePage.navigateToHome();
    await homePage.scrollToSection(homePage.nominationForm);
    
    // Step 1: User tries to submit empty form
    await homePage.submitButton.click();
    
    // Step 2: Validation should prevent submission
    const firstNameValidity = await homePage.nominatorFirstName.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(firstNameValidity).toBe(false);
    
    // Step 3: User fills in name but uses invalid email
    await homePage.nominatorFirstName.fill('Invalid');
    await homePage.nominatorLastName.fill('Email');
    await homePage.nominatorEmail.fill('invalid-email-format');
    await homePage.nominatorSalutation.selectOption('Frau');
    
    await homePage.submitButton.click();
    
    // Step 4: Email validation should prevent submission
    const emailValidity = await homePage.nominatorEmail.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(emailValidity).toBe(false);
    
    // Step 5: User corrects email and successfully submits
    await TestHelpers.mockWeb3FormsAPI(page, true);
    await homePage.nominatorEmail.fill('valid@example.com');
    
    await homePage.submitButton.click();
    await page.waitForTimeout(1000);
    
    // Form should submit successfully now
    const buttonEnabled = await homePage.submitButton.isEnabled();
    expect(buttonEnabled).toBe(true);
  });

  test('user journey with network error during submission', async ({ page }) => {
    await homePage.navigateToHome();
    await homePage.scrollToSection(homePage.nominationForm);
    
    // Mock failed API response
    await TestHelpers.mockWeb3FormsAPI(page, false);
    
    // Fill form with valid data
    const testData = TestHelpers.generateTestData();
    await homePage.fillNominationForm({
      firstName: testData.firstName,
      lastName: testData.lastName,
      email: testData.email,
      salutation: 'Herr',
      message: 'Test nomination with network error'
    });
    
    // Submit form
    await homePage.submitButton.click();
    
    // Wait for error handling
    await page.waitForTimeout(1500);
    
    // Form should be usable again after error
    const buttonEnabled = await homePage.submitButton.isEnabled();
    expect(buttonEnabled).toBe(true);
    
    // User should be able to retry
    await TestHelpers.mockWeb3FormsAPI(page, true); // Mock success for retry
    await homePage.submitButton.click();
    await page.waitForTimeout(1000);
  });

  test('mobile user journey', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();
    
    // Mobile user sees hero section
    await expect(homePage.heroSection).toBeVisible();
    await expect(homePage.countdownContainer).toBeVisible();
    
    // Test mobile navigation (if exists)
    const mobileMenu = page.locator('.mobile-menu, .hamburger, [aria-label*="menu"]');
    if (await mobileMenu.count() > 0) {
      await mobileMenu.first().click();
      await page.waitForTimeout(300);
    }
    
    // Mobile user scrolls through sections
    await page.mouse.wheel(0, 500);
    await homePage.scrollToSection(homePage.nominationForm);
    
    // Form should be usable on mobile
    await expect(homePage.nominationForm).toBeVisible();
    
    // Test touch interactions
    await homePage.nominatorFirstName.tap();
    await homePage.nominatorFirstName.fill('Mobile User');
    
    await homePage.nominatorEmail.tap();
    await homePage.nominatorEmail.fill('mobile@example.com');
    
    // Test dropdown on mobile
    await homePage.nominatorSalutation.tap();
    await homePage.nominatorSalutation.selectOption('Frau');
    
    // Verify form works on mobile
    await expect(homePage.nominatorFirstName).toHaveValue('Mobile User');
    await expect(homePage.nominatorEmail).toHaveValue('mobile@example.com');
    await expect(homePage.nominatorSalutation).toHaveValue('Frau');
  });

  test('user journey with accessibility tools', async ({ page }) => {
    await homePage.navigateToHome();
    
    // Test keyboard-only navigation
    await page.keyboard.press('Tab');
    
    // Navigate through the page using only keyboard
    const tabStops = [];
    for (let i = 0; i < 15; i++) {
      const focused = await page.locator(':focus');
      if (await focused.count() > 0) {
        const tagName = await focused.evaluate(el => el.tagName.toLowerCase());
        const id = await focused.getAttribute('id');
        tabStops.push({ tagName, id, index: i });
      }
      
      await page.keyboard.press('Tab');
      
      // Break when we reach the first form field
      if (await homePage.nominatorFirstName.isFocused()) {
        break;
      }
    }
    
    console.log('Keyboard navigation path:', tabStops);
    
    // User should be able to reach and fill the form using only keyboard
    await expect(homePage.nominatorFirstName).toBeFocused();
    
    await page.keyboard.type('Accessible User');
    await page.keyboard.press('Tab');
    
    await expect(homePage.nominatorLastName).toBeFocused();
    await page.keyboard.type('Test');
    
    await page.keyboard.press('Tab');
    await expect(homePage.nominatorEmail).toBeFocused();
    await page.keyboard.type('accessible@test.com');
    
    // Test form submission with keyboard
    await page.keyboard.press('Tab'); // Move to dropdown
    await page.keyboard.press('Tab'); // Move to textarea
    await page.keyboard.press('Tab'); // Move to checkbox
    await page.keyboard.press('Tab'); // Move to submit button
    
    await expect(homePage.submitButton).toBeFocused();
    // Don't actually submit in this test
  });

  test('user journey with slow network conditions', async ({ page }) => {
    // Simulate slow network
    await TestHelpers.simulateSlowNetwork(page);
    
    const startTime = Date.now();
    await homePage.navigateToHome();
    const loadTime = Date.now() - startTime;
    
    console.log(`Page load time with slow network: ${loadTime}ms`);
    
    // Page should still load and be functional even on slow network
    await expect(homePage.heroSection).toBeVisible();
    await homePage.waitForCountdownToLoad();
    
    // User should still be able to use the form
    await homePage.scrollToSection(homePage.nominationForm);
    await expect(homePage.nominationForm).toBeVisible();
    
    // Form should be responsive even with slow network
    await homePage.nominatorFirstName.fill('Slow Network User');
    await expect(homePage.nominatorFirstName).toHaveValue('Slow Network User');
  });

  test('complete workflow with all optional features', async ({ page }) => {
    await TestHelpers.mockWeb3FormsAPI(page, true);
    await homePage.navigateToHome();
    
    // User explores all content
    await homePage.scrollToSection(homePage.missionSection);
    await homePage.scrollToSection(homePage.aboutSection);
    
    // User interacts with partner cards if they have hover effects
    if (await homePage.partnerCards.count() > 0) {
      await homePage.partnerCards.first().hover();
      await page.waitForTimeout(300);
    }
    
    // User checks criteria cards
    await homePage.scrollToSection(homePage.criteriaSection);
    if (await homePage.criteriaCards.count() > 0) {
      for (let i = 0; i < Math.min(3, await homePage.criteriaCards.count()); i++) {
        await homePage.criteriaCards.nth(i).hover();
        await page.waitForTimeout(200);
      }
    }
    
    // User reviews jury section
    await homePage.scrollToSection(homePage.jurySection);
    
    // User checks newsletter signup (if separate from nomination form)
    await homePage.scrollToSection(homePage.newsletterSection);
    if (await homePage.newsletterForm.count() > 0) {
      const newsletterEmail = homePage.newsletterForm.locator('input[type="email"]');
      if (await newsletterEmail.count() > 0) {
        await newsletterEmail.fill('newsletter@example.com');
      }
    }
    
    // User checks LinkedIn feed
    await homePage.scrollToSection(homePage.linkedinSection);
    
    // User fills comprehensive nomination form
    await homePage.scrollToSection(homePage.nominationForm);
    
    const testData = TestHelpers.generateTestData();
    await homePage.fillNominationForm({
      firstName: testData.firstName,
      lastName: testData.lastName,
      email: testData.email,
      salutation: 'Keine Angabe',
      message: `Sehr geehrte Damen und Herren,
      
ich möchte Ihnen Dr. Sarah Schmidt vorschlagen, die als Leiterin der Verkehrsplanung in München wegweisende Projekte zur nachhaltigen Mobilität entwickelt hat.

Ihre Innovationen:
- Entwicklung eines KI-gestützten Verkehrsmanagementsystems
- Einführung von 15 neuen Mobilitätshubs in der Stadt
- Reduzierung der CO2-Emissionen im Stadtverkehr um 25%

Dr. Schmidt zeigt genau den Mut und die Vision, die für die Mobilitätswende nötig sind.

Mit freundlichen Grüßen`,
      newsletter: true
    });
    
    // User submits nomination
    await homePage.submitButton.click();
    await page.waitForTimeout(1500);
    
    // Verify successful completion
    const isButtonEnabled = await homePage.submitButton.isEnabled();
    expect(isButtonEnabled).toBe(true);
  });

  test('user returns to site and navigates directly to nomination', async ({ page }) => {
    // Simulate returning user who bookmarked the nomination section
    await page.goto('/#vorschlagen');
    
    // Should land directly at nomination section
    await expect(homePage.nominationSection).toBeInViewport();
    await expect(homePage.nominationForm).toBeVisible();
    
    // Form should be immediately usable
    await homePage.nominatorFirstName.fill('Returning User');
    await expect(homePage.nominatorFirstName).toHaveValue('Returning User');
  });

  test('user journey with multiple form attempts', async ({ page }) => {
    await homePage.navigateToHome();
    await homePage.scrollToSection(homePage.nominationForm);
    
    // First attempt - user changes their mind
    await homePage.nominatorFirstName.fill('First Attempt');
    await homePage.nominatorLastName.fill('User');
    
    // User navigates away and comes back
    await homePage.scrollToSection(homePage.heroSection);
    await homePage.scrollToSection(homePage.nominationForm);
    
    // Form should still have the data (if not reset)
    const currentValue = await homePage.nominatorFirstName.inputValue();
    
    // User completes the form properly this time
    await TestHelpers.mockWeb3FormsAPI(page, true);
    
    await homePage.fillNominationForm({
      firstName: 'Final',
      lastName: 'Submission',
      email: 'final@example.com',
      salutation: 'Herr',
      message: 'This is my final nomination submission.'
    });
    
    await homePage.submitButton.click();
    await page.waitForTimeout(1000);
  });
});