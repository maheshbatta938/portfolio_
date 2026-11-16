import type { SkillFilter, SkillItem, SkillMatrixRow } from "../types";

export const skillFilters: SkillFilter[] = [
    { id: "all", label: "All Domains" },
    { id: "languages", label: "Languages" },
    { id: "backend", label: "Backend & Systems" },
    { id: "frontend", label: "Frontend" },
    { id: "database-devops", label: "Databases & Cloud" },
    { id: "ai-ml", label: "AI & Data Science" }
];

export const skillMatrix: SkillMatrixRow[] = [
    {
        id: "languages",
        category: "languages",
        domain: "Programming Languages",
        description: "Core languages for systems, algorithms, and full-stack development",
        proficiency: "Production / Core",
        technologies: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "SQL"],
        appliedIn: "High-concurrency services, algorithmic contest tools, data pipelines, and responsive web applications"
    },
    {
        id: "backend-core",
        category: "backend",
        domain: "Backend & Distributed Systems",
        description: "Scalable server architectures, microservices, and secure APIs",
        proficiency: "Production / Core",
        technologies: ["Node.js", "Express.js", "NestJS", "RESTful APIs", "JWT", "RBAC", "Rate Limiting Middleware"],
        appliedIn: "Contest evaluation engines, dynamic feedback dashboards, rate-limiting layers, and financial transaction workflows"
    },
    {
        id: "frontend-arch",
        category: "frontend",
        domain: "Frontend Architecture",
        description: "Component systems, state management, and modern client performance",
        proficiency: "Advanced",
        technologies: ["Angular (14-16+)", "React.js", "Next.js", "TypeScript", "Tailwind CSS", "Bootstrap 5", "HTML5/CSS3"],
        appliedIn: "Interactive assessment interfaces, multi-step dynamic forms, single-page analytics dashboards, and member portals"
    },
    {
        id: "data-cloud",
        category: "database-devops",
        domain: "Databases & Cloud DevOps",
        description: "Data modeling, caching, CI/CD pipelines, and containerization",
        proficiency: "Advanced",
        technologies: ["MongoDB", "MySQL", "Redis", "Docker", "Git", "GitHub", "Bitbucket", "Azure", "AWS", "Postman", "Swagger"],
        appliedIn: "Optimized relational queries, document schemas for question banks, Redis caching, and automated deployment merges"
    },
    {
        id: "ai-ds",
        category: "ai-ml",
        domain: "AI & Data Science",
        description: "Machine learning models, GenAI agents, and analytical processing",
        proficiency: "Proficient",
        technologies: ["Scikit-Learn", "TensorFlow", "Pandas", "NumPy", "OpenCV", "LLMs", "RAG", "Agentic AI", "Prompt Engineering"],
        appliedIn: "Predictive modeling, data classification pipelines, intelligent portfolio assistant integration, and problem validation tooling"
    }
];

export const skills: SkillItem[] = [
    // Languages
    { name: "JavaScript", category: "languages" },
    { name: "TypeScript", category: "languages" },
    { name: "Python", category: "languages" },
    { name: "Java", category: "languages" },
    { name: "SQL", category: "languages" },

    // Backend
    { name: "Node.js", category: "backend" },
    { name: "Express.js", category: "backend" },
    { name: "NestJS", category: "backend" },
    { name: "RESTful APIs", category: "backend" },
    { name: "JWT Auth", category: "backend" },
    { name: "RBAC", category: "backend" },
    { name: "Rate Limiting", category: "backend" },

    // Frontend
    { name: "Angular", category: "frontend" },
    { name: "React", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "Bootstrap 5", category: "frontend" },
    { name: "HTML5 & CSS3", category: "frontend" },

    // Databases & DevOps
    { name: "MongoDB", category: "database-devops" },
    { name: "MySQL", category: "database-devops" },
    { name: "Redis", category: "database-devops" },
    { name: "Docker", category: "database-devops" },
    { name: "Git & Bitbucket", category: "database-devops" },
    { name: "GitHub", category: "database-devops" },
    { name: "Postman", category: "database-devops" },
    { name: "Swagger", category: "database-devops" },
    { name: "AWS & Azure", category: "database-devops" },

    // AI & Data Science
    { name: "Scikit-Learn", category: "ai-ml" },
    { name: "TensorFlow", category: "ai-ml" },
    { name: "Pandas & NumPy", category: "ai-ml" },
    { name: "OpenCV", category: "ai-ml" },
    { name: "LLMs & GenAI", category: "ai-ml" },
    { name: "RAG Systems", category: "ai-ml" },
    { name: "Agentic AI", category: "ai-ml" },
    { name: "Prompt Engineering", category: "ai-ml" }
];
