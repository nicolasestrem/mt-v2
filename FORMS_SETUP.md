# Forms Setup Guide

## Required Configuration

Both forms (Nomination and Newsletter) require a Web3Forms API key to function.

### Setup Steps:

1. **Get your Web3Forms API key**
   - Visit https://web3forms.com/
   - Sign up for a free account (250 submissions/month)
   - Copy your access key

2. **Configure the environment variable**
   - Create a `.env` file in the project root
   - Add your key:
     ```
     PUBLIC_WEB3FORMS_KEY=your-actual-access-key-here
     ```

3. **Restart the dev server**
   ```bash
   npm run dev
   ```

## Where Form Data Goes

When a form is submitted:
1. **Data is sent to Web3Forms servers** via their API endpoint
2. **Email notification** is automatically sent to the email address associated with your Web3Forms account
3. **Data storage**: Web3Forms stores submissions in your account dashboard (accessible at web3forms.com)
4. **Email configuration**: You can configure which email receives submissions in your Web3Forms account settings
5. **Export options**: Submissions can be exported as CSV from the Web3Forms dashboard

### To Change Recipient Email:
- Log into your Web3Forms account at https://web3forms.com/
- Go to your form settings
- Update the email address where you want to receive submissions
- Multiple email recipients can be configured (comma-separated)

## Form Features

- **Nomination Form**: Multi-field form for nominating mobility trailblazers
- **Newsletter Form**: Email subscription with privacy consent
- Both forms use client-side JavaScript for submission (no page reload)
- Success/error messages display inline
- All submissions include timestamp and user's IP address (for spam prevention)

## Testing

Without the API key configured, forms will fail with a submission error. Check browser console for detailed error messages.

### Current Configuration:
- API Key is configured in `.env` file
- Forms are fully functional and will send data to the email configured in your Web3Forms account