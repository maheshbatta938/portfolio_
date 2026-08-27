import type { ChatApiResponse, ChatMessage } from "../types";

// In dev, Vite proxies /api to the Express server (see vite.config.ts).
// In production, set VITE_API_BASE_URL to the deployed backend origin.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

/** Slightly above the server's own model timeout, so its fallback reply wins the race. */
const REQUEST_TIMEOUT_MS = 20_000;

/** Turns older than this add nothing and only cost tokens. */
const MAX_HISTORY_SENT = 8;

export interface AssistantAnswer {
    reply: string;
    intent: string;
    /** True when the answer came from the rule-based engine, not the model. */
    isFallback: boolean;
    /** True when the request itself failed — the reply is a local apology. */
    isError: boolean;
}

/**
 * Sends a message plus recent history to the assistant backend.
 *
 * Never throws: the UI always gets something renderable. A request that hangs
 * is aborted rather than leaving the panel stuck on "Thinking" forever.
 */
export async function askPortfolioAI(message: string, history: ChatMessage[]): Promise<AssistantAnswer> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
                message,
                history: history.slice(-MAX_HISTORY_SENT).map(item => ({ sender: item.sender, text: item.text }))
            })
        });

        const data: ChatApiResponse = await response.json();

        if (data.success && data.reply) {
            return {
                reply: data.reply,
                intent: data.intent ?? "general",
                isFallback: Boolean(data.isFallback),
                isError: false
            };
        }

        return {
            reply: "Something went wrong on my end. Try asking again, or reach Mahesh directly at maheshbatta539@gmail.com.",
            intent: "general",
            isFallback: false,
            isError: true
        };
    } catch (error) {
        const aborted = error instanceof DOMException && error.name === "AbortError";
        console.error("Chat request failed:", error);

        return {
            reply: aborted
                ? "That took too long to come back. Try again, or email Mahesh at maheshbatta539@gmail.com."
                : "I can't reach the assistant right now. You can still email Mahesh at maheshbatta539@gmail.com.",
            intent: "general",
            isFallback: false,
            isError: true
        };
    } finally {
        clearTimeout(timer);
    }
}
