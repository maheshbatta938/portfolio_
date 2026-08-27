import type { ChatComponent } from "../../types/index.js";

export default {
    name: "Work Experience",
    intentId: "experience",
    contextKeywords: [
        "experience",
        "job",
        "work",
        "working",
        "intern",
        "company",
        "role",
        "employment",
        "internship",
        "recordent",
        "codex",
        "codexintern",
        "currently",
        "now",
        "current",
        "career",
        "background"
    ],
    formatContext: data => {
        return data.workExperience
            .map(exp => {
                // Dates and the current-role marker matter more than anything
                // else here: without them the model cannot answer "what is he
                // doing now?" or "how long was he there?" without guessing.
                const status = exp.isCurrent ? " — THIS IS HIS CURRENT ROLE" : " (past role)";
                const where = exp.location ? `, ${exp.location}` : "";
                const when = exp.duration ? ` | ${exp.duration}` : "";
                const stack = exp.tech?.length ? `\n  Tech used: ${exp.tech.join(", ")}` : "";

                return (
                    `- **${exp.role}** at **${exp.company}**${where}${when}${status}\n` +
                    `  What he did:\n` +
                    exp.responsibilities.map(r => `    * ${r}`).join("\n") +
                    stack
                );
            })
            .join("\n");
    },
    intentKeywords: [
        /experience/i,
        /intern/i,
        /internship/i,
        /work/i,
        /company/i,
        /job/i,
        /recordent/i,
        /codex/i,
        /career/i,
        /history/i,
        /currently/i,
        /right now/i
    ],
    getFallbackReply: (data, query = "") => {
        const text = query.toLowerCase();

        const named = data.workExperience.find(e => {
            const company = e.company.toLowerCase();
            return text.includes(company.split(" ")[0]);
        });

        const target = named ?? data.workExperience.find(e => e.isCurrent) ?? data.workExperience[0];
        if (!target) {
            return "I don't have his experience details to hand — Mahesh can walk you through them at maheshbatta539@gmail.com.";
        }

        const lead = target.isCurrent
            ? `Right now Mahesh is a **${target.role}** at **${target.company}**`
            : `Mahesh worked as a **${target.role}** at **${target.company}**`;
        const when = target.duration ? ` (${target.duration})` : "";

        return `${lead}${when}.\n\n${target.responsibilities.map(r => `- ${r}`).join("\n")}`;
    }
} satisfies ChatComponent;
