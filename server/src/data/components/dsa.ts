import type { ChatComponent } from "../../types/index.js";

export default {
    name: "Data Structures & Algorithms",
    intentId: "dsa",
    contextKeywords: ["dsa", "leetcode", "geeksforgeeks", "algorithms", "problems", "coding", "structure", "data structure"],
    formatContext: (data) => {
        const dsa = data.dsa;
        return `- Summary: ${dsa.description}\n- Topics covered: ${dsa.topics.join(", ")}`;
    },
    intentKeywords: [/dsa/i, /leetcode/i, /geeksforgeeks/i, /gfg/i, /algorithm/i, /data structure/i, /problem solving/i, /problems solved/i],
    getFallbackReply: null
} satisfies ChatComponent;
