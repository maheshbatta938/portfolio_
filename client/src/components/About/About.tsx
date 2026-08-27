import { motion } from "framer-motion";
import { Brain, Code2, Layers, Server } from "lucide-react";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import { tint } from "../../lib/tints";

const capabilities = [
    {
        icon: Server,
        title: "Backend engineering",
        description:
            "RESTful microservices, JWT-guarded routes, Redis caching and Docker images — built to survive real traffic.",
        tint: "cyan"
    },
    {
        icon: Layers,
        title: "System design",
        description: "Distributed architectures, schema modelling, and modular client interfaces in Angular and React.",
        tint: "indigo"
    },
    {
        icon: Brain,
        title: "AI & data science",
        description: "Predictive models, data pipelines, and NLP or GenAI integrations wired into product surfaces.",
        tint: "magenta"
    },
    {
        icon: Code2,
        title: "Algorithmic depth",
        description: "400+ problems solved across LeetCode and GeeksforGeeks — fundamentals that hold under pressure.",
        tint: "orange"
    }
] as const;

export default function About() {
    return (
        <Section id="about" fx="wash" intensity="base" grain>
            <SectionHeading
                index="00"
                eyebrow="About"
                title="Scalable backends and AI-powered products."
                serifWords={["AI-powered"]}
                description="A software engineer focused on backend architecture, query performance, secure API design, and containerised cloud deployments — with the DSA fundamentals and ML integration skills to back it up."
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {capabilities.map((card, index) => (
                    <motion.article
                        key={card.title}
                        initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.7, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
                        style={tint(card.tint)}
                        className="glass-card sheen top-rule group flex flex-col rounded-[22px] p-7"
                    >
                        <span className="icon-chip mb-6 h-11 w-11 rounded-xl">
                            <card.icon className="h-[18px] w-[18px]" />
                        </span>
                        <h3 className="mb-2.5 font-heading text-[17px] font-semibold">{card.title}</h3>
                        <p className="text-[14px] leading-relaxed text-text-secondary">{card.description}</p>
                        <span
                            aria-hidden="true"
                            style={{ background: "var(--tint)" }}
                            className="mt-6 h-px w-full origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                        />
                    </motion.article>
                ))}
            </div>
        </Section>
    );
}
