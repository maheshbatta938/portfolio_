import { useEffect, useMemo, useState } from "react";

/** Tokens revealed per tick (separators count, so this is ~2 words). */
const TOKENS_PER_TICK = 4;
const TICK_MS = 26;

interface Typewriter {
    /** The portion of `text` revealed so far. */
    visible: string;
    /** True while there is still text to reveal. */
    isTyping: boolean;
}

/**
 * Reveals text the way an assistant writes it — progressively, a couple of
 * words at a time.
 *
 * Advances by word rather than by character on purpose: the text is Markdown,
 * and stopping mid-token would flash raw `**` and half-built links on every
 * frame. Splitting on whitespace keeps every intermediate string parseable.
 *
 * One instance per message bubble, so `text` never changes under it.
 */
export function useTypewriter(text: string, enabled: boolean): Typewriter {
    // Capturing split keeps the separators, so joining restores the original.
    const tokens = useMemo(() => text.split(/(\s+)/), [text]);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        if (!enabled) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let elapsed = 0;
        const timer = window.setInterval(() => {
            elapsed += 1;
            setTick(elapsed);
            if (elapsed * TOKENS_PER_TICK >= tokens.length) {
                window.clearInterval(timer);
            }
        }, TICK_MS);

        return () => window.clearInterval(timer);
    }, [tokens, enabled]);

    if (!enabled) {
        return { visible: text, isTyping: false };
    }

    const shown = Math.min(tick * TOKENS_PER_TICK, tokens.length);

    return {
        visible: tokens.slice(0, shown).join(""),
        isTyping: shown < tokens.length
    };
}
