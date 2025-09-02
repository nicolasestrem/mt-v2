# Spreadshirt Shop Integration Documentation

## Overview
This document explains the custom integration between mobilitytrailblazers.de and the Spreadshirt shop (award-mobility-trailblazers.myspreadshop.de).

## The Integration "Trick"

Spreadshirt typically doesn't allow direct embedding of their shop on external domains. However, we've implemented a workaround that provides a seamless shopping experience:

1. **Product Data Extraction**: Product information (names, descriptions, prices, images, URLs) is stored locally in `src/data/shop-products.json`
2. **Local Display**: Products are displayed on our domain using this cached data
3. **Direct Linking**: When users click products, they're redirected to the actual Spreadshirt shop for purchase

This approach allows us to:
- Display products with our own branding and design
- Track user engagement with custom analytics
- Provide a seamless user experience
- Avoid CORS and embedding restrictions

## Technical Implementation

### File Structure
- `src/pages/shop.astro` - Shop page component
- `src/data/shop-products.json` - Cached product data
- Product images are hotlinked from Spreadshirt's CDN

### URL Structure
Product URLs in the JSON file follow this pattern:
```
https://award-mobility-trailblazers.myspreadshop.de/[product-name]-[product-id]?productType=[type]&sellable=[id]&appearance=[appearance-id]
```

### UTM Parameter Handling
UTM parameters are appended for tracking:
- `utm_source=mobilitytrailblazers`
- `utm_medium=website`
- `utm_campaign=shop-products` (for individual products)
- `utm_campaign=shop-main` (for main shop button)

**Important**: Since product URLs already contain query parameters, UTM parameters must be appended with `&` not `?`.

## Known Issues & Solutions

### Issue: 404 Errors on Product Links (Fixed January 2025)
**Problem**: Double question marks in URLs caused malformed links
**Solution**: Modified line 28 in `shop.astro` to check for existing query parameters:
```javascript
// Before (broken):
href={`${product.url}?utm_source=...`}

// After (fixed):
href={`${product.url}${product.url.includes('?') ? '&' : '?'}utm_source=...`}
```

## Updating Product Data

To update the product catalog:

1. **Manual Update** (Current Method):
   - Visit the Spreadshirt shop
   - Copy product information manually
   - Update `src/data/shop-products.json`

2. **Semi-Automated** (Future Enhancement):
   - Could create a browser extension or scraping script
   - Must respect Spreadshirt's terms of service
   - CORS restrictions prevent direct client-side fetching

## Product Data Schema

Each product in `shop-products.json` contains:
```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": "ab XX,XX €",
  "image": "https://image.spreadshirtmedia.net/...",
  "url": "https://award-mobility-trailblazers.myspreadshop.de/..."
}
```

## Analytics Integration

The shop includes tracking for:
- Individual product clicks (`data-track="spreadshop-product"`)
- Main shop button clicks (`data-track="spreadshop-main"`)
- Google Analytics events for outbound clicks

## Fallback Display

When products can't be loaded, the shop displays:
- Generic category icons (Clothing, Accessories, Bags, Gifts)
- Call-to-action to visit the main shop
- This ensures the shop page is never empty

## Maintenance Notes

1. **Product Updates**: Check quarterly for new products or price changes
2. **URL Changes**: If Spreadshirt changes their URL structure, update the JSON file
3. **Image CDN**: Monitor that hotlinked images still load properly
4. **Analytics**: Review UTM parameter effectiveness monthly

## Legal Considerations

- This integration respects Spreadshirt's terms by not embedding their shop directly
- All purchases occur on Spreadshirt's platform
- Product images are served from Spreadshirt's CDN
- No customer data is collected on our domain

## Future Improvements

1. Implement automated product sync (with API if available)
2. Add product availability checking
3. Implement price update notifications
4. Add product variant selection on our site (then redirect with selections)
5. Create admin interface for updating products

## Troubleshooting

### Products Not Displaying
1. Check browser console for errors
2. Verify `shop-products.json` is valid JSON
3. Check if product images are still accessible

### Links Not Working
1. Verify URL structure hasn't changed on Spreadshirt
2. Check for proper query parameter concatenation
3. Test with and without UTM parameters

### Images Not Loading
1. Check if Spreadshirt CDN URLs have changed
2. Verify no CORS or hotlinking protection added
3. Consider hosting images locally as backup

## Contact

For issues with the shop integration, check:
1. Spreadshirt shop directly: https://award-mobility-trailblazers.myspreadshop.de/
2. Browser developer console for errors
3. Network tab for failed requests

---

*Last Updated: January 2025*
*Document Created: After fixing 404 link issues*