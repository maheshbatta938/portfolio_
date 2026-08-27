import { motion } from "framer-motion";

interface FilterPillsProps<T extends string> {
    items: readonly { id: T; label: string }[];
    activeId: T;
    onChange: (id: T) => void;
    /** Unique per instance — two segmented controls must not share a layout animation. */
    layoutId: string;
}

/** Glass segmented control with a sliding indicator. */
export default function FilterPills<T extends string>({ items, activeId, onChange, layoutId }: FilterPillsProps<T>) {
    return (
        <div className="glass flex flex-wrap items-center gap-1 rounded-full p-1">
            {items.map(item => {
                const isActive = activeId === item.id;
                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onChange(item.id)}
                        aria-pressed={isActive}
                        className={`relative rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors duration-300 ${
                            isActive ? "text-bg" : "text-text-secondary hover:text-text-primary"
                        }`}
                    >
                        {isActive && (
                            <motion.span
                                layoutId={layoutId}
                                className="absolute inset-0 rounded-full bg-text-primary"
                                transition={{ type: "spring", stiffness: 420, damping: 36 }}
                            />
                        )}
                        <span className="relative whitespace-nowrap">{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
