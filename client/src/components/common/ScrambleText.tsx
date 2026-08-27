import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*";

interface ScrambleTextProps {
    text: string;
    className?: string;
    /** Milliseconds each character spends unresolved. */
    speed?: number;
}

/**
 * Monospace label that decodes into place when it scrolls into view.
 * Reserved for eyebrows and counters, where the mono voice already lives.
 */
export default function ScrambleText({ text, className = "", speed = 34 }: ScrambleTextProps) {
    // null means "not scrambling" — the real text renders. Keeping the
    // override separate from the prop means a text change is never stale
    // and the reduced-motion path needs no state write at all.
    const [scrambled, setScrambled] = useState<string | null>(null);
    const ref = useRef<HTMLSpanElement | null>(null);
    const hasRun = useRef(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let frame = 0;
        let timer: number | undefined;

        const run = () => {
            timer = window.setInterval(() => {
                frame += 1;
                // One character locks in every other tick; the rest churn.
                const resolved = Math.floor(frame / 2);
                if (resolved > text.length) {
                    window.clearInterval(timer);
                    setScrambled(null);
                    return;
                }
                setScrambled(
                    text
                        .split("")
                        .map((char, i) => {
                            if (i < resolved || char === " ") return char;
                            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                        })
                        .join("")
                );
            }, speed);
        };

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !hasRun.current) {
                    hasRun.current = true;
                    run();
                }
            },
            { threshold: 0.6 }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
            if (timer) window.clearInterval(timer);
        };
    }, [text, speed]);

    return (
        <span ref={ref} className={className}>
            {scrambled ?? text}
        </span>
    );
}
