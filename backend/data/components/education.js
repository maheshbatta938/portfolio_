export default {
    name: "Education & Journey",
    intentId: "education",
    contextKeywords: ["education", "college", "degree", "btech", "graduation", "gect", "cgpa", "gpa", "academics", "study", "studied", "studies", "university", "school"],
    formatContext: (data) => {
        const edu = data.education;
        return `- Degree: ${edu.degree} (${edu.specialization})\n- College: ${edu.college}\n- Graduation: ${edu.graduationYear}\n- Key subjects: ${edu.relevantSubjects.join(", ")}`;
    },
    intentKeywords: [/education/i, /college/i, /graduat/i, /btech/i, /degree/i, /gect/i, /gpa/i, /cgpa/i, /academics/i, /school/i, /stud/i, /univers/i],
    getFallbackReply: (data) => {
        return `Here are the details of Mahesh's academic background:

- **Degree:** Bachelor of Technology in Computer Science and Engineering (Data Science)
- **College:** GECT
- **Graduation Year:** 2026
- **Key Focus Areas:** Data Structures, Algorithms, Relational Databases, and Software Engineering principles.`;
    }
};
