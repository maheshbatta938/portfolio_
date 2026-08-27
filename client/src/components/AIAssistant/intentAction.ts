const INTENT_TARGETS: Record<string, string> = {
    contact: "emailCard",
    projects: "projects",
    resume: "resumeLink",
    education: "education",
    experience: "experience",
    skills: "skills",
    dsa: "dsa",
    certifications: "certifications"
};

/**
 * Briefly pulse-highlights the page section the assistant's reply referenced,
 * without scrolling the page (the assistant panel stays open over it).
 */
export function handleIntentAction(intent: string): void {
    const targetId = INTENT_TARGETS[intent];
    if (!targetId) return;

    const el = document.getElementById(targetId);
    if (!el) return;

    el.classList.add("highlight-pulse-active");
    setTimeout(() => el.classList.remove("highlight-pulse-active"), 3200);
}
