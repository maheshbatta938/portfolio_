import { motion } from "framer-motion";
import { certifications } from "../../data/certifications";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import { tintAt } from "../../lib/tints";

export default function Certifications() {
    return (
        <Section id="certifications" fx="lines" intensity="subtle">
            <SectionHeading
                index="06"
                eyebrow="Certifications"
                title="Milestones worth noting."
                serifWords={["noting"]}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {certifications.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                        style={tintAt(index)}
                        className="glass-card sheen top-rule group flex items-start gap-5 rounded-[22px] p-6"
                    >
                        <span className="icon-chip h-12 w-12 rounded-xl">
                            <i className={`${item.icon} text-[18px]`} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                            <h3 className="font-heading text-[15px] font-semibold leading-snug">{item.title}</h3>
                            <p className="mt-1.5 text-[12.5px] text-text-tertiary">{item.issuer}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
