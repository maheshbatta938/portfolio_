import { motion } from "framer-motion";
import { tintAt } from "../../lib/tints";

const layers = [
    {
        label: "Client",
        value: "React · Angular · Next.js",
        note: "Typed component systems and accessible UI",
        icon: "devicon-react-original colored"
    },
    {
        label: "Service",
        value: "Node.js · Express · NestJS",
        note: "REST APIs, JWT auth, background jobs",
        icon: "devicon-nodejs-plain colored"
    },
    {
        label: "Data",
        value: "MySQL · MongoDB · Redis",
        note: "Schema design, indexing, caching layers",
        icon: "devicon-mysql-plain colored"
    },
    {
        label: "Platform",
        value: "Docker · AWS · CI/CD",
        note: "Containerised builds and cloud deploys",
        icon: "devicon-docker-plain colored"
    }
];

export default function TechStackDiagram() {
    return (
        <div className="mt-16 md:mt-20">
            <div className="mb-7 flex items-center gap-3">
                <span className="eyebrow text-accent">The stack, top to bottom</span>
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
                            <i className={`${layer.icon} text-[22px]`} aria-hidden="true" />
                            <span className="eyebrow text-text-tertiary">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <p className="eyebrow mb-2" style={{ color: "var(--tint)" }}>
                            {layer.label}
                        </p>
                        <p className="font-heading text-[15px] font-semibold leading-snug text-text-primary">
                            {layer.value}
                        </p>
                        <p className="mt-2.5 text-[12.5px] leading-relaxed text-text-tertiary">{layer.note}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
