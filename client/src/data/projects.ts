import type { Project } from "../types";

export const projects: Project[] = [
    {
        id: "novabank",
        name: "NovaBank – NextGen AI Banking",
        description:
            "Next-generation full stack digital banking platform integrated with AI financial advisory, real-time transaction processing, credit scoring, and Razorpay payment gateways.",
        techStack: ["Angular", "NestJS", "Docker", "Redis", "Prisma", "Gemini AI"],
        categories: ["web", "ai"],
        image: "/assets/images/novabank.png",
        featured: true,
        featuredLabel: "Featured • Full Stack + AI",
        comingSoon: true
    },
    {
        id: "buyer-data-management",
        name: "Buyer Data Management System",
        description:
            "Full-stack buyer data management system with 8+ React screens, secure REST APIs, and bulk CSV/Excel import for large buyer datasets.",
        techStack: ["React", "Node.js", "Express.js", "MySQL", "JWT"],
        categories: ["web"],
        image: "/assets/images/recordentproject.png",
        featured: true,
        githubUrl: "https://github.com/maheshbatta938/recordent-assignment",
        liveUrl: "https://recordent-assignment-2.onrender.com/"
    },
    {
        id: "make-a-note",
        name: "Make A Note",
        description:
            "Full Stack note organizer incorporating Firebase authentication, Docker deployments, Redis caching, and automated CI/CD pipeline structures.",
        techStack: ["Angular", "Node.js", "Redis", "Docker"],
        categories: ["web"],
        image: "/assets/images/makeanote.png",
        featured: true,
        comingSoon: true
    },
    {
        id: "notesapp",
        name: "NotesApp — MERN Secure Notes",
        description:
            "Full-stack secure notes management app with 10+ REST APIs, advanced search, tag-based filtering, and JWT authentication, deployed on Render.",
        techStack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
        categories: ["web"],
        image: "/assets/images/memorymania.png",
        featured: false,
        githubUrl: "https://github.com/maheshbatta938/memorymania",
        liveUrl: "https://memorymania.vercel.app/"
    },
    {
        id: "ai-portfolio-assistant",
        name: "AI Portfolio Assistant",
        description:
            "AI agent integrated with Google Gemini API to answer recruiter questions regarding experience, skills, and resume details in real time.",
        techStack: ["Gemini API", "Node.js", "Express", "React", "TypeScript"],
        categories: ["ai"],
        image: "/assets/images/xyz.png",
        featured: true,
        isChatTrigger: true
    },
    {
        id: "ab-testing",
        name: "A/B Testing Bayesian Network",
        description:
            "Bayesian network application that compares conversion options and estimates probabilities to drive business decisions using Pandas and NumPy.",
        techStack: ["Python", "Bayesian Network"],
        categories: ["ai"],
        image: "/assets/images/abtesting.png",
        featured: false,
        githubUrl: "https://github.com/maheshbatta938/ab-testing",
        liveUrl: "https://ab-testing-fawn.vercel.app/"
    },
    {
        id: "credit-card-fraud-detection",
        name: "Credit Card Fraud Detection",
        description:
            "Machine learning classification model built with XGBoost algorithm to analyze transactions, detect anomalies, and filter out false warnings.",
        techStack: ["Python", "XGBoost", "Scikit-Learn", "Pandas"],
        categories: ["ai"],
        image: "/assets/images/creditcardfraud.png",
        featured: false,
        githubUrl: "https://github.com/maheshbatta938/creditcard-fraud-detection",
        comingSoon: true
    }
];
