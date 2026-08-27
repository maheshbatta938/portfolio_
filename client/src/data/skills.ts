import type { SkillFilter, SkillItem } from "../types";

export const skillFilters: SkillFilter[] = [
    { id: "all", label: "All" },
    { id: "languages", label: "Languages" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "database-devops", label: "Databases & DevOps" },
    { id: "ai-ml", label: "AI & Data Science" }
];

export const skills: SkillItem[] = [
    // Languages
    { name: "Java", iconClass: "devicon-java-plain colored", category: "languages" },
    { name: "Python", iconClass: "devicon-python-plain colored", category: "languages" },
    { name: "JavaScript", iconClass: "devicon-javascript-plain colored", category: "languages" },
    { name: "TypeScript", iconClass: "devicon-typescript-plain colored", category: "languages" },

    // Frontend
    { name: "Angular", iconClass: "devicon-angularjs-plain colored", category: "frontend" },
    { name: "React", iconClass: "devicon-react-original colored", category: "frontend" },
    { name: "HTML5", iconClass: "devicon-html5-plain colored", category: "frontend" },
    { name: "CSS3", iconClass: "devicon-css3-plain colored", category: "frontend" },
    { name: "Bootstrap", iconClass: "devicon-bootstrap-plain colored", category: "frontend" },
    { name: "Next.js", iconClass: "devicon-nextjs-plain colored", category: "frontend" },

    // Backend
    { name: "Node.js", iconClass: "devicon-nodejs-plain colored", category: "backend" },
    { name: "Express.js", iconClass: "devicon-express-original", category: "backend" },
    { name: "NestJS", iconClass: "devicon-nestjs-plain colored", category: "backend" },
    { name: "RBAC", iconClass: "fa-solid fa-user-shield", category: "backend" },

    // Databases & DevOps
    { name: "MySQL", iconClass: "devicon-mysql-plain colored", category: "database-devops" },
    { name: "MongoDB", iconClass: "devicon-mongodb-plain colored", category: "database-devops" },
    { name: "Redis", iconClass: "devicon-redis-plain colored", category: "database-devops" },
    { name: "Docker", iconClass: "devicon-docker-plain colored", category: "database-devops" },
    { name: "Git", iconClass: "devicon-git-plain colored", category: "database-devops" },
    { name: "GitHub", iconClass: "devicon-github-original", category: "database-devops" },
    { name: "Azure", iconClass: "devicon-azure-plain colored", category: "database-devops" },
    { name: "AWS", iconClass: "devicon-amazonwebservices-original colored", category: "database-devops" },
    { name: "Postman", iconClass: "devicon-postman-plain colored", category: "database-devops" },
    { name: "Swagger", iconClass: "devicon-swagger-plain colored", category: "database-devops" },
    { name: "Figma", iconClass: "devicon-figma-plain colored", category: "database-devops" },

    // AI & Data Science
    { name: "Python", iconClass: "devicon-python-plain colored", category: "ai-ml" },
    { name: "Scikit-Learn", iconClass: "devicon-scikitlearn-plain colored", category: "ai-ml" },
    { name: "TensorFlow", iconClass: "devicon-tensorflow-original colored", category: "ai-ml" },
    { name: "Pandas", iconClass: "devicon-pandas-original colored", category: "ai-ml" },
    { name: "NumPy", iconClass: "devicon-numpy-original colored", category: "ai-ml" },
    { name: "OpenCV", iconClass: "devicon-opencv-plain colored", category: "ai-ml" },
    { name: "Linear & Logistic Regression", iconClass: "fa-solid fa-chart-line", category: "ai-ml" },
    { name: "Decision Trees & Random Forests", iconClass: "fa-solid fa-network-wired", category: "ai-ml" },
    { name: "XGBoost Classifier", iconClass: "fa-solid fa-bolt", category: "ai-ml" },
    { name: "Support Vector Machines (SVM)", iconClass: "fa-solid fa-arrows-split-up-and-left", category: "ai-ml" },
    { name: "Bayesian Networks", iconClass: "fa-solid fa-circle-nodes", category: "ai-ml" },
    { name: "K-Means Clustering", iconClass: "fa-solid fa-cubes-stacked", category: "ai-ml" },
    { name: "K-Nearest Neighbors (KNN)", iconClass: "fa-solid fa-people-arrows", category: "ai-ml" },
    { name: "Naive Bayes Classifiers", iconClass: "fa-solid fa-calculator", category: "ai-ml" },
    { name: "Agentic AI", iconClass: "fa-solid fa-robot", category: "ai-ml" },
    { name: "Large Language Models (LLMs)", iconClass: "fa-solid fa-comments", category: "ai-ml" },
    { name: "Retrieval-Augmented Gen (RAG)", iconClass: "fa-solid fa-database", category: "ai-ml" },
    { name: "Prompt Engineering", iconClass: "fa-solid fa-terminal", category: "ai-ml" }
];
