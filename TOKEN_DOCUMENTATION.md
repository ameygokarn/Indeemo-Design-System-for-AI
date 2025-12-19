# Indeemo Design System Token Documentation

This document provides comprehensive documentation for all design tokens in the Indeemo Design System. It serves as a reference for designers, developers, and AI systems working with the design tokens.

**Last Updated:** Based on tokens.json as of December 15, 2025  
**Token Version:** Refer to tokens.json metadata  
**Primary Format:** Token Studio JSON (compatible with Figma)

## Recent Token Changes

- Fixes and schema alignment (commit: a92cb1c): repaired a JSON parse error in `brand.color.ramp.neutral.150` and converted modifier tokens from `type: "other"` to `type: "number"` (evaluated simple arithmetic expressions to canonical numeric values).
- Color ramp normalization (commit: b70f526): normalized each `brand.color.ramp` to the 20 keys from `100` to `1000` (increment 50). Missing keys were filled by copying nearest existing shades; no color hue/lightness arithmetic was performed.
- Label sizing made fixed across viewports (commit: 71e4c10): added `typography.label.large|medium|small` (18/16/14) and updated `styles.label.*` to reference these tokens so label grouping does not scale per viewport.
- Repository synced (commit: 87add5a): pulled remote fixes and aligned local tokens with `origin/main`.

Notes:
- I intentionally limited changes to structural fixes and consistent keying. If you prefer a narrower revert (only the JSON parse fix), tell me and I will revert the other edits into a branch for review.
- Please run Token Studio import/validator; if it still flags schema issues, paste the validator output and I'll iterate.

---

## Table of Contents

1. [Token Structure Overview](#token-structure-overview)
2. [Token Naming Conventions](#token-naming-conventions)
3. [Brand Colors](#brand-colors)
4. [Color Ramps](#color-ramps)
5. [Semantic Tokens](#semantic-tokens)
   - [Colour](#colour)
   - [Typography](#typography)
   - [Spacing](#spacing-scale)
   - [Border](#border)
6. [Dynamic Relationships in Interactive Tokens](#dynamic-relationships-in-interactive-tokens)
7. [Shadow & Elevation Effects](#shadow--elevation-effects)
8. [CSS Variable Reference](#css-variable-reference)
9. [Accessibility Information](#accessibility-information)
10. [Usage Examples](#usage-examples)

---

## Token Structure Overview

The Indeemo Design System uses a three-tier token architecture:

### Core Sets
1. **`brand`** - Foundational brand colors and color ramps
2. **`semantic`** - Context-specific tokens for UI components
3. **`styles`** - Exportable styles (typography, shadows, effects)

### Token Hierarchy
- **Base Tokens:** Raw values (hex colors, font sizes, etc.)
- **Semantic Tokens:** Named by purpose (e.g., `surface.canvas`, `interactive.primary.fill.default`)
- **Alias References:** Tokens that reference other tokens using `{ }` syntax

---

## Token Naming Conventions

### Overview
Token names in the Indeemo Design System follow a structured taxonomy that ensures consistency, clarity, and scalability. Each token name is built by combining specific attributes in a defined order, creating self-documenting identifiers that communicate both purpose and context.

### Naming Structure
Tokens follow this general pattern (not all attributes are required for every token):

```
[Sentiment]-[Type]-[Context]-[Grouping]-[Option]-[Modifier]-[Scale]-[Role]-[State]
```

### Token Attributes Reference

| Attribute | Description | Example Values |
|:----------|:------------|:---------------|
| **Sentiment** | The abstraction layer of the token, distinguishing between foundational values and semantic purpose. | `semantic`, `foundation`, `brand`, `ramp` |
| **Type** | The category of design property being defined. Determines what aspect of the UI the token controls. In Token Studio, this maps to the token `type` property. | `color`, `typography`, `spacing`, `dimension`, `sizing`, `border-radius`, `shadow`, `opacity` |
| **Context** | The domain or usage context for the token. Provides high-level categorization of where tokens are applied. | `brand`, `utility`, `product` |
| **Grouping** | The semantic context or functional area where the token is used. Primary organizational layer that describes the UI pattern or component family. | `interactive`, `feedback`, `text`, `icon`, `border`, `surface`, `input`, `tag`, `navigation` |
| **Option** | Behavioral characteristics of the token. For typography, defines whether values are static or fluid. For other types, may indicate variants like `solid`, `dashed`, `gradient`. | `static`, `fluid`, `solid`, `dashed`, `gradient`, `inner`, `outer` |
| **Modifier** | Visual weight, style variation, or emphasis level. Describes how the token differs from the base version. | `light`, `regular`, `bold`, `black`, `subtle`, `strong`, `medium`, `semibold`, `muted`, `vibrant` |
| **Scale** | Hierarchical level, severity, or size within a grouping. Provides ordering and relative importance. | `primary`, `secondary`, `tertiary`, `critical`, `success`, `warning`, `info`, `2xs`, `xs`, `s`, `m`, `l`, `xl`, `2xl`, `level-1`, `level-2` |
| **Role** | The specific UI property or element the token applies to. Describes what is being styled. | `fill`, `text`, `icon`, `border`, `stroke`, `background`, `foreground`, `overlay`, `underlay` |
| **State** | The interaction or validation state of the element. Applied primarily to interactive components. | `default`, `hover`, `pressed`, `focus`, `active`, `disabled`, `error`, `success`, `loading`, `selected` |

### Token Studio Considerations
- **Token Sets as Top-Level Organization**: Use Token Studio's set feature to organize tokens (e.g., `semantic`, `brand`, `ramp`).
- **Type Property Alignment**: Ensure the `type` property in your JSON matches Token Studio's supported types.
- **Reference Tokens**: Use Token Studio's `{token.reference}` syntax to build semantic tokens from foundation tokens.
- **Composite Tokens**: For complex properties like typography or elevation, use Token Studio's composite token types that bundle multiple properties together.

### Best Practices for Creating New Tokens
1. **Start with Sentiment**: Determine if this is a `semantic` (purpose-driven), `foundation` (base value), or specialized token.
2. **Define the Grouping**: Identify the semantic context first (`interactive`, `feedback`, `text`, `surface`, etc.).
3. **Specify the Role**: Determine what UI property it controls (`fill`, `text`, `border`, `icon`).
4. **Add Scale when needed**: Include hierarchy or severity (`primary`, `secondary`, `error`, `success`).
5. **Include State for interactive elements**: Add interaction states (`default`, `hover`, `pressed`, `focus`, `disabled`).
6. **Keep it semantic**: Name tokens by purpose, not by visual appearance.
7. **Maintain consistency**: Follow existing patterns in the system.
8. **Avoid redundancy**: Don't repeat information already implied by other attributes.
9. **Use Token Studio features**: Leverage sets, descriptions, and token references.
10. **Document as you go**: Add clear descriptions to each token explaining its purpose and usage context.

### Naming Examples
| Token Name | Breakdown | Usage |
|:-----------|:----------|:------|
| `semantic.interactive.primary.fill.default` | **Sentiment**: `semantic`<br>**Grouping**: `interactive`<br>**Scale**: `primary`<br>**Role**: `fill`<br>**State**: `default` | Default background color for primary buttons or CTAs |
| `semantic.feedback.text.error` | **Sentiment**: `semantic`<br>**Grouping**: `feedback`<br>**Role**: `text`<br>**Scale**: `error` | Text color for error messages and validation feedback |
| `semantic.text.primary` | **Sentiment**: `semantic`<br>**Grouping**: `text`<br>**Scale**: `primary` | Primary body text color for main content |
| `foundation.typography.heading.fluid.bold.xl` | **Sentiment**: `foundation`<br>**Type**: `typography`<br>**Grouping**: `heading`<br>**Option**: `fluid`<br>**Modifier**: `bold`<br>**Scale**: `xl` | Composite typography token for large bold headings |

---

## Design System Philosophy & Reference Format

### Philosophy
- **Viewport-scaled architecture:** 4 sets (brand, semantic, viewport, styles) with comprehensive responsive scaling
- **Mathematical scaling:** Typography and spacing use multipliers for consistent viewport-based scaling
- **Semantic grouping:** Tokens organized by context and use case across all breakpoints
- **Brand references:** ALL semantic colors reference the brand palette with global updates
- **Designer-ready:** All tokens include clear descriptions for Figma Make and designer understanding
- **No duplication:** Existing tokens moved rather than duplicated to maintain clean architecture

### Token Reference Format

All references use **flattened format** (set name omitted in reference):

#### Same-Set References
```json
{typography.scale.base}
{interactive.primary.fill.default}
{feedback.error.text}
{surface.canvas}
```

#### Cross-Set References
```json
{color.brand.pink}
{color.ramp.red.900}
```

#### Why Flattened Format?
Token Studio uses a flattened reference model where:
- Set names are omitted for brevity
- Paths start from the first semantic level (color, typography, etc.)
- This ensures references work correctly in Figma variable resolution

### Best Practices for Designers & LLMs

1. **Always reference semantic tokens** — Never use brand colors directly in components. Use semantic tokens for context-specific coloring.

2. **Use surface + accent tokens together** — Combine `surface.*` with `accent.*` for consistent visual hierarchy.

3. **Follow elevation mapping** — Use correct surface level for component type:
   - Canvas: Page backgrounds
   - Level 1: Cards, contained components
   - Level 2: Overlays, popovers
   - Level 3: Modals
   - Level 4: Top-level modals

4. **Use feedback tokens for messaging** — Always use `feedback.*` tokens for error, success, warning, info states. Never mix with other color tokens.

5. **Maintain contrast ratios** — All semantic colors maintain WCAG AA contrast. Check component text against its background.

6. **Update colors globally** — Need to change all pink elements? Update `brand.color.brand.pink` once. All semantic tokens referencing it update automatically.

### Token Count Summary

| Set | Category | Count | Notes |
|-----|----------|-------|-------|
| brand | Colors | 10 | Base palette (cream, yellow, orange, red, pink, purple, dark-blue, grey, green, neutral) |
| brand | Ramps | 8 × 21 = 168 | Each color has 21 shades with metadata |
| semantic | Surface | 8 | undercanvas, canvas, level-1 through level-4, inverse, accent |
| semantic | Elevation | 7 | level-negative-1 through level-4, level-inverse |
| semantic | Border | 1 | border.elevation.level-2.primary |
| semantic | Interactive | 12 | 3 groups × 4 properties (primary, secondary, link) |
| semantic | Feedback | 16 | 4 types × 4 properties (error, success, warning, info) |
| viewport | Typography | 4 × 48 = 192 | 4 viewports × 12 font sizes + 4 line heights each |
| viewport | Grid | 4 × 4 = 16 | 4 viewports × 4 grid properties (column, margin, gutter, viewport) |
| viewport | Spacing Static | 4 × 22 = 88 | 4 viewports × 22 static spacing tokens each |
| viewport | Spacing Fluid | 4 × 10 = 40 | 4 viewports × 10 fluid spacing tokens each |
| styles | Typography | 9 | 3 sizes × 3 styles (link, body, label) |
| styles | Shadows | 7 | Elevation shadows negative-1 through 4, inverse |
| **Total** | | **~550+** | Comprehensive viewport-scaled token system |

---

## Brand Colors

### Core Brand Palette
These are the foundational brand colors used throughout the design system.

| Token | Value | Type | Description |
|-------|-------|------|-------------|
| `brand.color.brand.cream` | `#fffdf2` | color | Light cream background color |
| `brand.color.brand.orange` | `#ff6b14` | color | Vibrant orange for accents |
| `brand.color.brand.red` | `#ff2734` | color | Alert/error red |
| `brand.color.brand.pink` | `#da095e` | color | **Primary brand color** - Main accent |
| `brand.color.brand.purple` | `#8b006e` | color | Secondary brand color |
| `brand.color.brand.dark-blue` | `#2e3059` | color | Dark blue for text and backgrounds |
| `brand.color.brand.green` | `#2B5926` | color | Success/green color |
| `brand.color.brand.white` | `#ffffff` | color | Pure white |
| `brand.color.brand.black` | `#000000` | color | Pure black |
| `brand.color.brand.yellow` | `#ffc700` | color | Warning/yellow color |

### Key Usage Guidelines
- **Brand Pink (`#da095e`)**: Primary CTA color, main interactive elements
- **Brand Purple (`#8b006e`)**: Secondary actions, borders, links
- **Brand Dark Blue (`#2e3059`)**: Headings, dark backgrounds
- **Brand Cream (`#fffdf2`)**: Light backgrounds, undercanvas surfaces

---

## Color Ramps

Each brand color has a corresponding ramp with 11 shades (100-1050) for creating consistent color systems with WCAG contrast information.

### Neutral Ramp (Grayscale)
- **Range:** 100 (white) to 1050 (black)
- **Use:** Backgrounds, text, borders, disabled states
- **Key Shades:**
  - `neutral.100` (#ffffff): Pure white
  - `neutral.300` (hsl(0,0%,79%)): Light borders
  - `neutral.450` (hsl(0,0%,63%)): Disabled text (option C)
  - `neutral.750` (hsl(0,0%,32%)): Dark text on light backgrounds
  - `neutral.950` (hsl(0,0%,11%)): Very dark text

### Pink Ramp
- **Base Color:** `#da095e` (appears at `pink.650`)
- **Use:** Primary interactions, accents, highlights
- **Key Shades:**
  - `pink.100` (hsl(335,92%,98%)): Light backgrounds
  - `pink.650` (#da095e): Primary brand pink
  - `pink.750` (hsl(335,92%,41%)): Primary button hover
  - `pink.850` (hsl(335,92%,32%)): Primary button pressed

### Purple Ramp
- **Base Color:** `#8b006e` (appears at `purple.650`)
- **Use:** Secondary actions, links, borders
- **Key Shades:**
  - `purple.700` (hsl(312,100%,45%)): Visited links
  - `purple.750` (hsl(312,100%,41%)): Link hover, secondary border hover
  - `purple.850` (hsl(312,100%,32%)): Default links, secondary border pressed

### Dark Blue Ramp
- **Base Color:** `#2e3059` (appears at `dark-blue.700`)
- **Use:** Headings, dark UI elements
- **Key Shades:**
  - `dark-blue.100` (hsl(237,31%,98%)): Info background
  - `dark-blue.800` (hsl(237,31%,36%)): Info text
  - `dark-blue.950` (hsl(237,31%,23%)): Info border

### Other Color Ramps
- **Red Ramp:** Error states, destructive actions
- **Orange Ramp:** Warning states, highlights
- **Yellow Ramp:** Caution, warnings
- **Green Ramp:** Success states, confirmations

### Color Ramp Methodology

The Indeemo Design System uses a scientifically-grounded approach to color ramp generation:

**Linear Lightness Distribution:** Color ramps are generated using linear lightness progression (98% to 10% lightness) while maintaining constant hue and saturation. This creates mathematically predictable, visually harmonious scales with equal perceptual steps.

**Built-in Accessibility:** Every color token includes calculated WCAG contrast ratios against white and black backgrounds, with explicit compliance levels (AA/AAA for Normal/Large text). Designers immediately know which colors work on which backgrounds.

**Systematic Design:** All non-neutral color ramps follow a consistent 20-step progression (100 to 1050 with 50-point increments) using Token Studio's modifier tokens for lighten/darken operations.

**Key Algorithm:**
- Base colors anchored at their natural lightness positions
- Linear distribution: `lightness = 98% - (progress × 88%)` for steps 0-19
- Constant hue and saturation to maintain brand color identity
- Automatic WCAG contrast calculations and documentation

This methodology ensures color ramps are visually harmonious, accessible by default, and systematically scalable across all brand colors.

### WCAG Contrast Information
Each color ramp token includes detailed WCAG contrast data:
- Contrast ratios against white and black backgrounds
- WCAG compliance level (AA/AAA)
- Recommended text color pairings
- Lightness percentage for accessibility calculations

---

## Spacing Scale

### Foundation
The spacing system uses a 2px base unit (`brand.spacing.base`) with a 14-step scale that follows multiples of the base unit. This creates a consistent, predictable spacing system that aligns with the 2x grid principle.

### Spacing Tokens
| Token | Calculation | Actual Value | Use Case |
|-------|-------------|--------------|----------|
| `brand.spacing.base` | `2` | 2px | Base unit for all spacing |
| `brand.spacing.scale.xxs` | `{spacing.base} * 1` | 2px | Micro spacing needs |
| `brand.spacing.scale.xs` | `{spacing.base} * 2` | 4px | Tight spacing between small elements |
| `brand.spacing.scale.sm` | `{spacing.base} * 4` | 8px | Padding inside compact components |
| `brand.spacing.scale.md` | `{spacing.base} * 8` | 16px | Default padding and margins |
| `brand.spacing.scale.lg` | `{spacing.base} * 12` | 24px | Section padding and larger margins |
| `brand.spacing.scale.xl` | `{spacing.base} * 16` | 32px | Major section spacing |
| `brand.spacing.scale.2xl` | `{spacing.base} * 20` | 40px | Large vertical rhythm |
| `brand.spacing.scale.3xl` | `{spacing.base} * 24` | 48px | Major vertical spacing |
| `brand.spacing.scale.4xl` | `{spacing.base} * 32` | 64px | Hero section spacing |
| `brand.spacing.scale.5xl` | `{spacing.base} * 40` | 80px | Large hero spacing |
| `brand.spacing.scale.6xl` | `{spacing.base} * 48` | 96px | Extra large spacing |
| `brand.spacing.scale.7xl` | `{spacing.base} * 64` | 128px | Massive spacing |
| `brand.spacing.scale.8xl` | `{spacing.base} * 80` | 160px | Extreme spacing |
| `brand.spacing.scale.9xl` | `{spacing.base} * 96` | 192px | Maximum spacing |

### Usage Guidelines
1. **Consistent Multiples**: All spacing values are multiples of 2px, creating visual harmony
2. **Progressive Scale**: The scale progresses geometrically (1, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)
3. **Token References**: Always use spacing tokens (e.g., `{spacing.md}`) instead of hardcoded values
4. **Figma Variables**: These tokens export as Figma spacing variables (type: `SPACING`)

### CSS Variables
```css
/* Spacing Variables */
--spacing-base: 2px;
--spacing-xxs: 2px;
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 40px;
--spacing-3xl: 48px;
--spacing-4xl: 64px;
--spacing-5xl: 80px;
--spacing-6xl: 96px;
--spacing-7xl: 128px;
--spacing-8xl: 160px;
--spacing-9xl: 192px;
```

### Example Usage
```css
/* Component with consistent spacing */
.card {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

/* Layout with progressive spacing */
.section {
  padding: var(--spacing-xl) var(--spacing-md);
}

.hero {
  padding: var(--spacing-5xl) var(--spacing-xl);
}
```

---

## Semantic Tokens

### Colour

#### Surface & Elevation Tokens
Surface and elevation tokens define the background layers and hierarchy of the interface. They are organized by elevation level (z-index depth) and include accent variations.

| Token | Reference | Description |
|-------|-----------|-------------|
| `surface.undercanvas` | `{color.brand.cream}` | Undercanvas (elevation -1). Base layer behind the main canvas. |
| `surface.canvas` | `{color.brand.white}` | Canvas (elevation 0). Primary background for page content. |
| `surface.level-1` | `{color.brand.white}` | Level 1 (elevation 1). Cards and containers. |
| `surface.level-2` | `{color.brand.white}` | Level 2 (elevation 2). Dropdowns, popovers, tooltips. |
| `surface.level-3` | `{color.brand.white}` | Level 3 (elevation 3). Modals, sticky headers. |
| `surface.level-4` | `{color.brand.white}` | Level 4 (elevation 4). Top-level overlays. |
| `surface.inverse` | `{color.brand.black}` | Inverse surface. Dark background for high-contrast sections. |
| `surface.accent.low` | `{color.ramp.pink.400}` | Low intensity accent (82.5% lightness). Subtle highlights. |
| `surface.accent.medium` | `{color.ramp.pink.600}` | Medium intensity accent (67.5% lightness). Moderate highlights. |
| `surface.accent.high` | `{color.ramp.pink.650}` | High intensity accent (62.5% lightness). Strong highlights/badges. |

#### Interactive Components
Interactive tokens define the states (default, hover, pressed) for primary and secondary actions.

| Component | State | Fill/Border | Text/Icon |
|-----------|-------|-------------|-----------|
| **Primary Button** | Default | `{color.brand.pink}` | `{color.brand.white}` |
| | Hover | `{color.ramp.pink.750}` | `{color.ramp.neutral.200}` |
| | Pressed | `{color.ramp.pink.850}` | `{color.ramp.neutral.250}` |
| **Secondary Button** | Default | `{color.brand.white}` (fill), `{color.brand.purple}` (border) | `{color.brand.black}` |
| | Hover | `{color.ramp.neutral.150}` (fill), `{color.ramp.purple.750}` (border) | `{color.brand.black}` |
| | Pressed | `{color.ramp.neutral.200}` (fill), `{color.ramp.purple.850}` (border) | `{color.brand.black}` |
| **Link** | Default | - | `{color.ramp.purple.850}` |
| | Hover | - | `{color.ramp.purple.750}` |
| | Visited | - | `{color.ramp.purple.700}` |

#### Input Components
Input tokens define the visual states for form fields, ensuring clarity and accessibility.

| State | Fill | Border | Text |
|-------|------|--------|------|
| Default | `{color.ramp.neutral.100}` | `{color.ramp.neutral.950}` | `{color.ramp.neutral.850}` |
| Hover | `{color.ramp.neutral.150}` | `{color.ramp.neutral.1000}` | `{color.ramp.neutral.900}` |
| Active | `{color.ramp.neutral.200}` | `{color.ramp.pink.650}` | `{color.ramp.neutral.1050}` |
| Success | `{color.ramp.green.150}` | `{color.ramp.green.950}` | `{color.ramp.green.800}` |
| Error | `{color.ramp.red.150}` | `{color.ramp.red.950}` | `{color.ramp.red.800}` |
| Disabled | `{disabled.a}` | - | `{disabled.c}` |

#### Feedback States
Feedback tokens communicate system status (error, success, warning, info) through consistent color application.

| Type | Fill | Text/Icon | Border |
|------|------|-----------|--------|
| **Error** | `{color.ramp.red.100}` | `{color.ramp.red.800}` | `{color.ramp.red.950}` |
| **Success** | `{color.ramp.green.100}` | `{color.ramp.green.800}` | `{color.ramp.green.950}` |
| **Warning** | `{color.ramp.yellow.100}` | `{color.ramp.orange.800}` | `{color.ramp.orange.950}` |
| **Info** | `{color.ramp.dark-blue.100}` | `{color.ramp.dark-blue.800}` | `{color.ramp.dark-blue.950}` |

#### Disabled States
Universal disabled states for consistent UI behavior.

- `disabled.a`: `{color.ramp.neutral.200}` (Fill - 89% lightness)
- `disabled.b`: `{color.ramp.neutral.300}` (Border - 79% lightness)
- `disabled.c`: `{color.ramp.neutral.400}` (Text - 69% lightness)

### Typography

Typography uses a mathematical scaling system with viewport-specific multipliers for responsive design.

#### Viewport Typography Multipliers
- **Small**: Custom progression starting from 6px
- **Medium**: Custom progression starting from 8px
- **Large**: Target progression: 8px, 10px, 12px, 16px, 20px, 24px, 28px, 32px, 38px, 40px
- **XLarge**: Extended progression starting from 10px

#### Font Size Scale Factors
| Token | Small (0-767) | Medium (768-1023) | Large (1024-1439) | XLarge (1440+) |
|-------|---------------|-------------------|-------------------|----------------|
| `xxs` | 6px | 8px | 8px | 10px |
| `xs` | 8px | 10px | 10px | 12px |
| `sm` | 10px | 12px | 12px | 16px |
| `md` | 12px | 14px | 16px | 18px |
| `lg` | 14px | 16px | 20px | 20px |
| `xl` | 16px | 18px | 24px | 24px |
| `xxl` | 18px | 20px | 28px | 28px |
| `3xl` | 20px | 24px | 32px | 32px |
| `4xl` | 24px | 28px | 38px | 38px |
| `5xl` | 28px | 32px | 40px | 40px |

### Typography Tokens

**Grouping:** `viewport.{viewport}.typography.*`

Font sizes use custom progressions per viewport, line heights are consistent across viewports.

| Token Path | Small (6px base) | Medium (8px base) | Large (8px base) | XLarge (10px base) | Type |
|------------|------------------|-------------------|------------------|---------------------|------|
| `viewport.small.typography.fontSize.xxs` | 6 | 8 | 8 | 10 | fontSizes |
| `viewport.small.typography.fontSize.xs` | 8 | 10 | 10 | 12 | fontSizes |
| `viewport.small.typography.fontSize.sm` | 10 | 12 | 12 | 16 | fontSizes |
| `viewport.small.typography.fontSize.md` | 12 | 14 | 16 | 18 | fontSizes |
| `viewport.small.typography.fontSize.lg` | 14 | 16 | 20 | 20 | fontSizes |
| `viewport.small.typography.fontSize.xl` | 16 | 18 | 24 | 24 | fontSizes |
| `viewport.small.typography.fontSize.xxl` | 18 | 20 | 28 | 28 | fontSizes |
| `viewport.small.typography.fontSize.3xl` | 20 | 24 | 32 | 32 | fontSizes |
| `viewport.small.typography.fontSize.4xl` | 24 | 28 | 38 | 38 | fontSizes |
| `viewport.small.typography.fontSize.5xl` | 28 | 32 | 40 | 40 | fontSizes |
| `viewport.small.typography.lineHeight.tight` | 1.0 | 1.0 | 1.0 | 1.0 | lineHeights |
| `viewport.small.typography.lineHeight.normal` | 1.125 | 1.125 | 1.125 | 1.125 | lineHeights |
| `viewport.small.typography.lineHeight.loose` | 1.25 | 1.25 | 1.25 | 1.25 | lineHeights |
| `viewport.small.typography.lineHeight.extra-loose` | 1.5 | 1.5 | 1.5 | 1.5 | lineHeights |

### Fluid Spacing Tokens

**Grouping:** `viewport.{viewport}.spacing.fluid.*`

Fluid spacing calculated using multipliers for proportional scaling. All fluid spacing values now use even numbers for consistency and predictability.

| Token Path | Small (4px × 1.0) | Medium (4px × 1.0) | Large (4px × 1.25) | XLarge (4px × 1.5) | Type |
|------------|-------------------|---------------------|---------------------|---------------------|------|
| `viewport.small.spacing.fluid.010` | 2 | 2 | 2 | 2 | spacing |
| `viewport.small.spacing.fluid.020` | 4 | 4 | 4 | 4 | spacing |
| `viewport.small.spacing.fluid.040` | 6 | 6 | 8 | 10 | spacing |
| `viewport.small.spacing.fluid.060` | 10 | 10 | 12 | 14 | spacing |
| `viewport.small.spacing.fluid.080` | 14 | 14 | 16 | 20 | spacing |
| `viewport.small.spacing.fluid.100` | 16 | 16 | 20 | 24 | spacing |
| `viewport.small.spacing.fluid.120` | 20 | 20 | 24 | 30 | spacing |
| `viewport.small.spacing.fluid.160` | 26 | 26 | 32 | 38 | spacing |
| `viewport.small.spacing.fluid.240` | 30 | 30 | 36 | 44 | spacing |
| `viewport.small.spacing.fluid.320` | 32 | 32 | 40 | 48 | spacing |

#### Composite Typography — Resolved by Viewport

One authoritative table showing each composite typography style and its resolved font-size across viewports, plus key token references (line-height, weight, letter-spacing) and a short description. Rows are ordered: headline → subheadline → caption → body → label → link.

| Style | Small | Medium | Large | XLarge | Line Height | Weight | Letter Spacing | Description |
|------|------:|------:|-----:|------:|-------------|--------|---------------:|-------------|
| `styles.headline.large` | 20px | 24px | 32px | 28px | `{lineHeight.s}` | `regular` | `-1%` | High-impact heading |
| `styles.headline.medium` | 18px | 20px | 24px | 24px | `{lineHeight.s}` | `regular` | `-1%` | Standard page heading |
| `styles.headline.small` | 16px | 18px | 20px | 22px | `{lineHeight.s}` | `regular` | `-1%` | Section heading |
| `styles.subheadline.large` | 18px | 20px | 28px | 28px | `{lineHeight.l}` | `medium` | — | Prominent subsection title |
| `styles.subheadline.medium` | 16px | 18px | 24px | 24px | `{lineHeight.l}` | `medium` | — | Standard subsection title |
| `styles.subheadline.small` | 14px | 16px | 20px | 20px | `{lineHeight.l}` | `medium` | — | Minor subsection title |
| `styles.subheadline.xsmal` | 10px | 12px | 12px | 16px | `{lineHeight.l}` | `medium` | — | Compact subheadline |
| `styles.caption.medium` | 8px | 10px | 10px | 12px | `{lineHeight.m}` | `bold` | — | Explanatory caption text |
| `styles.caption.small` | 6px | 8px | 8px | 10px | `{lineHeight.m}` | `bold` | — | Micro caption / UI labels |
| `styles.body.large` | 14px | 16px | 20px | 20px | `{lineHeight.loose}` | `regular` | — | Lead paragraphs |
| `styles.body.medium` | 12px | 14px | 16px | 18px | `{lineHeight.normal}` | `regular` | — | Primary body text |
| `styles.body.small` | 10px | 12px | 12px | 16px | `{lineHeight.tight}` | `regular` | — | Secondary body text |
| `styles.label.large` | 14px | 16px | 20px | 20px | `{lineHeight.tight}` | `bold` | — | Prominent labels |
| `styles.label.medium` | 12px | 14px | 16px | 18px | `{lineHeight.tight}` | `bold` | — | Standard labels |
| `styles.label.small` | 10px | 12px | 12px | 16px | `{lineHeight.tight}` | `bold` | — | Compact labels |
| `styles.link.large` | 14px | 16px | 20px | 20px | `{lineHeight.loose}` | `regular` | — | Large link text |
| `styles.link.medium` | 12px | 14px | 16px | 18px | `{lineHeight.m}` | `regular` | — | Standard link text |
| `styles.link.small` | 10px | 12px | 12px | 16px | `{lineHeight.tight}` | `regular` | — | Small link text |
| `styles.link.xsmall` | 8px | 10px | 10px | 12px | `{lineHeight.m}` | `regular` | — | Extra-small link |

### Interactive Components

#### Primary Buttons
| State | Fill Token | Text Token | Icon Token |
|-------|------------|------------|------------|
| Default | `interactive.primary.fill.default` | `interactive.primary.text.default` | `interactive.primary.icon.default` |
| Hover | `interactive.primary.fill.hover` | `interactive.primary.text.hover` | `interactive.primary.icon.hover` |
| Pressed | `interactive.primary.fill.pressed` | `interactive.primary.text.pressed` | `interactive.primary.icon.pressed` |

**Values:**
- Fill: Pink ramp (default: `#da095e`, hover: `pink.750`, pressed: `pink.850`)
- Text: White/light neutral (default: white, hover: `neutral.200`, pressed: `neutral.250`)

#### Secondary Buttons
| State | Fill Token | Border Token | Text Token |
|-------|------------|--------------|------------|
| Default | `interactive.secondary.fill.default` | `interactive.secondary.border.default` | `interactive.secondary.text.default` |
| Hover | `interactive.secondary.fill.hover` | `interactive.secondary.border.hover` | `interactive.secondary.text.hover` |
| Pressed | `interactive.secondary.fill.pressed` | `interactive.secondary.border.pressed` | `interactive.secondary.text.pressed` |

**Values:**
- Fill: White/light neutral
- Border: Purple ramp (default: `#8b006e`, hover: `purple.750`, pressed: `purple.850`)
- Text: Black (consistent across states)

#### Links
- `interactive.link.default`: `{color.ramp.purple.850}` - Default link color
- `interactive.link.hover`: `{color.ramp.purple.750}` - Hover state
- `interactive.link.visited`: `{color.ramp.purple.700}` - Visited state

### Feedback States

#### Error
- `feedback.error.fill`: `{color.ramp.red.100}` - Background
- `feedback.error.text`: `{color.ramp.red.800}` - Text/icons
- `feedback.error.border`: `{color.ramp.red.950}` - Border
- `feedback.error.icon`: References text color

#### Success
- `feedback.success.fill`: `{color.ramp.green.100}` - Background
- `feedback.success.text`: `{color.ramp.green.800}` - Text/icons
- `feedback.success.border`: `{color.ramp.green.950}` - Border
- `feedback.success.icon`: References text color

#### Warning
- `feedback.warning.fill`: `{color.ramp.yellow.100}` - Background
- `feedback.warning.text`: `{color.ramp.orange.800}` - Text/icons
- `feedback.warning.border`: `{color.ramp.orange.950}` - Border
- `feedback.warning.icon`: References text color

#### Info
- `feedback.info.fill`: `{color.ramp.dark-blue.100}` - Background
- `feedback.info.text`: `{color.ramp.dark-blue.800}` - Text/icons
- `feedback.info.border`: `{color.ramp.dark-blue.950}` - Border
- `feedback.info.icon`: References text color

#### Border Tokens (Non-Interactive)

General border tokens for UI separation, containers, and visual hierarchy. These are for non-interactive elements (for interactive borders, see the appropriate semantic token groups).

| Token | Reference | Contrast (vs white) | Purpose & Usage |
|-------|-----------|---------------------|-----------------|
| `border.primary` | `{color.ramp.neutral.750}` | 3.2:1 | Primary border for UI separation and container outlines. Use for card borders, section dividers, and strong visual separation. (35% lightness) |
| `border.secondary` | `{color.ramp.neutral.700}` | 2.8:1 | Secondary border for nested containers or less important separation. Use for nested cards, form field groups, and subtle dividers. (40% lightness) |
| `border.tertiary` | `{color.ramp.neutral.650}` | 2.5:1 | Tertiary border for minimal visual distinction. Use for grid lines and subtle separators in dense interfaces. (45% lightness) |
| `border.elevation` | `{color.ramp.neutral.300}` | 2.3:1 | Border for elevated surfaces (cards, modals, popovers) to enhance depth perception. Use with surface elevation levels 1-4. |
| `border.on-accent` | `{color.ramp.neutral.100}` (white) | 8.2:1 (on brand pink) | Border on top of accent-colored surfaces. Use for badges, labels, or containers on accent backgrounds. |

**Usage Notes:**
- **Hierarchy:** Use `border.primary` for main separation, `border.secondary` for nested elements, and `border.tertiary` for minimal distinction.
- **Lightness:** Primary (35%), Secondary (40%), Tertiary (45%) for progressive visual weight.
- **Elevation:** The `border.elevation` token is used for elevated surfaces.
- **Accessibility:** All tokens meet WCAG AA requirements for non-text contrast (3:1).
- **Note:** 
- `border.elevation.primary`: `{color.ramp.neutral.300}` - Default border for elevated surfaces
- Use with `surface.level-2` and above for visual separation

### Dynamic Relationships in Interactive Tokens

The Indeemo Design System employs a **dynamic relationship approach** for interactive tokens that creates maintainable, consistent state transitions through calculated modifications rather than static values. This approach ensures that interactive states (hover, pressed) are mathematically derived from their default states using the modifier system.

#### Core Concept: Calculated State Transitions

Instead of defining each interactive state with a static color value, the system establishes dynamic relationships:

```
Default State → [Modifier Calculation] → Hover/Pressed State
```

This creates a **single source of truth** where changing the default state automatically updates all dependent states, ensuring visual consistency and reducing maintenance overhead.

#### Implementation: The Modifier System

Interactive states use Token Studio's `$extensions.studio.tokens.modify` feature to apply calculated transformations:

| Modifier Token | Value | Purpose |
|----------------|-------|---------|
| `{modifier.interactive.hover}` | `{modifier.150}` (0.15) | Standard hover state transformation |
| `{modifier.interactive.pressed}` | `{modifier.250}` (0.25) | Standard pressed state transformation |

These modifiers represent proportional adjustments applied to the base color in HSL color space, creating predictable visual feedback.

#### Example: Interactive Secondary Border

**Before (Static Values):**
```json
"hover": {
  "value": "{color.ramp.purple.750}",
  "type": "color",
  "description": "..."
},
"pressed": {
  "value": "{color.ramp.purple.850}",
  "type": "color",
  "description": "..."
}
```

**After (Dynamic Relationships):**
```json
"hover": {
  "value": "{interactive.secondary.border.default}",
  "type": "color",
  "$extensions": {
    "studio.tokens": {
      "modify": {
        "type": "darken",
        "value": "{modifier.interactive.hover}",
        "space": "hsl"
      }
    }
  },
  "description": "Secondary button border - hover state. 41% lightness, darker purple for emphasis."
},
"pressed": {
  "value": "{interactive.secondary.border.default}",
  "type": "color",
  "$extensions": {
    "studio.tokens": {
      "modify": {
        "type": "darken",
        "value": "{modifier.interactive.pressed}",
        "space": "hsl"
      }
    }
  },
  "description": "Secondary button border - pressed state. 32% lightness, darkest purple for pressed state."
}
```

#### Benefits for Humans and LLMs

**For Designers & Developers:**
1. **Maintainability**: Change the default color once, and all states update automatically
2. **Consistency**: All hover/pressed states use the same proportional adjustments
3. **Predictability**: Visual feedback follows consistent rules across the system
4. **Documentation**: The relationships are self-documenting in the token structure

**For AI/LLM Systems:**
1. **Pattern Recognition**: Clear, predictable relationships between tokens
2. **Inference Capability**: Can deduce hover/pressed states from default states
3. **System Understanding**: Recognizes the modifier system as a design principle
4. **Code Generation**: Can generate consistent state logic based on patterns

#### Application Across Interactive Tokens

This pattern is applied consistently across all interactive token groups:

1. **Primary Buttons**: Fill, text, and icon states
2. **Secondary Buttons**: Fill, border, text, and icon states  
3. **Links**: Color states for default, hover, visited
4. **Input Fields**: Border, text, and icon states for various states

#### How to Use This Pattern

When creating or modifying interactive tokens:

1. **Establish Default First**: Define the `default` state token with clear semantic meaning
2. **Reference Default**: Set hover/pressed states to reference the default: `"{token.group.property.default}"`
3. **Apply Modifier**: Use `$extensions.studio.tokens.modify` with appropriate modifier token
4. **Choose Operation**: Use `darken`, `lighten`, or other supported operations
5. **Select Color Space**: Use `hsl` for perceptual consistency or `srgb` for specific cases

#### Mathematical Relationship

The system creates a predictable visual progression:
- **Default State**: Base color (e.g., `purple.850` at 32% lightness)
- **Hover State**: Default darkened by 15% (e.g., 32% → 27% lightness)
- **Pressed State**: Default darkened by 25% (e.g., 32% → 24% lightness)

This creates a clear visual hierarchy: `Pressed > Hover > Default` in terms of color intensity.

#### Maintenance Advantages

1. **Global Updates**: Changing `{modifier.interactive.hover}` updates all hover states system-wide
2. **Color Harmony**: All state transitions maintain consistent perceptual relationships
3. **Accessibility**: Contrast ratios remain predictable across states
4. **Theme Support**: Easy to create dark/light mode variations using the same relationships

#### Token Studio Integration

This approach leverages Token Studio's advanced features:
- **Reference Chains**: Tokens can reference other tokens with modifications
- **Modifier Tokens**: Centralized control over transformation amounts
- **Color Space Awareness**: Transformations respect perceptual color spaces
- **Export Compatibility**: Maintains relationships in generated code (CSS, JS, etc.)

#### Future Extensions

The dynamic relationship pattern can be extended to:
- **Focus states** using different modifier values
- **Disabled states** with lightness/opacity adjustments
- **Success/error states** with hue shifts while maintaining lightness relationships
- **Animation curves** by applying the modifier system to timing/duration tokens

This approach represents a mature design token architecture that balances flexibility with consistency, making the system more maintainable for humans while being more interpretable for AI systems.


### Input Components

Input tokens provide semantic styling for form fields and input components across all states, following the simplified naming pattern `input.[property].[state]`.

#### Token Reference Table

| Token | Reference Token | Contrast Ratio (vs White) | Description |
|-------|----------------|---------------------------|-------------|
| **Fill Tokens** | | | |
| `input.fill.default` | `{color.ramp.neutral.100}` | 1:1 | Default background for input fields in their standard state. |
| `input.fill.hover` | `{color.ramp.neutral.150}` | 1.2:1 | Background for input fields when hovered by the user. |
| `input.fill.active` | `{color.ramp.neutral.200}` | 1.5:1 | Background for input fields when active (pressed) or focused. |
| `input.fill.success` | `{color.ramp.green.150}` | 2.0:1 | Background for input fields in a success validation state (darker green for better visibility). |
| `input.fill.error` | `{color.ramp.red.150}` | 2.0:1 | Background for input fields in an error validation state (darker red for better visibility). |
| `input.fill.disabled` | `{disabled.a}` | Not required (disabled) | Background for input fields when disabled. |
| **Text Tokens** | | | |
| `input.text.primary` | `{color.ramp.neutral.850}` | 8:1 | Primary text color for input fields in their standard state. |
| `input.text.hover` | `{color.ramp.neutral.900}` | 11:1 | Text color for input fields when hovered by the user. |
| `input.text.active` | `{color.ramp.neutral.1050}` | 21:1 | Text color for input fields when active (pressed) or focused. |
| `input.text.success` | `{color.ramp.green.800}` | 12:1 | Text color for input fields in a success validation state. |
| `input.text.error` | `{color.ramp.red.800}` | 12:1 | Text color for input fields in an error validation state. |
| `input.text.disabled` | `{disabled.c}` | Not required (disabled) | Text color for input fields when disabled. |
| `input.text.secondary` | `{color.ramp.neutral.450}` | 2.6:1 | Text color for placeholder or secondary text in input fields. |
| **Border Tokens** | | | |
| `input.border.default` | `{color.ramp.neutral.950}` | 5.25:1 | Border color for input fields in their standard state (15% lightness, WCAG AA compliant). |
| `input.border.hover` | `{color.ramp.neutral.1000}` | 7.0:1 | Border color for input fields when hovered by the user (10% lightness, enhanced contrast). |
| `input.border.active` | `{color.ramp.pink.650}` | 8.2:1 | Border color for input fields when active (pressed) or focused. Uses brand pink for clear visual indication. |
| `input.border.success` | `{color.ramp.green.950}` | 15:1 | Border color for input fields in a success validation state. |
| `input.border.error` | `{color.ramp.red.950}` | 15:1 | Border color for input fields in an error validation state. |
| **Icon Tokens** | | | |
| `input.icon.primary` | `{input.text.primary}` | 8:1 | Primary icon color for input fields. References input.text.primary for consistency. |
| `input.icon.hover` | `{input.text.hover}` | 11:1 | Icon color for input fields when hovered by the user. References input.text.hover for consistency. |
| `input.icon.secondary` | `{input.text.secondary}` | 3.5:1 | Secondary icon color for input fields (e.g., placeholder icons). References input.text.secondary for consistency. |
| `input.icon.active` | `{input.text.active}` | 21:1 | Icon color for input fields when active (pressed) or focused. References input.text.active for consistency. |
| `input.icon.success` | `{input.text.success}` | 12:1 | Icon color for input fields in a success validation state. References input.text.success for consistency. |
| `input.icon.error` | `{input.text.error}` | 12:1 | Icon color for input fields in an error validation state. References input.text.error for consistency. |
| `input.icon.disabled` | `{disabled.c}` | Not required (disabled) | Icon color for input fields when disabled. |

#### Usage Notes
- **Contrast Compliance**: All tokens (except disabled states) meet WCAG AA requirements (4.5:1 for text, 3:1 for UI components)
- **Disabled States**: Removed from input grouping - use universal `disabled.a`, `disabled.b`, `disabled.c` tokens instead
- **Validation States**: Success/error fills use `green.150` and `red.150` for better visibility
- **Border Contrast**: `input.border.default` (`neutral.950`, 5.25:1) and `input.border.hover` (`neutral.1000`, 7:1) meet WCAG AA requirements
- **Border Active**: `input.border.active` now uses `color.ramp.pink.650` (brand pink, 8.2:1 contrast) for clear focus indication
- **Icon Tokens**: Icon colors now reference their corresponding text tokens for consistency and easier maintenance
- **Focus State**: Active state uses brand pink for clear visual indication

### Focus Tokens

Focus tokens provide consistent styling for keyboard navigation and accessibility focus indicators.

| Token | Reference | Contrast (vs white) | Purpose & Usage |
|-------|-----------|---------------------|-----------------|
| `focus.border` | `{color.ramp.dark-blue.950}` | 4.5:1 | Focus border color for keyboard navigation. Uses dark blue ramp for high contrast (4.5:1 on white). Meets WCAG AA requirements for focus indicators. |

**Usage Notes:**
- **Accessibility:** Use `focus.border` for all focus indicators to ensure 4.5:1 contrast ratio on white backgrounds.
- **Implementation:** Apply as `outline: 2px solid var(--focus-border)` with `outline-offset: 2px` for visible focus indicators.
- **Consistency:** This token should be used across all interactive components for keyboard navigation focus states.

### Disabled States

#### Universal Disabled Tokens
Disabled states use a universal palette that works across all component types:

| Token | Reference | Description |
|-------|-----------|-------------|
| `disabled.a` | `{color.ramp.neutral.200}` | Light disabled background (89% lightness) |
| `disabled.b` | `{color.ramp.neutral.300}` | Medium disabled background (79% lightness) |
| `disabled.c` | `{color.ramp.neutral.400}` | Dark disabled text/icons (69% lightness) |

**Usage Notes:**
- **Universal Application:** These tokens work for all disabled states across buttons, inputs, and other components
- **No Contrast Requirements:** Disabled states are exempt from WCAG contrast requirements
- **Consistent Palette:** Use `disabled.a` for backgrounds, `disabled.b` for borders, `disabled.c` for text/icons




---

## Shadow & Elevation Effects

### Shadow Tokens

| Elevation | Token | Values (x, y, blur, spread, color) | Use Case |
|-----------|-------|-------------------------------------|----------|
| -1 | `shadow.elevation-negative-1` | 0, 0, 0, 0, #00000033 | Undercanvas (no visible shadow) |
| 0 | `shadow.elevation-0` | 0, 1, 2, 0, #00000033 | Canvas level - minimal shadow |
| 1 | `shadow.elevation-1` | 0, 3, 8, 0, #00000033 | Level 1 - cards, floating elements |
| 2 | `shadow.elevation-2` | 0, 6, 16, 0, #00000033 | Level 2 - dropdowns, popovers |
| 3 | `shadow.elevation-3` | 0, 10, 24, 0, #00000033 | Level 3 - sticky headers |
| 4 | `shadow.elevation-4` | 0, 16, 32, 0, #00000033 | Level 4 - modals, top-level overlays |
| Inverse | `shadow.elevation-inverse` | 0, 6, 16, 0, #ffffff33 | Dark backgrounds |

### Shadow Rules
- Always pair with corresponding surface elevation level
- Color: `#00000033` (black with 20% opacity) for light surfaces
- Color: `#ffffff33` (white with 20% opacity) for dark surfaces
- Increasing y-offset and blur creates perception of higher elevation

---

## CSS Variable Reference

### Naming Convention
CSS variables follow kebab-case derived from token paths:
- `--color-brand-pink` (from `color.brand.pink`)
- `--surface-level-1` (from `surface.level-1`)
- `--interactive-primary-fill-default` (from `interactive.primary.fill.default`)

### Common CSS Variables

#### Color Variables
```css
/* Brand Colors */
--color-brand-cream: #fffdf2;
--color-brand-orange: #ff6b14;
--color-brand-red: #ff2734;
--color-brand-pink: #da095e;
--color-brand-purple: #8b006e;
--color-brand-dark-blue: #2e3059;
--color-brand-green: #2B5926;
--color-brand-white: #ffffff;
--color-brand-black: #000000;
--color-brand-yellow: #ffc700;

/* Neutral Ramp Examples */
--color-ramp-neutral-100: #ffffff;
--color-ramp-neutral-300: hsl(0, 0%, 79%);
--color-ramp-neutral-450: hsl(0, 0%, 63%);
--color-ramp-neutral-750: hsl(0, 0%, 32%);
--color-ramp-neutral-950: hsl(0, 0%, 11%);

/* Pink Ramp Examples */
--color-ramp-pink-100: hsl(335, 92%, 98%);
--color-ramp-pink-650: #da095e;
--color-ramp-pink-750: hsl(335, 92%, 41%);
--color-ramp-pink-850: hsl(335, 92%, 32%);
```

#### Semantic Variables
```css
/* Surface */
--surface-undercanvas: var(--color-brand-cream);
--surface-canvas: var(--color-brand-white);
--surface-level-1: var(--color-brand-white);
--surface-level-2: var(--color-brand-white);
--surface-level-3: var(--color-brand-white);
--surface-level-4: var(--color-brand-white);
--surface-inverse: var(--color-brand-black);
--surface-accent-low: var(--color-ramp-pink-400);
--surface-accent-medium: var(--color-ramp-pink-600);
--surface-accent-high: var(--color-ramp-pink-650);

/* Interactive */
--interactive-primary-fill-default: var(--color-brand-pink);
--interactive-primary-fill-hover: var(--color-ramp-pink-750);
--interactive-primary-fill-pressed: var(--color-ramp-pink-850);
--interactive-primary-text-default: var(--color-brand-white);
--interactive-link-default: var(--color-ramp-purple-850);
--interactive-link-hover: var(--color-ramp-purple-750);
--interactive-link-visited: var(--color-ramp-purple-700);

/* Feedback */
--feedback-error-fill: var(--color-ramp-red-100);
--feedback-error-text: var(--color-ramp-red-800);
--feedback-error-border: var(--color-ramp-red-950);
--feedback-success-fill: var(--color-ramp-green-100);
--feedback-success-text: var(--color-ramp-green-800);
--feedback-success-border: var(--color-ramp-green-950);

/* Disabled */
--disabled-a: var(--color-ramp-neutral-250);
--disabled-b: var(--color-ramp-neutral-350);
--disabled-c: var(--color-ramp-neutral-450);

/* Border */
--border-elevation-primary: var(--color-ramp-neutral-300);

/* Focus */
--focus-border: var(--color-ramp-dark-blue-950);```

#### Typography Variables
```css
/* Font */
--font-family-primary: "IBM Plex Sans";
--font-weight-regular: 400;
--font-weight-bold: 700;

/* Font Sizes (Large viewport progression) */
--font-size-xxs: 8px;
--font-size-xs: 10px;
--font-size-sm: 12px;
--font-size-md: 16px;
--font-size-lg: 20px;
--font-size-xl: 24px;
--font-size-xxl: 28px;
--font-size-3xl: 32px;
--font-size-4xl: 38px;
--font-size-5xl: 40px;

/* Line Heights */
--line-height-tight: 16px;
--line-height-snug: 18px;
--line-height-normal: 20px;
--line-height-comfortable: 22px;
--line-height-relaxed: 24px;
--line-height-loose: 28px;
--line-height-extra-loose: 32px;
```

#### Shadow Variables
```css
--shadow-elevation-0: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
--shadow-elevation-1: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
--shadow-elevation-2: 0 6px 16px 0 rgba(0, 0, 0, 0.2);
--shadow-elevation-3: 0 10px 24px 0 rgba(0, 0, 0, 0.2);
--shadow-elevation-4: 0 16px 32px 0 rgba(0, 0, 0, 0.2);
--shadow-elevation-inverse: 0 6px 16px 0 rgba(255, 255, 255, 0.2);
```

---

## Accessibility Information

### WCAG Compliance
All color tokens include WCAG contrast data:

#### Contrast Ratios
- **Normal Text:** Requires 4.5:1 contrast (WCAG AA)
- **Large Text:** Requires 3:1 contrast (WCAG AA)
- **Enhanced:** 7:1 contrast for normal text, 4.5:1 for large text (WCAG AAA)

#### Key Contrast Information
- **Brand Pink (#da095e):** 8.2:1 against white (WCAG AAA)
- **Neutral 750 (32% lightness):** 8.0:1 against white (WCAG AAA)
- **Neutral 450 (63% lightness):** 2.58:1 against white (fails normal text, passes large text)

### Accessibility Guidelines
1. **Text on Backgrounds:**
   - Use `neutral.750` or darker for text on white backgrounds
   - Use `neutral.300` or lighter for text on dark backgrounds
   - Check specific contrast ratios in token descriptions

2. **Interactive Elements:**
   - Primary buttons: Pink on white = 8.2:1 (AAA)
   - Secondary buttons: Black text on white = 21:1 (AAA)
   - Links: Purple.850 on white = 9.88:1 (AAA)

3. **Disabled States:**
   - Combine disabled.a, .b, .c for sufficient contrast
   - Text on disabled backgrounds should maintain 4.5:1 contrast

### Focus Indicators
- Use `interactive.link.hover` color for focus outlines
- Minimum 3:1 contrast for focus indicators
- `outline-offset: 2px` recommended for visible focus

---

## Usage Examples

### CSS Implementation

#### Button Components
```css
/* Primary Button */
.btn-primary {
  background-color: var(--interactive-primary-fill-default);
  color: var(--interactive-primary-text-default);
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: var(--font-weight-bold);
}

.btn-primary:hover {
  background-color: var(--interactive-primary-fill-hover);
}

.btn-primary:active {
  background-color: var(--interactive-primary-fill-pressed);
}

/* Secondary Button */
.btn-secondary {
  background-color: var(--interactive-secondary-fill-default);
  color: var(--interactive-secondary-text-default);
  border: 2px solid var(--interactive-secondary-border-default);
  padding: 10px 22px; /* Account for border */
  border-radius: 4px;
}

.btn-secondary:hover {
  border-color: var(--interactive-secondary-border-hover);
  background-color: var(--interactive-secondary-fill-hover);
}
```

#### Card Component
```css
.card {
  background-color: var(--surface-level-1);
  box-shadow: var(--shadow-elevation-1);
  border-radius: 8px;
  padding: 24px;
  border: 1px solid var(--border-elevation-primary);
}

.card-featured {
  border-left: 4px solid var(--surface-accent-strong);
}

.card-inverse {
  background-color: var(--surface-inverse);
  color: var(--color-brand-white);
  box-shadow: var(--shadow-elevation-inverse);
}
```

#### Typography System
```css
/* Headings */
.headline-large {
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xl);
  line-height: var(--line-height-comfortable);
  color: var(--color-brand-dark-blue);
}

.body-text {
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-md);
  line-height: var(--line-height-normal);
  color: var(--color-ramp-neutral-850);
}

/* Links */
a {
  color: var(--interactive-link-default);
  text-decoration: underline;
  text-underline-offset: 2px;
}

a:hover {
  color: var(--interactive-link-hover);
}

a:visited {
  color: var(--interactive-link-visited);
}

a:focus {
  outline: 2px solid var(--interactive-link-hover);
  outline-offset: 2px;
}
```

### React Component Example
```jsx
import React from 'react';
import './Button.css';

const Button = ({ variant = 'primary', size = 'medium', children, disabled, ...props }) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const disabledClass = disabled ? 'btn-disabled' : '';
  
  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${disabledClass}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

### JavaScript Token Usage
```javascript
// Import tokens from JSON
import tokens from './tokens/tokens.json';

// Access token values
const primaryColor = tokens.brand.color.brand.pink.value;
const surfaceCanvas = tokens.semantic.surface.canvas.value;

// Generate CSS variables
function generateCSSVariables(tokens) {
  let css = ':root {\n';
  
  // Process brand colors
  Object.entries(tokens.brand.color.brand).forEach(([name, token]) => {
    css += `  --color-brand-${name}: ${token.value};\n`;
  });
  
  // Process semantic tokens
  // ... additional processing logic
  
  css += '}';
  return css;
}
```

---

## Maintenance & Updates

### Adding New Tokens
1. Follow the token quality standard (designer + AI + WCAG info)
2. Use proper references to existing tokens when possible
3. Update this documentation
4. Test in Figma and code implementations

### Token Versioning
- Track changes in `tokens.json` metadata
- Document breaking changes
- Maintain backward compatibility when possible

### Testing
1. **Contrast Testing:** Verify WCAG compliance
2. **Visual Testing:** Check in Figma and browsers
3. **Code Generation:** Test with Figma Make
4. **Component Testing:** Verify in UI implementations

---

## Resources

- **Tokens JSON:** `/tokens/tokens.json` (single source of truth)
- **Guidelines:** `GUIDELINE.md` (workflow and prompt guidance)
- **Figma Library:** Sync tokens via Token Studio plugin
- **CSS Output:** Use scripts to generate CSS variables
- **Accessibility Tools:** Use contrast checkers and screen readers

---

*This documentation is automatically generated from the token structure. For the most current information, always refer to `tokens/tokens.json`.*
