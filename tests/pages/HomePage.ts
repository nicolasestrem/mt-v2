import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  
  // Header elements
  readonly header: Locator;
  readonly navigation: Locator;
  readonly logo: Locator;
  
  // Hero section
  readonly heroSection: Locator;
  readonly heroTitle: Locator;
  readonly heroSubtitle: Locator;
  readonly heroTagline: Locator;
  readonly countdownContainer: Locator;
  readonly countdownDays: Locator;
  readonly countdownHours: Locator;
  readonly countdownMinutes: Locator;
  readonly countdownSeconds: Locator;
  
  // Mission section
  readonly missionSection: Locator;
  readonly missionTitle: Locator;
  readonly missionContent: Locator;
  
  // About section
  readonly aboutSection: Locator;
  readonly aboutTitle: Locator;
  readonly aboutContent: Locator;
  readonly partnerCards: Locator;
  readonly berlinImage: Locator;
  
  // Criteria section
  readonly criteriaSection: Locator;
  readonly criteriaTitle: Locator;
  readonly criteriaCards: Locator;
  
  // Jury section
  readonly jurySection: Locator;
  readonly juryTitle: Locator;
  readonly juryMembers: Locator;
  
  // Newsletter section
  readonly newsletterSection: Locator;
  readonly newsletterTitle: Locator;
  readonly newsletterForm: Locator;
  
  // LinkedIn section
  readonly linkedinSection: Locator;
  readonly linkedinTitle: Locator;
  readonly linkedinFeed: Locator;
  
  // Nomination form
  readonly nominationSection: Locator;
  readonly nominationTitle: Locator;
  readonly nominationForm: Locator;
  readonly nominatorFirstName: Locator;
  readonly nominatorLastName: Locator;
  readonly nominatorEmail: Locator;
  readonly nominatorSalutation: Locator;
  readonly nominationMessage: Locator;
  readonly newsletterSignup: Locator;
  readonly submitButton: Locator;
  
  // Footer
  readonly footer: Locator;
  readonly footerLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Header elements
    this.header = page.locator('header');
    this.navigation = page.locator('nav');
    this.logo = page.locator('header img, header .logo');
    
    // Hero section
    this.heroSection = page.locator('section.hero');
    this.heroTitle = page.locator('.hero-title');
    this.heroSubtitle = page.locator('.hero-subtitle');
    this.heroTagline = page.locator('.hero-tagline');
    this.countdownContainer = page.locator('.countdown-container');
    this.countdownDays = page.locator('#days');
    this.countdownHours = page.locator('#hours');
    this.countdownMinutes = page.locator('#minutes');
    this.countdownSeconds = page.locator('#seconds');
    
    // Mission section
    this.missionSection = page.locator('section').filter({ has: page.locator('h2').filter({ hasText: /Mission|Unsere Mission/i }) });
    this.missionTitle = page.locator('h2').filter({ hasText: /Mission|Unsere Mission/i });
    this.missionContent = this.missionSection.locator('p, div');
    
    // About section
    this.aboutSection = page.locator('section').filter({ has: page.locator('h2').filter({ hasText: /Über|About/i }) });
    this.aboutTitle = page.locator('h2').filter({ hasText: /Über|About/i });
    this.aboutContent = this.aboutSection.locator('p, div');
    this.partnerCards = page.locator('.partner-card, [class*="partner"]');
    this.berlinImage = page.locator('img[src*="berlin"], img[alt*="Berlin"], img[alt*="Fernsehturm"]');
    
    // Criteria section
    this.criteriaSection = page.locator('section').filter({ has: page.locator('h2').filter({ hasText: /Kriterien|Criteria/i }) });
    this.criteriaTitle = page.locator('h2').filter({ hasText: /Kriterien|Criteria/i });
    this.criteriaCards = page.locator('.criteria-card, [class*="criteria"]');
    
    // Jury section
    this.jurySection = page.locator('section').filter({ has: page.locator('h2').filter({ hasText: /Jury/i }) });
    this.juryTitle = page.locator('h2').filter({ hasText: /Jury/i });
    this.juryMembers = page.locator('.jury-member, [class*="jury"]');
    
    // Newsletter section
    this.newsletterSection = page.locator('section').filter({ has: page.locator('h2').filter({ hasText: /Newsletter/i }) });
    this.newsletterTitle = page.locator('h2').filter({ hasText: /Newsletter/i });
    this.newsletterForm = page.locator('form').filter({ has: page.locator('input[type="email"]') }).first();
    
    // LinkedIn section
    this.linkedinSection = page.locator('section').filter({ has: page.locator('h2').filter({ hasText: /LinkedIn/i }) });
    this.linkedinTitle = page.locator('h2').filter({ hasText: /LinkedIn/i });
    this.linkedinFeed = page.locator('.linkedin-feed, iframe, [class*="linkedin"]');
    
    // Nomination form
    this.nominationSection = page.locator('section.nomination, section#vorschlagen');
    this.nominationTitle = page.locator('.nomination-title');
    this.nominationForm = page.locator('#nominationForm');
    this.nominatorFirstName = page.locator('#nominatorFirstName');
    this.nominatorLastName = page.locator('#nominatorLastName');
    this.nominatorEmail = page.locator('#nominatorEmail');
    this.nominatorSalutation = page.locator('#nominatorSalutation');
    this.nominationMessage = page.locator('#nominationMessage');
    this.newsletterSignup = page.locator('input[name="newsletterSignup"]');
    this.submitButton = page.locator('button[type="submit"]').last();
    
    // Footer
    this.footer = page.locator('footer');
    this.footerLinks = page.locator('footer a');
  }

  async navigateToHome() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async waitForCountdownToLoad() {
    await expect(this.countdownDays).toBeVisible();
    await expect(this.countdownHours).toBeVisible();
    await expect(this.countdownMinutes).toBeVisible();
    await expect(this.countdownSeconds).toBeVisible();
  }

  async fillNominationForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    salutation: string;
    message?: string;
    newsletter?: boolean;
  }) {
    await this.nominatorFirstName.fill(data.firstName);
    await this.nominatorLastName.fill(data.lastName);
    await this.nominatorEmail.fill(data.email);
    await this.nominatorSalutation.selectOption(data.salutation);
    
    if (data.message) {
      await this.nominationMessage.fill(data.message);
    }
    
    if (data.newsletter) {
      await this.newsletterSignup.check();
    }
  }

  async submitNominationForm() {
    await this.submitButton.click();
  }

  async scrollToSection(sectionLocator: Locator) {
    await sectionLocator.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500); // Allow for scroll animations
  }

  async checkBrandColors() {
    // Check for brand colors in computed styles
    const heroSection = this.heroSection;
    await expect(heroSection).toBeVisible();
    
    // This would need to be expanded based on actual CSS color usage
    const bgColor = await heroSection.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Brand colors: #003C3D (teal), #C1693C (orange), #F8F0E3 (beige)
    return bgColor;
  }

  async getViewportSize() {
    return await this.page.viewportSize();
  }

  async takeScreenshot(name: string, options?: { fullPage?: boolean }) {
    return await this.page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage: options?.fullPage || false
    });
  }
}