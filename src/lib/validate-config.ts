import { getContent } from './tina';

/**
 * Validates the site configuration at build time
 * This ensures critical settings are properly configured before deployment
 */
export async function validateConfiguration() {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
        // Load settings
        const settings = await getContent<any>('', 'settings');

        // Check Web3Forms key
        if (!settings?.web3formsKey || settings.web3formsKey === 'YOUR-ACCESS-KEY-HERE') {
            // Check if environment variable is set
            if (!import.meta.env.PUBLIC_WEB3FORMS_KEY) {
                errors.push(
                    'Web3Forms API key is not configured. ' +
                    'Please set it in content/settings.json or as PUBLIC_WEB3FORMS_KEY environment variable. ' +
                    'Get your free key at https://web3forms.com/'
                );
            } else {
                warnings.push(
                    'Using Web3Forms key from environment variable. ' +
                    'Consider setting it in content/settings.json for easier management.'
                );
            }
        }

        // Check LinkedIn Feed URL
        if (!settings?.linkedinFeedUrl) {
            warnings.push(
                'LinkedIn feed URL is not configured in content/settings.json. ' +
                'LinkedIn integration may not work properly.'
            );
        }

        // Report errors and warnings
        if (errors.length > 0) {
            console.error('\n❌ Configuration Errors:\n');
            errors.forEach(error => console.error(`  - ${error}`));
            
            if (import.meta.env.MODE === 'production') {
                console.error('\n⚠️  Build will fail in production mode due to configuration errors.\n');
                throw new Error('Configuration validation failed');
            } else {
                console.warn('\n⚠️  Continuing in development mode despite errors.\n');
            }
        }

        if (warnings.length > 0) {
            console.warn('\n⚠️  Configuration Warnings:\n');
            warnings.forEach(warning => console.warn(`  - ${warning}`));
        }

        if (errors.length === 0 && warnings.length === 0) {
            console.log('✅ Configuration validation passed');
        }

    } catch (error) {
        if (error instanceof Error && error.message === 'Configuration validation failed') {
            throw error;
        }
        console.error('Error validating configuration:', error);
    }
}