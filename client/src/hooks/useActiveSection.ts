import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently in view, using the same
 * "scrollY past section top" heuristic as a scroll-spy nav.
 */
export function useActiveSection(sectionIds: string[], offset = 180): string {
    const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

    useEffect(() => {
        const handler = () => {
            let current = activeId;
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (!el) continue;
                const top = el.offsetTop - offset;
                const height = el.offsetHeight;
                if (window.scrollY >= top && window.scrollY < top + height) {
                    current = id;
                }
            }
            setActiveId(prev => (prev === current ? prev : current));
        };

        window.addEventListener("scroll", handler, { passive: true });
        handler();
        return () => window.removeEventListener("scroll", handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionIds.join(","), offset]);

    return activeId;
}
