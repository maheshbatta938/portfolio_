import type { ChatComponent } from "../../types/index.js";

export default {
    name: "Skills & Technologies",
    intentId: "skills",
    contextKeywords: ["skill", "skills", "languages", "tech", "technologies", "stack", "frontend", "backend", "database", "devops", "cloud", "aws", "docker"],
    formatContext: (data) => {
        const s = data.skills;
        return `- **Languages**: ${s.languages.join(", ")}\n` +
            `- **Frontend**: ${s.frontend.join(", ")}\n` +
            `- **Backend**: ${s.backend.join(", ")}\n` +
            `- **Databases**: ${s.databases.join(", ")}\n` +
            `- **Tools & DevOps**: ${s.toolsDevOps.join(", ")}`;
    },
    intentKeywords: [/skill/i, /languages/i, /tech/i, /technologies/i, /stack/i, /frontend/i, /backend/i, /database/i, /framework/i, /coding/i, /library/i, /devops/i, /cloud/i, /aws/i, /docker/i, /git/i],
    getFallbackReply: () => {
        return `Mahesh has a versatile technical skillset. Here are the core technologies he specializes in:

- **Frontend Development:** Angular, React.js, HTML5, CSS3, and Bootstrap for building responsive, modern user interfaces.
- **Backend Engineering:** Node.js, Express.js, and REST APIs, secured with JWT and Firebase authentication.
- **Databases & Caching:** MySQL relational queries, MongoDB document store, and Redis caching.
- **Cloud & DevOps:** Docker containerization, Microsoft Azure, AWS cloud services, and Git/GitHub version control.
- **AI & ML Concepts:** Practical knowledge of Machine Learning, Regression, Classification models, and RAG architectures.`;
    }
} satisfies ChatComponent;
