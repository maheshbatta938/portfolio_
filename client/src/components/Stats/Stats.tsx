import { motion } from "framer-motion";
import type { StatItem } from "../../types";
import { stats } from "../../data/stats";
import { useCountUp } from "../../hooks/useCountUp";
import Section from "../common/Section";
import { tintAt } from "../../lib/tints";

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
    const { ref, value } = useCountUp<HTMLDivElement>(stat.value);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={tintAt(index)}
            className="glass-card sheen top-rule group flex flex-col justify-between gap-6 rounded-[22px] p-6 md:p-7"
        >
            {/* Fixed size rather than clamp(), and tabular figures, so all four
                numerals sit on one baseline at every width and the counter does
                not jitter as the digits tick up. */}
            <p className="font-heading text-[38px] font-semibold leading-none tracking-tight text-text-primary tabular-nums md:text-[42px]">
                {value.toLocaleString()}
                <span style={{ color: "var(--tint)" }}>{stat.suffix}</span>
            </p>
            <span className="text-[13px] font-medium leading-snug text-text-secondary">{stat.label}</span>
        </motion.div>
    );
}

export default function Stats() {
    return (
        <Section label="Career at a glance" fx="lines" intensity="subtle" flush className="pb-8 pt-16 md:pb-12 md:pt-20">
            {/* Four equal cards on the same grid the rest of the page uses.
                The single bordered strip this replaces needed nth-child border
                maths that broke alignment at every breakpoint, and matched
                nothing above or below it. */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
                {stats.map((stat, i) => (
                    <StatCard key={stat.label} stat={stat} index={i} />
                ))}
            </div>
        </Section>
    );
}
