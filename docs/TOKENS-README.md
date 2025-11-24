# Tokens — Complete Reference

Complete reference documentation for the Indeemo Design System token structure. All tokens are designed for Token Studio export, Figma Make automation, and agentic workflows.

## 1. Overview

- **Location:** `tokens/tokens.json`
- **Format:** JSON tokens organized by semantic sets
- **Purpose:** Central repository for design tokens with clear descriptions for designers and LLM automation

### Token Sets (3 Core)
- **`brand`** — Foundational colors (brand palette and 21-shade ramps)
- **`semantic`** — Context-specific tokens (surfaces, interactive, feedback, borders)
- **`styles`** — Exportable typography and effects (only place for exported styles/effects)

### Philosophy
- **Minimal sets:** Only 3 sets to reduce Token Studio complexity
- **Semantic grouping:** Tokens organized by context and use case
- **Brand references:** ALL semantic colors reference the brand palette
- **Designer-ready:** All tokens include clear descriptions for Figma Make and designer understanding

## 2. Brand Color Tokens

### Structure
```
brand.color.brand.*       → Brand color palette (single shades)
brand.color.ramp.*        → Color ramps (21 shades each)
```

### Brand Colors
- `brand.cream` — #fffdf2
- `brand.yellow` — #ffc700
- `brand.orange` — #ff6b14
- `brand.red` — #ff2734
- `brand.pink` — #da095e
- `brand.purple` — #8b006e
- `brand.dark-blue` — #2e3059
- `brand.grey` — #878583
- `brand.green` — #2B5926 (for success states)
- `brand.neutral.Light` — #ffffff
- `brand.neutral.Dark` — #000000

### Color Ramps
Each color (except neutral) has a 21-shade ramp (100–1050):
- `ramp.yellow`, `ramp.orange`, `ramp.red`, `ramp.pink`, `ramp.purple`, `ramp.dark-blue`, `ramp.grey`, `ramp.green`

Each ramp shade includes:
- **Value:** HSL color value
- **Description:** Lightness percentage, contrast ratios, WCAG level
- **Example:** `ramp.red.900` → hsl(356, 100%, 28%) with WCAG data

### Usage
All semantic colors reference brand tokens to ensure:
- Single source of truth
- Global color updates propagate automatically
- Consistent naming throughout the system

**Example Reference:** `{color.brand.pink}` or `{color.ramp.red.900}`

## 3. Semantic Tokens

All semantic tokens reference the brand palette. Organized by context and use case.

### 3.1 Surface Tokens

**Purpose:** Elevation-based surface fills with consistent hierarchy.

#### Direct Elevation References
Simplified surface tokens that directly reference elevation levels:

```
semantic.surface:
  undercanvas     → {elevation.level-negative-1}
  canvas          → {elevation.level-0}
  level-1         → {elevation.level-1}
  level-2         → {elevation.level-2}
  level-3         → {elevation.level-3}
  level-4         → {elevation.level-4}
  inverse         → {elevation.level-inverse}
  accent.strong   → {color.brand.pink}
  accent.subtle   → {color.ramp.pink.100}
```

#### Elevation Levels

| Level | Name | Use Case | Color |
|-------|------|----------|-------|
| -1 | Undercanvas | Sticky/floating elements | {color.brand.cream} |
| 0 | Canvas | Primary page background | {color.brand.neutral.Light} |
| 1 | Level 1 | Cards, contained components | {color.brand.neutral.Light} |
| 2 | Level 2 | Overlays, popovers, tooltips | {color.brand.neutral.Light} |
| 3 | Level 3 | Modals, prominent overlays | {color.brand.neutral.Light} |
| 4 | Level 4 | Top-level modals, dropdowns | {color.brand.neutral.Light} |
| Inverse | Inverse | Dark backgrounds, high-contrast | {color.brand.neutral.Dark} |

#### Accent Colors
Available for all elevation levels:
- **Strong:** {color.brand.pink} — High contrast, prominent elements (badges, highlights)
- **Subtle:** {color.ramp.pink.100} — Low contrast, secondary elements

### 3.2 Elevation Tokens

**Purpose:** Core elevation definitions (referenced by surface tokens).

```
semantic.elevation:
  level-negative-1    → {color.brand.cream}
  level-0             → {color.brand.neutral.Light}
  level-1             → {color.brand.neutral.Light}
  level-2             → {color.brand.neutral.Light}
  level-3             → {color.brand.neutral.Light}
  level-4             → {color.brand.neutral.Light}
  level-inverse       → {color.brand.neutral.Dark}
```

**Notes:**
- All levels except undercanvas and inverse use neutral.Light for 1:1 mapping
- Color is determined by shadow effects (elevation tokens contain fill colors only)
- Future dark mode support planned (elevation values will adapt)

### 3.3 Border Tokens

**Purpose:** Borders for elevated surfaces.

```
semantic.border.elevation.level-2.primary
  → {color.ramp.grey.300}
  → Use with surface.level-2 for contained component borders
  → Provides subtle visual separation
```

### 3.4 Interactive Tokens

**Purpose:** Button and link state colors.

#### Primary Buttons
```
semantic.interactive.primary:
  fill.default        → {color.brand.pink}
  fill.hover          → {color.ramp.pink.750}
  fill.pressed        → {color.ramp.pink.850}
  text.default        → {color.brand.neutral.Light}
  text.hover          → {color.ramp.neutral.200}
  text.pressed        → {color.ramp.neutral.250}
  icon.default        → {interactive.primary.text.default}
  icon.hover          → {interactive.primary.text.hover}
  icon.pressed        → {interactive.primary.text.pressed}
```

**Designer Context:** Use for main call-to-action buttons. Provides high contrast on all backgrounds.

#### Secondary Buttons
```
semantic.interactive.secondary:
  fill.default        → {color.brand.neutral.Light}
  fill.hover          → {color.ramp.neutral.150}
  fill.pressed        → {color.ramp.neutral.200}
  border.default      → {color.brand.purple}
  border.hover        → {color.ramp.purple.750}
  border.pressed      → {color.ramp.purple.850}
  text.default        → {color.brand.neutral.Dark}
  text.hover          → {color.brand.neutral.Dark}
  text.pressed        → {color.brand.neutral.Dark}
  icon.default        → {interactive.secondary.text.default}
  icon.hover          → {interactive.secondary.text.hover}
  icon.pressed        → {interactive.secondary.text.pressed}
```

**Designer Context:** Use for secondary actions. Light background with purple border for distinction.

#### Links
```
semantic.interactive.link:
  default             → {color.ramp.purple.850}
  hover               → {color.ramp.purple.750}
  visited             → {color.ramp.purple.700}
```

**Designer Context:** Use for hyperlinks and text links. All states provide WCAG AA contrast.

### 3.5 Feedback Tokens

**Purpose:** Color system for notification/banner components (error, success, warning, info).

Each feedback type has: `fill`, `text`, `border`, `icon`

#### Error Feedback
```
semantic.feedback.error:
  fill                → {color.ramp.red.100}      (light red background)
  text                → {color.ramp.red.900}      (dark red text)
  border              → {color.ramp.red.900}      (dark red border)
  icon                → {color.ramp.red.900}      (dark red icon)
```

**Designer Context:** Error banner/alert background. Use for error state containers. Light red tint for visibility.

#### Success Feedback
```
semantic.feedback.success:
  fill                → {color.ramp.green.100}    (light green background)
  text                → {color.brand.green}       (brand green text)
  border              → {color.brand.green}       (brand green border)
  icon                → {color.brand.green}       (brand green icon)
```

**Designer Context:** Success banner/alert background. Use for success/confirmation containers. Light green tint.

#### Warning Feedback
```
semantic.feedback.warning:
  fill                → {color.ramp.yellow.100}   (light yellow background)
  text                → {color.ramp.orange.900}   (dark orange text)
  border              → {color.ramp.orange.900}   (dark orange border)
  icon                → {color.ramp.orange.900}   (dark orange icon)
```

**Designer Context:** Warning banner/alert background. Use for warning/caution containers. Light yellow tint.

#### Info Feedback
```
semantic.feedback.info:
  fill                → {color.ramp.dark-blue.100} (light blue background)
  text                → {color.ramp.dark-blue.900} (dark blue text)
  border              → {color.ramp.dark-blue.900} (dark blue border)
  icon                → {color.ramp.dark-blue.900} (dark blue icon)
```

**Designer Context:** Info banner/alert background. Use for informational containers. Light blue tint.

## 4. Styles (Typography & Effects)

### 4.1 Typography

#### Brand Font
```
styles.typography.brand:
  fontFamily.a        → IBM Plex Sans
  fontWeight.regular  → Regular (400)
  fontWeight.bold     → Bold (700)
```

#### Typography Scale
```
styles.typography.scale:
  base                → 1 (multiplier for all sizes)
  ratio               → 1.125 (Major Second scale)
  fontSize.*          → xxs, xs, sm, md, lg, xl, xxl, 3xl, 4xl, 5xl
  lineHeight.*        → tight, snug, normal, comfortable, loose
```

#### Typography Styles
```
styles.typography:
  headline            → Heading styles (various sizes)
  body                → Body text (various sizes)
  body-emphasis       → Emphasized body (various sizes)
  label               → Form and UI labels
  caption             → Small metadata and hints
  display             → Large hero headings
  link                → Link styling (defines text-decoration, not color)
```

**Important:** Link styles do NOT contain color. Use `semantic.interactive.link.*` for link colors.

### 4.2 Shadow Effects

```
styles.shadow:
  elevation-negative-1  → 0px (no shadow)
  elevation-0           → 0px 1px 2px
  elevation-1           → 0px 3px 8px
  elevation-2           → 0px 6px 16px
  elevation-3           → 0px 10px 24px
  elevation-4           → 0px 16px 32px
  elevation-inverse     → 0px 6px 16px (dark)
```

## 5. Token Reference Format

All references use **flattened format** (set name omitted in reference):

### Same-Set References
```json
{typography.scale.base}
{interactive.primary.fill.default}
{feedback.error.text}
{surface.canvas}
```

### Cross-Set References
```json
{color.brand.pink}
{color.ramp.red.900}
```

### Why Flattened Format?
Token Studio uses a flattened reference model where:
- Set names are omitted for brevity
- Paths start from the first semantic level (color, typography, etc.)
- This ensures references work correctly in Figma variable resolution

## 6. Usage Examples

### Example 1: Primary Button Component
```
Button Fill:      {interactive.primary.fill.default}      ({color.brand.pink})
Button Text:      {interactive.primary.text.default}      ({color.brand.neutral.Light})
Button Icon:      {interactive.primary.icon.default}      ({color.brand.neutral.Light})
Button Hover Fill: {interactive.primary.fill.hover}       ({color.ramp.pink.750})
```

### Example 2: Card with Level 2 Surface
```
Card Fill:        {surface.level-2}                       ({elevation.level-2})
Card Border:      {border.elevation.level-2.primary}      ({color.ramp.grey.300})
Card Accent:      {surface.accent.strong}                 ({color.brand.pink})
```

### Example 3: Error Alert Banner
```
Banner Fill:      {feedback.error.fill}                   ({color.ramp.red.100})
Banner Text:      {feedback.error.text}                   ({color.ramp.red.900})
Banner Border:    {feedback.error.border}                 ({color.ramp.red.900})
Banner Icon:      {feedback.error.icon}                   ({color.ramp.red.900})
```

## 7. Best Practices for Designers & LLMs

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

## 8. Token Count Summary

| Set | Category | Count | Notes |
|-----|----------|-------|-------|
| brand | Colors | 10 | Base palette (cream, yellow, orange, red, pink, purple, dark-blue, grey, green, neutral) |
| brand | Ramps | 8 × 21 = 168 | Each color has 21 shades with metadata |
| semantic | Surface | 8 | undercanvas, canvas, level-1 through level-4, inverse, accent |
| semantic | Elevation | 7 | level-negative-1 through level-4, level-inverse |
| semantic | Border | 1 | border.elevation.level-2.primary |
| semantic | Interactive | 12 | 3 groups × 4 properties (primary, secondary, link) |
| semantic | Feedback | 16 | 4 types × 4 properties (error, success, warning, info) |
| styles | Typography | ~50 | Styles, scales, font definitions |
| styles | Shadows | 7 | Elevation shadows negative-1 through 4, inverse |
| **Total** | | **~270+** | Comprehensive token system |
