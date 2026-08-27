import { motion } from "framer-motion";
import { useActiveSection } from "../../hooks/useActiveSection";
import { navItems } from "./navItems";

const sectionIds = navItems.map(item => item.id);

export default function Navigation() {
    const activeId = useActiveSection(sectionIds);

    return (
        // Absolutely centred inside the header pill so it stays put no matter
        // how wide the wordmark or the action cluster gets.
        <nav
            aria-label="Primary"
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 items-center lg:flex"
        >
            <div className="pointer-events-auto flex items-center gap-0.5">
                {navItems.map(item => {
                    const isActive = activeId === item.id;
                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            aria-current={isActive ? "true" : undefined}
                            className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                                isActive ? "text-text-primary" : "text-text-tertiary hover:text-text-primary"
                            }`}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="nav-active-pill"
                                    className="absolute inset-0 rounded-full bg-glass-faint ring-1 ring-glass-border"
                                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                                />
                            )}
                            <span className="relative">{item.label}</span>
                        </a>
                    );
                })}
            </div>
        </nav>
    );
}
