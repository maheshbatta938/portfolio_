import { skills } from "../../data/skills";

// One continuous strip, duplicated so the -50% translate loops seamlessly.
const strip = skills.filter(s => s.category !== "ai-ml");

export default function TechMarquee() {
    const handleSkillClick = () => {
        const skillsSection = document.getElementById("skills");
        if (skillsSection) {
            skillsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="marquee-mask marquee-pause relative w-full overflow-hidden border-y border-hairline py-5">
            <div className="marquee-track gap-10 pr-10">
                {[0, 1].map(copy => (
                    <div key={copy} className="flex items-center gap-10 pr-10" aria-hidden={copy === 1}>
                        {strip.map(skill => (
                            <button
                                key={`${copy}-${skill.name}`}
                                type="button"
                                onClick={handleSkillClick}
                                title={`View ${skill.name} in Skills matrix`}
                                className="flex flex-shrink-0 items-center gap-2.5 text-text-tertiary opacity-70 grayscale transition-all duration-300 hover:text-accent hover:opacity-100 hover:grayscale-0 hover:scale-105 cursor-pointer"
                            >
                                <i className={`${skill.iconClass} text-[19px]`} aria-hidden="true" />
                                <span className="whitespace-nowrap font-heading text-[13px] font-medium">
                                    {skill.name}
                                </span>
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
