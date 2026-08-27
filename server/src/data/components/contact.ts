import type { ChatComponent } from "../../types/index.js";

export default {
    name: "Contact Details",
    intentId: "contact",
    // Deliberately excludes bare "where" and "live": they are generic question
    // words that were pulling "where did he study?" into Contact instead of Education.
    contextKeywords: ["contact", "email", "phone", "call", "linkedin", "github", "social", "reach out", "reach him", "hire", "schedule", "connect", "mobile", "mail", "link", "links", "location", "address", "based", "based in", "city", "hyderabad", "where does he live", "where is he based", "where is he located", "where he lives"],
    formatContext: (data) => {
        return `- **Email**: ${data.contact.email}\n` +
            `- **Phone**: ${data.contact.phone}\n` +
            `- **Location**: ${data.contact.location}\n` +
            `- **GitHub**: [GitHub Profile](${data.contact.github})\n` +
            `- **LinkedIn**: [LinkedIn Profile](${data.contact.linkedin})\n` +
            `- **LeetCode**: [LeetCode Profile](${data.contact.leetcode})\n` +
            `- **GeeksforGeeks**: [GeeksforGeeks Profile](${data.contact.geeksforgeeks})`;
    },
    intentKeywords: [/contact/i, /email/i, /phone/i, /call/i, /linkedin/i, /github/i, /social/i, /reach out/i, /reach him/i, /hire/i, /schedule/i, /connect/i, /mobile/i, /calendly/i, /location/i, /address/i, /where is he based/i, /where does he live/i, /where is he located/i, /where he lives/i, /city/i, /hyderabad/i],
    getFallbackReply: (data, query = "") => {
        const text = query.toLowerCase();
        if (text.includes("location") || text.includes("live") || text.includes("where") || text.includes("address") || text.includes("city")) {
            return `📍 Mahesh Batta is based in **${data.contact.location}**.`;
        }
        return `Here is how you can get in touch with Mahesh Batta:\n\n` +
            `- 📧 **Email**: ${data.contact.email}\n` +
            `- 📱 **Phone**: ${data.contact.phone}\n` +
            `- 📍 **Location**: ${data.contact.location}\n` +
            `- 🐙 **GitHub**: [GitHub Profile](${data.contact.github})\n` +
            `- 💼 **LinkedIn**: [LinkedIn Profile](${data.contact.linkedin})\n` +
            `- 💻 **LeetCode**: [LeetCode Profile](${data.contact.leetcode})\n` +
            `- ⚡ **GeeksforGeeks**: [GeeksforGeeks Profile](${data.contact.geeksforgeeks})`;
    }
} satisfies ChatComponent;
