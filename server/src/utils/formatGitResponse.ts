interface ResponseStep {
    description: string;
    command?: string;
}

/**
 * Formats multi-step responses in a Git-assistant style: numbered steps,
 * with an optional fenced bash block when a command is provided.
 */
export function formatGitResponse(steps: ResponseStep[]): string {
    return steps
        .map((step, i) => {
            const idx = i + 1;
            const cmdBlock = step.command
                ? `\n\`\`\`bash\n${step.command}\n\`\`\``
                : "";
            return `${idx}. ${step.description}${cmdBlock}`;
        })
        .join("\n\n");
}
