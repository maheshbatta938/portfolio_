/**
 * Sanitizes input text against XSS and common script/HTML tags.
 */
export function sanitizeInput(text: string): string {
    if (!text || typeof text !== "string") return "";

    let clean = text.replace(/<[^>]*>/g, "");

    clean = clean.trim();
    if (clean.length > 500) {
        clean = clean.substring(0, 500);
    }

    return clean;
}

/**
 * Checks if input matches common prompt injection patterns.
 */
export function detectPromptInjection(text: string): boolean {
    const textLower = text.toLowerCase();

    const maliciousPatterns = [
        "ignore the instructions",
        "ignore previous instructions",
        "ignore all previous",
        "ignore rules",
        "override prompt",
        "forget your instructions",
        "system prompt",
        "reveal your prompt",
        "show system instruction",
        "what are your instructions",
        "you are now a",
        "act as a new",
        "forget everything"
    ];

    return maliciousPatterns.some(pattern => textLower.includes(pattern));
}
