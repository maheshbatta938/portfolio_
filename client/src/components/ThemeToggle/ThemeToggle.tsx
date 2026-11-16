import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
            const isEditing = tag === "input" || tag === "textarea" || (e.target as HTMLElement)?.isContentEditable;
            if (isEditing) return;

            if (e.key.toLowerCase() === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) {
                toggleTheme();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleTheme]);

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme (Press T)"
            title={isDark ? "Switch to light (T)" : "Switch to dark (T)"}
            className="glass relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-text-secondary transition-colors hover:text-text-primary"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={theme}
                    initial={{ y: 12, opacity: 0, rotate: -35 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -12, opacity: 0, rotate: 35 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="flex"
                >
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.span>
            </AnimatePresence>
        </button>
    );
}
