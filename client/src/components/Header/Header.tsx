import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import Navigation from "../Navigation/Navigation";
import MobileMenu from "../Navigation/MobileMenu";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useScrolled } from "../../hooks/useScrolled";
import { useAIAssistant } from "../../context/AIAssistantContext";
import { contact } from "../../data/contact";
import { profile } from "../../data/profile";

export default function Header() {
    const scrolled = useScrolled(24);
    const [menuOpen, setMenuOpen] = useState(false);
    const { isOpen: assistantOpen, toggle: toggleAssistant } = useAIAssistant();

    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });

    return (
        <>
            {/* Top of the stack (bar the toast layer) so the menu toggle stays
                clickable while the mobile sheet is open beneath it. */}
            <header className="pointer-events-none fixed inset-x-0 top-0 z-header flex justify-center px-3 pt-2 sm:px-5 sm:pt-2.5">
                {/* A floating pane, not a full-width bar — the page shows past
                    it on every side, which is what makes the blur read. */}
                <div className="glass pointer-events-auto relative w-full max-w-[1220px] overflow-hidden rounded-full transition-all duration-500">
                    <div
                        className={`flex items-center justify-between gap-4 pl-4 pr-2.5 transition-all duration-500 sm:pl-5 sm:pr-3 ${
                            scrolled ? "h-[54px]" : "h-[62px]"
                        }`}
                    >
                        {/* --- Wordmark --- */}
                        <a
                            href="#overview"
                            className="group flex flex-shrink-0 items-center gap-2.5"
                            aria-label={`${profile.fullName} — back to top`}
                        >
                            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-text-primary font-heading text-[14px] font-bold text-bg transition-transform duration-500 group-hover:scale-110">
                                M
                            </span>
                            <span className="hidden font-heading text-[14.5px] font-semibold tracking-tight sm:block">
                                {profile.fullName}
                            </span>
                        </a>

                        <Navigation />

                        {/* --- Actions --- */}
                        <div className="flex flex-shrink-0 items-center gap-1.5">
                            <a
                                href={contact.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub profile"
                                title="GitHub"
                                className="hidden h-9 w-9 items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-glass-faint hover:text-text-primary xl:flex"
                            >
                                <i className="fa-brands fa-github text-[15px]" aria-hidden="true" />
                            </a>
                            <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn profile"
                                title="LinkedIn"
                                className="hidden h-9 w-9 items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-glass-faint hover:text-text-primary xl:flex"
                            >
                                <i className="fa-brands fa-linkedin-in text-[15px]" aria-hidden="true" />
                            </a>

                            <ThemeToggle />

                            {/* Second entry point to the assistant — the launcher
                                pinned bottom-left is the first. Both toggle the
                                same shared state, so either one opens the exact
                                same popover in the exact same place. */}
                            <button
                                type="button"
                                onClick={toggleAssistant}
                                aria-expanded={assistantOpen}
                                aria-label={assistantOpen ? "Close AI assistant" : "Open AI assistant"}
                                className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${
                                    assistantOpen
                                        ? "bg-text-primary text-bg"
                                        : "bg-accent text-on-accent hover:bg-accent-hover"
                                }`}
                            >
                                <Sparkles
                                    className={`h-3.5 w-3.5 transition-transform duration-500 ${
                                        assistantOpen ? "rotate-90" : "group-hover:rotate-90"
                                    }`}
                                />
                                <span className="hidden sm:inline">{assistantOpen ? "Close" : "Ask AI"}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setMenuOpen(prev => !prev)}
                                aria-label="Toggle navigation menu"
                                aria-expanded={menuOpen}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-glass-border text-text-primary transition-colors hover:bg-glass-faint lg:hidden"
                            >
                                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    {/* --- Reading progress, riding the pill's bottom edge --- */}
                    <motion.div
                        aria-hidden="true"
                        style={{ scaleX: progress }}
                        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
                    />
                </div>
            </header>

            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}
