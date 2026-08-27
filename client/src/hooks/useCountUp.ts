import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `target` once the returned ref scrolls into view.
 */
export function useCountUp<T extends HTMLElement>(target: number, duration = 1400) {
    const ref = useRef<T | null>(null);
    const [value, setValue] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;

                        if (reducedMotion) {
                            setValue(target);
                            return;
                        }

                        const stepTime = 15;
                        const steps = Math.max(1, Math.round(duration / stepTime));
                        const stepValue = target / steps;
                        let current = 0;

                        const interval = setInterval(() => {
                            current += stepValue;
                            if (current >= target) {
                                setValue(target);
                                clearInterval(interval);
                            } else {
                                setValue(Math.ceil(current));
                            }
                        }, stepTime);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [target, duration]);

    return { ref, value };
}
