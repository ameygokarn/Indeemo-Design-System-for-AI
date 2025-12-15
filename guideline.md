# Indeemo Design System Guidelines

**⚠️ Figma Make Tailored:** This design system is optimized for ingestion by Figma Make and other LLMs. All tokens include clear descriptions, Figma variable types, and CSS variable recommendations for seamless automation and code generation.

## Purpose

This document serves as the single source of truth for working with the Indeemo Design System. It provides:
- Instructions for AI assistants on how to generate tokens, components, and code
- Guidance for designers and developers on integrating tokens into Figma and codebases
- Token structure overview and usage patterns
- Workflow for maintaining and updating the design system

---

## Part 1: Assistant Prompt Styleguide

### How to Write Prompts for the Assistant

When asking the assistant to work with the Indeemo Design System, follow these guidelines:

**General Principles:**
- Be explicit: Include desired output format (JSON/CSS/Markdown/TSX), target platform (web/mobile/react/vue), and any constraints (no Tailwind, use CSS variables, etc.)
- Provide context: Include the token file, component name, or a short design note; include the Figma node id or screenshot when relevant
- Ask for one thing at a time: Request token generation separately from component code to keep outputs small and verifiable

**Tone & Verbosity:**
- Prefer concise, technical responses for code and exact outputs
- Use a short explanatory paragraph (2–3 sentences) when giving rationale

**Formatting Expectations:**

When asking for tokens, request a single canonical JSON output and optionally a CSS variables block:

```json
{
  "color": {
    "primary": {"100": "#fff1f5", "500": "#da095e"}
  }
}
```

When asking for component code: Specify the framework. If not specified, assistant will return plain React + CSS (no Tailwind).

For documentation: Prefer Markdown with usage examples, props table, and code snippets.

**Naming Conventions:**
- Token names: `category.tokenName.scale` (e.g., `color.brand.500`, `spacing.8`)
- Component names: `ComponentName/Variant/Size` in human readable kebab or Pascal depending on code target
- File names: Use kebab-case when creating files
- Token references: When creating semantic tokens that share the same value as another semantic token, use deep references to the semantic token (e.g., `{semantic.interactive.primary.text.default}`) rather than duplicating the foundation reference

### Token Quality Standard & Governance

Every token update must include:

1. **Designer Description** — Clear, human-readable context for designers
2. **AI/LLM Description** — Machine-readable context for code generation systems (Figma Make, LLMs)
3. **WCAG Contrast Information** — Accessibility data (if color token)

**Reference Example (Color Token):**
```json
{
  "value": "#da095e",
  "type": "color",
  "description": "[DESIGNER] Primary brand accent color for high-impact CTAs and highlights. Use on white/neutral backgrounds for maximum contrast and visual weight.",
  "extensions": {
    "designer_guidance": "Primary pink. Apply to main buttons, badges, and highlights. Ensure sufficient contrast with background.",
    "ai_context": "CSS var: --color-brand-pink. Base color value for all pink ramps. Primary CTA fill color (semantic token: {semantic.interactive.primary.fill.default}). Reference point for pink ramp generation.",
    "wcag_info": "Contrast: 8.2:1 against white (#ffffff), 1.8:1 against neutral-300. WCAG AAA on light backgrounds. Pair with white text for primary buttons."
  }
}
```

---

## Part 2: Token Structure Overview

### Core Token Sets

1. **`brand`** — Foundational colors, spacing, grids, and modifiers (base design system values)
2. **`semantic`** — Semantic tokens organized by context (surface fills, interactive states, feedback colors)
3. **`styles`** — Exportable styles and effects (typography, shadows, links). Only place where anything is exported as a style/effect in Token Studio.
4. **`viewport/large`** — Grid tokens for large viewports (1440px)
5. **`viewport/xlarge`** — Grid tokens for extra-large viewports (1024px)

### Grid System

The grid system is defined in viewport-specific sets:

- `viewport/large`: For large viewports (1440px) with 12 columns, 32px margin, 20px gutter
- `viewport/xlarge`: For extra-large viewports (1024px) with 12 columns, 24px margin, 16px gutter

These sets are used by Token Studio to create responsive grid variables.

### Color Ramp Progression

**All non-neutral color ramps (pink, purple, dark-blue, red, orange, yellow, green)** follow this consistent progression:

- **First step (100)**: `lighten 950` → 99% lightness
- **Light progression**: Steps 150-700 use decreasing `lighten` modifiers (900, 850, 800, 750, 700, 650, 600, 550, 450, 350, 250, 100)
- **Base at 750**: No modifier (base brand color)
- **Dark progression**: Steps 800-1050 use increasing `darken` modifiers (200, 400, 500, 600, 700, 800)
- **Last step (1050)**: `darken 800` → 1.8% lightness

**Neutral ramp** has a unique progression (white to black with half-step modifiers) and **cream ramp** uses SRGB color space.

### Semantic Token Categories

**Surface Fills** (`semantic.surface` + `semantic.elevation`):
- **Undercanvas:** Below-canvas level (-1). For sticky/floating elements
- **Canvas:** Base level (0). Primary page/screen background
- **Levels 1-4:** Progressive elevation for cards, overlays, modals, dropdowns
- **Inverse:** Dark background for high-contrast sections
- **Accent:** Strong (brand pink) and subtle (light pink) for badges/highlights

**Interactive** (`semantic.interactive`):
- **Primary buttons:** Fill, text, icon colors for main CTAs
- **Secondary buttons:** Fill, border, text, icon colors for secondary actions
- **Links:** Default, hover, visited states for hyperlinks

**Feedback** (`semantic.feedback`):
- **Error, Success, Warning, Info:** Fill, text, border, icon colors for banner/notification components

**Borders** (`semantic.border`):
- **Border.elevation.level-2.primary:** Use with level-2 surfaces for contained components

**Disabled States** (`semantic.disabled`):
- **A, B, C:** Three shades for flexible disabled state combinations

---

## Part 3: Token Studio Workflow (Primary Method)

### Important Context

This project uses **Tokens Studio for Figma** (free tier) as the primary method for managing design tokens.

**Workflow:**
1. Design tokens are created and managed in Figma using the Tokens Studio plugin
2. The plugin exports tokens as JSON files
3. These JSON files are synced to this Git repository (`tokens/` directory)
4. The assistant helps with formatting, organizing, and consuming these tokens

**When working with tokens:**
- Tokens are stored in JSON format following the Tokens Studio structure
- The assistant should expect Token Studio JSON format when reading token files
- When asked to "sync tokens from Figma," expect the user to paste Token Studio JSON output
- The assistant should help convert Token Studio JSON to other formats (CSS variables, SCSS, JS objects) as needed
- Variables in Figma may not be directly accessible via REST API (requires Enterprise plan)

**Token Studio Resources:**
- Plugin: https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma
- Documentation: https://docs.tokens.studio/
- The plugin is free to use with basic features

---

## Part 4: Design System Integration Guide

### Figma Setup & Token Integration

**Prerequisites:**
- Install the Token Studio plugin in Figma
- Have Token Studio configured with the `tokens/tokens.json` file
- Tokens should be synced and visible in Figma

**Process:**
1. In Figma, open the Token Studio plugin
2. Load tokens from `tokens/tokens.json`
3. Sync tokens to Figma (creates Figma variables for all token values)
4. Verify all 3 sets are present: `brand`, `semantic`, `styles`
5. Publish library with tokens visible

### Exporting for Figma Make

Once tokens are synced to Figma via Token Studio:

1. Ensure your Figma library is **published**
2. In Figma Design, navigate to **Assets panel** → **Libraries**
3. Find your library and click **Export for Make**
   - Figma extracts styles, colors, typography, and variables into `globals.css`
   - This may take a few minutes
4. Click **Go to Figma Make** to open the Figma Make workspace

**What Gets Extracted:**
- Color palettes (from brand set)
- Typography styles (from styles set)
- Design variables (from all sets)
- Shadows and effects (from styles set)

### Surface Tokens & Elevation System

The elevation system creates visual hierarchy. Always pair surface fills with corresponding shadows.

| Level | Z-Index | Use Case | Surface Token | Shadow |
|-------|---------|----------|---------------|--------|
| **Undercanvas** | -1 | Hidden/background content (behind sticky headers) | {surface.undercanvas} | elevation-negative-1 |
| **Canvas** (Default) | 0 | Main page background, primary content area | {surface.canvas} | elevation-0 |
| **Level 1** | 1–100 | Cards, floating sections, tabs | {surface.level-1} | elevation-1 |
| **Level 2** | 100–500 | Dropdowns, tooltips, popovers, context menus | {surface.level-2} | elevation-2 |
| **Level 3** | 500–1000 | Sticky headers, persistent navigation bars | {surface.level-3} | elevation-3 |
| **Level 4** | 1000+ | Modals, dialogs, alerts, full-screen overlays | {surface.level-4} | elevation-4 |
| **Inverse** | 2000+ | Dark backgrounds, dark mode surfaces | {surface.inverse} | elevation-inverse |

### Key Rules

- Always pair a surface fill with its corresponding shadow (same elevation level)
- Use z-index ranges rather than specific values to allow flexibility
- Level 0 (canvas) is the default; only use higher levels when content needs to float above
- Undercanvas (-1) should be used sparingly (e.g., content behind sticky sidebars)
- Inverse level is reserved for dark mode and special high-contrast scenarios
- Level 2 surfaces can include an optional border using `{border.elevation.level-2.primary}`
- Each level maintains a 1:1 mapping for future dark mode support (all surfaces stay white except inverse and undercanvas)

### Surface Accents

All elevation levels include two accent color options for highlighting and emphasis:

- **accent.strong** ({color.brand.pink}): Use for primary emphasis, interactive highlights, call-to-action areas
- **accent.subtle** ({color.ramp.pink.100}): Use for secondary emphasis, background accents, dividers

---

## Part 5: Typography Styles Overview (Figma Make Optimized)

All typography styles are now documented with Figma variable types and CSS variable recommendations for LLM and Figma Make ingestion.

**Current Typography Styles:**
- `headline` (large/medium/small): Section and subsection headings (16–20px, Bold)
- `display` (large): Hero and marketing headings (28px, Bold) — *NEW*
- `body-emphasis` (large/medium/small): Emphasized body copy (12–18px, Bold)
- `body` (large/medium/small): Primary body text (12–18px, Regular)
- `label` (large/medium/small): Form labels and UI labels (12–18px, Bold)
- `caption` (small): Metadata, hints, timestamps (12px, Regular) — *NEW*
- `link` (default/hover/visited): Interactive links with accessible underline

**Token Format for Figma Make:**
Each typography token includes:
- `fontFamily`: Reference to brand font family (e.g., `{brand.fontFamily.a}`)
- `fontWeight`: Regular or Bold (e.g., `{brand.fontWeight.bold}`)
- `fontSize`: Semantic size alias (e.g., `{scale.fontSize.md}`)
- `lineHeight`: Semantic line-height alias (e.g., `{scale.lineHeight.normal}`)
- `description`: Purpose, Figma variable type, CSS variable name, and accessibility notes
- `extensions.figma`: Figma Make metadata (resolved type, CSS variable, usage)

**Example Token (with Figma Make metadata):**
```json
"headline": {
  "large": {
    "value": {
      "fontFamily": "{brand.fontFamily.a}",
      "fontWeight": "{brand.fontWeight.bold}",
      "fontSize": "{scale.fontSize.xl}",
      "lineHeight": "{scale.lineHeight.comfortable}"
    },
    "type": "typography",
    "description": "Headline Large (20px/22px, Bold). Purpose: Section headings. Figma variable type: TYPOGRAPHY. CSS var: --typography-headline-large. Accessibility: use for prominent headings with sufficient contrast."
  }
}
```

---

## Part 6: Working with Tokens in Development

### CSS Implementation Example

```css
/* Canvas level (default page background) */
body {
  background-color: var(--surface-canvas);
  box-shadow: var(--shadow-elevation-0);
}

/* Card at Level 1 */
.card {
  background-color: var(--surface-level-1);
  box-shadow: var(--shadow-elevation-1);
  z-index: 10;
}

/* Dropdown at Level 2 */
.dropdown {
  background-color: var(--surface-level-2);
  box-shadow: var(--shadow-elevation-2);
  border: 1px solid var(--border-elevation-level-2-primary);
  z-index: 200;
}

/* Modal at Level 4 */
.modal {
  background-color: var(--surface-level-4);
  box-shadow: var(--shadow-elevation-4);
  z-index: 1000;
}
```

### Accessibility: Links & Underline

- Use `typography-style.link.default` for link text and `typography-style.link.hover` for interactive state
- Ensure link color and underline pass WCAG AA contrast requirements against their background:
  - For normal text: contrast >= 4.5:1
  - For large text (≥ 18px bold or 24px regular): contrast >= 3:1
- Do not rely solely on color to indicate links. Use underline or another clear indicator and provide a focus style for keyboard navigation (outline or highlight with at least 3:1 contrast)

Example (CSS):
```css
.link {
  color: var(--color-ramp-purple-850);
  text-decoration: underline;
}
.link:hover { color: var(--color-ramp-purple-750); }
.link:focus { outline: 2px solid var(--color-ramp-purple-750); outline-offset: 2px; }
```

---

## Part 7: Maintenance Workflow

### On Every Token Release

1. Update `tokens/tokens.json` with all token changes
2. Bump token version and record changes in changelog
3. Sync tokens to Figma via Token Studio
4. Publish Figma library
5. If exporting to Figma Make: Click **Export for Make** to update library
6. Run accessibility tests (contrast ratios, focus states)
7. Update documentation in `TOKEN_DOCUMENTATION.md`
8. Test generated code in Figma Make (if applicable)

### Re-Exporting to Figma Make

**When to Re-Export:**
- After adding new typography styles or modifying font sizes
- After updating color palette or adding new colors
- After modifying surface elevation or shadow values
- After adjusting spacing scale
- After changing accessibility or contrast requirements
- After adding new feedback states or interactive patterns

---

## References

- **Token Studio:** https://docs.tokens.studio/
- **Figma Design Systems:** https://www.figma.com/design-systems/
- **Figma Make:** https://help.figma.com/hc/en-us/articles/33665861260823-Add-guidelines-to-Figma-Make
- **WCAG Accessibility:** https://www.w3.org/WAI/WCAG21/quickref/
- **Design Systems by Brad Frost:** Structure and reasoning behind atomic design

---

*This document consolidates and replaces the previous `styleguide.md` and `guideline.md` files.*
*For detailed token documentation, see `TOKEN_DOCUMENTATION.md`.*
