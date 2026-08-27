import { Calendar, GraduationCap, MapPin } from "lucide-react";
import { education } from "../../data/education";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import BlurReveal from "../common/BlurReveal";
import { tint } from "../../lib/tints";

export default function Education() {
    return (
        <Section id="education" fx="topo" intensity="base">
            <SectionHeading
                index="05"
                eyebrow="Education"
                title="Where it started."
                serifWords={["started"]}
            />

            <BlurReveal className="glass grid grid-cols-1 gap-8 rounded-[26px] p-8 md:grid-cols-[auto_1fr] md:gap-12 md:p-12">
                <div className="flex flex-row items-center gap-5 md:flex-col md:items-start" style={tint("indigo")}>
                    <span className="icon-chip h-14 w-14 rounded-2xl">
                        <GraduationCap className="h-6 w-6" />
                    </span>
                    <div className="md:mt-2">
                        <p className="eyebrow text-text-tertiary">CGPA</p>
                        <p className="font-heading text-[28px] font-semibold leading-none tracking-tight">
                            {education.cgpa}
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="font-heading text-[clamp(1.35rem,2.6vw,1.9rem)] font-semibold leading-tight">
                        {education.degree}
                    </h3>
                    <p className="mt-2 text-[15.5px] text-text-secondary">{education.specialization}</p>
                    <p className="display-serif mt-4 text-[19px] text-accent">{education.college}</p>

                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-text-tertiary">
                        <span className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5" /> {education.startYear} — {education.endYear}
                        </span>
                        <span className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5" /> {education.location}
                        </span>
                    </div>

                    <p className="mt-6 border-t border-hairline pt-6 text-[14.5px] leading-relaxed text-text-secondary">
                        {education.description}
                    </p>
                </div>
            </BlurReveal>
        </Section>
    );
}
