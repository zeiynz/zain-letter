/**
 * Email validation utility
 * Validates email format using regex and basic sanity checks
 */

export function validateEmail(email: string): { valid: boolean; error?: string } {
    if (!email) {
        return { valid: false, error: 'Email is required' }
    }

    const trimmed = email.trim()

    if (trimmed.length > 254) {
        return { valid: false, error: 'Email is too long' }
    }

    // RFC 5322 simplified email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(trimmed)) {
        return { valid: false, error: 'Invalid email format' }
    }

    // Additional checks
    const [localPart, domain] = trimmed.split('@')

    if (!localPart || localPart.length > 64) {
        return { valid: false, error: 'Invalid local part' }
    }

    if (domain.startsWith('-') || domain.endsWith('-')) {
        return { valid: false, error: 'Invalid domain format' }
    }

    if (domain.split('.').some((part) => !part || part.length > 63)) {
        return { valid: false, error: 'Invalid domain part' }
    }

    return { valid: true }
}
