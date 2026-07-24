export default {
    name: "Projects",
    intentId: "projects",
    contextKeywords: ["project", "projects", "build", "demo", "repo", "repository", "github", "novabank", "nova bank", "make a note", "resume analyzer", "disease prediction", "memory mania", "mern"],
    formatContext: (data) => {
        return data.projects.map((proj) => (
            `- **${proj.name}**:\n  Description: ${proj.description}\n  Tech Stack: ${proj.techStack.join(", ")}\n` +
            (proj.githubUrl ? `  GitHub Repository: [${proj.name} GitHub](${proj.githubUrl})\n` : "") +
            `  Key Features:\n` +
            proj.features.map(f => `    * ${f}`).join("\n")
        )).join("\n");
    },
    intentKeywords: [/project/i, /projects/i, /build/i, /memory/i, /novabank/i, /nova bank/i, /make a note/i, /resume analyzer/i, /disease prediction/i, /mern/i, /demo/i, /repo/i, /portfolio/i],
    getFallbackReply: (data, query = "") => {
        const text = query.toLowerCase();
        for (const proj of data.projects) {
            if (text.includes(proj.name.toLowerCase()) || text.includes(proj.name.toLowerCase().replace(/\s/g, ""))) {
                return `Here are the details for **${proj.name}**:\n\n` +
                    `- **Description**: ${proj.description}\n` +
                    `- **Tech Stack**: ${proj.techStack.join(", ")}\n` +
                    (proj.githubUrl ? `- **GitHub**: [${proj.name} GitHub Repository](${proj.githubUrl})\n` : "") +
                    `- **Key Features**:\n` +
                    proj.features.map(f => `  * ${f}`).join("\n");
            }
        }
        return `Here are some of the key software projects Mahesh has developed:\n\n` +
            data.projects.map(p => `- **${p.name}**: ${p.description}`).join("\n") +
            `\n\n*Note: You can explore the live demos and code repositories for all of his projects in the **Projects** section on this website!*`;
    }
};
