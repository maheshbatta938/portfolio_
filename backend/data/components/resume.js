export default {
    name: "Resume Download",
    intentId: "resume",
    contextKeywords: ["resume", "cv", "pdf", "download"],
    formatContext: (data) => {
        return `- **Resume**: You can download Mahesh Batta's professional resume from the top section of the website.\n` +
               `- **Email for Resume**: To get a direct copy of the resume, contact Mahesh at ${data.contact.email}.`;
    },
    intentKeywords: [/resume/i, /download/i, /cv/i, /pdf/i],
    getFallbackReply: (data) => {
        return `You can download Mahesh Batta's professional resume from the top section of the website, or contact him directly at ${data.contact.email} to receive a copy.`;
    }
};
