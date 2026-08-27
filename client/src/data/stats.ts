import type { StatItem } from "../types";
import { dsa } from "./dsa";
import { experience } from "./experience";
import { projects } from "./projects";
import { skills } from "./skills";

const uniqueTechnologies = new Set(skills.map(s => s.name)).size;

export const stats: StatItem[] = [
    { value: dsa.totalSolved, suffix: "+", label: "DSA Problems Solved" },
    { value: experience.length, suffix: "", label: "Professional Internships" },
    { value: projects.length, suffix: "", label: "Projects Built" },
    { value: uniqueTechnologies, suffix: "+", label: "Technologies Mastered" }
];
