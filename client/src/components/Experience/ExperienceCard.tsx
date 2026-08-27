import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Sparkles, Wrench } from "lucide-react";
import type { WorkExperience } from "../../types";
import { tint } from "../../lib/tints";

function Bullet({ text }: { text: string }) {
    return (
        <li className="relative pl-5 text-[14px] leading-relaxed text-text-secondary">
            <span className="absolute left-0 top-[0.68em] h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            {text}
        </li>
    );
}

export default function ExperienceCard({ job, index }: { job: WorkExperience; index: number }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
        >
            {/* Node on the spine */}
            <span
                aria-hidden="true"
                className={`absolute -left-12 top-9 hidden h-[15px] w-[15px] items-center justify-center rounded-full md:flex ${
                    job.isCurrent ? "bg-accent-soft" : ""
                }`}
            >
                <span
                    className={`h-[9px] w-[9px] rounded-full ${
                        job.isCurrent ? "soft-pulse bg-accent" : "border border-border-strong bg-bg"
                    }`}
                />
            </span>

            <div
                className={`glass rounded-[24px] p-6 md:p-8 ${
                    job.isCurrent ? "border-accent-border" : ""
                }`}
            >
                <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <span
                            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl font-heading text-[17px] font-semibold ${
                                job.isCurrent
                                    ? "bg-accent text-on-accent"
                                    : "border border-glass-border bg-glass-faint text-text-primary"
                            }`}
                        >
                            {job.badgeInitial}
                        </span>
                        <div>
                            <h3 className="font-heading text-[19px] font-semibold leading-snug">{job.role}</h3>
                            <p className="mt-1 text-[14px] text-text-secondary">
                                {job.company}
                                <span className="text-text-tertiary"> · {job.location}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 sm:items-end">
                        {job.isCurrent && (
                            <span className="flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-accent">
                                <span className="soft-pulse h-1.5 w-1.5 rounded-full bg-accent" />
                                Current
                            </span>
                        )}
                        <span className="eyebrow whitespace-nowrap text-text-tertiary">{job.dateRange}</span>
                    </div>
                </header>

                <ul className="space-y-3">
                    {job.highlights.map(item => (
                        <Bullet key={item} text={item} />
                    ))}
                </ul>

                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-3 overflow-hidden"
                        >
                            <li className="h-3" aria-hidden="true" />
                            {job.moreDetails.map(item => (
                                <Bullet key={item} text={item} />
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>

                {job.moreDetails.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setExpanded(prev => !prev)}
                        className="mt-4 flex items-center gap-1.5 text-[12.5px] font-semibold text-accent transition-opacity hover:opacity-70"
                    >
                        {expanded ? "Show less" : `${job.moreDetails.length} more highlights`}
                        <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                        />
                    </button>
                )}

                <div className="mt-6 flex flex-wrap gap-1.5">
                    {job.tech.map(tech => (
                        <span
                            key={tech}
                            className="rounded-full border border-glass-border bg-glass-faint px-3 py-1 text-[11.5px] font-medium text-text-secondary"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {(job.ownership || job.buildFlow) && (
                    <div className="mt-7 grid grid-cols-1 gap-4 border-t border-hairline pt-7 md:grid-cols-2">
                        {job.ownership && (
                            <div className="rounded-2xl border border-accent-border bg-accent-soft p-5">
                                <div className="eyebrow mb-3 flex items-center gap-2 text-accent">
                                    <Sparkles className="h-3.5 w-3.5" /> {job.ownership.label}
                                </div>
                                <h4 className="mb-2 font-heading text-[14.5px] font-semibold">{job.ownership.title}</h4>
                                <p className="text-[13px] leading-relaxed text-text-secondary">
                                    {job.ownership.description}
                                </p>
                            </div>
                        )}

                        {job.buildFlow && (
                            <div className="rounded-2xl border border-accent-border bg-accent-soft p-5">
                                <div className="eyebrow mb-3 flex items-center gap-2 text-accent">
                                    <Wrench className="h-3.5 w-3.5" /> {job.buildFlow.label}
                                </div>
                                <h4 className="mb-3 font-heading text-[14.5px] font-semibold">{job.buildFlow.title}</h4>
                                <div className="mb-4 flex flex-wrap gap-1.5">
                                    {job.buildFlow.items.map(item => (
                                        <span
                                            key={item}
                                            className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10.5px] text-text-tertiary">
                                    {job.buildFlow.flow.map((step, i) => (
                                        <span key={step} className="flex items-center gap-1.5">
                                            <span className="rounded-md bg-surface-3 px-2 py-1 text-text-secondary">
                                                {step}
                                            </span>
                                            {i < job.buildFlow!.flow.length - 1 && <span>&rarr;</span>}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.article>
    );
}
