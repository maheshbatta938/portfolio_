import { ArrowUpRight } from "lucide-react";
import { dsa } from "../../data/dsa";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import BlurReveal from "../common/BlurReveal";

export default function Coding() {
    return (
        <Section id="dsa" fx="rings" intensity="subtle">
            <SectionHeading
                index="04"
                eyebrow="Problem solving"
                title="Fundamentals, kept sharp."
                serifWords={["sharp"]}
            />

            <BlurReveal className="glass grid grid-cols-1 overflow-hidden rounded-[26px] lg:grid-cols-[0.85fr_1.15fr]">
                <div className="flex flex-col justify-center gap-5 border-b border-hairline p-8 md:p-10 lg:border-b-0 lg:border-r">
                    <p className="font-heading text-[clamp(3rem,7vw,4.6rem)] font-semibold leading-none tracking-tight">
                        {dsa.totalSolved}
                        <span className="text-accent">+</span>
                    </p>
                    <p className="max-w-[280px] text-[14.5px] leading-relaxed text-text-secondary">
                        Problems solved across LeetCode and GeeksforGeeks.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {dsa.links.map(link => (
                            <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-1.5 rounded-full border border-glass-border bg-glass-faint px-4 py-2 text-[12.5px] font-semibold text-text-secondary transition-colors hover:border-accent-border hover:text-accent"
                            >
                                {link.label}
                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="p-8 md:p-10">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="eyebrow text-text-tertiary">Core areas</span>
                        <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {dsa.topics.map(topic => (
                            <span
                                key={topic}
                                className="rounded-full border border-glass-border px-3.5 py-1.5 text-[12.5px] font-medium text-text-secondary transition-colors hover:border-accent-border hover:text-accent"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            </BlurReveal>
        </Section>
    );
}
