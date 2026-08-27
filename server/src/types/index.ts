export interface WorkExperience {
    role: string;
    company: string;
    responsibilities: string[];
    location?: string;
    /** Human-readable span, e.g. "Mar 2026 - Present". */
    duration?: string;
    /** Marks the role the assistant should describe in the present tense. */
    isCurrent?: boolean;
    tech?: string[];
}

export interface Skills {
    languages: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    toolsDevOps: string[];
}

export interface AiMl {
    summary: string;
    skills: string[];
    libraries: string[];
    algorithms: string[];
    experience: string[];
}

export interface Project {
    name: string;
    description: string;
    features: string[];
    techStack: string[];
    githubUrl?: string;
}

export interface Dsa {
    description: string;
    topics: string[];
}

export interface Certifications {
    summary: string;
    areasOfLearning: string[];
}

export interface CareerObjective {
    objective: string;
    interests: string[];
}

export interface Contact {
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    leetcode: string;
    geeksforgeeks: string;
    handlingNote: string;
}

export interface FaqEntry {
    question: string;
    answer: string;
}

export interface PortfolioData {
    assistant: {
        role: string;
        responsibility: string;
        rules: string[];
        personality: string[];
        personalityRules: string[];
        responseStyle: string[];
    };
    profile: {
        fullName: string;
        currentRole: string;
        careerGoal: string;
        location: string;
        graduatedYear: number;
    };
    professionalSummary: {
        about: string[];
        areasOfInterest: string[];
    };
    education: {
        degree: string;
        specialization: string;
        college: string;
        graduationYear: number;
        relevantSubjects: string[];
    };
    workExperience: WorkExperience[];
    skills: Skills;
    aiMl: AiMl;
    projects: Project[];
    dsa: Dsa;
    achievements: string[];
    certifications: Certifications;
    softSkills: string[];
    careerObjective: CareerObjective;
    contact: Contact;
    faq: {
        recruiterQuestions: FaqEntry[];
        aiMlQuestions: FaqEntry[];
        projectQuestions: FaqEntry[];
    };
}

export interface ChatComponent {
    name: string;
    intentId: string | null;
    contextKeywords: string[] | null;
    formatContext: (data: PortfolioData) => string;
    intentKeywords: RegExp[] | null;
    getFallbackReply: ((data: PortfolioData, query?: string) => string) | null;
}

export interface ClientHistoryItem {
    sender?: "user" | "bot";
    role?: "user" | "model";
    text?: string;
    content?: string;
}

export interface ChatRequestBody {
    message: string;
    history?: ClientHistoryItem[];
}

export interface AssistantReply {
    replyText: string;
    intent: string;
    isFallback: boolean;
}
