import type { ChatComponent } from "../../types/index.js";

export default {
    name: "AI & Machine Learning",
    intentId: null,
    contextKeywords: ["ai", "ml", "machine learning", "artificial intelligence", "algorithms", "scikit", "model", "tensorflow", "nlp", "computer vision", "deep learning", "regression", "prediction", "data science"],
    formatContext: (data) => {
        const ai = data.aiMl;
        return `- **AI & ML Summary**: ${ai.summary}\n` +
            `- **Technical Skills & Concepts**: ${ai.skills.join(", ")}\n` +
            `- **ML Libraries & Frameworks**: ${ai.libraries.join(", ")}\n` +
            `- **Supervised & Unsupervised Algorithms**: ${ai.algorithms.join(", ")}\n` +
            `- **End-to-End Workflow Experience**:\n` +
            ai.experience.map(e => `  * ${e}`).join("\n");
    },
    intentKeywords: null,
    getFallbackReply: null
} satisfies ChatComponent;
