export default {
    name: "Work Experience",
    intentId: "experience",
    contextKeywords: ["experience", "job", "work", "intern", "company", "role", "employment", "internship", "recordent", "codex"],
    formatContext: (data) => {
        return data.workExperience.map((exp) => (
            `- **${exp.role}** at **${exp.company}**\n  Responsibilities:\n` +
            exp.responsibilities.map(r => `    * ${r}`).join("\n")
        )).join("\n");
    },
    intentKeywords: [/experience/i, /intern/i, /internship/i, /work/i, /company/i, /job/i, /recordent/i, /codex/i, /career/i, /history/i],
    getFallbackReply: (data, query = "") => {
        const text = query.toLowerCase();
        if (text.includes("recordent")) {
            const exp = data.workExperience.find(e => e.company.toLowerCase().includes("recordent"));
            if (exp) {
                return `Here is what Mahesh did during his internship as a **${exp.role}** at **${exp.company}**:\n\n` +
                    exp.responsibilities.map(r => `- ${r}`).join("\n");
            }
        }
        if (text.includes("codex")) {
            const exp = data.workExperience.find(e => e.company.toLowerCase().includes("codex"));
            if (exp) {
                return `Here is what Mahesh did during his internship as a **${exp.role}** at **${exp.company}**:\n\n` +
                    exp.responsibilities.map(r => `- ${r}`).join("\n");
            }
        }
        
        return `Mahesh has gained hands-on industry experience through developer internships:

- **Software Developer Intern** at **Recordent Private Limited**, where he focused on building enterprise SaaS backend REST APIs, optimizing MySQL database queries, and migrating frontend pages from Angular 14 to Angular 16.
- **Backend Developer Intern** at **Codex**, where he focused on architecting microservices, designing database schemas, and securing route endpoints using JWT authorization middleware.`;
    }
};
