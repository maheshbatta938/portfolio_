import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useAIAssistant } from "../../context/AIAssistantContext";
import { warmUpBackend } from "../../services/chatService";

/**
 * Always-present chat button, bottom-right, visible over every section —
 * the corner every chat widget (Intercom, Drift, Crisp, WhatsApp) uses,
 * because it is the one spot on a page that never collides with primary
 * content or a footer.
 *
 * Portalled to <body> and pinned to its own z rung so no section can ever
 * paint over it, with position set inline for the same reason as the panel
 * it opens: nothing in the stylesheet can override an inline style.
 */
export default function AssistantLauncher() {
    const { isOpen, toggle } = useAIAssistant();

    // Wake the Render backend as soon as the launcher mounts (page load), so
    // a cold start finishes long before the visitor actually opens the chat.
    useEffect(() => {
        warmUpBackend();
    }, []);

    return createPortal(
        <AnimatePresence>
            {!isOpen && (
                <motion.button
                    type="button"
                    onClick={toggle}
                    aria-label="Open AI assistant"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    style={{ position: "fixed", transformOrigin: "bottom right" }}
                    // Solid accent, not glass: this one control has to stay
                    // legible over every section's backdrop, and glass cannot
                    // promise that — it takes on whatever is behind it.
                    className="group bottom-5 right-5 z-launcher flex items-center gap-2.5 rounded-full bg-accent py-3 pl-3.5 pr-4 text-on-accent shadow-lg transition-all duration-300 hover:bg-accent-hover sm:bottom-6 sm:right-6 sm:pr-5"
                >
                    <span className="relative flex h-6 w-6 items-center justify-center">
                        <MessageCircle className="h-[18px] w-[18px] transition-transform duration-500 group-hover:-rotate-12" />
                        <span
                            aria-hidden="true"
                            className="soft-pulse absolute -right-1 -top-1 h-2 w-2 rounded-full bg-on-accent"
                        />
                    </span>
                    <span className="hidden font-heading text-[13px] font-semibold sm:inline">Ask AI</span>
                </motion.button>
            )}
        </AnimatePresence>,
        document.body
    );
}
