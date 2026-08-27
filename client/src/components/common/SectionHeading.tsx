import { motion } from "framer-motion";
import type { ReactNode } from "react";
import WordReveal from "./WordReveal";
import ScrambleText from "./ScrambleText";

interface SectionHeadingProps {
    index?: string;
    eyebrow: string;
    /** Plain text — it is split into words and revealed one at a time. */
    title: string;
    /** Words inside `title` to set in the display serif, matched case-insensitively. */
    serifWords?: string[];
    description?: ReactNode;
    align?: "center" | "left";
    action?: ReactNode;
}

export default function SectionHeading({
    index,
    eyebrow,
    title,
    serifWords = [],
    description,
    align = "left",
    action
}: SectionHeadingProps) {
    const centered = align === "center";

    return (
        <div
            className={`mb-14 flex flex-col gap-6 md:mb-16 ${
                centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
            }`}
        >
            <div className={`max-w-[760px] ${centered ? "" : "flex-1"}`}>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5 }}
                    className={`mb-5 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
                >
                    {index && (
                        <ScrambleText text={index} className="eyebrow text-text-tertiary" />
                    )}
                    <span
                        className="h-px w-8"
                        style={{ background: "var(--accent)" }}
                        aria-hidden="true"
                    />
                    <ScrambleText text={eyebrow} className="eyebrow text-text-secondary" />
                </motion.div>

                <WordReveal
                    as="h2"
                    text={title}
                    serifWords={serifWords}
                    stagger={0.05}
                    className="text-balance-tight text-[clamp(2rem,4.6vw,3.3rem)] font-semibold leading-[1.06]"
                />

                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className={`mt-5 text-[16.5px] leading-relaxed text-text-secondary ${centered ? "mx-auto" : ""}`}
                    >
                        {description}
                    </motion.p>
                )}
            </div>

            {action && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="flex-shrink-0"
                >
                    {action}
                </motion.div>
            )}
        </div>
    );
}
