import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { profile } from "../../data/profile";
import { experience } from "../../data/experience";
import { contact } from "../../data/contact";
import { useTypingEffect } from "../../hooks/useTypingEffect";
import WordReveal from "../common/WordReveal";
import TechMarquee from "./TechMarquee";

const fade = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.5 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
    })
};

const links = [
    { label: "LinkedIn", href: contact.linkedin, icon: <i className="fa-brands fa-linkedin-in" aria-hidden="true" /> },
    { label: "GitHub", href: contact.github, icon: <i className="fa-brands fa-github" aria-hidden="true" /> },
    { label: "Email", href: `mailto:${contact.email}`, icon: <Mail className="h-3.5 w-3.5" /> },
    { label: "Résumé", href: profile.resumeUrl, icon: <Download className="h-3.5 w-3.5" />, download: true }
];

export default function Hero() {
    const typedRole = useTypingEffect(profile.typingRoles);
    const currentJob = experience.find(e => e.isCurrent);

    return (
        <section id="overview" className="relative overflow-hidden">
            {/* Hero owns its ambience directly: three drifting colour fields
                that the header pill and every hero chip blur against. */}
            <div aria-hidden="true" className="fx fx-grain">
                <div
                    className="hue-drift absolute left-[8%] top-[-26%] h-[54vw] max-h-[640px] min-h-[320px] w-[54vw] min-w-[320px] max-w-[640px] rounded-full blur-[90px]"
                    style={{ background: "var(--fx-tint)", opacity: "var(--fx-strength)" }}
                />
                <div
                    className="hue-drift absolute right-[4%] top-[-10%] h-[48vw] max-h-[580px] min-h-[280px] w-[48vw] min-w-[280px] max-w-[580px] rounded-full blur-[90px]"
                    style={{ background: "var(--fx-tint-2)", opacity: "var(--fx-strength)", animationDelay: "-11s" }}
                />
                <div
                    className="hue-drift absolute bottom-[4%] left-[34%] h-[42vw] max-h-[500px] min-h-[240px] w-[42vw] min-w-[240px] max-w-[500px] rounded-full blur-[90px]"
                    style={{ background: "var(--fx-tint)", opacity: "var(--fx-strength)", animationDelay: "-21s" }}
                />
                {/* Dots read light blue in light mode, light yellow in dark —
                    the same tint the rest of the page is built on. */}
                <div className="fx-dots absolute inset-0" />
            </div>

            <div className="relative z-content mx-auto flex w-full max-w-[900px] flex-col items-center px-6 pb-14 pt-[104px] text-center sm:px-8 md:pb-20 md:pt-[136px]">
                <motion.div variants={fade} initial="hidden" animate="show" custom={-4}>
                    <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2.5 pr-4">
                        <span className="soft-pulse h-1.5 w-1.5 rounded-full bg-accent" />
                        <span className="eyebrow text-text-secondary">{profile.availability}</span>
                    </span>
                </motion.div>

                <WordReveal
                    as="h1"
                    text={profile.fullName}
                    immediate
                    delay={0.15}
                    stagger={0.1}
                    className="mt-8 text-[clamp(3rem,11vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
                />

                <p className="display-serif mt-3 min-h-[1.35em] text-[clamp(1.4rem,4vw,2.4rem)] leading-tight text-accent">
                    {typedRole}
                    <span className="terminal-caret ml-0.5 inline-block h-[0.72em] w-[3px] translate-y-[0.05em] bg-accent align-middle" />
                </p>

                <motion.p
                    variants={fade}
                    initial="hidden"
                    animate="show"
                    custom={0}
                    className="text-balance-tight mt-7 max-w-[600px] text-[17px] leading-relaxed text-text-secondary"
                >
                    {profile.intro}
                </motion.p>

                {currentJob && (
                    <motion.p
                        variants={fade}
                        initial="hidden"
                        animate="show"
                        custom={1}
                        className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[13.5px] text-text-tertiary"
                    >
                        <span className="eyebrow">Now</span>
                        <span className="h-px w-5 bg-border-strong" aria-hidden="true" />
                        <span className="font-medium text-text-primary">{currentJob.role}</span>
                        <span>at {currentJob.company}</span>
                    </motion.p>
                )}

                <motion.div
                    variants={fade}
                    initial="hidden"
                    animate="show"
                    custom={2}
                    className="mt-10 flex flex-wrap items-center justify-center gap-3"
                >
                    <a
                        href="#projects"
                        className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-6.5 py-3.5 font-heading text-sm font-semibold text-on-accent transition-all duration-300 hover:bg-accent-hover"
                    >
                        See the work
                        <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                    </a>
                    <a
                        href="#contact"
                        className="glass inline-flex items-center gap-2.5 rounded-full px-6.5 py-3.5 font-heading text-sm font-semibold text-text-primary transition-colors duration-300 hover:text-accent"
                    >
                        Get in touch
                    </a>
                </motion.div>

                <motion.div
                    variants={fade}
                    initial="hidden"
                    animate="show"
                    custom={3}
                    className="mt-9 flex flex-wrap items-center justify-center gap-2"
                >
                    {links.map(link => (
                        <a
                            key={link.label}
                            id={link.label === "Résumé" ? "resumeLink" : undefined}
                            href={link.href}
                            target={link.href.startsWith("mailto:") || link.download ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            download={link.download ? "Mahesh_Batta_Resume.pdf" : undefined}
                            className="glass-faint flex items-center gap-2 rounded-full border border-glass-border px-3.5 py-2 text-[12.5px] font-medium text-text-secondary transition-all duration-300 hover:border-accent-border hover:text-accent"
                        >
                            {link.icon}
                            {link.label}
                        </a>
                    ))}
                </motion.div>
            </div>

            <div className="relative z-content mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-14">
                <TechMarquee />
            </div>
        </section>
    );
}
