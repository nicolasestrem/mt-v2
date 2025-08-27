import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  
  // Header elements
  readonly header: Locator;
  readonly navigation: Locator;
  readonly logo: Locator;
  readonly mobileMenuButton: Locator;
  readonly navMenu: Locator;
  readonly navSocial: Locator;
  readonly navLinks: Locator;
  
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
    this.mobileMenuButton = page.locator('.nav-toggle');
    this.navMenu = page.locator('.nav-menu');
    this.navSocial = page.locator('.nav-social');
    this.navLinks = page.locator('.nav-list a');
    
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
    
    // Mission section - use class selector
    this.missionSection = page.locator('section.mission');
    this.missionTitle = page.locator('.mission-title');
    this.missionContent = this.missionSection.locator('.mission-description, .mission-box p');
    
    // About section - use class selector
    this.aboutSection = page.locator('section.about-section');
    this.aboutTitle = page.locator('.closing-title');
    this.aboutContent = this.aboutSection.locator('.about-text, .about-intro');
    this.partnerCards = page.locator('.partner-card');
    this.berlinImage = page.locator('.about-image img');
    
    // Criteria section - use ID selector
    this.criteriaSection = page.locator('section#kriterien');
    this.criteriaTitle = page.locator('h1').filter({ hasText: /5 Kriterien/i });
    this.criteriaCards = page.locator('.criteria-card');
    
    // Jury section - use class selector
    this.jurySection = page.locator('section.jury');
    this.juryTitle = page.locator('.jury-title');
    this.juryMembers = page.locator('.jury-member');
    
    // Newsletter section - use class selector
    this.newsletterSection = page.locator('section.newsletter');
    this.newsletterTitle = page.locator('.newsletter-title');
    this.newsletterForm = page.locator('.newsletter-form');
    
    // LinkedIn section - use class selector
    this.linkedinSection = page.locator('section.linkedin-feed');
    this.linkedinTitle = page.locator('.feed-title');
    this.linkedinFeed = page.locator('.linkedin-feed iframe, .embedsocial-widget');
    
    // Nomination form - use class and ID selectors
    this.nominationSection = page.locator('section.nomination');
    this.nominationTitle = page.locator('.nomination-title');
    this.nominationForm = page.locator('#nominationForm');
    this.nominatorFirstName = page.locator('#nominatorFirstName');
    this.nominatorLastName = page.locator('#nominatorLastName');
    this.nominatorEmail = page.locator('#nominatorEmail');
    this.nominatorSalutation = page.locator('#nominatorSalutation');
    this.nominationMessage = page.locator('#nominationMessage');
    this.newsletterSignup = page.locator('input[name="newsletterSignup"]');
    this.submitButton = page.locator('#nominationForm button[type="submit"]');
    
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
    // First check if the element exists
    const count = await sectionLocator.count();
    if (count === 0) {
      throw new Error(`Section not found: ${sectionLocator}`);
    }
    
    // Wait for the section to be visible with a timeout
    await sectionLocator.waitFor({ state: 'visible', timeout: 10000 });
    
    // Now scroll to it
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

  // Helper method to check if we're on mobile viewport
  async isMobileViewport() {
    const viewport = await this.getViewportSize();
    return viewport ? viewport.width < 768 : false;
  }

  // Helper method to open mobile menu
  async openMobileMenu() {
    if (await this.isMobileViewport()) {
      await this.mobileMenuButton.click();
      await this.navMenu.waitFor({ state: 'visible' });
    }
  }

  // Helper method to close mobile menu
  async closeMobileMenu() {
    if (await this.isMobileViewport() && await this.navMenu.isVisible()) {
      await this.mobileMenuButton.click();
      await this.navMenu.waitFor({ state: 'hidden' });
    }
  }
}