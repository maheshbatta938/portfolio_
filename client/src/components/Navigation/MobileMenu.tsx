import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { useActiveSection } from "../../hooks/useActiveSection";
import { navItems } from "./navItems";
import { contact } from "../../data/contact";

const sectionIds = navItems.map(item => item.id);

const socialLinks = [
    { label: "GitHub", href: contact.github },
    { label: "LinkedIn", href: contact.linkedin },
    { label: "LeetCode", href: contact.leetcode },
    { label: "Email", href: `mailto:${contact.email}` }
];

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
    const activeId = useActiveSection(sectionIds);

    // The sheet covers the viewport, so the page behind it must not scroll.
    useEffect(() => {
        if (!open) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="mobile-sheet"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    // z-dropdown sits over the page but under the header, so the
                    // header X stays clickable while the sheet is open.
                    className="glass glass-strong fixed inset-0 z-dropdown flex flex-col justify-between border-0 px-6 pb-10 pt-[86px] lg:hidden"
                >
                    <nav aria-label="Mobile" className="flex flex-col">
                        {navItems.map((item, i) => {
                            const isActive = activeId === item.id;
                            return (
                                <motion.a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={onClose}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 + i * 0.045, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="group flex items-baseline justify-between border-b border-hairline py-4"
                                >
                                    <span className="flex items-baseline gap-4">
                                        <span className="eyebrow text-text-tertiary">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span
                                            className={`font-heading text-[30px] font-semibold tracking-tight transition-colors ${
                                                isActive ? "text-accent" : "text-text-primary"
                                            }`}
                                        >
                                            {item.label}
                                        </span>
                                    </span>
                                    <ArrowUpRight className="h-5 w-5 text-text-tertiary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </motion.a>
                            );
                        })}
                    </nav>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 pt-8">
                        {socialLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className="link-underline text-[13px] font-medium text-text-secondary"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
