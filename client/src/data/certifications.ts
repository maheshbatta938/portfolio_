import type { Certification } from "../types";

export const certifications: Certification[] = [
    {
        id: "aws-ccp",
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services · CLF-C02",
        icon: "fa-brands fa-aws",
        year: 2026,
        verifyUrl: "https://aws.amazon.com/verification"
    },
    {
        id: "mern-stack",
        title: "MERN Stack Development",
        issuer: "Pluto Academy",
        icon: "fa-solid fa-layer-group",
        year: 2025
    },
    {
        id: "dsa",
        title: "Data Structures and Algorithms",
        issuer: "Apna College",
        icon: "fa-solid fa-diagram-project",
        year: 2025
    }
];
