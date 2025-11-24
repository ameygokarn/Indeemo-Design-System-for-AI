# Tokens — Central Readme

This document explains the structure of the design tokens in `tokens/tokens.json`, provides an overview of the token categories, and describes the elevation system, semantic structure, and best practices.

## 1. Overview: Token File & Structure

- **Location:** `tokens/tokens.json`
- **Format:** JSON tokens grouped by a semantic object structure organized into minimal sets
- **Purpose:** Central repository for design tokens used by the design system and for Figma variable exports and Figma Make integration

### Token Sets:
- **`styles`** — Exportable styles and effects (typography, shadows). This is the ONLY place for anything that needs to be exported as a style or effect in Token Studio.
- **`color`** — Foundational color definitions (brand palette and color ramps)
- **`semantic`** — Semantic tokens grouped by context (typography colors, surface levels, interactive states)
- **`surface`** — Composite surface elevation tokens (combines fills, shadows, and accents)

### Philosophy
Minimize the number of sets to reduce complexity. All colors sit in the semantic set with appropriate grouping. Shadows and effects live in the styles set for proper Token Studio export behavior.

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

## 3. Color Tokens

Located under `color.*`, containing foundational color definitions.

- **`color.brand.*`** — Brand color palette
  - Named colors: `cream`, `yellow`, `orange`, `red`, `pink`, `purple`, `dark-blue`, `grey`, `neutral`
  - Example: `color.brand.pink` → #da095e

- **`color.ramp.*`** — Color ramps for each brand color
  - Each color has 21 shades: `100`, `150`, `200`, ... `1000`, `1050`
  - Each shade includes HSL value and WCAG contrast information
  - Example: `color.ramp.cream.200` → Cream 200 shade with lightness, contrast data

## 4. Semantic Tokens

Located under `semantic.*`, containing context-specific token groupings.

### 4.1 Semantic Typography Colors

- **`semantic.typography.link.*`** — Link color states
  - `default` → {color.ramp.purple.850} (primary link color)
  - `hover` → {color.ramp.purple.750} (darker purple on hover)
  - `visited` → {color.ramp.purple.700} (visited state)

### 4.2 Semantic Surface Tokens (Fills)

- **`semantic.surface.fill.*`** — Surface fill colors for each elevation level
  - `elevation-negative-1` → Cream 200 (undercanvas)
  - `elevation-0` → #FFFFFF (canvas/default)
  - `elevation-1` through `elevation-4` → #FFFFFF (white, consistent hierarchy)
  - `elevation-inverse` → #1A1A1A (dark backgrounds)
  - **Philosophy:** All surfaces except undercanvas and inverse are white, maintaining 1:1 mapping for future dark mode support

### 4.3 Semantic Surface Accents

Accent tokens provide color highlighting and emphasis within surface elevations. They are available at all levels (canvas, undercanvas, and levels 1–4) and come in two variants:

- **`semantic.surface.accent.strong`** → {color.brand.pink} (primary brand accent)
  - Use for: Primary emphasis, highlighted sections, important interactive areas
  - Provides maximum visual weight and attention

- **`semantic.surface.accent.subtle`** → #F5E8EC (tinted primary at reduced saturation)
  - Use for: Secondary emphasis, gentle highlights, background accents
  - Provides visual interest without overwhelming content

**Accent availability by level:**

| Level | accent-strong | accent-subtle |
|-------|---|---|
| Undercanvas | ✓ | ✓ |
| Canvas | ✓ | ✓ |
| Level 1 | ✓ | ✓ |
| Level 2 | ✓ | ✓ |
| Level 3 | ✓ | ✓ |
| Level 4 | ✓ | ✓ |

**Usage in CSS:**
```css
/* Card with strong accent highlight */
.card-highlight {
  background-color: var(--surface-level-1-fill);
  border-left: 4px solid var(--surface-level-1-accent-strong);
  box-shadow: var(--shadow-elevation-1);
}

/* Card with subtle accent background */
.card-subtle {
  background-color: var(--surface-level-1-fill);
  border-radius: 8px;
  box-shadow: var(--shadow-elevation-1), 
              inset 0 0 0 1px var(--surface-level-1-accent-subtle);
}

/* Highlighted content section */
.content-highlight {
  padding: 16px;
  background-color: var(--surface-level-1-accent-subtle);
  border-left: 4px solid var(--surface-level-1-accent-strong);
}
```

**Design pattern:**
- Use **strong accents** for interactive elements, call-to-action highlights, or primary focus areas
- Use **subtle accents** for background layers, dividers, or secondary emphasis
- Pair accents with the corresponding level's fill and shadow for consistent elevation hierarchy

### 4.4 Interactive Tokens

- **`semantic.interactive.*`** — Button states, form states, etc.
  - Organized by component type (primary, secondary, etc.)
  - Each includes fill, text, icon, border states for default/hover/pressed/disabled

## 5. Surface Composite Tokens

Located under `surface.*`, these combine fills, shadows, and accents for specific elevation levels. These are reference tokens that tie together all three aspects of an elevation level.

- **`surface.undercanvas.*`** → Hidden/background content (Z-index: -1)
  - `fill`, `shadow`, `accent-strong`, `accent-subtle`
- **`surface.canvas.*`** → Base/default level (Z-index: 0)
  - `fill`, `shadow`, `accent-strong`, `accent-subtle`
- **`surface.level-1.*`** → Cards, floating sections (Z-index: 1–100)
  - `fill`, `shadow`, `accent-strong`, `accent-subtle`
- **`surface.level-2.*`** → Dropdowns, tooltips (Z-index: 100–500)
  - `fill`, `shadow`, `accent-strong`, `accent-subtle`
- **`surface.level-3.*`** → Sticky headers (Z-index: 500–1000)
  - `fill`, `shadow`, `accent-strong`, `accent-subtle`
- **`surface.level-4.*`** → Modals, dialogs (Z-index: 1000+)
  - `fill`, `shadow`, `accent-strong`, `accent-subtle`
- **`surface.inverse.*`** → Dark backgrounds (Z-index: 2000+)
  - `fill`, `shadow`

**Example:**
```json
{
  "surface.level-1.fill": "{semantic.surface.fill.elevation-1}",
  "surface.level-1.shadow": "{styles.shadow.elevation-1}",
  "surface.level-1.accent-strong": "{semantic.surface.accent.strong}",
  "surface.level-1.accent-subtle": "{semantic.surface.accent.subtle}"
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

- **For Token Studio exports:** Only styles and effects go in the `styles` set. Color tokens belong in `semantic` or `color`.
- **Use semantic tokens:** Always prefer semantic tokens (e.g., `semantic.typography.link.default`) over raw color values for maintainability.
- **Surface elevation:** Always pair fill + shadow from the same elevation level (e.g., `surface.level-2.fill` + `surface.level-2.shadow`).
- **Color consistency:** Use `semantic.surface.fill.*` for all surface backgrounds to maintain consistent color mapping across the system.
- **Dark mode readiness:** The 1:1 mapping between elevation levels (all white except undercanvas/inverse) ensures seamless dark mode support by changing only the fill colors.

## 8. Token References

Tokens reference each other using `{path.to.token}` syntax:

```json
{
  "semantic.typography.link.default": {
    "value": "{color.ramp.purple.850}"
  },
  "surface.level-1.fill": {
    "value": "{semantic.surface.fill.elevation-1}"
  }
}
```

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
