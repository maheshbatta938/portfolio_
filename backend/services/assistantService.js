import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ai from "../utils/gemini.js";
import { formatGitResponse } from "../utils/formatGitResponse.js";
import { buildPrompt } from "../data/portfolioPromptBuilder.js";
import { contextService } from "./contextService.js";
import { chatComponents } from "../data/components/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE_PATH = path.join(__dirname, "../data/portfolio.json");

/**
 * Service to handle interaction with the Google Gemini API for the portfolio chatbot.
 * Features:
 * - Dynamic context retrieval to focus model attention and reduce token footprint.
 * - Intent detection mapping to trigger front-end UI animations.
 * - Resilient JSON-based fallback response engine for offline/error safety.
 */
class AssistantService {
    constructor() {
        this.portfolioJson = null;

        // Initialize local cache for fallbacks
        this.loadData();

        // Setup file watcher to reload local fallback data if modified
        this.setupFileWatcher();
    }

    /**
     * Loads the raw portfolio JSON.
     */
    loadData() {
        try {
            if (fs.existsSync(DATA_FILE_PATH)) {
                const rawData = fs.readFileSync(DATA_FILE_PATH, "utf8");
                this.portfolioJson = JSON.parse(rawData);
            }
        } catch (error) {
            console.error("Failed to load portfolio JSON data:", error);
        }
    }

    /**
     * Sets up a file watcher on portfolio.json to reload details dynamically without server restarts.
     */
    setupFileWatcher() {
        try {
            fs.watch(DATA_FILE_PATH, (eventType) => {
                if (eventType === "change") {
                    console.log("portfolio.json change detected. Auto-reloading local fallback cache...");
                    setTimeout(() => {
                        this.loadData();
                        // Also trigger reload in contextService
                        contextService.loadData();
                    }, 200);
                }
            });
        } catch (error) {
            console.warn("Could not attach file watcher on portfolio.json:", error.message);
        }
    }

    /**
     * Detects user intent based on keyword triggers.
     * @param {string} message - The user's query.
     * @returns {string} The detected intent.
     */
    detectIntent(message) {
        const text = message.toLowerCase();

        for (const comp of chatComponents) {
            if (comp.intentId && comp.intentKeywords) {
                if (comp.intentKeywords.some(rx => rx.test(text))) {
                    return comp.intentId;
                }
            }
        }

        return "general";
    }

    /**
     * Rule-based fallback response compiler in case Gemini API is offline/rate-limited.
     * @param {string} message - Raw message.
     * @param {string} intent - The detected intent.
     * @returns {string} Sweet, short, points-wise markdown response.
     */
    getFallbackReply(message, intent) {
        const data = this.portfolioJson;
        if (!data) {
            return "I'm Mahesh Batta's AI Portfolio Assistant. I can tell you about his professional projects, skills, education, and internship roles. What would you like to know?";
        }

        const matchedComponent = chatComponents.find(comp => comp.intentId === intent);
        if (matchedComponent && matchedComponent.getFallbackReply) {
            return matchedComponent.getFallbackReply(data, message);
        }

        const steps = [
            { description: "Mahesh Batta is a Software Developer passionate about building modern web applications, backend systems, and AI-powered solutions." },
            { description: "I can help answer questions regarding his:" },
            { description: "Experience & Internships (Recordent, Codex, etc.)" },
            { description: "Technical & Soft Skills (Angular, React, Node.js, DSA)" },
            { description: "Academic Background (Computer Science & Data Science)" },
            { description: "AI, ML, and Web Projects (SaaS apps, prediction models)" },
            { description: "Contact Details (Email, LinkedIn, GitHub)" }
        ];
        return formatGitResponse(steps);


    }

    /**
     * Generates a reply from the AI assistant using the provided message and chat history.
     * @param {string} message - The user's new message.
     * @param {Array} history - The chat history in client format [{ sender: 'user'|'bot', text: '...' }].
     * @returns {Promise<Object>} An object containing { replyText, intent, isFallback }.
     */
    async generateReply(message, history = []) {
        const intent = this.detectIntent(message);

        try {
            // Retrieve dynamic context from the portfolio JSON for this specific message
            const dynamicContext = contextService.retrieveContext(message);

            // Build custom system instructions and user prompt for this request
            const { systemInstruction, userPrompt } = buildPrompt(dynamicContext, message);
            console.error("=== SYSTEM_INSTRUCTION ===");
            console.error(systemInstruction);
            console.error("===========================");

            // Format history
            const contents = history.map(item => ({
                role: (item.role === "user" || item.sender === "user") ? "user" : "model",
                parts: [{ text: item.text || item.content || "" }]
            }));

            // Append current message wrapped in instructions and context
            contents.push({
                role: "user",
                parts: [{ text: userPrompt }]
            });

            // Call Google Gen AI SDK with custom instruction and optimal configuration
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: contents,
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.15,
                    maxOutputTokens: 600,
                    topP: 0.95
                }
            });

            if (!response || !response.text) {
                throw new Error("Empty response text from Gemini API.");
            }

            return {
                replyText: response.text,
                intent: intent,
                isFallback: false
            };

        } catch (error) {
            console.error("Gemini API call failed, activating rule-based fallback response:", error);

            // Build fallback response from local data structure
            const fallbackText = this.getFallbackReply(message, intent);
            return {
                replyText: fallbackText,
                intent: intent,
                isFallback: true
            };
        }
    }
}

export const assistantService = new AssistantService();

