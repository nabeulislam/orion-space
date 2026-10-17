/**
 * Orion design tokens — the single JS-side mirror of the `--og-*` custom
 * properties in `src/index.css`.
 *
 * This is the ONLY file in `src/` allowed to contain a raw colour literal.
 * Anything that cannot consume a CSS custom property (canvas fillStyle, recharts
 * series colours, component props that write inline attributes) imports from
 * here instead of pasting a hex.
 */

/** --og-accent — celestial ice. The one accent. */
export const ACCENT = '#38bdf8'
/** --og-accent-bright */
export const ACCENT_BRIGHT = '#7dd3fc'
/** --og-accent-ice */
export const ACCENT_ICE = '#bae6fd'
/** --og-accent-deep */
export const ACCENT_DEEP = '#0ea5e9'
/** --og-accent-strong */
export const ACCENT_STRONG = '#0284c7'

/** --og-signal — status / success. */
export const SIGNAL = '#34d399'
/** --og-signal-bright */
export const SIGNAL_BRIGHT = '#6ee7b7'
/** --og-signal-deep */
export const SIGNAL_DEEP = '#10b981'

/** --og-ink — page void. */
export const INK = '#060608'
/** --og-slate — raised chrome sitting on the void. */
export const SLATE = '#090b10'

/** Alpha helpers for the two token families. */
export const accentAlpha = (alpha: number) => `rgba(56, 189, 248, ${alpha})`
export const signalAlpha = (alpha: number) => `rgba(52, 211, 153, ${alpha})`
export const ACCENT_GLOW = accentAlpha(0.45)

/**
 * Electric-border hues for stacked/showcase cards. Monochrome celestial-ice
 * family only — every entry is the same hue at different luminance, so cards
 * read as one system rather than a rainbow.
 */
export const ACCENT_BORDER_HUES = [
  'rgba(56, 189, 248, 0.8)',   // accent
  'rgba(125, 211, 252, 0.8)',  // bright
  'rgba(14, 165, 233, 0.8)',   // deep
  'rgba(186, 230, 253, 0.8)',  // ice
] as const

/**
 * Icon scale. Three steps, no more:
 *  - sm: inline with meta/label text
 *  - md: inline with body text (default in UI chrome)
 *  - lg: emphasis / section headers
 * Decorative display glyphs (hero art, empty states) are composition, not icons.
 */
export const ICON = { sm: 14, md: 16, lg: 20 } as const
export type IconSize = keyof typeof ICON

/** One stroke weight for the whole product, applied globally in index.css. */
export const ICON_STROKE = 1.5

/** Locked radii. Mirrors --r-*. */
export const RADIUS = { chip: 8, card: 16, panel: 24, pill: 9999 } as const
export type RadiusStep = keyof typeof RADIUS
