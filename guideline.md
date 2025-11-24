# Design System Integration Guide

This document provides guidance on integrating the Indeemo Design System tokens into Figma and development workflows.

> **For Figma Make code generation guidance**, see **`figma-make-guidelines.md`** — This is a prompt document for Figma Make's AI to generate code that follows your design system patterns.

---

## Figma Setup & Token Integration

### Setting Up Token Studio with Figma

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

**Important:** Figma Make simplifies complex variable syntax into raw CSS values. To guide code generation behavior, use the `figma-make-guidelines.md` file.

---

## Figma Make Integration

### Understanding Figma Make Guidelines

The **`figma-make-guidelines.md`** file is your primary tool for controlling how Figma Make generates code from the design system.

**This file is a PROMPT for Figma Make's AI.** It is NOT documentation on how to use Figma Make, but rather instructions for how Figma Make should behave when generating code.

**Guidelines include:**
- General coding standards (semantic HTML, accessibility, responsive design)
- Token usage rules (which surface to use when, accent patterns, etc.)
- Typography system (font sizes, weights, line heights, styles)
- Interactive component rules (buttons, forms, links, navigation)
- Feedback & messaging patterns (error, success, warning, info)
- Do's and Don'ts for consistent code generation
- Component-specific guidance (cards, modals, dropdowns, navigation)

### Re-Exporting to Figma Make

**When to Re-Export:**
- After adding new typography styles or modifying font sizes
- After updating color palette or adding new colors
- After modifying surface elevation or shadow values
- After adjusting spacing scale
- After changing accessibility or contrast requirements
- After adding new feedback states or interactive patterns

**Re-Export Process:**
1. In Figma Design file, update your library (tokens, styles, components)
2. Click **Publish** to publish changes to the library
3. Go to **Assets** → **Libraries** → Find your library
4. Click **Export for Make** (this will replace the previous export)
5. Click **Go to Figma Make**
6. In Figma Make, your updated `globals.css` and token definitions will be available
7. Update `figma-make-guidelines.md` if new rules or patterns were added
8. Test generated code to verify styles applied correctly

---

## Surface Tokens & Elevation System

### Elevation Levels Reference

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

### CSS Implementation

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

```css
/* Card with strong accent border */
.card-featured {
  background-color: var(--surface-level-1);
  border-left: 4px solid var(--surface-accent-strong);
  box-shadow: var(--shadow-elevation-1);
}

/* Highlighted section with subtle accent background */
.highlight-section {
  background-color: var(--surface-accent-subtle);
  border-left: 4px solid var(--surface-accent-strong);
  padding: 16px;
}

/* Dropdown with accent indicator and border */
.dropdown-active {
  background-color: var(--surface-level-2);
  border-bottom: 2px solid var(--surface-accent-strong);
  border: 1px solid var(--border-elevation-level-2-primary);
  box-shadow: var(--shadow-elevation-2);
}
```

---

## Working with Tokens in Development

For **detailed token descriptions** (use cases, WCAG contrast info, component guidance), see:
- **`docs/TOKENS-README.md`** — Complete token reference with examples and usage patterns
- **`docs/RESTRUCTURE-SUMMARY.md`** — Token structure decisions and rationale
- **`figma-make-guidelines.md`** — Prompts for Figma Make code generation

---

## Maintenance Workflow

### On Every Token Release

1. Update `tokens/tokens.json` with all token changes
2. Bump token version and record changes in changelog
3. Sync tokens to Figma via Token Studio
4. Publish Figma library
5. If exporting to Figma Make: Click **Export for Make** to update library
6. Run accessibility tests (contrast ratios, focus states)
7. Update documentation in `docs/TOKENS-README.md`
8. Test generated code in Figma Make (if applicable)

### Documentation References

- **Token Studio:** https://docs.tokens.studio/
- **Figma Design Systems:** https://www.figma.com/design-systems/
- **Figma Make:** https://help.figma.com/hc/en-us/articles/33665861260823-Add-guidelines-to-Figma-Make
- **WCAG Accessibility:** https://www.w3.org/WAI/WCAG21/quickref/
- **Design Systems by Brad Frost:** Structure and reasoning behind atomic design
