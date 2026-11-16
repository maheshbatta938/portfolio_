import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Search } from "lucide-react";
import type { SkillCategoryId } from "../../types";
import { skillFilters, skillMatrix } from "../../data/skills";
import { useToast } from "../../context/ToastContext";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import FilterPills from "../common/FilterPills";
import TechStackDiagram from "./TechStackDiagram";

type FilterId = SkillCategoryId | "all";

export default function Skills() {
    const { showToast } = useToast();
    const [activeFilter, setActiveFilter] = useState<FilterId>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [copiedStack, setCopiedStack] = useState(false);

    const handleCopyStack = () => {
        const lines = skillMatrix.map(
            row => `• ${row.domain} (${row.proficiency}):\n  ${row.technologies.join(", ")}`
        );
        const text = `Mahesh Batta — Technical Competencies & Tech Stack:\n\n${lines.join("\n\n")}`;
        navigator.clipboard.writeText(text).then(() => {
            setCopiedStack(true);
            showToast("Complete tech stack copied to clipboard!");
            setTimeout(() => setCopiedStack(false), 2000);
        });
    };

    const filteredRows = useMemo(() => {
        return skillMatrix.filter(row => {
            const matchesCategory = activeFilter === "all" || row.category === activeFilter;
            if (!matchesCategory) return false;

            if (!searchQuery.trim()) return true;

            const query = searchQuery.toLowerCase();
            const matchesDomain = row.domain.toLowerCase().includes(query);
            const matchesDescription = row.description.toLowerCase().includes(query);
            const matchesTech = row.technologies.some(tech => tech.toLowerCase().includes(query));
            const matchesApplied = row.appliedIn.toLowerCase().includes(query);

            return matchesDomain || matchesDescription || matchesTech || matchesApplied;
        });
    }, [activeFilter, searchQuery]);

    const getProficiencyStyle = (proficiency: string) => {
        switch (proficiency) {
            case "Production / Core":
                return "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
            case "Advanced":
                return "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400";
            case "Proficient":
                return "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400";
            default:
                return "border-gray-500/30 bg-gray-500/10 text-text-secondary";
        }
    };

    const getProficiencyBar = (proficiency: string): { width: string; color: string } => {
        switch (proficiency) {
            case "Production / Core":
                return { width: "100%", color: "bg-emerald-500/70" };
            case "Advanced":
                return { width: "80%", color: "bg-blue-500/70" };
            case "Proficient":
                return { width: "60%", color: "bg-indigo-500/70" };
            default:
                return { width: "40%", color: "bg-gray-500/70" };
        }
    };

    return (
        <Section id="skills" fx="dots" intensity="base">
            <SectionHeading
                index="03"
                eyebrow="Tech Stack & Competencies"
                title="Structured technical matrix."
                serifWords={["technical"]}
                description="Comprehensive tabular breakdown of core technologies, production-tested proficiencies, and real-world system applications."
                action={
                    <FilterPills
                        items={skillFilters}
                        activeId={activeFilter}
                        onChange={setActiveFilter}
                        layoutId="skill-filter-pill"
                    />
                }
            />

            {/* Quick search & filter indicator */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search tech, domain, or use case..."
                        className="glass w-full rounded-full py-2 pl-9 pr-4 text-[13px] text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleCopyStack}
                        title="Copy structured tech stack matrix to clipboard"
                        className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium text-text-secondary transition-all hover:border-accent-border hover:text-accent cursor-pointer"
                    >
                        {copiedStack ? (
                            <Check className="h-3.5 w-3.5 text-accent" />
                        ) : (
                            <Copy className="h-3.5 w-3.5" />
                        )}
                        <span>{copiedStack ? "Copied matrix" : "Copy stack"}</span>
                    </button>
                    <div className="text-[12px] font-mono text-text-tertiary">
                        Showing {filteredRows.length} domain{filteredRows.length !== 1 ? "s" : ""}
                    </div>
                </div>
            </div>

            {/* Tabular Domain Matrix (Zero Icons) */}
            <div className="glass-card sheen overflow-hidden rounded-[22px] border border-hairline shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left border-collapse">
                        <thead>
                            <tr className="border-b border-hairline bg-surface-2/60 text-[11.5px] uppercase tracking-wider font-semibold text-text-tertiary">
                                <th scope="col" className="px-6 py-4 w-[24%]">
                                    Domain / Area
                                </th>
                                <th scope="col" className="px-6 py-4 w-[36%]">
                                    Core Technologies
                                </th>
                                <th scope="col" className="px-6 py-4 w-[16%]">
                                    Proficiency
                                </th>
                                <th scope="col" className="px-6 py-4 w-[24%]">
                                    Production Scope & Applied In
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-hairline text-[13.5px]">
                            <AnimatePresence mode="popLayout">
                                {filteredRows.map((row, index) => (
                                    <motion.tr
                                        key={row.id}
                                        layout
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.28, delay: index * 0.04 }}
                                        className="group transition-colors duration-200 hover:bg-glass-bg-strong"
                                    >
                                        {/* Domain Column */}
                                        <td className="px-6 py-5 align-top">
                                            <div className="font-heading font-semibold text-[15px] text-text-primary group-hover:text-accent transition-colors">
                                                {row.domain}
                                            </div>
                                            <div className="mt-1 text-[12px] leading-relaxed text-text-tertiary">
                                                {row.description}
                                            </div>
                                        </td>

                                        {/* Technologies Column (Text Badges Only - Zero Icons) */}
                                        <td className="px-6 py-5 align-top">
                                            <div className="flex flex-wrap gap-1.5">
                                                {row.technologies.map(tech => (
                                                    <span
                                                        key={tech}
                                                        className="inline-flex items-center rounded-md border border-hairline bg-surface-2/80 px-2.5 py-1 text-[12px] font-mono font-medium text-text-secondary transition-all hover:border-accent-border hover:bg-surface-3 hover:text-text-primary"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>

                                        {/* Proficiency Column */}
                                        <td className="px-6 py-5 align-top whitespace-nowrap">
                                            <div className="flex flex-col gap-1.5">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${getProficiencyStyle(
                                                        row.proficiency
                                                    )}`}
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                    {row.proficiency}
                                                </span>
                                                <div className="h-1.5 w-32 rounded-full bg-surface-3/50">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-700 ease-out ${getProficiencyBar(row.proficiency).color}`}
                                                        style={{ width: getProficiencyBar(row.proficiency).width }}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        {/* Applied In Column */}
                                        <td className="px-6 py-5 align-top">
                                            <p className="text-[12.5px] leading-relaxed text-text-secondary">
                                                {row.appliedIn}
                                            </p>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            {filteredRows.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-text-tertiary text-[14px]">
                                        No technologies found matching &ldquo;{searchQuery}&rdquo;. Try clearing the search or choosing another filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <TechStackDiagram />
        </Section>
    );
}
