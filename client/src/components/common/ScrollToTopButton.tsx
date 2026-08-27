import { ArrowUp } from "lucide-react";
import { useScrolled } from "../../hooks/useScrolled";

export default function ScrollToTopButton() {
    const visible = useScrolled(500);

    return (
        <button
            type="button"
            aria-label="Scroll to top"
            tabIndex={visible ? 0 : -1}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            // Bottom-left: the assistant launcher owns bottom-right, and the
            // two must never overlap.
            className={`glass fixed bottom-6 left-6 z-raised flex h-11 w-11 items-center justify-center rounded-full text-text-primary transition-all duration-500 hover:text-accent ${
                visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
            }`}
        >
            <ArrowUp className="h-4 w-4" />
        </button>
    );
}
