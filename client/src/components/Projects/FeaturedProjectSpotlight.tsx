import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "../../types";

export default function FeaturedProjectSpotlight({ project }: { project: Project }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group relative mb-5 overflow-hidden rounded-[28px] border border-glass-border bg-surface-3"
        >
            <div className="relative aspect-16/10 w-full overflow-hidden md:aspect-21/9">
                <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent md:bg-gradient-to-r md:from-black/75 md:via-black/30 md:to-transparent"
                />
            </div>

            <div className="p-3 md:absolute md:inset-y-3 md:left-3 md:flex md:w-[min(46%,520px)] md:items-end md:p-0">
                <div className="glass glass-strong w-full rounded-[22px] p-6 md:p-8">
                    <span className="eyebrow text-accent">{project.featuredLabel ?? "Featured"}</span>

                    <h3 className="mt-4 font-heading text-[clamp(1.4rem,2.6vw,2rem)] font-semibold leading-tight">
                        {project.name}
                    </h3>

                    <p className="mt-3.5 text-[14.5px] leading-relaxed text-text-secondary">{project.description}</p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.techStack.map(tech => (
                            <span
                                key={tech}
                                className="rounded-full border border-glass-border px-2.5 py-1 text-[11px] font-medium text-text-secondary"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 rounded-full border border-glass-border px-4 py-2 text-[12px] font-semibold text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
                            >
                                <i className="fa-brands fa-github" aria-hidden="true" /> Code
                            </a>
                        )}
                        {project.liveUrl ? (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 rounded-full bg-text-primary px-4 py-2 text-[12px] font-semibold text-bg transition-colors hover:bg-accent hover:text-on-accent"
                            >
                                <ExternalLink className="h-3.5 w-3.5" /> {project.liveLabel ?? "Live"}
                            </a>
                        ) : (
                            project.comingSoon && (
                                <span className="flex items-center gap-1.5 rounded-full border border-glass-border px-4 py-2 text-[12px] font-medium text-text-tertiary">
                                    <ExternalLink className="h-3.5 w-3.5" /> Live demo coming soon
                                </span>
                            )
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
}
