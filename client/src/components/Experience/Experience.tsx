import { experience } from "../../data/experience";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {
    return (
        <Section id="experience" fx="grid" intensity="subtle">
            <SectionHeading
                index="01"
                eyebrow="Experience"
                title="Where I’ve shipped."
                serifWords={["shipped"]}
            />

            <div className="relative">
                {/* The spine, faded at both ends so it never terminates hard. */}
                <div
                    aria-hidden="true"
                    className="absolute left-[7px] top-2 hidden h-[calc(100%-16px)] w-px md:block"
                    style={{
                        background:
                            "linear-gradient(to bottom, transparent, var(--border-strong) 8%, var(--border-strong) 92%, transparent)"
                    }}
                />

                <div className="flex flex-col gap-6 md:pl-12">
                    {experience.map((job, index) => (
                        <ExperienceCard key={job.id} job={job} index={index} />
                    ))}
                </div>
            </div>
        </Section>
    );
}
