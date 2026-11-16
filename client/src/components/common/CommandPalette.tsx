import { useEffect, useState, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
    Search,
    Compass,
    Sparkles,
    FileText,
    Download,
    Mail,
    Globe,
    ExternalLink,
    SunMoon,
    CornerDownLeft,
    X
} from "lucide-react";
import { useAIAssistant } from "../../context/AIAssistantContext";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";
import { contact } from "../../data/contact";
import { profile } from "../../data/profile";

interface CommandItem {
    id: string;
    title: string;
    category: "Navigation" | "Ask Mahesh AI" | "Actions";
    icon: typeof Compass;
    shortcut?: string;
    action: () => void;
}

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const { askQuestion } = useAIAssistant();
    const { toggleTheme } = useTheme();
    const { showToast } = useToast();

    // Listen for global Cmd+K or Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setIsOpen(prev => !prev);
            } else if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    // Custom event to open from anywhere (e.g. Header button)
    useEffect(() => {
        const handleOpenEvent = () => setIsOpen(true);
        window.addEventListener("open-command-palette", handleOpenEvent);
        return () => window.removeEventListener("open-command-palette", handleOpenEvent);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const navigateTo = (hash: string) => {
        setIsOpen(false);
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const items: CommandItem[] = useMemo(() => {
        return [
            // Navigation
            {
                id: "nav-overview",
                title: "Overview & Introduction",
                category: "Navigation",
                icon: Compass,
                action: () => navigateTo("#overview")
            },
            {
                id: "nav-about",
                title: "About & Engineering Capabilities",
                category: "Navigation",
                icon: Compass,
                action: () => navigateTo("#about")
            },
            {
                id: "nav-experience",
                title: "Work Experience (Smart Interviews & Recordent)",
                category: "Navigation",
                icon: Compass,
                action: () => navigateTo("#experience")
            },
            {
                id: "nav-projects",
                title: "Selected Projects (NovaBank, Recordent, etc.)",
                category: "Navigation",
                icon: Compass,
                action: () => navigateTo("#projects")
            },
            {
                id: "nav-skills",
                title: "Technical Stack & Competencies Matrix",
                category: "Navigation",
                icon: Compass,
                action: () => navigateTo("#skills")
            },
            {
                id: "nav-dsa",
                title: "Problem Solving & Algorithmic Practice",
                category: "Navigation",
                icon: Compass,
                action: () => navigateTo("#dsa")
            },
            {
                id: "nav-education",
                title: "Education & Key Coursework",
                category: "Navigation",
                icon: Compass,
                action: () => navigateTo("#education")
            },
            {
                id: "nav-certifications",
                title: "Certifications (AWS & MERN)",
                category: "Navigation",
                icon: Compass,
                action: () => navigateTo("#certifications")
            },
            {
                id: "nav-contact",
                title: "Contact & Direct Channels",
                category: "Navigation",
                icon: Compass,
                action: () => navigateTo("#contact")
            },

            // Ask Mahesh AI
            {
                id: "ai-role",
                title: "Ask AI: What is Mahesh's current role at Smart Interviews?",
                category: "Ask Mahesh AI",
                icon: Sparkles,
                action: () => {
                    setIsOpen(false);
                    askQuestion("What is Mahesh's current role at Smart Interviews?");
                }
            },
            {
                id: "ai-novabank",
                title: "Ask AI: Tell me about NovaBank and its architecture",
                category: "Ask Mahesh AI",
                icon: Sparkles,
                action: () => {
                    setIsOpen(false);
                    askQuestion("Tell me about NovaBank and its architecture.");
                }
            },
            {
                id: "ai-backend",
                title: "Ask AI: How strong is his backend and database depth?",
                category: "Ask Mahesh AI",
                icon: Sparkles,
                action: () => {
                    setIsOpen(false);
                    askQuestion("How strong is his backend and database depth?");
                }
            },
            {
                id: "ai-dsa",
                title: "Ask AI: What are his DSA metrics and favorite topics?",
                category: "Ask Mahesh AI",
                icon: Sparkles,
                action: () => {
                    setIsOpen(false);
                    askQuestion("Tell me about his DSA practice and problem solving metrics.");
                }
            },

            // Actions
            {
                id: "action-resume-preview",
                title: "Preview Résumé PDF in Browser",
                category: "Actions",
                icon: FileText,
                shortcut: "⌘P",
                action: () => {
                    setIsOpen(false);
                    const resumeBtn = document.getElementById("resumeLink");
                    if (resumeBtn) resumeBtn.click();
                    else window.open(profile.resumeUrl, "_blank");
                }
            },
            {
                id: "action-resume-download",
                title: "Download Résumé (Mahesh_Batta_Resume.pdf)",
                category: "Actions",
                icon: Download,
                action: () => {
                    setIsOpen(false);
                    const link = document.createElement("a");
                    link.href = profile.resumeUrl;
                    link.download = "Mahesh_Batta_Resume.pdf";
                    link.click();
                    showToast("Downloading résumé...");
                }
            },
            {
                id: "action-copy-email",
                title: `Copy Email (${contact.email})`,
                category: "Actions",
                icon: Mail,
                action: () => {
                    setIsOpen(false);
                    navigator.clipboard.writeText(contact.email).then(() => {
                        showToast("Email copied to clipboard!");
                    });
                }
            },
            {
                id: "action-github",
                title: "Open GitHub Profile",
                category: "Actions",
                icon: Globe,
                action: () => {
                    setIsOpen(false);
                    window.open(contact.github, "_blank");
                }
            },
            {
                id: "action-linkedin",
                title: "Open LinkedIn Profile",
                category: "Actions",
                icon: ExternalLink,
                action: () => {
                    setIsOpen(false);
                    window.open(contact.linkedin, "_blank");
                }
            },
            {
                id: "action-theme",
                title: "Toggle Dark / Light Mode",
                category: "Actions",
                icon: SunMoon,
                shortcut: "T",
                action: () => {
                    toggleTheme();
                    showToast("Color theme toggled");
                }
            }
        ];
    }, [askQuestion, toggleTheme, showToast]);

    const filteredItems = useMemo(() => {
        if (!query.trim()) return items;
        const q = query.toLowerCase();
        return items.filter(
            item => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
        );
    }, [items, query]);

    // Reset selected index on query change
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // Keyboard navigation within list
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredItems[selectedIndex]) {
                filteredItems[selectedIndex].action();
            }
        }
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-modal flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Palette Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -10 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="glass glass-strong relative w-full max-w-xl overflow-hidden rounded-[24px] border border-glass-border shadow-2xl z-10 flex flex-col max-h-[70vh]"
                        onKeyDown={handleKeyDown}
                    >
                        {/* Search Input Bar */}
                        <div className="flex items-center gap-3 border-b border-hairline px-4 py-3.5">
                            <Search className="h-4 w-4 text-text-tertiary flex-shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                placeholder="Type a command, question, or jump to section..."
                                className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-tertiary outline-none"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="text-text-tertiary hover:text-text-primary p-1"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                            <kbd className="hidden sm:inline font-mono text-[10px] bg-surface-3/70 text-text-tertiary px-1.5 py-0.5 rounded border border-hairline">
                                ESC
                            </kbd>
                        </div>

                        {/* Results List */}
                        <div className="flex-1 overflow-y-auto p-2 divide-y divide-hairline/40">
                            {filteredItems.length === 0 ? (
                                <div className="py-10 text-center text-text-tertiary text-[13px]">
                                    No results found for &ldquo;{query}&rdquo;.
                                </div>
                            ) : (
                                <div className="py-1">
                                    {filteredItems.map((item, index) => {
                                        const isSelected = index === selectedIndex;
                                        const Icon = item.icon;

                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => item.action()}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                                className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition-colors ${
                                                    isSelected
                                                        ? "bg-accent text-on-accent"
                                                        : "text-text-primary hover:bg-glass-faint"
                                                }`}
                                            >
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <Icon
                                                        className={`h-4 w-4 flex-shrink-0 ${
                                                            isSelected ? "text-on-accent" : "text-text-tertiary"
                                                        }`}
                                                    />
                                                    <span className="truncate font-medium">{item.title}</span>
                                                </div>

                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <span
                                                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                                            isSelected
                                                                ? "bg-white/20 text-on-accent"
                                                                : "bg-surface-3/60 text-text-tertiary"
                                                        }`}
                                                    >
                                                        {item.category}
                                                    </span>
                                                    {isSelected && (
                                                        <CornerDownLeft className="h-3.5 w-3.5 text-on-accent/80" />
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer Tips */}
                        <div className="flex items-center justify-between border-t border-hairline bg-surface-2/40 px-4 py-2.5 text-[11px] text-text-tertiary">
                            <span className="flex items-center gap-1.5">
                                Navigate with <kbd className="font-mono bg-surface-3/60 px-1 rounded">↑</kbd>{" "}
                                <kbd className="font-mono bg-surface-3/60 px-1 rounded">↓</kbd>
                            </span>
                            <span className="flex items-center gap-1.5">
                                Select <kbd className="font-mono bg-surface-3/60 px-1 rounded">↵</kbd>
                            </span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
