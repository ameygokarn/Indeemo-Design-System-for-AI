# Tokens — Central Readme

This document explains the structure of the design tokens in `tokens/tokens.json`, provides an overview of the token categories, and describes the elevation system, semantic stru## 9. Migration Guide

If migrating from an old token structure:

- Old `typography` set → New `styles.typography`
- Old `typography.shadow.*` → New `styles.shadow.*`
- Old `color.*` → New `brand.color.*` (now a dedicated brand set in Token Studio)
- Old colors in typography → New `semantic.typography.*`
- Old `foundation.color.*` → New `brand.color.*`
- Old `foundation.surface-fill.*` → New `semantic.surface.fill.*`
- Old `surface.*` set → Now integrated into `semantic.surface.*`

### Key Changes in Latest Structure

**Before:**
```
styles
├── typography
└── shadow
semantic
├── typography
├── surface
└── interactive
surface (standalone)
```

**After:**
```
styles
├── typography
└── shadow
brand
├── color
│   ├── brand
│   └── ramp
semantic
├── typography
├── surface (now contains fills, accents, and composites)
└── interactive
```

**All semantic colors now reference the brand set:**
- Old: `{color.ramp.purple.850}` → New: `{brand.color.ramp.purple.850}`
- Old: `{color.brand.pink}` → New: `{brand.color.brand.pink}` best practices.

## 1. Overview: Token File & Structure

- **Location:** `tokens/tokens.json`
- **Format:** JSON tokens grouped by a semantic object structure organized into minimal sets
- **Purpose:** Central repository for design tokens used by the design system and for Figma variable exports and Figma Make integration

### Token Sets (3 Core Sets):
- **`styles`** — Exportable styles and effects (typography, shadows). This is the ONLY place for anything that needs to be exported as a style or effect in Token Studio.
- **`brand`** — Foundational color definitions (brand palette and color ramps). The source of truth for all color references in the system.
- **`semantic`** — Semantic tokens grouped by context (typography colors, surface levels, interactive states). ALL color tokens reference the brand set.

### Philosophy
Minimize the number of sets to reduce complexity. Only 3 core sets:
- **styles**: Exportable typography and effects
- **brand**: All color foundations and ramps
- **semantic**: All context-specific tokens that reference brand colors

All surfaces, typography colors, and interactive states reference the brand set for consistency and maintainability.

## 2. Styles (Exportable Styles & Effects)

Located under `styles.*`, this set contains all elements meant to be exported as styles or effects in Token Studio.

### 2.1 Typography Styles

- **`styles.typography.brand`** — Font family and font weight tokens
  - `brand.fontFamily.a` — IBM Plex Sans (primary font)
  - `brand.fontWeight.regular` — Regular (400)
  - `brand.fontWeight.bold` — Bold (700)

- **`styles.typography.scale`** — Typography scale definitions
  - `scale.base` — Base multiplier for scaling (default: 1)
  - `scale.ratio` — Typographic scale ratio (default: 1.125 Major Second)
  - `scale.fontSize` — Semantic font size tokens
    - `xxs` → 8px, `xs` → 12px, `sm` → 14px, `md` → 16px, `lg` → 18px, `xl` → 20px, etc.
  - `scale.lineHeight` — Semantic line height tokens
    - `tight` → 1.2, `snug` → 1.33, `normal` → 1.4, `comfortable` → 1.5, etc.

- **`styles.typography.{style}`** — Typography style definitions
  - Available styles: `headline`, `body`, `body-emphasis`, `label`, `caption`, `display`, `link`
  - Each style has size variants: `large`, `medium`, `small`
  - Each style value contains: `fontFamily`, `fontWeight`, `fontSize`, `lineHeight`, `textDecoration` (for links)
  - **Important:** Link styles do NOT contain color. Link colors are defined in `semantic.typography.link`

### 2.2 Shadow & Effect Tokens

- **`styles.shadow.*`** — Elevation-based shadow effects
  - `elevation-negative-1` → 0px (no shadow, undercanvas)
  - `elevation-0` → 0px 1px 2px (canvas/base)
  - `elevation-1` → 0px 3px 8px (Level 1 cards)
  - `elevation-2` → 0px 6px 16px (Level 2 dropdowns)
  - `elevation-3` → 0px 10px 24px (Level 3 sticky elements)
  - `elevation-4` → 0px 16px 32px (Level 4 modals)
  - `elevation-inverse` → 0px 6px 16px (dark backgrounds)

## 3. Brand Color Tokens

Located under `brand.color.*`, containing foundational color definitions. This is the source of truth for all colors in the system.

- **`brand.color.brand.*`** — Brand color palette
  - Named colors: `cream`, `yellow`, `orange`, `red`, `pink`, `purple`, `dark-blue`, `grey`, `neutral`
  - Example: `brand.color.brand.pink` → #da095e

- **`brand.color.ramp.*`** — Color ramps for each brand color
  - Each color has 21 shades: `100`, `150`, `200`, ... `1000`, `1050`
  - Each shade includes HSL value and WCAG contrast information
  - Example: `brand.color.ramp.cream.200` → Cream 200 shade with lightness, contrast data

### All Semantic Colors Reference the Brand Set

Every color in the semantic set references the brand set using the pattern `{brand.color.brand.*}` or `{brand.color.ramp.*}`. This ensures:
- Single source of truth for all colors
- Easy color system updates (change brand colors once, update everywhere)
- Consistent naming across the system

## 4. Semantic Tokens

Located under `semantic.*`, containing context-specific token groupings. All semantic tokens reference the brand set for colors. The semantic set contains three subsections:

### 4.1 Semantic Typography Colors

- **`semantic.typography.link.*`** — Link color states
  - `default` → {brand.color.ramp.purple.850} (primary link color)
  - `hover` → {brand.color.ramp.purple.750} (darker purple on hover)
  - `visited` → {brand.color.ramp.purple.700} (visited state)

### 4.2 Semantic Surface Tokens

Located under `semantic.surface.*`, these contain fills, shadows, and accents organized by elevation level.

**Surface Fills:**
- **`semantic.surface.fill.*`** — Surface fill colors for each elevation level
  - `elevation-negative-1` → Cream 200 (undercanvas)
  - `elevation-0` → #FFFFFF (canvas/default)
  - `elevation-1` through `elevation-4` → #FFFFFF (white, consistent hierarchy)
  - `elevation-inverse` → #1A1A1A (dark backgrounds)
  - **Philosophy:** All surfaces except undercanvas and inverse are white, maintaining 1:1 mapping for future dark mode support

**Surface Accents:**
- **`semantic.surface.accent.strong`** → {brand.color.brand.pink} (primary brand accent)
- **`semantic.surface.accent.subtle`** → #F5E8EC (tinted primary at reduced saturation)

Available at all levels (canvas, undercanvas, and levels 1–4).

### 4.3 Semantic Interactive Tokens

- **`semantic.interactive.*`** — Button states, form states, etc.
  - Organized by component type (primary, secondary, etc.)
  - Each includes fill, text, icon, border states for default/hover/pressed/disabled
  - All colors reference the brand set

## 5. Surface Composite Tokens

Located under `semantic.surface.*`, these combine fills, shadows, and accents for specific elevation levels. These are reference tokens that tie together all three aspects of an elevation level.

- **`semantic.surface.undercanvas.*`** → Hidden/background content (Z-index: -1)
  - `fill`, `shadow`, `accent-strong`, `accent-subtle`
- **`semantic.surface.canvas.*`** → Base/default level (Z-index: 0)
  - `fill`, `shadow`, `accent-strong`, `accent-subtle`
- **`semantic.surface.level-1.*`** → Cards, floating sections (Z-index: 1–100)
  - `fill`, `shadow`, `accent-strong`, `accent-subtle`
- **`semantic.surface.level-2.*`** → Dropdowns, tooltips (Z-index: 100–500)
  - `fill`, `shadow`, `accent-strong`, `accent-subtle`
- **`semantic.surface.level-3.*`** → Sticky headers (Z-index: 500–1000)
  - `fill`, `shadow`, `accent-strong`, `accent-subtle`
- **`semantic.surface.level-4.*`** → Modals, dialogs (Z-index: 1000+)
  - `fill`, `shadow`, `accent-strong`, `accent-subtle`
- **`semantic.surface.inverse.*`** → Dark backgrounds (Z-index: 2000+)
  - `fill`, `shadow`

**Example:**
```json
{
  "semantic.surface.level-1.fill": "{semantic.surface.fill.elevation-1}",
  "semantic.surface.level-1.shadow": "{styles.shadow.elevation-1}",
  "semantic.surface.level-1.accent-strong": "{semantic.surface.accent.strong}",
  "semantic.surface.level-1.accent-subtle": "{semantic.surface.accent.subtle}"
}
```

## 6. Elevation System

The elevation system creates visual hierarchy through layered surfaces paired with shadows and z-index levels. Each level has a corresponding shadow effect and surface fill that work together.

| Level | Z-Index | Use Case | Fill | Shadow |
|-------|---------|----------|------|--------|
| Undercanvas | -1 | Hidden/background | Cream 200 | elevation-negative-1 |
| Canvas | 0 | Page background | White | elevation-0 |
| Level 1 | 1–100 | Cards, floating sections | White | elevation-1 |
| Level 2 | 100–500 | Dropdowns, tooltips, popovers | White | elevation-2 |
| Level 3 | 500–1000 | Sticky headers | White | elevation-3 |
| Level 4 | 1000+ | Modals, dialogs | White | elevation-4 |
| Inverse | 2000+ | Dark backgrounds, dark mode | #1A1A1A | elevation-inverse |

### Usage in CSS:
```css
/* Card at Level 1 */
.card {
  background-color: var(--surface-level-1-fill);
  box-shadow: var(--shadow-elevation-1);
  z-index: 10;
}

/* Dropdown at Level 2 */
.dropdown {
  background-color: var(--surface-level-2-fill);
  box-shadow: var(--shadow-elevation-2);
  z-index: 200;
}

/* Modal at Level 4 */
.modal {
  background-color: var(--surface-level-4-fill);
  box-shadow: var(--shadow-elevation-4);
  z-index: 1000;
}
```

## 7. Best Practices

- **Three core sets in Token Studio:** Use exactly 3 sets: `styles` (for exportable effects), `brand` (for color foundations), `semantic` (for all context-specific tokens).
- **Brand set for all colors:** Every color in the system must be a reference to the brand set. Never hardcode colors in semantic tokens.
- **For Token Studio exports:** Only styles and effects go in the `styles` set. All colors belong in `semantic` (which references `brand`).
- **Use semantic tokens:** Always prefer semantic tokens (e.g., `semantic.typography.link.default`) over raw color values for maintainability.
- **Surface elevation:** Always pair fill + shadow from the same elevation level (e.g., `semantic.surface.level-2.fill` + `semantic.surface.level-2.shadow`).
- **Color consistency:** Use `semantic.surface.fill.*` for all surface backgrounds to maintain consistent color mapping across the system.
- **Dark mode readiness:** The 1:1 mapping between elevation levels (all white except undercanvas/inverse) ensures seamless dark mode support by changing only the fill colors in the brand set.
- **Accent strategy:** Use `accent-strong` for primary emphasis and `accent-subtle` for secondary emphasis. All accents are sourced from the brand set.

## 8. Token References

Tokens reference each other using `{path.to.token}` syntax:

```json
{
  "semantic.typography.link.default": {
    "value": "{brand.color.ramp.purple.850}"
  },
  "semantic.surface.level-1.fill": {
    "value": "{semantic.surface.fill.elevation-1}"
  },
  "semantic.surface.level-1.accent-strong": {
    "value": "{brand.color.brand.pink}"
  }
}
```

**Reference patterns:**
- Brand colors: `{brand.color.brand.NAME}` or `{brand.color.ramp.NAME.SHADE}`
- Semantic fills: `{semantic.surface.fill.elevation-LEVEL}`
- Semantic shadows: `{styles.shadow.elevation-LEVEL}`
- Semantic accents: `{semantic.surface.accent.VARIANT}` (strong or subtle)

## 9. Migration Guide

If migrating from an old token structure:

- Old `typography` set → New `styles.typography`
- Old `typography.shadow.*` → New `styles.shadow.*`
- Old colors in typography → New `semantic.typography.{context}.*`
- Old `foundation.color.*` → New `color.*`
- Old `foundation.surface-fill.*` → New `semantic.surface.fill.*`
- Old `surface.*` with foundation references → Updated to reference new paths

## 10. Next Steps

- Integrate tokens with your build pipeline (CSS variables, Tailwind, design tokens plugin, etc.)
- Export tokens to Figma for synchronization
- Use elevation system in component designs
- Set up dark mode by swapping fill colors while maintaining shadow effects
