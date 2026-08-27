import { useEffect, useState } from "react";

/**
 * Classic type-then-delete effect cycling through a list of words.
 * Respects prefers-reduced-motion by freezing on the first word.
 */
export function useTypingEffect(words: string[]): string {
    const [text, setText] = useState(words[0] ?? "");

    useEffect(() => {
        if (words.length === 0) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) {
            // initial state already holds words[0]; nothing further to animate
            return;
        }

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;
        let timeoutId: ReturnType<typeof setTimeout>;

        const tick = () => {
            const currentWord = words[wordIndex];

            if (!deleting) {
                charIndex += 1;
                setText(currentWord.substring(0, charIndex));
            } else {
                charIndex -= 1;
                setText(currentWord.substring(0, charIndex));
            }

            let speed = 100;
            if (!deleting && charIndex === currentWord.length) {
                deleting = true;
                speed = 1800;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 400;
            }

            timeoutId = setTimeout(tick, speed);
        };

        timeoutId = setTimeout(tick, 100);
        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [words.join("|")]);

    return text;
}
