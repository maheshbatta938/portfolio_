import type { Request, Response } from "express";
import { assistantService } from "../services/assistantService.js";
import { sanitizeInput, detectPromptInjection } from "../utils/security.js";
import type { ChatRequestBody } from "../types/index.js";

export const chatWithAI = async (req: Request<unknown, unknown, ChatRequestBody>, res: Response): Promise<void> => {
    try {
        const { message, history = [] } = req.body;

        if (!message || typeof message !== "string") {
            res.status(400).json({
                success: false,
                reply: "Message text is required."
            });
            return;
        }

        const sanitizedMessage = sanitizeInput(message);

        if (!sanitizedMessage) {
            res.status(400).json({
                success: false,
                reply: "Invalid message text."
            });
            return;
        }

        if (detectPromptInjection(sanitizedMessage)) {
            res.json({
                success: true,
                reply: "⚠️ I am Mahesh Batta's AI Portfolio Assistant. I can only answer questions related to Mahesh's professional experience, projects, skills, education, and achievements. Please ask a portfolio-related question.",
                intent: "general",
                isFallback: false
            });
            return;
        }

        const sanitizedHistory = Array.isArray(history) ? history : [];

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
            error: (error as Error).message
        });
    }
};
