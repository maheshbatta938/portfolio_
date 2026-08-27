import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BlurRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    /** Distance travelled, in px. Negative pulls from below. */
    y?: number;
}

/**
 * Focus-pull: content resolves from blurred and offset to sharp.
 * The quieter counterpart to WordReveal, for body copy and panels.
 */
export default function BlurReveal({ children, className = "", delay = 0, y = 18 }: BlurRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
