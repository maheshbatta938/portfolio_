/**
 * Sanitizes input text against XSS and common script/HTML tags.
 * @param {string} text - Raw input text.
 * @returns {string} Clean sanitized text.
 */
export function sanitizeInput(text) {
    if (!text || typeof text !== "string") return "";
    
    // Strip HTML and script tags
    let clean = text.replace(/<[^>]*>/g, "");
    
    // Trim extra spaces and limit characters to 500 for scalability and security
    clean = clean.trim();
    if (clean.length > 500) {
        clean = clean.substring(0, 500);
    }
    
    return clean;
}

/**
 * Checks if input matches common prompt injection patterns.
 * @param {string} text - Cleaned input text.
 * @returns {boolean} True if a potential prompt injection is detected.
 */
export function detectPromptInjection(text) {
    const textLower = text.toLowerCase();
    
    // Patterns indicative of attempting to override system prompts or dump instructions
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
