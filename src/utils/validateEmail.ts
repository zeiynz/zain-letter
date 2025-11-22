// src/utils/validateEmail.ts

export type ValidationResult = {
    isValid: boolean;
    error?: string;
    sanitizedEmail?: string;
};

export function validateEmail(email: unknown): ValidationResult {
    // 1. Type Safety Check
    if (typeof email !== "string") {
        return { isValid: false, error: "Input harus berupa text." };
    }

    // 2. Sanitization (Bersihkan spasi & lowercase)
    const cleanEmail = email.trim().toLowerCase();

    // 3. Security: Length Check (Mencegah ReDoS / Buffer Overflow)
    if (cleanEmail.length === 0) {
        return { isValid: false, error: "Email wajib diisi." };
    }
    if (cleanEmail.length > 254) {
        return { isValid: false, error: "Email terlalu panjang." };
    }

    // 4. Regex Validation (Standard & Secure)
    // Regex ini memastikan format user@domain.tld tanpa karakter aneh
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(cleanEmail)) {
        return { isValid: false, error: "Format email tidak valid." };
    }

    // 5. Anti-XSS Check (Extra Layer)
    // Memastikan tidak ada tag HTML script/iframe yang lolos
    const dangerousChars = /[<>&"']/;
    if (dangerousChars.test(cleanEmail)) {
        return { isValid: false, error: "Email mengandung karakter ilegal." };
    }

    return { isValid: true, sanitizedEmail: cleanEmail };
}