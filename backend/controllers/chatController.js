import { assistantService } from "../services/assistantService.js";
import { sanitizeInput, detectPromptInjection } from "../utils/security.js";

export const chatWithAI = async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({
                success: false,
                reply: "Message text is required."
            });
        }

        // Sanitize input text (prevent XSS, limit character length to 500)
        const sanitizedMessage = sanitizeInput(message);

        if (!sanitizedMessage) {
            return res.status(400).json({
                success: false,
                reply: "Invalid message text."
            });
        }

        // Guard against prompt injection
        if (detectPromptInjection(sanitizedMessage)) {
            return res.json({
                success: true,
                reply: "⚠️ I am Mahesh Batta's AI Portfolio Assistant. I can only answer questions related to Mahesh's professional experience, projects, skills, education, and achievements. Please ask a portfolio-related question.",
                intent: "general",
                isFallback: false
            });
        }

        // Validate history is an array
        const sanitizedHistory = Array.isArray(history) ? history : [];

        // Delegate content generation to the assistant service
        const result = await assistantService.generateReply(sanitizedMessage, sanitizedHistory);

        res.json({
            success: true,
            reply: result.replyText,
            intent: result.intent,
            isFallback: result.isFallback
        });
    } catch (error) {
        console.error("Error in chatWithAI controller:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};