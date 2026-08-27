import type { CSSProperties, ReactNode } from "react";
import SectionFx from "./SectionFx";
import type { FxVariant } from "./SectionFx";

/**
 * How strongly a section's ambience reads, as a multiplier on the theme
 * baseline. Alternating this down the page is what stops ten sections of
 * equal weight from flattening into one undifferentiated scroll.
 */
const INTENSITY = {
    subtle: 0.55,
    base: 1,
    bold: 1.5
} as const;

export type SectionIntensity = keyof typeof INTENSITY;

interface SectionProps {
    id?: string;
    label?: string;
    children: ReactNode;
    className?: string;
    /** Backdrop texture for this section. Omit for a plain field. */
    fx?: FxVariant;
    /** Ambience strength relative to the theme baseline. */
    intensity?: SectionIntensity;
    grain?: boolean;
    edge?: boolean;
    /** Stacked-plane shading at the section's top and bottom edges. */
    plate?: boolean;
    /** Drops the default vertical rhythm when a section must sit tight. */
    flush?: boolean;
}

/** The one place page gutters, max width and section ambience are decided. */
export default function Section({
    id,
    label,
    children,
    className = "",
    fx,
    intensity = "base",
    grain = false,
    edge = true,
    plate = true,
    flush = false
}: SectionProps) {
    const scale = INTENSITY[intensity];

    // Scaling the two theme baselines locally means one prop moves the haze and
    // the texture together, and neither can drift out of step with the other.
    const style = {
        "--fx-strength": `calc(var(--fx-base) * ${scale})`,
        "--fx-line": `calc(var(--fx-line-base) * ${scale})`
    } as CSSProperties;

    return (
        <section
            id={id}
            aria-label={label}
            style={style}
            className={`relative isolate overflow-hidden ${plate ? "fx-plate" : ""}`}
        >
            {fx && <SectionFx variant={fx} grain={grain} edge={edge} />}

            <div
                className={`relative z-content mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-14 ${
                    flush ? "" : "py-20 md:py-28"
                } ${className}`}
            >
                {children}
            </div>
        </section>
    );
}
