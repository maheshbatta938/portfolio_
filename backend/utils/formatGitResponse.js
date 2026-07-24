/**
 * Utility to format multi-step responses in a Git‑assistant style.
 * Accepts an array of step objects:
 *   { description: string, command?: string }
 * Returns a markdown string with numbered steps. If a command is provided it is
 * rendered inside a fenced ````bash```` block after the description.
 */
export function formatGitResponse(steps) {
  return steps
    .map((step, i) => {
      const idx = i + 1;
      const cmdBlock = step.command
        ? `\n\`\`\`bash\n${step.command}\n\`\`\``
        : '';
      return `${idx}. ${step.description}${cmdBlock}`;
    })
    .join('\n\n');
}
