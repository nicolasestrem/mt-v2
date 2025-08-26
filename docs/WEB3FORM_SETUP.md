# Web3Form Setup Documentation

## What Was Done

### 1. Updated NominationForm.astro
- Added hidden input field for Web3Forms access key
- Updated JavaScript to handle form submission via Web3Forms API
- Added loading states and error handling
- Implemented proper async/await pattern for form submission

### 2. Key Changes Made

#### Form Structure
```html
<!-- Added this line to the form -->
<input type="hidden" name="access_key" value="YOUR-ACCESS-KEY-HERE">
```

#### JavaScript Updates
- Replaced simple console.log with actual Web3Forms API call
- Added loading state for submit button
- Implemented proper error handling
- Added success/error user feedback

## Next Steps for You

### 1. Get Your Web3Forms API Key
1. Go to https://web3forms.com/
2. Enter your email address
3. Get your access key instantly (no signup required)

<<<<<<< HEAD
### 2. Set Up Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and replace `your-web3forms-access-key-here` with your actual Web3Forms access key.

**Important**: The `.env` file is already in `.gitignore` and will not be committed to GitHub, keeping your key secure.
=======
### 2. Replace the Placeholder Key
In `src/components/NominationForm.astro`, find this line:
```html
<input type="hidden" name="access_key" value="YOUR-ACCESS-KEY-HERE">
```

Replace `YOUR-ACCESS-KEY-HERE` with your actual Web3Forms access key.
>>>>>>> 135f43c (feat: Add Web3Forms integration to nomination form)

### 3. Test the Form
1. Run `npm run dev` to start the development server
2. Navigate to the nomination form
3. Fill out and submit the form
4. Check your email for the submission

### 4. Optional: Environment Variable Setup
For better security, you can use environment variables:

1. Create a `.env` file in your project root:
```
PUBLIC_WEB3FORMS_KEY=your-actual-key-here
```

2. Update the form to use the environment variable:
```html
<input type="hidden" name="access_key" value={import.meta.env.PUBLIC_WEB3FORMS_KEY}>
```

## How It Works

1. **Form Submission**: When a user submits the form, it sends data to Web3Forms API
2. **Email Delivery**: Web3Forms automatically sends the submission to your email
3. **No Backend Required**: Everything is handled client-side with Web3Forms service
4. **Free Tier**: 250 submissions per month included for free

## Troubleshooting

### Form Not Working?
- Check that your Web3Forms key is correct
- Verify the key is active in your Web3Forms dashboard
- Test with Web3Forms playground: https://web3forms.com/playground

### Not Receiving Emails?
- Check your spam folder
- Verify email address in Web3Forms dashboard
- Check Web3Forms submission logs

## Support

- Web3Forms Documentation: https://docs.web3forms.com/
- Web3Forms Support: support@web3forms.com

## Files Modified

- `src/components/NominationForm.astro` - Added Web3Forms integration

## Date

Setup completed on: $(date)
