import type { CSSProperties } from "react";

/**
 * The categorical palette, in the fixed order it should cycle through.
 * Defined once here so a set of parallel cards (capability cards, contact
 * rows, starter prompts) always lands on the same sequence of colours
 * instead of each component inventing its own order.
 */
const TINTS = ["indigo", "cyan", "magenta", "orange", "green"] as const;

export type Tint = (typeof TINTS)[number];

/** Sets `--tint` to a named colour from the palette — read by `.icon-chip`, `.glass-card` and `.top-rule`. */
export function tint(name: Tint): CSSProperties {
    return { ["--tint" as string]: `var(--clr-${name})` };
}

/** Cycles through the palette by position, for a list whose colours don't carry individual meaning. */
export function tintAt(index: number): CSSProperties {
    return tint(TINTS[index % TINTS.length]);
}
