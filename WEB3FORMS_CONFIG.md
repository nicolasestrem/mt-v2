# Web3Forms Configuration & Email Delivery Guide

## Current Form Configuration

Both forms (`NominationForm.astro` and `Newsletter.astro`) have been updated with additional Web3Forms fields to improve email deliverability:

### Added Fields for Better Deliverability

1. **Reply-To Configuration**
   - `replyto`: Sets the reply-to address to the form submitter's email
   - This helps with email authentication and prevents spam filters

2. **Bot Protection**
   - `botcheck`: Honeypot field for spam protection (hidden from users)
   - This reduces spam submissions that could affect your sender reputation

3. **Email Template**
   - `_template`: Set to "table" for better formatted emails
   - Makes emails more readable and professional

4. **Captcha Settings**
   - `_captcha`: Set to "false" (you can enable if needed)

5. **Metadata Tracking**
   - `_timestamp`: Adds submission timestamp
   - `_url`: Adds the page URL for reference

## Troubleshooting Email Delivery to Gmail

If emails are still not arriving in Gmail, follow these steps:

### 1. Verify Your Web3Forms Configuration

1. Log into your Web3Forms dashboard at https://web3forms.com/
2. Check the following settings:
   - **Email Address**: Verify the destination email is correct
   - **Domain Verification**: Complete domain verification if available
   - **API Key**: Ensure the API key in your `.env` file matches

### 2. Configure Email Redirect (IMPORTANT)

In both form files, uncomment and configure the email redirect field:

```html
<!-- Replace with your actual email address -->
<input type="hidden" name="email" value="your-email@gmail.com">
```

This explicitly tells Web3Forms where to send the submissions.

### 3. Check Gmail Settings

1. **Check Spam/Promotions Folders**: Emails might be filtered
2. **Add to Safe Senders**: Add `noreply@web3forms.com` to your Gmail contacts
3. **Check Filters**: Ensure no Gmail filters are blocking Web3Forms emails

### 4. Test with Different Email Providers

Try testing with different email addresses:
- Another Gmail account
- Outlook/Hotmail
- Yahoo Mail
- ProtonMail

This helps identify if it's a Gmail-specific issue.

### 5. Enable Web3Forms Email Logs

1. Log into Web3Forms dashboard
2. Enable email logs/history
3. Check if emails are being sent successfully from their end

### 6. Consider Using Custom SMTP (Advanced)

If issues persist, Web3Forms supports custom SMTP configuration:
1. Set up an SMTP service (SendGrid, Mailgun, etc.)
2. Configure it in Web3Forms dashboard
3. This gives you more control over email delivery

## Testing Your Forms

### Quick Test Steps

1. **Test the form locally**:
   ```bash
   npm run dev
   ```

2. **Submit a test entry** with your email

3. **Check Web3Forms Dashboard**:
   - Log in to see if the submission was received
   - Check the email logs

4. **Verify the API response**:
   - Open browser DevTools (F12)
   - Go to Network tab
   - Submit form and check the response

### Expected Successful Response

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Environment Variables

Ensure your `.env` file has the correct API key:

```env
PUBLIC_WEB3FORMS_KEY=your-actual-api-key-here
```

## Alternative Solutions

If Web3Forms continues to have delivery issues:

### 1. Try Formspree
- Similar service with good Gmail delivery
- Free tier available
- Easy migration

### 2. Use Netlify Forms
- If hosting on Netlify
- Built-in form handling
- Good deliverability

### 3. Custom Backend
- Set up a simple Node.js/Express backend
- Use Nodemailer with Gmail SMTP
- More control but requires hosting

## Contact Web3Forms Support

If issues persist after trying these solutions:
- Email: support@web3forms.com
- Include your Access Key (not in this public file)
- Describe the Gmail delivery issue
- They can check server logs and help troubleshoot

## Additional Notes

- Gmail has strict spam filters, especially for automated emails
- Using a custom domain email (not gmail.com) as sender can improve deliverability
- Consider setting up SPF/DKIM records if using a custom domain
- Web3Forms free tier has a limit of 250 submissions/month