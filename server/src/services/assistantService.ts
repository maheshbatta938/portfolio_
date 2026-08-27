import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ai from "../utils/gemini.js";
import { formatGitResponse } from "../utils/formatGitResponse.js";
import { buildPrompt } from "../data/portfolioPromptBuilder.js";
import { contextService } from "./contextService.js";
import { chatComponents } from "../data/components/index.js";
import type { AssistantReply, ClientHistoryItem, PortfolioData } from "../types/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE_PATH = path.join(__dirname, "../data/portfolio.json");

/** Prior turns kept when calling the model. Enough for follow-ups, not enough to drown the system prompt. */
const MAX_HISTORY_TURNS = 8;

/**
 * Hard ceiling on the model call. Without one a hung upstream request leaves
 * the visitor watching a "Thinking" indicator forever; the rule-based reply is
 * far better than an answer that never arrives.
 */
const MODEL_TIMEOUT_MS = 12_000;

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
        promise.then(
            value => {
                clearTimeout(timer);
                resolve(value);
            },
            error => {
                clearTimeout(timer);
                reject(error);
            }
        );
    });
}

/**
 * Service to handle interaction with the Google Gemini API for the portfolio chatbot.
 * Features:
 * - Dynamic context retrieval to focus model attention and reduce token footprint.
 * - Intent detection mapping to trigger front-end UI animations.
 * - Resilient JSON-based fallback response engine for offline/error safety.
 */
class AssistantService {
    private portfolioJson: PortfolioData | null;

    constructor() {
        this.portfolioJson = null;
        this.loadData();
        this.setupFileWatcher();
    }

    loadData(): void {
        try {
            if (fs.existsSync(DATA_FILE_PATH)) {
                const rawData = fs.readFileSync(DATA_FILE_PATH, "utf8");
                this.portfolioJson = JSON.parse(rawData) as PortfolioData;
            }
        } catch (error) {
            console.error("Failed to load portfolio JSON data:", error);
        }
    }

    /**
     * Hot-reloads the fallback cache when the data file is edited.
     *
     * Development only, and unref'd: a live `fs.watch` handle keeps the Node
     * event loop alive forever, which stops any script that imports this
     * module from ever exiting. In production the file never changes anyway.
     */
    setupFileWatcher(): void {
        if (process.env.NODE_ENV === "production") return;

        try {
            let debounce: NodeJS.Timeout | undefined;
            const watcher = fs.watch(DATA_FILE_PATH, eventType => {
                if (eventType !== "change") return;
                // A single save fires `change` more than once on most platforms.
                clearTimeout(debounce);
                debounce = setTimeout(() => {
                    console.log("portfolio.json changed — reloading fallback cache");
                    this.loadData();
                    contextService.loadData();
                }, 200);
                debounce.unref?.();
            });
            watcher.unref();
        } catch (error) {
            console.warn("Could not attach file watcher on portfolio.json:", (error as Error).message);
        }
    }

    detectIntent(message: string): string {
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
     */
    getFallbackReply(message: string, intent: string): string {
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
     * Normalises client-supplied history into Gemini `contents`.
     *
     * Gemini rejects a conversation that opens on a model turn, so any leading
     * assistant messages are dropped. History is also capped: the portfolio
     * answers are self-contained, and a long tail of prior turns only dilutes
     * the system prompt's formatting rules.
     */
    private buildContents(history: ClientHistoryItem[], userPrompt: string) {
        const turns = history
            .map(item => ({
                role: item.role === "user" || item.sender === "user" ? "user" : "model",
                text: (item.text || item.content || "").trim()
            }))
            .filter(turn => turn.text.length > 0)
            .slice(-MAX_HISTORY_TURNS);

        while (turns.length > 0 && turns[0].role !== "user") {
            turns.shift();
        }

        const contents = turns.map(turn => ({
            role: turn.role,
            parts: [{ text: turn.text }]
        }));

        contents.push({ role: "user", parts: [{ text: userPrompt }] });
        return contents;
    }

    /**
     * Generates a reply from the AI assistant using the provided message and chat history.
     */
    async generateReply(message: string, history: ClientHistoryItem[] = []): Promise<AssistantReply> {
        const intent = this.detectIntent(message);

        try {
            const dynamicContext = contextService.retrieveContext(message);
            const { systemInstruction, userPrompt } = buildPrompt(dynamicContext, message);

            const response = await withTimeout(
                ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: this.buildContents(history, userPrompt),
                    config: {
                        systemInstruction,
                        temperature: 0.4,
                        maxOutputTokens: 1024,
                        topP: 0.9,
                        // 2.5 Flash spends output tokens on reasoning before it
                        // writes. For lookups over a supplied fact sheet that buys
                        // nothing, and it used to eat the whole budget and return
                        // an empty string — which surfaced as the canned fallback.
                        thinkingConfig: { thinkingBudget: 0 }
                    }
                }),
                MODEL_TIMEOUT_MS,
                "Gemini request"
            );

            const replyText = response?.text?.trim();

            if (!replyText) {
                throw new Error("Empty response text from Gemini API.");
            }

            return {
                replyText,
                intent,
                isFallback: false
            };
        } catch (error) {
            console.error("Gemini API call failed, activating rule-based fallback response:", error);

            const fallbackText = this.getFallbackReply(message, intent);
            return {
                replyText: fallbackText,
                intent,
                isFallback: true
            };
        }
    }
}

export const assistantService = new AssistantService();
