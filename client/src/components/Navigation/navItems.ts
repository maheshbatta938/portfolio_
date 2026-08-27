export interface NavItem {
    id: string;
    label: string;
}

export const navItems: NavItem[] = [
    { id: "overview", label: "Overview" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" }
];
