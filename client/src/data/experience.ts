import type { WorkExperience } from "../types";

export const experience: WorkExperience[] = [
    {
        id: "smart-interviews",
        role: "Software Development Engineer - 1 (SDE-1)",
        company: "Smart Interviews",
        location: "Hyderabad, India (Onsite)",
        badgeInitial: "SI",
        dateRange: "Sep 2026 - Present",
        isCurrent: true,
        highlights: [
            "Engineered core platform features for 'The Hive' — Smart Interviews' flagship coding, contest, and learning platform.",
            "Architected and delivered dynamic evaluation and feedback form systems featuring real-time single-page analytics dashboards, batch faculty filters, and duplicate-safe ingestion.",
            "Built scalable contest pipelines including random contest generation, MCQ contest evaluation workflows, and automated problem validation tooling."
        ],
        moreDetails: [
            "Implemented custom rate-limiting middleware and role-based authentication to harden backend API endpoints against high-concurrency traffic.",
            "Designed and optimized MongoDB schemas for question banks, contest tracks, user submissions, and batch performance metrics.",
            "Collaborated with cross-functional engineering teams using Bitbucket, Node.js, Express, and Angular for end-to-end feature delivery."
        ],
        tech: ["Node.js", "Express.js", "MongoDB", "Angular", "TypeScript", "REST APIs", "Rate Limiting", "Bitbucket"],
        ownership: {
            label: "Core Feature Ownership",
            title: "Dynamic Evaluation & Contest Systems",
            description:
                "Spearheaded the architecture and full-stack implementation of assessment forms, question management, and contest tracking serving thousands of students and mentors."
        },
        buildFlow: {
            label: "Platform Architecture",
            title: "The Hive Assessment Engine",
            items: ["Contests", "Evaluation Forms", "Leaderboards"],
            flow: ["Angular UI", "Express APIs", "Rate Limiting", "MongoDB"]
        }
    },
    {
        id: "recordent",
        role: "Software Developer Intern",
        company: "Recordent Private Limited",
        location: "Hyderabad, India",
        badgeInitial: "R",
        dateRange: "Mar 2026 - Aug 2026",
        isCurrent: false,
        highlights: [
            "Built and enhanced full-stack features across Membership, Buyer Management, Subscription, Admin, and Credit Risk modules in a production fintech application.",
            "Designed 2 Retail and MFI Credit Risk forms with validation, REST API integration, and MySQL support for credit assessment workflows.",
            "Led the production upgrade from Angular 14 to 16 and Bootstrap 4 to 5, resolving dependency conflicts, build failures, and UI compatibility issues."
        ],
        moreDetails: [
            "Enhanced 8 payment modes with search, pagination, and financial-year filtering across Angular, backend APIs, and MySQL.",
            "Resolved 30+ production issues across frontend, backend, APIs, SQL queries, reporting, and subscription workflows.",
            "Handled sensitive data masking and VAPT-compliant file upload validation to strengthen application security.",
            "Collaborated with a team of 5 developers using Git, GitHub, Swagger, Postman, GitHub Copilot, and Claude for feature development, code review, and production deployments."
        ],
        tech: ["Angular", "Node.js", "Express.js", "MySQL", "Bootstrap 5", "Swagger"],
        ownership: {
            label: "Independent Ownership",
            title: "Custom-domain member website",
            description:
                "Designed and built a member-specific full-stack website end to end — responsive UI, backend integration, and member-specific data flow — owned independently on a custom domain."
        }
    },
    {
        id: "codex",
        role: "Backend Developer Intern",
        company: "CodexIntern",
        location: "Remote",
        badgeInitial: "C",
        dateRange: "Jul 2025 - Aug 2025",
        isCurrent: false,
        highlights: [
            "Crafted 10+ RESTful APIs and backend services using Node.js, Express.js, and MongoDB following REST architecture principles.",
            "Added CRUD functionality plus JWT-based authentication and authorization to secure user access across multiple endpoints."
        ],
        moreDetails: [
            "Collaborated with a team of 6 developers to test, debug, and optimize business logic, improving API and application reliability."
        ],
        tech: ["Node.js", "Express.js", "MongoDB", "JWT", "REST APIs"]
    }
];
