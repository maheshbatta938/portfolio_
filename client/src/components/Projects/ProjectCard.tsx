import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, MessageSquare } from "lucide-react";
import type { Project } from "../../types";
import { useAIAssistant } from "../../context/AIAssistantContext";

export default function ProjectCard({ project }: { project: Project }) {
    const { open: openAssistant } = useAIAssistant();

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-[24px] border border-glass-border bg-surface-3 md:block"
        >
            <div className="relative aspect-16/11 w-full overflow-hidden">
                <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                />

                {project.featured && (
                    <span className="glass glass-strong absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-primary">
                        {project.featuredLabel ?? "Featured"}
                    </span>
                )}

                <span
                    aria-hidden="true"
                    className="glass glass-strong absolute right-4 top-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full text-text-primary opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                >
                    <ArrowUpRight className="h-4 w-4" />
                </span>
            </div>

            {/* Caption plate: title always visible, the rest unfolds on hover
                (and sits below the image on touch widths, where there is no hover). */}
            <div className="p-2.5 pt-0 md:absolute md:inset-x-2.5 md:bottom-2.5 md:p-0">
                <div className="glass glass-strong overflow-hidden rounded-[18px] px-5 py-4">
                    <h3 className="font-heading text-[16.5px] font-semibold leading-snug text-text-primary">
                        {project.name}
                    </h3>

                    <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                            <p className="pt-2.5 text-[13px] leading-relaxed text-text-secondary">
                                {project.description}
                            </p>

                            <div className="mt-3.5 flex flex-wrap gap-1.5">
                                {project.techStack.map(tech => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-glass-border px-2.5 py-0.5 text-[10.5px] font-medium text-text-secondary"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 rounded-full border border-glass-border px-3 py-1.5 text-[11.5px] font-semibold text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
                                    >
                                        <i className="fa-brands fa-github text-[13px]" aria-hidden="true" /> Code
                                    </a>
                                )}

                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 rounded-full bg-text-primary px-3 py-1.5 text-[11.5px] font-semibold text-bg transition-colors hover:bg-accent hover:text-on-accent"
                                    >
                                        <ExternalLink className="h-3 w-3" /> {project.liveLabel ?? "Live"}
                                    </a>
                                )}

                                {project.isChatTrigger && (
                                    <button
                                        type="button"
                                        onClick={openAssistant}
                                        className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[11.5px] font-semibold text-on-accent transition-opacity hover:opacity-85"
                                    >
                                        <MessageSquare className="h-3 w-3" /> Try it
                                    </button>
                                )}

                                {project.comingSoon && !project.liveUrl && !project.isChatTrigger && (
                                    <span className="rounded-full border border-glass-border px-3 py-1.5 text-[11.5px] font-medium text-text-tertiary">
                                        Live demo soon
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}
