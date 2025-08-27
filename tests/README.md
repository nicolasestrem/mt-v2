# Playwright Test Suite for MobilityTrailblazers.de

This comprehensive test suite ensures the reliability, performance, and accessibility of the MobilityTrailblazers.de website across various devices and browsers.

## Test Architecture

### Page Object Model
- **HomePage.ts**: Main page object containing all element locators and helper methods
- **test-helpers.ts**: Utility functions for common testing operations

### Test Categories

#### 1. Basic Functionality (`basic-functionality.spec.ts`)
- Page loading and core elements visibility
- Countdown timer functionality
- Form element validation
- Navigation and anchor links
- Image loading verification
- SEO meta tags validation

#### 2. Responsive Design (`responsive-design.spec.ts`)
- Layout testing across 7 different viewport sizes
- Mobile navigation functionality
- Form adaptation on different screen sizes
- Text readability verification
- Image scaling validation
- Touch interaction testing
- Content overflow prevention

#### 3. Form Functionality (`form-functionality.spec.ts`)
- HTML5 form validation
- Email format validation
- Form submission with valid/invalid data
- Network error handling
- Special character support
- Keyboard navigation
- Accessibility attributes
- Visual feedback testing

#### 4. Visual Regression (`visual-regression.spec.ts`)
- Full page screenshots across devices
- Component-level visual testing
- Form state variations
- Brand color consistency
- Typography verification
- Hover state testing
- Dark mode and high contrast support

#### 5. Performance (`performance.spec.ts`)
- Page load performance metrics
- Core Web Vitals measurement
- Resource loading efficiency
- JavaScript execution performance
- Memory usage monitoring
- Image loading optimization
- CSS and font performance

#### 6. Accessibility (`accessibility.spec.ts`)
- Heading hierarchy validation
- Form label associations
- Keyboard navigation testing
- Color contrast verification
- Focus indicator visibility
- Screen reader compatibility
- Text scaling support
- High contrast mode testing

#### 7. Browser Compatibility (`browser-compatibility.spec.ts`)
- Cross-browser functionality testing
- CSS feature support verification
- JavaScript compatibility
- HTML5 form features
- Font loading consistency
- Event handling validation
- Console error monitoring

#### 8. End-to-End Workflows (`e2e-workflow.spec.ts`)
- Complete user journey testing
- Error scenario handling
- Mobile user workflows
- Accessibility user paths
- Network condition variations
- Multi-attempt form submissions

## Device Coverage

### Desktop Browsers
- **Chrome**: 1920x1080
- **Firefox**: 1920x1080  
- **Safari**: 1920x1080
- **Edge**: 1920x1080

### Tablet Devices
- **iPad Pro**: 1366x1024
- **iPad**: 768x1024
- **Galaxy Tab S4**: 712x1138

### Mobile Devices
- **iPhone 14 Pro**: 393x852
- **iPhone 12**: 390x844
- **iPhone SE**: 375x667
- **Pixel 7**: 412x915
- **Galaxy S9+**: 320x658

### Additional Viewports
- **Small Desktop**: 1366x768
- **Large Desktop**: 2560x1440
- **Ultrawide**: 3440x1440

## Key Features Tested

### 1. Countdown Timer
- JavaScript functionality verification
- Visual display across devices
- Time update accuracy
- Browser compatibility

### 2. Nomination Form
- Web3Forms API integration
- Form validation (HTML5 + custom)
- Field input handling
- Error state management
- Success state verification
- Accessibility compliance

### 3. Brand Elements
- Color scheme consistency (#003C3D, #C1693C, #F8F0E3, #302C37)
- Typography hierarchy (Poppins, Trebuchet MS, Roboto)
- Gradient effects
- Visual feedback (glow effects)

### 4. Content Sections
- Hero section with countdown
- Mission statement
- About section with partner cards
- Criteria section with animated cards
- Jury member profiles
- LinkedIn feed integration
- Newsletter signup

## Configuration

### Playwright Config Features
- **Parallel Execution**: Tests run in parallel for faster completion
- **Multiple Reporters**: HTML, JSON, and JUnit reports
- **Screenshot/Video**: Captured on failures
- **Sharding**: Tests distributed across 4 shards for CI/CD
- **Retry Logic**: 2 retries on CI environment

### Environment Variables
- `PUBLIC_WEB3FORMS_KEY`: Required for form testing (mocked in tests)

## Running Tests

### Local Development
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npm test

# Run with UI mode
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Debug mode
npm run test:debug

# Run specific test file
npx playwright test tests/basic-functionality.spec.ts

# Run tests for specific browser
npx playwright test --project="Desktop Chrome"

# Run tests for mobile devices only
npx playwright test --project="iPhone*" --project="Pixel*"
```

### CI/CD Pipeline
The GitHub Actions workflow includes:
- **Parallel execution** across 4 shards
- **Cross-browser testing** on all major browsers
- **Mobile device testing** on iOS and Android simulators
- **Performance monitoring** with Core Web Vitals
- **Visual regression testing** with screenshot comparison
- **Accessibility auditing** with comprehensive checks
- **Lighthouse CI integration** for performance scoring

## Test Data Management

### Mock API Responses
- Web3Forms API mocked for consistent testing
- Success and error scenarios covered
- Network condition simulation

### Test Data Generation
- Dynamic test data creation with timestamps
- Special character and Unicode support
- Realistic German language content

## Performance Benchmarks

### Target Metrics
- **Page Load Time**: < 2 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **JavaScript Bundle**: < 100KB
- **CSS Bundle**: < 200KB

### Accessibility Standards
- **WCAG 2.1 Level AA** compliance
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Color contrast** ratios meeting standards
- **Focus indicators** visible and clear

## Troubleshooting

### Common Issues

#### Test Failures
1. **Network timeouts**: Check server startup in `webServer` config
2. **Element not found**: Verify selectors in HomePage.ts
3. **Visual regression**: Review screenshot differences in test results

#### Performance Issues
1. **Slow test execution**: Check parallel worker configuration
2. **Memory usage**: Monitor browser instances and cleanup
3. **CI timeouts**: Adjust timeout values in config

#### Browser Compatibility
1. **Safari issues**: Ensure WebKit browser is installed
2. **Edge problems**: Verify MSEdge channel configuration
3. **Mobile simulators**: Check device emulation settings

### Debug Tools
- **Playwright Inspector**: `npx playwright test --debug`
- **Trace Viewer**: Automatically captured on failures
- **Screenshots**: Available in test-results directory
- **Video Recording**: Enabled for failed tests

## Maintenance

### Regular Updates
- **Playwright version**: Keep updated for latest features
- **Browser versions**: Automatically updated with `npx playwright install`
- **Test data**: Review and update realistic test scenarios
- **Visual baselines**: Update when design changes are intentional

### Monitoring
- **Flaky test detection**: Monitor test stability over time
- **Performance regression**: Track metrics trends
- **Coverage gaps**: Identify untested functionality
- **Device updates**: Add new devices as they become popular

## Contributing

### Adding New Tests
1. Create test file in appropriate category
2. Use HomePage page object for element interactions
3. Follow existing naming conventions
4. Add comprehensive test descriptions
5. Include mobile and desktop variations

### Test Best Practices
- Use descriptive test names
- Keep tests independent and atomic
- Mock external dependencies
- Use appropriate wait strategies
- Clean up test data
- Add meaningful assertions

### Code Review Checklist
- [ ] Tests are independent
- [ ] Page objects are used consistently  
- [ ] Error scenarios are covered
- [ ] Mobile responsive testing included
- [ ] Accessibility considerations addressed
- [ ] Performance implications considered
- [ ] Documentation updated

---

For more detailed information about specific test implementations, refer to the individual test files and their inline documentation.