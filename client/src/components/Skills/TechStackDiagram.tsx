import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { tintAt } from "../../lib/tints";
import { useAIAssistant } from "../../context/AIAssistantContext";

const layers = [
    {
        tier: "L1",
        label: "Client Tier",
        value: "React · Angular · Next.js",
        note: "Typed component architectures, dynamic forms, and responsive state flows"
    },
    {
        tier: "L2",
        label: "Service Tier",
        value: "Node.js · Express · NestJS",
        note: "RESTful microservices, rate-limiting layers, JWT auth, and background jobs"
    },
    {
        tier: "L3",
        label: "Data Tier",
        value: "MongoDB · MySQL · Redis",
        note: "Optimized schemas, question banks, indexing, and high-speed caching"
    },
    {
        tier: "L4",
        label: "Platform Tier",
        value: "Docker · AWS · CI/CD",
        note: "Containerized environments, cloud deploys, and automated workflows"
    }
];

export default function TechStackDiagram() {
    const { askQuestion } = useAIAssistant();

    return (
        <div className="mt-16 md:mt-20">
            <div className="mb-7 flex items-center gap-3">
                <span className="eyebrow text-accent">Architectural Stack</span>
                <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {layers.map((layer, i) => (
                    <motion.div
                        key={layer.label}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        style={tintAt(i)}
                        className="glass sheen top-rule group relative rounded-[20px] p-6"
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <span
                                className="font-mono text-[11px] font-bold tracking-wider px-2 py-0.5 rounded border border-hairline bg-surface-2/80 text-text-secondary"
                            >
                                {layer.tier}
                            </span>
                            <span className="eyebrow text-text-tertiary">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <p className="eyebrow mb-2" style={{ color: "var(--tint)" }}>
                            {layer.label}
                        </p>
                        <p className="font-heading text-[15px] font-semibold leading-snug text-text-primary">
                            {layer.value}
                        </p>
                        <p className="mt-2.5 text-[12.5px] leading-relaxed text-text-tertiary">{layer.note}</p>

                        <button
                            type="button"
                            onClick={() =>
                                askQuestion(
                                    `How does Mahesh architect and build solutions across the ${layer.label} (${layer.value})?`
                                )
                            }
                            className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-accent opacity-0 transition-opacity duration-300 focus-visible:opacity-100 group-hover:opacity-100"
                        >
                            <Sparkles className="h-3 w-3" /> Ask AI about {layer.tier} &rarr;
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
