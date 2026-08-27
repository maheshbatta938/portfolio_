export type Theme = "light" | "dark";

export interface Profile {
    fullName: string;
    firstName: string;
    currentRole: string;
    careerGoal: string;
    location: string;
    graduatedYear: number;
    availability: string;
    tagline: string;
    intro: string;
    typingRoles: string[];
    heroTech: string[];
    resumeUrl: string;
    photoUrl: string;
}

export interface OwnershipHighlight {
    label: string;
    title: string;
    description: string;
}

export interface BuildFlowHighlight {
    label: string;
    title: string;
    items: string[];
    flow: string[];
}

export interface WorkExperience {
    id: string;
    role: string;
    company: string;
    location: string;
    badgeInitial: string;
    dateRange: string;
    isCurrent: boolean;
    highlights: string[];
    moreDetails: string[];
    tech: string[];
    ownership?: OwnershipHighlight;
    buildFlow?: BuildFlowHighlight;
}

export type ProjectCategory = "web" | "ai";

export interface Project {
    id: string;
    name: string;
    description: string;
    techStack: string[];
    categories: ProjectCategory[];
    image: string;
    featured: boolean;
    featuredLabel?: string;
    githubUrl?: string;
    liveUrl?: string;
    liveLabel?: string;
    comingSoon?: boolean;
    isChatTrigger?: boolean;
}

export type SkillCategoryId = "languages" | "frontend" | "backend" | "database-devops" | "ai-ml";

export interface SkillItem {
    name: string;
    iconClass: string;
    category: SkillCategoryId;
}

export interface SkillFilter {
    id: SkillCategoryId | "all";
    label: string;
}

export interface Education {
    degree: string;
    specialization: string;
    college: string;
    startYear: number;
    endYear: number;
    location: string;
    description: string;
    cgpa: string;
}

export interface Certification {
    id: string;
    title: string;
    issuer: string;
    icon: string;
}

export interface DsaProfile {
    totalSolved: number;
    topics: string[];
    links: { label: string; url: string }[];
}

export interface ContactInfo {
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    leetcode: string;
    geeksforgeeks: string;
    instagram: string;
}

export interface StatItem {
    value: number;
    suffix: string;
    label: string;
}

export type ChatSender = "user" | "bot";

/** Where a reply came from — badged in the UI so a canned answer never passes for a real one. */
export type ChatOrigin = "model" | "fallback" | "error";

export interface ChatMessage {
    id: string;
    sender: ChatSender;
    text: string;
    origin?: ChatOrigin;
}

export interface ChatApiResponse {
    success: boolean;
    reply?: string;
    intent?: string;
    isFallback?: boolean;
    error?: string;
}
