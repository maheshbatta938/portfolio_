export type FxVariant = "glow" | "dots" | "grid" | "rings" | "beams" | "topo" | "lines" | "wash";

interface SectionFxProps {
    variant: FxVariant;
    /** Draws a fading hairline along the section's top edge. */
    edge?: boolean;
    /** Adds the grain pass — worth it behind large blurred areas. */
    grain?: boolean;
}

/**
 * The backdrop behind one section: a tinted haze for the glass to refract,
 * plus a texture on top.
 *
 * Every section shares one tint — light blue in light mode, light yellow in
 * dark — and is told apart by its texture alone. Colour is what makes a page
 * feel like one place; varying it per section was what made this feel like
 * several unrelated pages stacked together.
 */
export default function SectionFx({ variant, edge = true, grain = false }: SectionFxProps) {
    return (
        <>
            {/* Haze sits underneath everything — without colour behind them the
                glass panels have nothing to pick up and read as flat boxes. */}
            <div aria-hidden="true" className="fx fx-haze" />
            <div aria-hidden="true" className={`fx fx-${variant} ${grain ? "fx-grain" : ""}`}>
                {edge && <span className="fx-edge top-0" />}
            </div>
        </>
    );
}
