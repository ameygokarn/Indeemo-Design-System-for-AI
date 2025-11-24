# Figma Make Optimization Summary

## Overview

The Indeemo Design System has been optimized for **Figma Make** code generation with a new dedicated guidelines file and restructured documentation. This ensures that when design tokens are exported from Figma via Token Studio, Figma Make can generate production-ready code that adheres to your design system patterns.

---

## Key Changes

### 1. New File: `figma-make-guidelines.md`

**Purpose:** This is a **prompt document for Figma Make's AI**, not user documentation. It provides explicit instructions for how Figma Make should generate code.

**Contains:**
- **General Coding Standards** — Semantic HTML, accessibility (WCAG AA), responsive design, CSS best practices
- **Color & Surface System** — Token naming, surface level usage, accent patterns, elevation rules
- **Typography System** — Font family, semantic sizes (xxs–5xl), line heights, typography styles
- **Interactive Components** — Button variants, form inputs, links, navigation patterns
- **Feedback & Messaging** — Error, success, warning, info color patterns with examples
- **Responsive Layout** — Mobile-first breakpoints, spacing scale (multiples of 4px)
- **Do's & Don'ts** — Quick reference table for consistent code generation
- **Component-Specific Guidance** — Cards, modals, dropdowns, navigation, alerts

**Key Innovation:** Guidelines structure token references using flattened format (e.g., `var(--surface-level-2)`, `var(--feedback-error-fill)`) so Figma Make can directly reference CSS variables exported from your Token Studio tokens.

### 2. Restructured: `guideline.md`

**Purpose:** Integration guide for designers and developers, not an AI prompt.

**Contains:**
- Figma + Token Studio setup instructions
- Figma Make export process
- Elevation system reference with CSS examples
- When/how to re-export to Figma Make
- Links to documentation sources

**Changes:**
- Removed all Figma Make AI prompts (moved to `figma-make-guidelines.md`)
- Removed detailed component rules (now in `figma-make-guidelines.md`)
- Focused on workflow and integration
- Clear pointer to `figma-make-guidelines.md` for AI guidance

### 3. Token Descriptions Enhanced

All semantic tokens in `tokens/tokens.json` include descriptions with:
- **Use case context** — What the token is for
- **Visual/technical guidance** — Contrast info, component usage
- **Figma Make compatibility** — How the token should be applied

**Examples:**
```json
"primary button fill": {
  "description": "Primary button fill/background. Use for main call-to-action buttons. References brand pink."
}

"error banner background": {
  "description": "Error banner/alert background. Use for error state containers. Light red tint for visibility."
}

"level 2 surface": {
  "description": "Level 2 surface fill (elevation level 2). Use for overlays, popovers, tooltips. Creates second tier of elevation."
}
```

---

## Figma Make Workflow

### How It Works

1. **Token Definition** → Tokens defined in `tokens/tokens.json` with descriptions for designers
2. **Token Studio Sync** → Tokens synced to Figma as variables via Token Studio plugin
3. **Figma Library Export** → Design library published in Figma with all tokens/styles
4. **Figma Make Export** → Click **Export for Make** in Figma → Creates `globals.css` with raw CSS values
5. **Guidelines Applied** → Figma Make uses `figma-make-guidelines.md` to generate code
6. **Code Generation** → Figma Make generates semantic HTML + CSS using your tokens and patterns

### When to Update Guidelines

Update `figma-make-guidelines.md` when:
- Adding new token types or semantic aliases
- Changing component patterns or naming conventions
- Updating accessibility requirements
- Adding new feedback states or interactive patterns
- Clarifying token usage for specific components

Then re-export to Figma Make.

---

## Documentation Structure

| File | Purpose | Audience |
|------|---------|----------|
| `tokens/tokens.json` | Canonical token definitions | Designers, developers, Token Studio |
| `docs/TOKENS-README.md` | Complete token reference | Designers, developers |
| `docs/RESTRUCTURE-SUMMARY.md` | Token structure decisions | Designers, architects |
| `figma-make-guidelines.md` | **AI prompts for code generation** | **Figma Make AI** |
| `guideline.md` | Integration & workflow guide | Designers, developers |
| `styleguide.md` | Style contract for prompts | LLMs, AI assistants |

---

## Key Features

### Surface & Elevation System
- 7 elevation levels (undercanvas, canvas, 1–4, inverse)
- Each paired with appropriate shadow for visual depth
- Optional border for level-2 surfaces
- Strong + subtle accents available at all levels

### Token Reference Format
All tokens use flattened format optimized for Token Studio → CSS variables:
```
{surface.canvas}           → var(--surface-canvas)
{color.brand.pink}         → var(--color-brand-pink)
{feedback.error.fill}      → var(--feedback-error-fill)
{interactive-primary-fill-default} → var(--interactive-primary-fill-default)
```

### Accessibility First
- WCAG AA contrast ratios for all color combinations
- All interactive elements include focus states
- Semantic HTML guidance for Figma Make
- Aria-labels and semantic roles specified

### Designer-Friendly Descriptions
Every token includes context for:
- What it's used for
- Visual hierarchy or contrast info
- Component examples
- When to use strong vs. subtle variants

---

## Quick Reference: Token Categories

### Brand Tokens
- 10 base colors (cream, yellow, orange, red, pink, purple, dark-blue, grey, green, neutral)
- 8 color ramps with 21 shades each (100–1050)
- All with WCAG contrast data

### Semantic Tokens
- **Surface:** 8 tokens (canvas, undercanvas, level-1–4, inverse, accent)
- **Elevation:** 7 tokens (background fills for each level)
- **Border:** 1 token (level-2 primary border)
- **Interactive:** 12 tokens (primary, secondary, link with fill/border/text/icon states)
- **Feedback:** 16 tokens (error, success, warning, info × 4 properties)

### Styles
- **Typography:** Font definitions, scales, styles
- **Shadows:** 7 elevation shadows (negative-1 through 4, inverse)

---

## Figma Make Best Practices

### 1. Token Usage in Generated Code
```css
/* Always use variables */
background-color: var(--surface-level-1);
color: var(--interactive-primary-text-default);
box-shadow: var(--shadow-elevation-1);

/* Never hardcode colors */
background-color: #ffffff;  /* ❌ Wrong */
```

### 2. Surface Level Selection
- **Canvas:** Page backgrounds
- **Level 1:** Cards, contained components
- **Level 2:** Dropdowns, popovers (+ optional border)
- **Level 3:** Sticky headers
- **Level 4:** Modals, dialogs
- **Inverse:** Dark backgrounds

### 3. Always Pair Fill + Shadow
```css
/* Correct: Level 1 fill + Level 1 shadow */
background-color: var(--surface-level-1);
box-shadow: var(--shadow-elevation-1);

/* Wrong: Mismatched levels */
background-color: var(--surface-level-1);
box-shadow: var(--shadow-elevation-3);  /* ❌ Inconsistent */
```

### 4. Feedback Patterns
Always use complete feedback set (fill + text + border + icon):
```css
.error-banner {
  background-color: var(--feedback-error-fill);
  color: var(--feedback-error-text);
  border-left: 4px solid var(--feedback-error-border);
}

.error-banner svg {
  fill: var(--feedback-error-icon);
}
```

---

## Next Steps

1. **In Figma Design:**
   - Ensure Token Studio is synced with `tokens/tokens.json`
   - Publish your design library

2. **In Figma Make:**
   - Export your library (Assets → Libraries → Export for Make)
   - Open Figma Make workspace
   - Code settings should reference `figma-make-guidelines.md`
   - Test generated components match your design system

3. **Maintenance:**
   - Update `figma-make-guidelines.md` when adding new patterns
   - Re-export to Figma Make after token updates
   - Keep token descriptions in sync with usage

4. **Verification:**
   - Generated code uses semantic HTML
   - All colors use CSS variables (no hardcoded hex)
   - Focus states present on interactive elements
   - WCAG AA contrast maintained

---

## Support Resources

- **Figma Make Guide:** https://help.figma.com/hc/en-us/articles/33665861260823-Add-guidelines-to-Figma-Make
- **Token Studio Docs:** https://docs.tokens.studio/
- **Design System Guide:** See `guideline.md` in this repository
- **Token Reference:** See `docs/TOKENS-README.md` in this repository
- **Accessibility:** https://www.w3.org/WAI/WCAG21/quickref/
