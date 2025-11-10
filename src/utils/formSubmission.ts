/**
 * Form submission utility
 * Shared logic for Web3Forms submissions with validation and error handling
 */

export interface FormSubmissionOptions {
	form: HTMLFormElement;
	successRedirect: string;
	eventLabel: string;
	onStart?: () => void;
	onSuccess?: () => void;
	onError?: (error: string) => void;
}

export interface ValidationResult {
	isValid: boolean;
	errors: Map<string, string>;
}

/**
 * Validates and sanitizes form data
 */
export function validateFormData(formData: FormData): ValidationResult {
	const data = Object.fromEntries(formData);
	const errors = new Map<string, string>();

	// Email validation
	const emailFields = ['email', 'nominatorEmail'];
	for (const field of emailFields) {
		const value = data[field];
		if (value && typeof value === 'string') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				errors.set(field, 'Ungültige E-Mail-Adresse');
			}
			// Check for email injection patterns
			if (/[\r\n]/.test(value)) {
				errors.set(field, 'Ungültige Zeichen in E-Mail');
			}
		}
	}

	// Length limits
	const textareaLimit = 5000;
	const nominationMessage = data.nominationMessage;
	if (nominationMessage && typeof nominationMessage === 'string' && nominationMessage.length > textareaLimit) {
		errors.set('nominationMessage', `Nachricht zu lang (max. ${textareaLimit} Zeichen)`);
	}

	// Name validation (prevent HTML/script injection)
	const nameFields = ['firstName', 'lastName', 'nominatorFirstName', 'nominatorLastName'];
	for (const field of nameFields) {
		const value = data[field];
		if (value && typeof value === 'string') {
			if (/<[^>]*>/g.test(value)) {
				errors.set(field, 'Ungültige Zeichen im Namen');
			}
		}
	}

	return {
		isValid: errors.size === 0,
		errors
	};
}

/**
 * Sanitizes text input by escaping HTML
 */
export function sanitizeText(text: string): string {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
}

/**
 * Sanitizes all form data
 */
export function sanitizeFormData(formData: FormData): Record<string, any> {
	const data = Object.fromEntries(formData);
	const sanitized: Record<string, any> = {};

	for (const [key, value] of Object.entries(data)) {
		if (typeof value === 'string' && key !== 'access_key' && key !== 'email' && key !== 'nominatorEmail') {
			sanitized[key] = sanitizeText(value);
		} else {
			sanitized[key] = value;
		}
	}

	return sanitized;
}

/**
 * Checks rate limiting using localStorage
 */
export function checkRateLimit(formId: string, limitDuration: number = 60000): { allowed: boolean; secondsLeft: number } {
	const lastSubmitKey = `lastFormSubmit_${formId}`;
	const lastSubmit = localStorage.getItem(lastSubmitKey);

	if (lastSubmit) {
		const timeSince = Date.now() - parseInt(lastSubmit);
		if (timeSince < limitDuration) {
			const secondsLeft = Math.ceil((limitDuration - timeSince) / 1000);
			return { allowed: false, secondsLeft };
		}
	}

	return { allowed: true, secondsLeft: 0 };
}

/**
 * Sets rate limit timestamp
 */
export function setRateLimit(formId: string): void {
	const lastSubmitKey = `lastFormSubmit_${formId}`;
	localStorage.setItem(lastSubmitKey, Date.now().toString());
}

/**
 * Submits form to Web3Forms with validation and error handling
 */
export async function submitToWeb3Forms(options: FormSubmissionOptions): Promise<void> {
	const {
		form,
		successRedirect,
		eventLabel,
		onStart,
		onSuccess,
		onError
	} = options;

	const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
	if (!submitButton) {
		throw new Error('Submit button not found');
	}

	const originalText = submitButton.textContent || 'Absenden';

	try {
		// Start callback
		if (onStart) onStart();

		// Show loading state
		submitButton.textContent = 'Wird gesendet...';
		submitButton.disabled = true;

		const formData = new FormData(form);

		// Validate form data
		const validation = validateFormData(formData);
		if (!validation.isValid) {
			const firstError = Array.from(validation.errors.values())[0];
			throw new Error(firstError);
		}

		// Check rate limit (1 minute)
		const formId = form.id || 'default';
		const rateLimit = checkRateLimit(formId);
		if (!rateLimit.allowed) {
			throw new Error(`Bitte warten Sie ${rateLimit.secondsLeft} Sekunden vor der nächsten Einreichung.`);
		}

		// Sanitize and submit
		const sanitizedData = sanitizeFormData(formData);
		const json = JSON.stringify(sanitizedData);

		// Send to Web3Forms
		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: json
		});

		const result = await response.json();

		if (result.success) {
			// Set rate limit
			setRateLimit(formId);

			// Track event before redirect
			if (typeof window.trackEvent === 'function') {
				window.trackEvent('form_submit', {
					event_category: 'engagement',
					event_label: eventLabel,
					form_type: formId
				});
			}

			// Success callback
			if (onSuccess) onSuccess();

			// Redirect to thank you page
			window.location.href = successRedirect;

			// Reset form (in case redirect fails)
			form.reset();
		} else {
			throw new Error(result.message || 'Form submission failed');
		}
	} catch (error) {
		console.error('Form submission error:', error);

		const errorMessage = error instanceof Error ? error.message : 'Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut.';

		// Error callback
		if (onError) {
			onError(errorMessage);
		}

		throw error;
	} finally {
		// Reset button state
		submitButton.textContent = originalText;
		submitButton.disabled = false;
	}
}
