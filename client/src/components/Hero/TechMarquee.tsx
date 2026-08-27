import { skills } from "../../data/skills";

// One continuous strip, duplicated so the -50% translate loops seamlessly.
const strip = skills.filter(s => s.category !== "ai-ml");

export default function TechMarquee() {
    return (
        <div className="marquee-mask marquee-pause relative w-full overflow-hidden border-y border-hairline py-5">
            <div className="marquee-track gap-10 pr-10">
                {[0, 1].map(copy => (
                    <div key={copy} className="flex items-center gap-10 pr-10" aria-hidden={copy === 1}>
                        {strip.map(skill => (
                            <span
                                key={`${copy}-${skill.name}`}
                                className="flex flex-shrink-0 items-center gap-2.5 text-text-tertiary opacity-70 grayscale transition-all duration-500 hover:text-text-primary hover:opacity-100 hover:grayscale-0"
                            >
                                <i className={`${skill.iconClass} text-[19px]`} aria-hidden="true" />
                                <span className="whitespace-nowrap font-heading text-[13px] font-medium">
                                    {skill.name}
                                </span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
