import { useState } from "react";
import { AnimatePresence } from "framer-motion";
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

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState<FilterId>("all");

    const spotlight = activeFilter === "all" ? projects.find(p => p.id === SPOTLIGHT_ID) : undefined;

    const visibleProjects = (
        activeFilter === "all" ? projects : projects.filter(p => p.categories.includes(activeFilter))
    ).filter(p => p.id !== spotlight?.id);

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
                        onChange={setActiveFilter}
                        layoutId="project-filter-pill"
                    />
                }
            />

            {spotlight && <FeaturedProjectSpotlight project={spotlight} />}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                    {visibleProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </AnimatePresence>
            </div>
        </Section>
    );
}
