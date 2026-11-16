import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import type { ProjectCategory } from "../../types";
import { projects } from "../../data/projects";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import FilterPills from "../common/FilterPills";
import ProjectCard from "./ProjectCard";
import FeaturedProjectSpotlight from "./FeaturedProjectSpotlight";

type FilterId = "all" | ProjectCategory;

const filters: { id: FilterId; label: string }[] = [
    { id: "all", label: "All" },
    { id: "web", label: "Web apps" },
    { id: "ai", label: "AI & data" }
];

const SPOTLIGHT_ID = "novabank";

// Top featured tech tags for quick filtering
const POPULAR_TECHS = ["Node.js", "React", "Angular", "Docker", "Gemini AI", "Redis", "Python", "MySQL"];

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState<FilterId>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTech, setSelectedTech] = useState<string | null>(null);

    const filteredProjects = useMemo(() => {
        return projects.filter(p => {
            const matchesCategory = activeFilter === "all" || p.categories.includes(activeFilter);
            if (!matchesCategory) return false;

            if (selectedTech && !p.techStack.includes(selectedTech)) return false;

            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return (
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.techStack.some(t => t.toLowerCase().includes(q)) ||
                Boolean(p.impact && p.impact.toLowerCase().includes(q))
            );
        });
    }, [activeFilter, selectedTech, searchQuery]);

    const isSearchingOrFiltering = Boolean(searchQuery.trim() || selectedTech);

    const spotlight =
        !isSearchingOrFiltering && activeFilter === "all"
            ? filteredProjects.find(p => p.id === SPOTLIGHT_ID)
            : undefined;

    const visibleProjects = filteredProjects.filter(p => p.id !== spotlight?.id);

    return (
        <Section id="projects" fx="beams" intensity="bold" grain>
            <SectionHeading
                index="02"
                eyebrow="Selected work"
                title="Things I’ve built."
                serifWords={["built"]}
                action={
                    <FilterPills
                        items={filters}
                        activeId={activeFilter}
                        onChange={id => {
                            setActiveFilter(id);
                            setSelectedTech(null);
                        }}
                        layoutId="project-filter-pill"
                    />
                }
            />

            {/* Quick search & tech filter bar */}
            <div className="mb-8 flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Filter by title, stack, or keywords..."
                            className="glass w-full rounded-full py-2 pl-9 pr-8 text-[13px] text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>

                    <div className="text-[12px] font-mono text-text-tertiary">
                        Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
                    </div>
                </div>

                {/* Popular tech pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                    <span className="eyebrow mr-1 text-[10.5px] text-text-tertiary">Filter by stack:</span>
                    {POPULAR_TECHS.map(tech => {
                        const isActive = selectedTech === tech;
                        return (
                            <button
                                key={tech}
                                type="button"
                                onClick={() => setSelectedTech(isActive ? null : tech)}
                                className={`rounded-full border px-2.5 py-1 text-[11px] font-mono transition-all ${
                                    isActive
                                        ? "border-accent bg-accent text-on-accent"
                                        : "border-glass-border bg-glass-faint text-text-secondary hover:border-accent-border hover:text-accent"
                                }`}
                            >
                                {tech}
                            </button>
                        );
                    })}
                    {selectedTech && (
                        <button
                            type="button"
                            onClick={() => setSelectedTech(null)}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-text-tertiary hover:text-accent ml-1"
                        >
                            <X className="h-3 w-3" /> Clear
                        </button>
                    )}
                </div>
            </div>

            {spotlight && <FeaturedProjectSpotlight project={spotlight} />}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                    {visibleProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
                <div className="glass rounded-[24px] p-12 text-center my-6 flex flex-col items-center justify-center gap-3">
                    <p className="font-heading text-[17px] font-semibold text-text-primary">
                        No projects match your current filters.
                    </p>
                    <p className="text-[13px] text-text-secondary max-w-sm">
                        Try clearing your search query or stack filters to view all available work.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedTech(null);
                            setActiveFilter("all");
                        }}
                        className="mt-2 rounded-full bg-accent px-4 py-2 text-[12px] font-semibold text-on-accent hover:bg-accent-hover transition-colors"
                    >
                        Reset all filters
                    </button>
                </div>
            )}
        </Section>
    );
}
