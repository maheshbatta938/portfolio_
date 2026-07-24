export default {
    name: "Achievements",
    intentId: null, // Handled under general or fallback
    contextKeywords: ["achievement", "achievements", "awards", "success", "certifications", "certified"],
    formatContext: (data) => {
        const achs = data.achievements;
        const certs = data.certifications.areasOfLearning;
        return `Achievements:\n` + achs.map(a => `- ${a}`).join("\n") +
               `\nCertifications & Learning:\n` + certs.map(c => `- ${c}`).join("\n");
    },
    intentKeywords: null,
    getFallbackReply: null
};
