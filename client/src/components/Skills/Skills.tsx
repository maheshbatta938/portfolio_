import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SkillCategoryId } from "../../types";
import { skillFilters, skills } from "../../data/skills";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import FilterPills from "../common/FilterPills";
import TechStackDiagram from "./TechStackDiagram";

type FilterId = SkillCategoryId | "all";

export default function Skills() {
    const [activeFilter, setActiveFilter] = useState<FilterId>("all");

    const visibleSkills = activeFilter === "all" ? skills : skills.filter(s => s.category === activeFilter);

    return (
        <Section id="skills" fx="dots" intensity="base">
            <SectionHeading
                index="03"
                eyebrow="Tech stack"
                title="Tools I reach for daily."
                serifWords={["daily"]}
                description="Filter by languages, frontend, backend, databases and DevOps, or AI and data science."
                action={
                    <FilterPills
                        items={skillFilters}
                        activeId={activeFilter}
                        onChange={setActiveFilter}
                        layoutId="skill-filter-pill"
                    />
                }
            />

            {/* Each icon already carries its technology's own brand colour
                (devicon's `colored` variant) — real signal, not decoration —
                so unlike the categorical palette used elsewhere, these are
                left in full colour at rest rather than assigned a tint. The
                card's glow on hover uses the section's own ambience colour
                (--fx-tint), tying the tiles back to the dot field behind them. */}
            <div
                style={{ ["--tint" as string]: "var(--fx-tint)" }}
                className="grid grid-cols-[repeat(auto-fill,minmax(118px,1fr))] gap-3"
            >
                <AnimatePresence mode="popLayout">
                    {visibleSkills.map((skill, index) => (
                        <motion.div
                            key={`${skill.category}-${skill.name}`}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.012, ease: [0.16, 1, 0.3, 1] }}
                            className="glass-card sheen group flex flex-col items-center gap-3 rounded-[18px] px-3 py-5 text-center"
                        >
                            <i className={`${skill.iconClass} text-[26px]`} aria-hidden="true" />
                            <span className="text-[12px] font-medium leading-tight text-text-secondary transition-colors group-hover:text-text-primary">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <TechStackDiagram />
        </Section>
    );
}
