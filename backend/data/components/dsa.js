export default {
    name: "Data Structures & Algorithms",
    intentId: null, // Handled under general or fallback
    contextKeywords: ["dsa", "leetcode", "geeksforgeeks", "algorithms", "problems", "coding", "structure", "data structure"],
    formatContext: (data) => {
        const dsa = data.dsa;
        return `- Summary: ${dsa.description}\n- Topics covered: ${dsa.topics.join(", ")}`;
    },
    intentKeywords: null,
    getFallbackReply: null
};
