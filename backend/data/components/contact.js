export default {
    name: "Contact Details",
    intentId: "contact",
    contextKeywords: ["contact", "email", "phone", "call", "linkedin", "github", "social", "reach out", "hire", "schedule", "connect", "mobile", "mail", "link", "links", "location", "live", "address", "where", "city", "hyderabad"],
    formatContext: (data) => {
        return `- **Email**: ${data.contact.email}\n` +
            `- **Phone**: ${data.contact.phone}\n` +
            `- **Location**: ${data.contact.location}\n` +
            `- **GitHub**: [GitHub Profile](${data.contact.github})\n` +
            `- **LinkedIn**: [LinkedIn Profile](${data.contact.linkedin})\n` +
            `- **LeetCode**: [LeetCode Profile](${data.contact.leetcode})\n` +
            `- **GeeksforGeeks**: [GeeksforGeeks Profile](${data.contact.geeksforgeeks})`;
    },
    intentKeywords: [/contact/i, /email/i, /phone/i, /call/i, /linkedin/i, /github/i, /social/i, /reach out/i, /hire/i, /schedule/i, /connect/i, /mobile/i, /calendly/i, /location/i, /live/i, /address/i, /where/i, /city/i, /hyderabad/i],
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
};
