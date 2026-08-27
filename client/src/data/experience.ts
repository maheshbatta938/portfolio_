import type { WorkExperience } from "../types";

export const experience: WorkExperience[] = [
    {
        id: "recordent",
        role: "Software Developer Intern",
        company: "Recordent Private Limited",
        location: "Hyderabad, India",
        badgeInitial: "R",
        dateRange: "Mar 2026 - Present",
        isCurrent: true,
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
        },
        buildFlow: {
            label: "Currently Building",
            title: "Website revamp — Recovery & Receivables",
            items: ["Recovery", "Receivables"],
            flow: ["Frontend", "REST APIs", "Business Logic", "Database"]
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
