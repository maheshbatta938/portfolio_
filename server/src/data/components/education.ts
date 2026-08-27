import type { ChatComponent } from "../../types/index.js";

export default {
    name: "Education & Journey",
    intentId: "education",
    contextKeywords: ["education", "college", "degree", "btech", "graduation", "graduate", "gect", "cgpa", "gpa", "academics", "academic", "study", "studied", "studies", "studying", "university", "school", "major", "branch", "qualification"],
    formatContext: (data) => {
        const edu = data.education;
        return `- Degree: ${edu.degree} (${edu.specialization})\n- College: ${edu.college}\n- Graduated: ${edu.graduationYear} (already completed, not currently studying)\n- Key subjects: ${edu.relevantSubjects.join(", ")}`;
    },
    intentKeywords: [/education/i, /college/i, /graduat/i, /btech/i, /degree/i, /gect/i, /gpa/i, /cgpa/i, /academics/i, /school/i, /stud/i, /univers/i],
    getFallbackReply: () => {
        return `Here are the details of Mahesh's academic background:

- **Degree:** Bachelor of Technology in Computer Science and Engineering (Data Science)
- **College:** GECT
- **Graduated:** 2026 (already completed)
- **Key Focus Areas:** Data Structures, Algorithms, Relational Databases, and Software Engineering principles.`;
    }
} satisfies ChatComponent;
