import { motion } from "framer-motion";
import type { ElementType } from "react";

interface WordRevealProps {
    text: string;
    as?: ElementType;
    className?: string;
    /** Seconds before the first word moves. */
    delay?: number;
    /** Seconds between consecutive words. */
    stagger?: number;
    /** Play on mount instead of waiting for the section to scroll into view. */
    immediate?: boolean;
    /** Words rendered in the display serif — matched case-insensitively. */
    serifWords?: string[];
}

/**
 * Words rise out of a clipping mask, one after the next.
 * Used for the largest headlines, where the motion has room to read.
 */
export default function WordReveal({
    text,
    as: Tag = "span",
    className = "",
    delay = 0,
    stagger = 0.06,
    immediate = false,
    serifWords = []
}: WordRevealProps) {
    const words = text.split(" ");
    const serif = new Set(serifWords.map(w => w.toLowerCase()));

    const animationProps = immediate
        ? { animate: "show" as const }
        : { whileInView: "show" as const, viewport: { once: true, amount: 0.4 } };

    return (
        <Tag className={className}>
            <motion.span
                initial="hidden"
                {...animationProps}
                transition={{ staggerChildren: stagger, delayChildren: delay }}
                className="inline"
            >
                {words.map((word, i) => {
                    const isSerif = serif.has(word.toLowerCase().replace(/[^a-z]/g, ""));
                    return (
                        <span
                            key={`${word}-${i}`}
                            // Extra vertical room so descenders and the serif
                            // italic are not clipped by the mask.
                            className="inline-block overflow-hidden py-[0.12em] align-bottom"
                        >
                            <motion.span
                                variants={{
                                    hidden: { y: "110%", opacity: 0 },
                                    show: {
                                        y: "0%",
                                        opacity: 1,
                                        transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
                                    }
                                }}
                                className={`inline-block ${isSerif ? "display-serif text-accent" : ""}`}
                            >
                                {word}
                            </motion.span>
                            {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                        </span>
                    );
                })}
            </motion.span>
        </Tag>
    );
}
