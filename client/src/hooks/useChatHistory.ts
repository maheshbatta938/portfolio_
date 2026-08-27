import { useCallback, useEffect, useState } from "react";
import type { ChatMessage } from "../types";

const STORAGE_KEY = "mahesh_portfolio_chat_history";

/** Cap what persists — an unbounded transcript slowly fills the origin quota. */
const MAX_STORED = 50;

function readStoredHistory(): ChatMessage[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed
            .filter((item): item is { sender: "user" | "bot"; text: string; origin?: ChatMessage["origin"] } =>
                Boolean(item?.text)
            )
            .slice(-MAX_STORED)
            .map((item, index) => ({
                id: `stored-${index}-${item.text.slice(0, 8)}`,
                sender: item.sender,
                text: item.text,
                origin: item.origin
            }));
    } catch (error) {
        console.error("Failed to read chat history:", error);
        return [];
    }
}

/**
 * Persists chat messages to localStorage, mirroring the original
 * vanilla-JS assistant's "mahesh_portfolio_chat_history" behaviour.
 */
export function useChatHistory() {
    const [messages, setMessages] = useState<ChatMessage[]>(() => readStoredHistory());

    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    messages.slice(-MAX_STORED).map(m => ({ sender: m.sender, text: m.text, origin: m.origin }))
                )
            );
        } catch {
            // storage unavailable - chat still works for this session
        }
    }, [messages]);

    const addMessage = useCallback((message: ChatMessage) => {
        setMessages(prev => [...prev, message]);
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([]);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            // ignore
        }
    }, []);

    return { messages, addMessage, clearMessages };
}
